/*
任务指令集：负责任务的增删改查。
数据存储在 store.tasks 数组中，每个任务含 id、title、done 三个字段。
调用示例：Task.add("完成报告")、Task.remove("task_01")、Task.toggle("task_01")、Task.pending()
*/
import store from '@/store.js'                     // 引入全局状态
import generateId from '@/utils/generateId.js'     // 引入唯一ID生成器


// --- 添加任务 ---
const add = (title) => {
    if (!title || !title.trim()) return null       // 标题为空时拒绝创建

    const id = generateId()                        // 生成唯一任务ID

    const task = {                                 // 构建新任务
        id,                                          // 任务唯一标识
        title: title.trim(),                         // 任务标题，去除首尾空格
        done: false,                                 // 默认未完成
    }

    store.tasks.push(task)                         // 将任务加入全局列表
    return id                                      // 返回新任务ID供调用方使用
}


// --- 删除任务 ---
const remove = (id) => {
    const index = store.tasks.findIndex(task => task.id === id)  // 查找任务索引
    if (index === -1) return                       // 任务不存在直接返回
    store.tasks.splice(index, 1)                   // 从列表中移除该任务
}


// --- 切换完成状态 ---
const toggle = (id) => {
    const task = get(id)                           // 查找目标任务
    if (!task) return                              // 任务不存在直接返回
    task.done = !task.done                         // 反转完成状态
}


// --- 重命名任务 ---
const rename = (id, title) => {
    if (!title || !title.trim()) return            // 新标题为空时拒绝修改
    const task = get(id)                           // 查找目标任务
    if (!task) return                              // 任务不存在直接返回
    task.title = title.trim()                      // 更新任务标题
}


// --- 按ID获取任务 ---
const get = (id) => {
    return store.tasks.find(task => task.id === id)  // 返回匹配任务，找不到为 undefined
}


// --- 获取未完成任务 ---
const pending = () => {
    return store.tasks.filter(task => !task.done)  // 过滤出未完成任务
}


// --- 获取已完成任务 ---
const done = () => {
    return store.tasks.filter(task => task.done)   // 过滤出已完成任务
}


// --- 清空已完成任务 ---
const clear = () => {
    const ids = store.tasks                        // 获取全部任务
        .filter(task => task.done)                   // 筛选已完成的
        .map(task => task.id)                        // 提取ID列表
    ids.forEach(id => remove(id))                  // 逐个删除已完成任务
}


export default { add, remove, toggle, rename, get, pending, done, clear }  // 导出任务指令集