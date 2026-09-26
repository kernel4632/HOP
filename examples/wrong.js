// 反面写法：和 js/tool.js 做同一件事（登记工具、输出说明、按名字执行），但处处违反 HOP
// 每处问题用 [违反：规范名] 标出，对照 js/tool.js 阅读

import { readdir } from 'node:fs/promises'
import ReadTool from './tools/ReadTool.js'
import ShellTool from './tools/ShellTool.js'
import WriteTool from './tools/WriteTool.js'
// [违反：打开就懂] 没有文件头注释，不知道这个文件管什么、怎么调用
// [违反：注释讲业务] import 没有说明引入了什么
// [违反：加删只动一处] 每加一个工具，都要回到这里加一行 import


// [违反：说人话] ToolRegistryManager 用了两个技术角色词，概念太重，应该叫 Tool
class ToolRegistryManager {
    constructor() {
        this.toolMap = new Map()                   // [违反：说人话] Map 是类型后缀，应该叫 tools
        this.eventListeners = {}                   // [违反：平铺直叙] 事件总线，谁响应要运行才知道

        // [违反：加删只动一处] 手动登记，加工具改这里，删工具也要改这里
        // [违反：可预测] 有的工具是类要 new，有的是对象，格式不统一
        this.toolMap.set('read', new ReadTool())
        this.toolMap.set('shell', new ShellTool())
        this.toolMap.set('write', WriteTool)
    }

    // [违反：说人话] getAllToolSchemaDefinitionList 又长又重复，应该叫 schema
    getAllToolSchemaDefinitionList() {
        const resultList = []
        // [违反：平铺直叙] 嵌套四层，脑子里模拟不了
        // [违反：信任内部数据] 工具是自己登记的，却一层层怀疑它
        for (const [key, value] of this.toolMap.entries()) {
            if (value) {
                if (typeof value === 'object') {
                    if (typeof value.getDescription === 'function') {
                        resultList.push({
                            name: key,
                            description: value.getDescription(),
                            parameters: value.getParameters ? value.getParameters() : {},
                        })
                    } else {
                        console.warn('tool has no description', key)  // [违反：修问题做减法] 用警告盖住格式不统一的问题
                    }
                }
            }
        }
        return resultList
    }

    // [违反：说人话] executeToolByToolName 重复了 tool，应该叫 run
    async executeToolByToolName(toolName, toolInput) {
        // [违反：信任内部数据] 内部调用也在检查类型和长度，业务被挤到后面
        if (typeof toolName !== 'string') throw new TypeError('toolName must be string')
        if (toolName.length === 0) throw new Error('toolName is empty')
        if (toolInput === null || typeof toolInput !== 'object') throw new Error('bad input')

        const t = this.toolMap.get(toolName)       // [违反：说人话] t 是什么？
        if (!t) throw new Error('not found')       // [违反：打开就懂] 抛错打断模型，而不是把结果告诉它

        this.emit('beforeExecute', toolName)       // [违反：平铺直叙] 不知道谁在监听、会做什么

        // [违反：平铺直叙] 回调套 Promise 套 try，控制流跳来跳去
        try {
            const r = await new Promise((resolve, reject) => {
                this.processInput(toolInput, (err, processed) => {
                    if (err) return reject(err)
                    t.execute(processed).then(resolve).catch(reject)
                })
            })
            this.emit('afterExecute', toolName, r)
            return r
        } catch (e) {
            console.error(e)                       // [违反：信任内部数据] 吞掉真错误
            return { error: 'something went wrong' }  // [违反：打开就懂] 换成看不出原因的提示
        }
    }

    // [违反：装得下] 只被调用一次的小函数，逼读者跳过来看再跳回去
    processInput(input, callback) {
        callback(null, JSON.parse(JSON.stringify(input)))
    }

    // [违反：平铺直叙] 自己实现一套事件总线
    emit(eventName, ...args) {
        (this.eventListeners[eventName] || []).forEach(fn => fn(...args))
    }

    on(eventName, fn) {
        this.eventListeners[eventName] = this.eventListeners[eventName] || []
        this.eventListeners[eventName].push(fn)
    }
}


// [违反：加删只动一处] 写了扫描却不用，真正起作用的还是上面的手动登记
// [违反：数据一个来源] 目录里有一份工具列表，构造函数里又有一份，两份要手动保持一致
async function scanToolDirectoryAndLog(dir) {
    const files = await readdir(dir)
    console.log('found tool files:', files.length)
}


// [违反：数据一个来源] 导出全局实例，任何地方都能改它的 toolMap
export default new ToolRegistryManager()
export { scanToolDirectoryAndLog }
