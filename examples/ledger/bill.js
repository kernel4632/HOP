/*
账单：记账这件事的全部操作都在这里。账单数据只有这个文件会读写，存在 bills.json。
每一笔账长这样：{ id, amount, category, note, date }，金额单位是元，日期写成 2026-09-27。
调用示例：
  import Bill from './bill.js'
  const bill = Bill.add({ amount: 12.5, category: '吃饭', note: '午饭', date: '2026-09-27' })
  const list = Bill.list('2026-09')
  Bill.remove(bill.id)
  const sum = Bill.sum('2026-09')
*/
import { existsSync, readFileSync, writeFileSync } from 'node:fs'  // 读写账单数据文件
import { randomUUID } from 'node:crypto'           // 给每一笔账生成不会重复的编号
import fail from './fail.js'                       // 用户输入不对时，做一个带状态码的错误

const file = new URL('./bills.json', import.meta.url)  // 账单数据文件，和这个文件放在一起

if (!existsSync(file)) writeFileSync(file, '[]')   // 第一次运行时先建好空账本，后面读的时候就不用判断


// --- 读出全部账单 ---
function load() {
    return JSON.parse(readFileSync(file, 'utf-8')) // 把数据文件里的账单全部读出来
}


// --- 把全部账单写回文件 ---
function save(bills) {
    writeFileSync(file, JSON.stringify(bills, null, 2))  // 整份写回，缩进两格方便人直接打开看
}


// --- 记一笔账 ---
function add({ amount, category, note = '', date }) {
    category = String(category ?? '').trim()                                 // 先去掉分类首尾的空格；没填或只填了空格，都会变成空的
    if (!(amount > 0)) throw fail(400, '金额要是大于 0 的数字')              // 用户输入的检查只在这里做一次
    if (!category) throw fail(400, '要填一个分类')                           // 没有分类就没法汇总
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw fail(400, '日期要写成 2026-09-27 这样')  // 日期决定这笔账算哪个月

    const bill = { id: randomUUID(), amount, category, note, date }  // 按统一的样子拼出这一笔账
    const bills = load()                           // 读出已有的账单
    bills.push(bill)                               // 把新的这笔加到最后
    save(bills)                                    // 写回文件
    return bill                                    // 把记好的这笔账交回去，里面带着编号
}


// --- 列出账单，可以只看某个月 ---
function list(month) {
    if (!month) return load()                      // 没指定月份就全部列出
    if (!/^\d{4}-\d{2}$/.test(month)) throw fail(400, '月份要写成 2026-09 这样')  // 月份写错时告诉用户正确写法；汇总和导出也靠这里检查
    return load().filter(bill => bill.date.startsWith(month))  // 日期以 2026-09 开头的就是 9 月的账
}


// --- 删除一笔账 ---
function remove(id) {
    const bills = load()                           // 读出已有的账单
    const index = bills.findIndex(bill => bill.id === id)  // 找到要删的那一笔在第几个
    if (index === -1) throw fail(404, '没有找到这笔账')     // 编号不对时告诉用户，这是业务里会遇到的情况
    const [bill] = bills.splice(index, 1)          // 从账单里拿掉这一笔
    save(bills)                                    // 写回文件
    return bill                                    // 把删掉的那笔交回去，让用户知道删的是哪一笔
}


// --- 算出某个月的总支出和每个分类各花了多少 ---
function sum(month) {
    if (!month) throw fail(400, '汇总要指定月份，比如 month=2026-09')  // 汇总必须有月份，list 不会替它检查这件事
    const bills = list(month)                      // 取出这个月的全部账单，月份写得对不对由 list 检查

    const cents = {}                               // 每个分类各花了多少"分"。钱按分来加，因为小数直接相加会得到 0.30000000000000004 这种数
    for (const bill of bills) {                    // 一笔一笔往分类里加
        cents[bill.category] = (cents[bill.category] || 0) + Math.round(bill.amount * 100)  // 12.5 元记成 1250 分
    }

    const categories = {}                          // 交回去的分类明细，单位换回元
    for (const name in cents) categories[name] = cents[name] / 100  // 每个分类的分数除以 100 就是元

    const total = Object.values(cents).reduce((all, one) => all + one, 0) / 100  // 各分类的分加起来，再换回元，就是总支出
    return { month, total, categories }            // 交回月份、总支出和分类明细
}


export default { add, list, remove, sum }          // 导出账单的全部操作
