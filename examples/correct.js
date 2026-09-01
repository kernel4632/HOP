/*
任务指令集：负责任务的增删改查。
tasks 是外部传入的任务数组，每个任务含 id、title、done 三个字段。
调用示例：
  const tasks = []
  Task.add(tasks, "完成报告")
  Task.remove(tasks, "task_01")
  Task.pending(tasks)
*/


// --- 添加任务 ---
const add = (tasks, title) => {
    if (!title || !title.trim()) return null        // 标题为空时拒绝创建（边界校验）

    const id = `task_${Date.now()}`                // 用时间戳生成唯一任务ID

    const task = {                                 // 构建新任务对象
        id,                                          // 任务唯一标识
        title: title.trim(),                         // 去除首尾空格后的标题
        done: false,                                 // 默认未完成
    }

    tasks.push(task)                               // 写入任务列表
    return id                                      // 返回新任务ID供调用方使用
}


// --- 删除任务 ---
const remove = (tasks, id) => {
    const index = tasks.findIndex(t => t.id === id)  // 找到任务在列表中的位置
    if (index === -1) return                         // 任务不存在，直接返回
    tasks.splice(index, 1)                           // 从列表中移除该任务
}


// --- 切换完成状态 ---
const toggle = (tasks, id) => {
    const task = get(tasks, id)                    // 查找目标任务
    if (!task) return                              // 任务不存在，直接返回
    task.done = !task.done                         // 反转完成状态
}


// --- 重命名任务 ---
const rename = (tasks, id, title) => {
    if (!title || !title.trim()) return            // 新标题为空时拒绝修改（边界校验）
    const task = get(tasks, id)                    // 查找目标任务
    if (!task) return                              // 任务不存在，直接返回
    task.title = title.trim()                      // 更新任务标题
}


// --- 按ID获取任务 ---
const get = (tasks, id) => {
    return tasks.find(t => t.id === id)            // 返回匹配任务，找不到为 undefined
}


// --- 获取未完成任务列表 ---
const pending = (tasks) => {
    return tasks.filter(t => !t.done)              // 过滤出所有未完成的任务
}


// --- 获取已完成任务列表 ---
const done = (tasks) => {
    return tasks.filter(t => t.done)               // 过滤出所有已完成的任务
}


// --- 清空已完成任务 ---
const clear = (tasks) => {
    const ids = tasks                              // 读取全部任务
        .filter(t => t.done)                         // 筛选出已完成的
        .map(t => t.id)                              // 只保留 ID，避免遍历时修改原数组
    ids.forEach(id => remove(tasks, id))           // 逐个调用 remove 删除，保持单一职责
}


export default { add, remove, toggle, rename, get, pending, done, clear }  // 导出任务指令集
