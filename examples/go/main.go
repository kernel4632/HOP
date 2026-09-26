/*
入口：触发所有工具自我登记，然后按名字执行一个工具。
每个工具文件都空导入一次，它的 init() 就会在启动时把自己登记进去。
调用示例：
  go run main.go
*/
package main

import (
	"fmt"                                          // 打印执行结果

	"example/tool"                                 // 引入工具登记表
	_ "example/tools"                              // 空导入：触发工具自我登记
)

func main() {
	fmt.Println(tool.Schema())                     // 打印全部工具的说明

	result, err := tool.Run("read", []byte(`{"path":"./a.txt"}`))  // 执行读取工具
	if err != nil {
		fmt.Println(err)                           // 执行失败时打印错误
		return
	}

	fmt.Println(result)                            // 打印读到的文件内容
}
