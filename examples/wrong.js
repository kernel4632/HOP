// 这个文件展示了违反 HOP 规范的典型错误写法
// 每处错误用 [错误] 标注原因，与 correct.js 形成对比

import store from '@/store.js'
import generateId from '@/utils/generateId.js'

// [错误] 没有文件头注释，读者不知道这个文件做什么、怎么用
// [错误] import 没有尾随注释，读者不知道引入的是什么

class TaskManager {  // [错误] 使用了 "Manager" 技术术语命名，应该直接用 "Task"
    // [错误] 使用 class 包裹纯函数逻辑，增加了不必要的复杂度

    addTask(title) {  // [错误] 方法名 addTask 冗余，文件已经叫 Task，应该直接叫 add
        const id = generateId()
        const task = { id, title, done: false }
        store.tasks.push(task)
        return id
        // [错误] 整个函数没有任何注释，初学者无法理解每一步的意图
        // [错误] 没有卫语句检查 title 是否为空
    }

    deleteTask(taskId) {
        store.tasks = store.tasks.filter(t => t.id !== taskId)  // [错误] 变量名 t 太简略，应该用 task
        // [错误] 没有段落标题 "// --- 删除任务 ---"
        // [错误] 没有注释说明这行在做什么
    }

    /**
     * @description 切换任务状态
     * @param {string} taskId - 任务ID
     * @returns {void}
     */
    // [错误] 使用了 JSDoc 标注格式，HOP 要求用精简大白话的多行注释
    toggleTask(taskId) {
        const task = store.tasks.find(t => t.id === taskId)
        if (task) task.done = !task.done
        // [错误] 没有卫语句提前返回，把判断和操作混在一起
        // [错误] 没有尾随注释
    }

    getTaskById(taskId) {  // [错误] 方法名应该是 getById，"Task" 由文件上下文提供
        return store.tasks.find(t => t.id === taskId)
    }

    getPendingTasks() {  // [错误] 方法名应该是 getPending
        return store.tasks.filter(t => !t.done)
    }

    getCompletedTasks() {  // [错误] 方法名应该是 getDone
        return store.tasks.filter(t => t.done)
    }

    clearCompleted() {
        store.tasks = store.tasks.filter(t => !t.done)
        // [错误] 直接替换数组引用可能破坏响应式系统
        // [错误] 没有复用 deleteTask 方法，职责不清
        // [错误] 没有注释
    }
}

export default new TaskManager()
// [错误] 导出了 class 实例而不是纯函数对象，增加了理解成本
// [错误] export 没有尾随注释说明导出了什么
