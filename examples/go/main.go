/*
入口：让所有工具完成自我登记，然后打印工具说明并执行一个工具。
Go 不能在运行时导入目录里的文件，所以用空导入 tools 包来触发每个工具的 init()。
tools 是一个包，里面新增或删除工具文件，这里都不用改。
调用示例：
  go run .
*/
package main

import (
	"fmt"                                          // 打印结果

	"example/tool"                                 // 引入工具登记表
	_ "example/tools"                              // 空导入：让 tools 包里每个工具自我登记
)

func main() {
	fmt.Println(tool.Schema())                     // 打印全部工具的说明

	result, err := tool.Run("read", []byte(`{"path":"go.mod"}`))  // 用读取工具读 go.mod
	if err != nil {                                // 执行失败时打印原因
		fmt.Println(err)
		return
	}
	fmt.Println(result)                            // 打印读到的文件内容
}
