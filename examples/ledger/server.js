/*
入口：接收 HTTP 请求，把参数交给对应的操作，再把结果发回去。这里不做任何业务判断。
所有操作报的错都在这里统一接住：带着状态码的是业务里会发生的错误，按它的状态码发回去；
没带状态码的是程序自己的问题，返回 500，同样带上错误原因，方便找到问题。
启动：node server.js，端口写在文件最后的 port。
调用示例：
  POST   /bills                     记一笔账，内容是 {"amount":12.5,"category":"吃饭","note":"午饭","date":"2026-09-27"}
  GET    /bills?month=2026-09       列出账单，不写 month 就是全部
  DELETE /bills?id=编号             删除一笔账
  GET    /sum?month=2026-09         月度汇总
  GET    /export?format=csv&month=2026-09   导出，format 可以是 formats 文件夹里有的任何格式
*/
import { createServer } from 'node:http'          // 建一个 HTTP 服务
import Bill from './bill.js'                       // 账单的全部操作
import Export from './export.js'                   // 导出操作
import fail from './fail.js'                       // 请求内容写错时，做一个带状态码的错误

await Export.scan()                                // 启动时先登记好全部导出格式


// --- 读出请求里发来的 JSON 内容 ---
async function body(request) {
    let text = ''                                  // 请求内容是一段一段到的，先拼起来
    for await (const part of request) text += part  // 把每一段接到后面
    try {
        return JSON.parse(text)                    // 把 JSON 文字变成对象；什么都没发也算格式不对
    } catch {
        throw fail(400, '请求内容不是正确的 JSON')  // 这是用户发来的内容写错了，不是程序的问题
    }
}


// --- 回答一个请求 ---
async function answer(request, response) {
    const url = new URL(request.url, 'http://localhost')  // 拆出路径和问号后面的参数
    const route = `${request.method} ${url.pathname}`     // 比如 "GET /bills"
    const query = Object.fromEntries(url.searchParams)    // 问号后面的参数，比如 { month: '2026-09' }

    try {
        if (route === 'POST /bills') return send(response, 200, Bill.add(await body(request)))  // 记一笔账
        if (route === 'GET /bills') return send(response, 200, Bill.list(query.month))          // 列出账单
        if (route === 'DELETE /bills') return send(response, 200, Bill.remove(query.id))        // 删除一笔账
        if (route === 'GET /sum') return send(response, 200, Bill.sum(query.month))             // 月度汇总
        if (route === 'GET /export') {                                                          // 导出成文件
            const file = Export.make(query.format, query.month)                                 // 按格式转好文字
            response.writeHead(200, { 'Content-Type': file.type })                              // 告诉浏览器这是什么文件
            return response.end(file.text)                                                      // 发回文件内容
        }
        send(response, 404, { error: `没有这个接口：${route}` })  // 路径写错时告诉用户
    } catch (error) {
        send(response, error.status ?? 500, { error: error.message })  // 业务错误按自带的状态码，程序问题按 500，都带上原因
    }
}


// --- 把结果变成 JSON 发回去 ---
function send(response, status, data) {
    response.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' })  // 写上状态码和内容类型
    response.end(JSON.stringify(data))             // 发回 JSON 文字
}


const port = 4720                                  // 服务监听的端口，要换端口只改这一处
createServer(answer).listen(port, () => console.log(`记账服务已启动：http://localhost:${port}`))  // 开始监听
