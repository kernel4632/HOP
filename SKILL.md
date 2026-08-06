---
name: hop
description: 在项目的任何阶段加载并始终生效：架构设计、制定计划、编写代码、重构优化、代码审查、补注释、调试修复、测试验证、文件整理。确保所有代码产出始终遵循 HOP（面向人类编程）思想：业务逻辑为绝对主角、信任数据不防御、永远做减法、代码复杂度等于业务复杂度、凭直觉可掌控。当提到 HOP、面向人类编程、human-oriented programming、代码可读性、注释密度、注释规范、架构规范、命名规范、代码审查、代码风格、项目结构设计、初学者友好、代码即文档、可维护性时触发。
---

# HOP —— 面向人类编程

HOP 是 AI 时代的编程思想。AI 负责写代码，但人类必须能凭直觉掌控代码——看得懂、找得到、改得对、不怕动。一个产品的真实业务逻辑往往很简单，HOP 要求代码忠实反映这种简单。**最高目标：代码复杂度 = 业务复杂度，不多一分。**

## 核心思想

以下思想按重要性排列，贯穿所有编码活动。经典原则详解见 [references/principles.md](references/principles.md)。

1. **业务逻辑是绝对主角** — 打开文件第一眼看到的是业务在做什么，不是定义、校验、辅助函数。
2. **永远做减法** — 代码是负债。遇到问题让代码变少，不打补丁。（KISS / YAGNI / 奥卡姆剃刀 / Worse is Better）
3. **信任数据，不做防御** — 直接使用传入数据，有问题让它自然报错。保护人能看懂，而不是保护代码不出错。
4. **直觉即安全** — 人凭直觉改代码，结果就是正确的。按直觉改会出错说明架构有病。（最小惊讶原则 / 约定优于配置）
5. **行为局部性** — 理解一件事只看一个地方，不在多个文件间跳来跳去。
6. **显式优于隐式** — 依赖、数据流、副作用全部写在明处，不搞魔法。
7. **模块独立，即插即用** — 加模块放进去就生效，删模块删掉就消失，不改其他文件。（单一职责 / 组合优于继承 / 零注册架构）
8. **复用克制** — 用一次就地写，稳定两次以上再提取。不提前抽象。
9. **语境命名** — 不重复上下文已有的信息。`Context.build()` 而非 `Context.buildContext()`。

## 你身上的问题，以及如何纠正

你写代码时有以下坏习惯。认识到它们，然后用正确的方式思考：

**出问题只会打补丁，代码越来越多。** 你很容易把一个小项目做成看起来很大的项目，实际上服务于业务的代码很少。遇到问题不加代码修补，而是消除问题发生的条件，让代码变少。→ 修复前先想：这个问题依赖什么前提条件？去掉前提，问题还存在吗？如果修复让代码变多了，停下来重新想。

**业务逻辑被淹没。** 人来审查时总是找不到主业务逻辑在哪，到处是"定义""检查"、脏代码、小辅助函数、大量文件和分离。→ 写代码前问自己：一个不了解项目的人打开这个文件，5 秒内能看出它在做什么业务吗？如果不能，非业务的东西太多了。

**大量校验和防御代码。** 代码里充满类型定义、数据格式定义、各种检查，典型的不信任任何传入信息，导致大量代码。→ 问自己：删掉这个校验，功能还能正常工作吗？如果能，它就是多余的。

**脏代码和业务逻辑混在一起。** 经常变动的代码和不经常变动的代码混在一起，人想看业务逻辑要在一堆杂活里刨。→ 业务逻辑保持纯净，脏活压到最少放到边界处。

**辅助函数泛滥。** 一堆只用一次的工具小函数，文件里方法数量多，读代码要频繁跳转，大量心智消耗。→ 只用一次的逻辑就地写，只有被多处复用才提取。拆之前问：拆了之后读者需要跳转才能理解吗？需要就不拆。

**命名冗余。** 在命名空间里重复已有信息，如 `Context.buildContext`。→ 读出调用语句，同一信息出现两次就有多余的词。方法名只说"做什么"，"我是谁"由文件/模块/目录说。

**大厂防御式思维，架构反直觉。** 一切为了防御和防止犯错而写，代码不灵活、沉重、项目变成大项目，人不敢动。→ 写完代码问自己：一个人凭直觉在这里改逻辑，改完会出问题吗？如果会，改架构让直觉操作安全，不加保护代码。

**加功能需要到处改。** 决定项目结构时问自己：加一个新模块后，需要去其他文件里注册、import、配置吗？如果需要，架构有问题。写好放进去就该自动生效。

## 正反对比

```js
// 错误：防御代码淹没业务，命名冗余
class TaskManager {
    addTask(title) {
        if (typeof title !== 'string') throw new TypeError('title must be a string')
        if (!title || !title.trim()) throw new Error('title cannot be empty')
        if (title.length > 200) throw new Error('title too long')
        const id = generateId()
        const task = { id, title: title.trim(), done: false, createdAt: Date.now(), version: 1 }
        store.tasks.push(task)
        return id
    }
}

// 正确：业务逻辑是主角，信任数据，命名精练
const add = (title) => {
    if (!title || !title.trim()) return null       // 标题为空时拒绝创建
    const taskId = generateId()                    // 生成唯一任务ID
    const newTask = { id: taskId, title: title.trim(), done: false }  // 构建新任务
    store.tasks.push(newTask)                      // 加入全局列表
    return taskId                                  // 返回新任务ID
}
```

完整示例：[examples/correct.js](examples/correct.js) · [examples/wrong.js](examples/wrong.js) · [examples/correct.py](examples/correct.py)

## 参考

- 架构主线（触发→指令→数据→反馈）：[references/architecture.md](references/architecture.md)
- 命名准则：[references/naming.md](references/naming.md)
- 注释准则：[references/comments.md](references/comments.md)
- 经典原则详解：[references/principles.md](references/principles.md)
