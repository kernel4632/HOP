# 命名准则

## 如何思考命名

取名时，读出完整的调用语句，问自己：

**"同一个信息出现了几次？如果超过一次，多余的词删掉。"**

```js
Context.buildContext()   // "context" 出现了两次 → Context.build()
Task.getTaskById()       // "task" 出现了两次 → Task.getById()
Task.addTask()           // "task" 出现了两次 → Task.add()
```

文件名、模块名、目录名已经说了"我是谁"。方法名只需要说"做什么"。

## 想用技术术语命名时

问自己：**"这个名字是在说它做什么业务，还是在说它是什么技术角色？"**

如果是技术角色（controller、service、manager、handler、helper、factory、adapter、processor），换成业务主体。文件所在的目录已经说明了它的角色。

```
UserController   → User（放在 commands/ 下）
OrderService     → Order（放在 commands/ 下）
TaskManager      → Task
EventHandler     → Event
```

## 方法命名

动词 + 名词。名词部分只在涉及主体之外的对象时才出现：

```js
Task.add()              // 正确：主体是 Task，动作是 add
Task.getById()          // 正确：动作是 get，限定是 ById
Task.getPending()       // 正确：动作是 get，限定是 Pending
User.rename()           // 正确：动作就是 rename
```

## 变量命名

问自己："这个名字能让人直接知道它是什么吗？"

| 类型 | 示例 |
|------|------|
| 普通值 | `userName`、`totalScore`、`pageSize` |
| 布尔值 | `isReady`、`hasPermission`、`canEdit` |
| 列表 | `tasks`、`edges`、`selectedIds` |
| 映射 | `nodeOffsets`、`categoryMap` |

## 文件命名

问自己："目录已经提供了什么信息？文件名还需要重复吗？"

- `commands/user.js` 而不是 `commands/userCommand.js`
- `tools/format.js` 而不是 `tools/formatHelper.js`
- 优先单个单词：`score`、`student`、`order`

## 缩写规则

约定俗成缩写作为整体保留，不拆不变形。

允许的：`id`、`url`、`api`、`http`、`json`、`sse`、`sql`、`html`、`css`、`xml`、`svg`、`tcp`、`udp`、`ip`、`ui`、`io`

禁止的非标准缩写：`usr`、`cfg`、`svc`、`repo`、`mgr`、`btn`、`msg`、`err`、`cb`、`fn`、`ctx`、`req`、`res`、`env`

### 缩写位置

| 位置 | 规则 | 示例 |
|------|------|------|
| 缩写在开头 | 全部小写 | `apiUser`、`urlList`、`id` |
| 缩写跟在单词后 | 整体大写 | `userID`、`fileURL`、`parseJSON` |
| 类名中 | 整体大写 | `HTTPServer`、`SSEStream` |

## Python 补充

Python 用 snake_case，但思考方式不变——读出调用语句，重复的信息删掉：

```python
# Task.add() 而不是 Task.add_task()
# Task.get_by_id() 而不是 Task.get_task_by_id()
```

缩写在 Python 中全小写：`user_id`、`file_url`、`parse_json`
