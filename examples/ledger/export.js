/*
导出：把账单转成某种格式的文字。每种格式是 formats 文件夹里的一个文件，文件名就是格式名。
启动时自动扫描 formats 文件夹，加一种格式只要放一个文件进去，删掉文件这种格式就没了，这个文件不用改。
每个格式文件默认导出两样：type（文件类型，比如 text/csv）和 make(bills)（把账单转成文字）。
调用示例：
  import Export from './export.js'
  await Export.scan()
  const file = Export.make('csv', '2026-09')   // 得到 { type, text }
*/
import { readdirSync } from 'node:fs'             // 列出 formats 文件夹里的文件
import Bill from './bill.js'                       // 导出要用到账单
import fail from './fail.js'                       // 格式名不对时，做一个带状态码的错误

const folder = new URL('./formats/', import.meta.url)  // 放各种格式的文件夹
const formats = {}                                 // 已登记的格式，键是格式名，比如 csv


// --- 扫描 formats 文件夹，登记每一种格式 ---
async function scan() {
    const files = readdirSync(folder).filter(file => file.endsWith('.js'))  // 格式文件都是 .js 文件
    for (const file of files) {                    // 逐个登记
        const name = file.slice(0, -3)             // 去掉结尾的 .js 就是格式名
        formats[name] = (await import(new URL(file, folder))).default  // 导入这个格式，按名字登记
    }
}


// --- 把某个月的账单导出成指定格式 ---
function make(format, month) {
    const kind = formats[format]                   // 按名字找到这种格式
    if (!kind) throw fail(400, `不支持 ${format} 格式，可以用：${Object.keys(formats).join('、')}`)  // 用户填错时告诉他有哪些能用
    const bills = Bill.list(month)                 // 取出要导出的账单，没写月份就是全部
    return { type: kind.type, text: kind.make(bills) }  // 交回文件类型和转好的文字
}


export default { scan, make }                      // 导出扫描和导出两个操作
