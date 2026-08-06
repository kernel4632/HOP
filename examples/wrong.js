// 这个文件展示了违反 HOP 规范的典型错误写法
// 每处错误用 [违反] 标注，与 correct.js 形成对比

import store from '@/store.js'
import generateId from '@/utils/generateId.js'

// [违反：信任原则] 大量类型校验和防御代码，业务逻辑被淹没
// [违反：减法原则] 一个简单功能被写得很膨胀
// [违反：命名规则] 使用技术术语 "Manager"，方法名重复主体信息

class TaskManager {
    // [违反] 没有文件头注释，读者不知道这个文件做什么、怎么用
    // [违反] import 没有尾随注释

    addTask(title) {
        // [违反：命名] addTask 冗余，文件已经叫 Task，应该直接叫 add
        // [违反：信任] 过度校验——检查类型、trim、长度限制，真正做事的代码只有 3 行
        if (typeof title !== 'string') {
            throw new TypeError('title must be a string')
        }
        if (!title || !title.trim()) {
            throw new Error('title cannot be empty')
        }
        if (title.length > 200) {
            throw new Error('title too long')
        }

        const id = generateId()
        const task = {
            id,
            title: title.trim(),
            done: false,
            createdAt: Date.now(),     // [违反：YAGNI] 没人用的字段
            updatedAt: Date.now(),     // [违反：YAGNI] 没人用的字段
            version: 1,               // [违反：YAGNI] 没人用的字段
        }
        store.tasks.push(task)
        return id
        // [违反] 整个函数没有业务注释
    }

    deleteTask(taskId) {
        // [违反：命名] deleteTask 冗余，应该叫 remove
        // [违反：信任] 校验 taskId 是否为字符串——信任传入的数据就好
        if (!taskId || typeof taskId !== 'string') {
            throw new Error('invalid taskId')
        }
        const index = store.tasks.findIndex(t => t.id === taskId)
        if (index === -1) {
            throw new Error(`task ${taskId} not found`)  // [违反：信任] 不存在就返回即可，不需要抛错
        }
        store.tasks.splice(index, 1)
    }

    /**
     * @description 切换任务状态
     * @param {string} taskId - 任务ID
     * @returns {void}
     */
    // [违反：注释格式] 使用了 JSDoc 标注格式，HOP 要求大白话
    toggleTask(taskId) {
        // [违反：命名] toggleTask 冗余，应该叫 toggle
        const task = store.tasks.find(t => t.id === taskId)
        if (task) task.done = !task.done
        // [违反] 没有卫语句提前返回，判断和操作混在一起
    }

    getTaskById(taskId) {
        // [违反：命名] getTaskById 冗余，应该叫 getById
        return store.tasks.find(t => t.id === taskId)
    }

    getPendingTasks() {
        // [违反：命名] getPendingTasks 冗余，应该叫 getPending
        return store.tasks.filter(t => !t.done)
    }

    getCompletedTasks() {
        // [违反：命名] getCompletedTasks 冗余，应该叫 getDone
        return store.tasks.filter(t => t.done)
    }

    clearCompleted() {
        store.tasks = store.tasks.filter(t => !t.done)
        // [违反：减法] 没有复用 remove 方法
        // [违反] 没有注释
    }
}

export default new TaskManager()
// [违反] 导出了 class 实例而不是纯函数对象
// [违反] export 没有注释

// === 总结 ===
// 这个文件的核心问题：
// 1. 业务逻辑被大量校验代码淹没——真正做事的代码不到一半
// 2. 命名到处重复上下文已有的信息
// 3. 加了没人用的字段（YAGNI）
// 4. 用 class + 技术术语命名，增加理解成本
// 5. 没有注释，或用了错误的注释格式
