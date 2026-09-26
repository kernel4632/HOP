/*
读取文件工具：读出指定文件的文本内容。
文件名 read 就是工具名。这个文件放进 tools 目录，启动扫描时就会被登记，不用改任何别的文件。
调用示例：
  await Tool.run('read', { path: './a.txt' })
*/
import { readFile } from 'node:fs/promises'        // 读取文件内容

export default {
    description: '读取指定文件的文本内容',            // 给模型看的用途说明
    parameters: {                                  // 给模型看的参数说明：只要一个 path
        type: 'object',
        properties: { path: { type: 'string', description: '文件路径' } },
        required: ['path'],
    },


    // --- 执行读取 ---
    async execute({ path }) {
        const text = await readFile(path, 'utf-8') // 读出文件的全部文本
        return { output: text }                    // 按统一格式返回结果
    },
}
