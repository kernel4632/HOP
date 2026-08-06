# 命名准则

## 核心规则

**不重复上下文已经提供的信息。**

文件名、模块名、目录名已经告诉了读者"我是谁"，方法名只需要说"做什么"。调用时读出来，同一个词不应出现两次。

## 语境命名示例

```js
// 文件：commands/context.js
Context.build()              // 正确：Context 已经说了主体
Context.buildContext()       // 错误：context 说了两遍

// 文件：commands/task.js
Task.add()                   // 正确
Task.addTask()               // 错误：task 说了两遍
Task.getById()               // 正确
Task.getTaskById()           // 错误

// 文件在 commands/ 目录下
export default Task          // 正确：目录说明了这是指令
export default TaskCommand   // 错误：command 重复了目录信息
```

## 禁止的技术术语

以下命名禁止出现在文件名、类名、函数名中：

controller、service、repository、model、manager、handler、processor、dispatcher、factory、adapter、decorator、observer、helper、base、abstract、interface（作为前后缀时）

替代方式：直接用业务主体。`UserController` → `User`（放在 commands/ 下）。

## 方法命名

动词 + 名词结构，名词部分只在主体之外的对象时才出现：

| 动作 | 示例 |
|------|------|
| 创建 | `add`、`create` |
| 读取 | `get`、`getById`、`getPending` |
| 修改 | `rename`、`update`、`toggle` |
| 删除 | `remove`、`clear` |
| 检查 | `check`、`canUndo` |

注意：`getById` 而不是 `getTaskById`——因为调用时是 `Task.getById()`，上下文已经说了是 task。

## 变量命名

直接说是什么：

| 类型 | 示例 |
|------|------|
| 普通值 | `userName`、`totalScore`、`pageSize` |
| 布尔值 | `isReady`、`hasPermission`、`canEdit` |
| 列表 | `tasks`、`edges`、`selectedIds` |
| 映射 | `nodeOffsets`、`categoryMap` |

## 文件命名

- 优先使用单个单词：`score`、`student`、`order`
- 依靠目录上下文提供语义：`commands/user.js` 而不是 `commands/userCommand.js`
- 只有目录上下文不够时才用多个单词

## 缩写规则

约定俗成缩写作为整体保留，不拆不变形。

允许的固定缩写：`id`、`url`、`api`、`http`、`json`、`sse`、`sql`、`html`、`css`、`xml`、`svg`、`tcp`、`udp`、`ip`、`ui`、`io`

禁止的非标准缩写：`usr`、`cfg`、`svc`、`repo`、`mgr`、`btn`、`msg`、`err`、`cb`、`fn`、`ctx`、`req`、`res`、`env`

### 缩写位置

| 位置 | 规则 | 示例 |
|------|------|------|
| 缩写在开头 | 全部小写 | `apiUser`、`urlList`、`id` |
| 缩写跟在单词后 | 整体大写 | `userID`、`fileURL`、`parseJSON` |
| 类名中 | 整体大写 | `HTTPServer`、`SSEStream` |

## Python 命名补充

Python 遵循 PEP 8 的 snake_case，但语境命名思想不变：

- 函数名：`add`、`get_by_id`（不是 `add_task`、`get_task_by_id`）
- 缩写在 Python 中保持全小写：`user_id`、`file_url`、`parse_json`
