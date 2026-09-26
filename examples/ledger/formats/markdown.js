/*
Markdown 格式：把账单转成表格文字，可以直接贴进笔记软件。
文件名 markdown 就是格式名，放在 formats 文件夹里就会被自动登记。
调用示例：
  Export.make('markdown', '2026-09')
*/


// --- 把一格内容变成 Markdown 表格里安全的写法 ---
function cell(value) {
    return String(value).replaceAll('|', '\\|').replaceAll('\n', ' ')  // 竖线会被当成表格分隔，换行会把表格断开，都要处理
}


// --- 把账单转成 Markdown 表格 ---
function make(bills) {
    const lines = ['| 日期 | 分类 | 金额 | 备注 |', '| --- | --- | ---: | --- |']  // 表头和分隔行，金额靠右对齐
    for (const bill of bills) {                    // 每笔账一行
        lines.push(`| ${cell(bill.date)} | ${cell(bill.category)} | ${bill.amount} | ${cell(bill.note)} |`)  // 按表头的顺序拼出这一行
    }
    return lines.join('\n')                        // 一行一行连起来
}


export default { type: 'text/markdown; charset=utf-8', make }  // 导出文件类型和转换方法
