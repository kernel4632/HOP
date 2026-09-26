/*
工具登记表：规定一个工具长什么样，收下每个工具的自我登记，再按名字执行。
工具文件在自己的 init() 里调用 Register，这个文件永远不用为新工具修改。
调用示例：
  schema := tool.Schema()
  result, err := tool.Run("read", []byte(`{"path":"./a.txt"}`))
*/
package tool

import (
	"encoding/json"                                // 把工具说明转成 JSON 文本
	"errors"                                       // 定义"找不到工具"这个错误
	"sort"                                         // 让工具说明按名字排好顺序
)

// Tool 是每个工具都要提供的四样东西
type Tool struct {
	Name        string                             `json:"name"`        // 工具名，按它登记和查找
	Description string                             `json:"description"` // 给模型看的用途说明
	Parameters  json.RawMessage                    `json:"parameters"`  // 给模型看的参数说明
	Execute     func(input []byte) (string, error) `json:"-"`           // 真正干活的方法
}

var tools = map[string]Tool{}                      // 已登记的工具，键是工具名

var ErrNotFound = errors.New("tool not found")     // 按名字找不到工具时返回它


// --- 登记一个工具 ---
func Register(t Tool) {
	tools[t.Name] = t                              // 按工具名登记，同名的后来者覆盖
}


// --- 读取给模型看的工具说明 ---
func Schema() string {
	names := []string{}                            // 收集全部工具名
	for name := range tools {                      // 逐个取出已登记的名字
		names = append(names, name)                // 放进名字列表
	}
	sort.Strings(names)                            // 排好顺序，每次输出都一样

	list := []Tool{}                               // 按顺序收集工具
	for _, name := range names {                   // 按排好的名字逐个取工具
		list = append(list, tools[name])           // 放进工具列表
	}

	text, _ := json.Marshal(list)                  // 转成 JSON，Execute 不会被写进去
	return string(text)                            // 返回全部工具的说明
}


// --- 按名字执行工具 ---
func Run(name string, input []byte) (string, error) {
	t, ok := tools[name]                           // 按名字取出对应工具
	if !ok {                                       // 名字不存在时直接告诉调用方
		return "", ErrNotFound
	}
	return t.Execute(input)                        // 交给工具自己执行
}
