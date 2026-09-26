/*
工具登记表：定义工具长什么样，收集所有自我登记的工具，再按名字执行。
每个工具文件在自己的 init() 里调用 Register，不需要改这个文件。
调用示例：
  schema := tool.Schema()
  result, err := tool.Run("read", []byte(`{"path":"./a.txt"}`))
*/
package tool

import (
	"errors"                                       // 定义一个明确的错误
	"sort"                                         // 按名字排序输出
)

// ErrNotFound 表示按名字没找到工具
var ErrNotFound = errors.New("tool not found")

// Tool 是一个工具需要提供的全部内容
type Tool struct {
	Name        string                             // 工具名，按它查找和登记
	Description string                             // 给模型看的用途说明
	Parameters  string                             // 给模型看的参数说明（JSON）
	Execute     func(input []byte) (string, error) // 执行工具，输入输出都是 JSON
}

var tools = map[string]Tool{}                      // 已登记的工具，键是工具名


// --- 登记一个工具 ---
func Register(t Tool) {
	tools[t.Name] = t                              // 按工具名登记，同名覆盖
}


// --- 读取给模型看的工具说明 ---
func Schema() string {
	names := make([]string, 0, len(tools))         // 收集全部工具名
	for name := range tools {
		names = append(names, name)
	}
	sort.Strings(names)                            // 排序，让输出稳定可预测

	list := "["                                    // 拼接每个工具的说明

	for _, name := range names {                   // 逐个读取已登记的工具
		t := tools[name]
		list += `{"name":"` + t.Name + `",`        // 写入工具名
		list += `"description":"` + t.Description + `",`  // 写入用途说明
		list += `"parameters":` + t.Parameters + `}`      // 写入参数说明
	}

	return list + "]"                              // 返回全部工具的说明
}


// --- 按名字执行工具 ---
func Run(name string, input []byte) (string, error) {
	t, ok := tools[name]                           // 按名字取出对应工具
	if !ok {
		return "", ErrNotFound                     // 名字不存在时返回错误
	}
	return t.Execute(input)                        // 交给工具自己执行
}
