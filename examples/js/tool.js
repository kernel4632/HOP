/*
工具扫描器：读取 tools 目录，把每个工具文件登记进来，再按名字执行。
每个工具文件默认导出 description、parameters、execute 三样；文件名就是工具名，放进目录就生效。
调用示例：
  import Tool from './tool.js'
  await Tool.scan('./tools')
  const schema = Tool.schema()
  const result = await Tool.run('read', { path: './a.txt' })
*/
import { readdir } from 'node:fs/promises'         // 列出目录里的文件名
import { basename, join, resolve } from 'node:path'  // 拼出工具文件的完整路径，取出文件名
import { pathToFileURL } from 'node:url'           // 把路径转成可导入的地址

const tools = new Map()                            // 已登记的工具，键是工具名


// --- 扫描工具目录 ---
async function scan(folder) {
    const names = await readdir(folder)            // 取出目录里的全部文件名
    const files = names.filter(n => n.endsWith('.js')).sort()  // 只留工具文件，按名字排好

    for (const file of files) {                    // 逐个登记工具文件
        const url = pathToFileURL(resolve(join(folder, file)))  // 拼出这个文件的导入地址
        const tool = (await import(url.href)).default  // 取出文件默认导出的工具
        tools.set(basename(file, '.js'), tool)     // 去掉 .js 的文件名就是工具名，按它登记
    }
}


// --- 读取给模型看的工具说明 ---
function schema() {
    return [...tools].map(([name, tool]) => ({     // 每个工具只取模型需要的三样
        name,                                      // 工具名，来自文件名
        description: tool.description,             // 用途说明
        parameters: tool.parameters,               // 参数说明
    }))
}


// --- 按名字执行工具 ---
async function run(name, input) {
    const tool = tools.get(name)                   // 按名字取出对应工具
    if (!tool) return { output: `tool not found: ${name}` }  // 找不到时把提示当结果返回给模型
    return tool.execute(input)                     // 交给工具自己执行
}


export default { scan, schema, run }               // 导出扫描、说明、执行三个指令
