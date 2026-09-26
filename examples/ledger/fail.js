/*
出错：做一个"业务里会发生的错误"，带上 HTTP 状态码，比如 400 表示输入不对、404 表示找不到。
入口看到错误带着状态码，就按这个状态码把错误原因发给用户；没带状态码的错误是程序自己的问题，入口返回 500。
调用示例：
  import fail from './fail.js'
  throw fail(400, '金额要是大于 0 的数字')
*/


// --- 做一个带状态码的错误 ---
export default function fail(status, message) {
    return Object.assign(new Error(message), { status })  // 就是普通的错误，多带一个状态码
}
