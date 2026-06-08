/*
任务指令集：负责任务的增删改查操作。
所有任务数据存储在 store.tasks 数组中，每个任务包含 id、title、done 三个字段。
调用示例：Task.add("完成报告")、Task.remove("task_01")、Task.toggle("task_01")、Task.getById("task_01")
*/
import store from '@/store.js'                     // 引入全局状态
import generateId from '@/utils/generateId.js'     // 引入唯一ID生成器

// --- 添加任务 ---
const add = (title) => {
    if (!title || !title.trim()) return null                      // 标题为空时拒绝创建

    const taskId = generateId()                                   // 生成唯一任务ID

    const newTask = {                                             // 构建新任务对象
        id: taskId,                                                 // 任务唯一标识
        title: title.trim(),                                        // 任务标题，去除首尾空格
        done: false,                                                // 默认未完成
    }

    store.tasks.push(newTask)                                     // 将任务加入全局列表
    return taskId                                                 // 返回新任务ID
}


// --- 删除任务 ---
const remove = (taskId) => {
    const index = store.tasks.findIndex(task => task.id === taskId) // 查找任务索引
    if (index === -1) return                                      // 任务不存在直接返回
    store.tasks.splice(index, 1)                                  // 从列表中移除该任务
}


// --- 切换任务完成状态 ---
const toggle = (taskId) => {
    const task = store.tasks.find(task => task.id === taskId)     // 查找目标任务
    if (!task) return                                             // 任务不存在直接返回
    task.done = !task.done                                        // 反转完成状态
}


// --- 重命名任务 ---
const rename = (taskId, newTitle) => {
    if (!newTitle || !newTitle.trim()) return                     // 新标题为空时拒绝修改
    const task = store.tasks.find(task => task.id === taskId)     // 查找目标任务
    if (!task) return                                             // 任务不存在直接返回
    task.title = newTitle.trim()                                  // 更新任务标题
}


// --- 根据ID获取任务 ---
const getById = (taskId) => {
    return store.tasks.find(task => task.id === taskId) || null   // 返回匹配任务或null
}


// --- 获取所有未完成任务 ---
const getPending = () => {
    return store.tasks.filter(task => !task.done)                 // 过滤出未完成任务
}


// --- 获取所有已完成任务 ---
const getDone = () => {
    return store.tasks.filter(task => task.done)                  // 过滤出已完成任务
}


// --- 清空所有已完成任务 ---
const clearDone = () => {
    const doneIds = store.tasks                                   // 获取全部任务
        .filter(task => task.done)                                  // 筛选已完成的
        .map(task => task.id)                                       // 提取ID列表
    doneIds.forEach(id => remove(id))                             // 逐个删除已完成任务
}


export default { add, remove, toggle, rename, getById, getPending, getDone, clearDone } // 导出所有任务指令
