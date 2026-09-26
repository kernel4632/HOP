/*
工具扫描器：读取 tools 目录，把每个工具文件登记进来，再按名字执行。
调用示例：
  await Tool.scan('./tools')
  const schema = Tool.schema()
  const result = await Tool.run('read', { path: './a.txt' })
*/
import { readdir } from 'node:fs/promises'         // 读取目录里的文件名
import { join } from 'node:path'                   // 拼出工具文件的完整路径
import { pathToFileURL } from 'node:url'           // 拼出可导入的文件地址

const tools = new Map()                            // 已登记的工具，键是工具名


// --- 扫描工具目录 ---
async function scan(folder) {
    const names = await readdir(folder)            // 取出目录里的全部文件名
    const files = names.filter(n => n.endsWith('.js'))  // 只留下工具文件

    for (const file of files) {                    // 逐个登记工具文件
        const url = pathToFileURL(join(folder, file))  // 拼出这个文件的导入地址
        const tool = (await import(url.href)).default  // 导入文件默认导出的工具
        tools.set(tool.name, tool)                 // 按工具名登记，同名覆盖
    }
}


// --- 读取给模型看的工具说明 ---
function schema() {
    const list = []                                // 收集每个工具的说明

    for (const tool of tools.values()) {           // 逐个读取已登记的工具
        const { name, description, parameters } = tool  // 只取模型需要的三样
        list.push({ name, description, parameters })    // 加入说明列表
    }

    return list                                    // 返回全部工具的说明
}


// --- 按名字执行工具 ---
async function run(name, input) {
    const tool = tools.get(name)                   // 按名字取出对应工具
    if (!tool) return `tool not found: ${name}`    // 名字不存在时直接返回提示
    return tool.execute(input)                     // 交给工具自己执行
}


export default { scan, schema, run }               // 导出工具扫描器
