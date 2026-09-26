// 这个文件展示了违反 HOP 规范的典型错误写法，与 js/tool.js 对照阅读
// 每处错误用 [违反 规范名] 标注

import { readFile } from 'node:fs/promises'
import { writeFile } from 'node:fs/promises'
import { readdir } from 'node:fs/promises'

// [违反 说人话] 文件名应该叫 tool.js，注册表也不需要单独一个文件
// [违反 免推理] 没有文件头注释，读者不知道这个文件做什么、怎么调用
// [违反 免推理] import 没有尾随注释

// [违反 自动化] 每加一个工具都要来这个文件里改两处：import 一行、注册表一行
import readTool from './tools/read.js'
import writeTool from './tools/write.js'
import shellTool from './tools/shell.js'

// [违反 说人话] ToolRegistry 概念过大，术语堆砌
class ToolRegistry {
    // [违反 说人话] 变量名带类型后缀
    private toolsMap: Map<string, any>

    constructor() {
        // [违反 自动化] 手动登记，加一个工具就要在这里加一行
        // [违反 可预测] 有的工具是类，有的工具是对象，形状不统一
        this.toolsMap = new Map()
        this.toolsMap.set('read', new readTool())
        this.toolsMap.set('write', new writeTool())
        this.toolsMap.set('shell', new shellTool())
        // [违反 免推理] 这一大段没有任何注释
    }

    // [违反 说人话] getToolsSchemaList 又长又术语化，应该叫 schema
    public getToolsSchemaList(): any[] {
        const result: any[] = []
        // [违反 装得下] 一个函数里同时有循环、条件、类型判断、兜底四件事
        for (const [key, value] of this.toolsMap.entries()) {
            if (value && typeof value === 'object') {
                if (value.getDescription && typeof value.getDescription === 'function') {
                    if (value.getParameters && typeof value.getParameters === 'function') {
                        result.push({
                            name: key,
                            description: value.getDescription(),
                            parameters: value.getParameters(),
                        })
                    } else {
                        // [违反 免推理] 这个分支防的是什么情况？没人知道
                        console.warn('tool missing parameters', key)
                    }
                } else {
                    console.warn('tool missing description', key)
                }
            } else {
                // [违反 免推理] 兜底分支把真问题藏起来了
                console.error('invalid tool', key)
            }
        }
        return result
    }

    // [违反 说人话] executeToolByName 冗余，应该叫 run
    public async executeToolByName(toolName: string, input: any): Promise<any> {
        // [违反 免推理] 内部代码做了大量防御校验
        if (!toolName || typeof toolName !== 'string') {
            throw new TypeError('toolName must be a non-empty string')
        }
        if (toolName.length > 64) {
            throw new Error('toolName too long')
        }
        if (!input || typeof input !== 'object') {
            throw new Error('input must be an object')
        }

        const tool = this.toolsMap.get(toolName)    // [违反 说人话] 变量名可以有意义的
        if (!tool) {
            // [违反 可预测] 找不到工具时抛错，而不是返回一条结果让模型知道
            throw new Error(`tool not found: ${toolName}`)
        }

        try {
            // [违反 平铺直叙] 回调套 Promise 套 try，控制流跳来跳去
            return await new Promise((resolve, reject) => {
                tool.execute(input, (err: any, data: any) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(data)
                    }
                })
            })
        } catch (error) {
            // [违反 免推理] 把真错误吞掉，换成看不懂的提示
            console.error('tool execution failed', error)
            return { error: 'something went wrong' }
        }
    }
}

// [违反 自动化] 手写一个假的扫描函数，实际上什么也不扫
async function scanToolsDirectory(directory: string): Promise<void> {
    const fileList = await readdir(directory)
    // [违反 自动化] 扫完不用，还是靠上面手动登记的那张表
    console.log('found files but not registering them:', fileList.length)
}

// [违反 可预测] 导出一个全局实例，别处 import 就能改它的内部状态
export default new ToolRegistry()
