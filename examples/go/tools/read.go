/*
读取文件工具：读出指定文件的文本内容。
文件放进来就自动被登记，不需要改任何别的文件。
调用示例：
  tool.Run("read", []byte(`{"path":"./a.txt"}`))
*/
package tools

import (
	"encoding/json"                                // 解析工具输入
	"os"                                           // 读取文件内容

	"example/tool"                                 // 引入工具登记表
)

// 解开工具输入用的小结构
type readInput struct {
	Path string `json:"path"`                      // 要读取的文件路径
}


// --- 启动时自我登记 ---
func init() {
	tool.Register(tool.Tool{
		Name:        "read",                       // 工具名，按它查找
		Description: "读取指定文件的文本内容",       // 给模型看的用途说明
		Parameters: `{                             // 给模型看的参数说明
			"type": "object",
			"properties": {
				"path": {"type": "string", "description": "文件路径"}
			},
			"required": ["path"]
		}`,
		Execute: read,                             // 执行入口
	})
}


// --- 执行读取 ---
func read(input []byte) (string, error) {
	var args readInput                             // 准备接收工具输入

	err := json.Unmarshal(input, &args)            // 把输入解析成结构
	if err != nil {
		return "", err                             // 输入不是合法 JSON 时报错
	}

	text, err := os.ReadFile(args.Path)            // 读出文件的全部文本
	if err != nil {
		return "", err                             // 读不了时直接报错
	}

	return string(text), nil                       // 返回文件内容
}
