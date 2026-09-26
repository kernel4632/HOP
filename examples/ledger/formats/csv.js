/*
CSV 格式：把账单转成表格文件，可以直接用 Excel 打开。
文件名 csv 就是格式名，放在 formats 文件夹里就会被自动登记。
调用示例：
  Export.make('csv', '2026-09')
*/


// --- 把一格内容变成 CSV 里安全的写法 ---
function cell(value) {
    return `"${String(value).replaceAll('"', '""')}"`  // 用双引号包起来，里面的双引号写两遍，逗号和换行就不会弄乱表格
}


// --- 把账单转成 CSV 文字 ---
function make(bills) {
    const head = ['日期', '分类', '金额', '备注']     // 第一行是表头
    const rows = bills.map(bill => [bill.date, bill.category, bill.amount, bill.note])  // 每笔账一行，顺序和表头一样
    const lines = [head, ...rows].map(row => row.map(cell).join(','))  // 每一格处理好，再用逗号连成一行
    return '\uFEFF' + lines.join('\r\n')           // 开头加 BOM，Excel 打开中文才不会乱码；换行用 Windows 的写法
}


export default { type: 'text/csv; charset=utf-8', make }  // 导出文件类型和转换方法
