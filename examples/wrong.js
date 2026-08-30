// 这个文件展示了违反 HOP 规范的典型错误写法
// 每处错误用 [违反规范名] 标注，与 correct.js 对照阅读

import store from '@/store.js'
import generateId from '@/utils/generateId.js'
import { register } from './registry.js'

// [违反极简命名] 使用技术术语 "Manager"，应该直接叫 Task
// [违反注释] 没有文件头注释，读者不知道这个文件做什么、怎么用
// [违反注释] import 没有尾随注释

class TaskManager {
    addTask(title) {
        // [违反极简命名] addTask 冗余，应该叫 add
        // [违反信任数据] 过度校验类型和长度，真正的业务只有几行
        if (!this.validateInput(title)) {
            throw new Error('invalid title')
        }
        // [违反逻辑集中] validateInput 只在这里用一次，却跳出去找，不如就地写

        const id = generateId()
        const task = {
            id,
            title: title.trim(),
            done: false,
            createdAt: Date.now(),     // [违反解决根本] 没人用的字段
            updatedAt: Date.now(),     // [违反解决根本] 没人用的字段
            version: 1,               // [违反解决根本] 没人用的字段
        }
        store.tasks.push(task)
        return id
        // [违反业务逻辑优先] 校验占了大半，业务逻辑被淹没
        // [违反注释] 整个函数没有业务注释
    }

    validateInput(text) {
        // [违反逻辑集中] 只用一次的检查提取成单独方法，读者要跳转才能理解
        return typeof text === 'string' && text.trim().length > 0
    }

    deleteTask(taskId) {
        // [违反极简命名] deleteTask 冗余，应该叫 remove
        // [违反信任数据] 校验 taskId 类型——内部代码应信任数据
        if (!taskId || typeof taskId !== 'string') {
            throw new Error('invalid taskId')
        }
        const index = store.tasks.findIndex(t => t.id === taskId)
        if (index === -1) {
            throw new Error(`task ${taskId} not found`)  // [违反信任数据] 不存在返回即可，不需要抛错
        }
        store.tasks.splice(index, 1)
    }

    /**
     * @description 切换任务状态
     * @param {string} taskId - 任务ID
     * @returns {void}
     */
    // [违反注释] 使用 JSDoc 标注格式，HOP 要求大白话
    toggleTask(taskId) {
        // [违反极简命名] toggleTask 冗余，应该叫 toggle
        const task = store.tasks.find(t => t.id === taskId)
        if (task) task.done = !task.done
        // [违反注释] 没有卫语句提前返回，判断和操作混在一起
    }

    getTaskById(taskId) {
        // [违反极简命名] getTaskById 冗余，应该叫 get
        return store.tasks.find(t => t.id === taskId)
    }

    getPendingTasks() {
        // [违反极简命名] getPendingTasks 冗余，应该叫 pending
        return store.tasks.filter(t => !t.done)
    }

    getCompletedTasks() {
        // [违反极简命名] getCompletedTasks 冗余，应该叫 done
        return store.tasks.filter(t => t.done)
    }

    clearCompleted() {
        // [违反修改安全] 直接替换整个数组，破坏了别处对原数组的引用
        store.tasks = store.tasks.filter(t => !t.done)
        // [违反注释] 没有注释
    }
}

const manager = new TaskManager()
register(manager)    // [违反单一来源] 手动注册，删掉这个模块还要回来删这行

export default manager
// [违反极简命名] 导出 class 实例而不是纯函数对象
// [违反注释] export 没有注释