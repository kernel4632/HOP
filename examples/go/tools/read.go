/*
读取文件工具：读出指定文件的文本内容。
这个文件放进 tools 目录就会在启动时自我登记，不用改任何别的文件。
调用示例：
  tool.Run("read", []byte(`{"path":"./a.txt"}`))
*/
package tools

import (
	"encoding/json"                                // 解析模型传来的参数
	"os"                                           // 读取文件内容

	"example/tool"                                 // 引入工具登记表
)


// --- 启动时自我登记 ---
func init() {
	tool.Register(tool.Tool{
		Name:        "read",                       // 工具名，模型按它调用
		Description: "读取指定文件的文本内容",       // 给模型看的用途说明
		Parameters: json.RawMessage(`{
			"type": "object",
			"properties": {"path": {"type": "string", "description": "文件路径"}},
			"required": ["path"]
		}`),                                       // 给模型看的参数说明：只要一个 path
		Execute: read,                             // 真正干活的是下面的 read
	})
}


// --- 执行读取 ---
func read(input []byte) (string, error) {
	var args struct{ Path string }                 // 准备接收参数里的 path
	json.Unmarshal(input, &args)                   // 解析参数，模型传来的格式由边界保证

	text, err := os.ReadFile(args.Path)            // 读出文件的全部文本
	if err != nil {                                // 文件读不了时把原因交给调用方
		return "", err
	}
	return string(text), nil                       // 返回文件内容
}
