/*
读取文件工具：读出指定文件的文本内容。
调用示例：
  import read from './tools/read.js'
  const result = await read.execute({ path: './a.txt' })
*/
import { readFile } from 'node:fs/promises'        // 读取文件内容

export default {
    name: 'read',                                  // 工具名，扫描器按它登记
    description: '读取指定文件的文本内容',            // 给模型看的用途说明
    parameters: {                                  // 给模型看的参数说明
        type: 'object',
        properties: {
            path: { type: 'string', description: '文件路径' },
        },
        required: ['path'],
    },


    // --- 执行读取 ---
    async execute({ path }) {
        const text = await readFile(path, 'utf-8')  // 读出文件的全部文本
        return { output: text }                    // 按统一格式返回结果
    },
}
