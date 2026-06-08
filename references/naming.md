# 命名准则

## 核心原则

用项目中真实存在的业务对象命名，让名字本身就能告诉读者"这是什么东西"。

## 禁止的技术术语

以下命名禁止出现在文件名、类名、函数名中：

- controller、service、repository、model
- manager、handler、processor、dispatcher
- factory、adapter、decorator、observer
- helper、base、abstract、interface（作为命名前后缀时）

替代方式：直接用业务主体。`UserController` → `User`（放在 commands/ 下），`OrderService` → `Order`（放在 commands/ 下）。

## 驼峰与缩写规则

普通单词按驼峰连接。约定俗成缩写作为不可拆开的整体保留。

### 允许的固定缩写

`id`、`url`、`api`、`http`、`json`、`sse`、`sql`、`html`、`css`、`xml`、`svg`、`tcp`、`udp`、`ip`、`ui`、`io`

### 禁止的非标准缩写

`usr`、`cfg`、`svc`、`repo`、`mgr`、`btn`、`msg`、`err`、`cb`、`fn`、`ctx`、`req`、`res`、`env`

### 缩写位置规则

| 位置 | 规则 | 示例 |
|------|------|------|
| 缩写在开头或单独出现 | 全部小写 | `apiUser`、`urlList`、`id` |
| 缩写跟在普通单词后面 | 整体大写 | `userID`、`fileURL`、`parseJSON` |
| 类名/构造函数中 | 整体大写 | `HTTPServer`、`JSONData`、`SSEStream` |

### 禁止的错误形式

| 错误 | 正确 |
|------|------|
| `userId` | `userID` |
| `fileUrl` | `fileURL` |
| `parseJson` | `parseJSON` |
| `HttpServer` | `HTTPServer` |
| `SseStream` | `SSEStream` |
| `getUserId` | `getUserID` |
| `userApi` | `userAPI` |

## 方法命名

动词 + 名词结构：

| 动作 | 示例 |
|------|------|
| 创建 | `addStudent`、`createOrder` |
| 读取 | `getScore`、`getById`、`getPending` |
| 修改 | `rename`、`updateParam`、`toggle` |
| 删除 | `remove`、`clearDone` |
| 检查 | `checkConnection`、`canUndo` |

## 变量命名

直接说是什么：

| 类型 | 示例 |
|------|------|
| 普通值 | `userName`、`totalScore`、`pageSize` |
| 布尔值 | `isReady`、`hasPermission`、`canEdit`、`shouldRetry` |
| 列表/数组 | `tasks`、`edges`、`selectedIds` |
| 映射/字典 | `nodeOffsets`、`categoryMap`、`messageHandlerMap` |

## 文件命名

- 优先使用单个单词：`score`、`student`、`order`
- 依靠文件结构上下文提供语义：`commands/user.js` 而不是 `commands/userCommand.js`
- 只有当文件结构上下文无法提供足够信息时，才使用两个或多个单词组合
- 文件名采用代码式命名时遵循同样的缩写规则：`userAPI.js`、`httpServer.py`

## 导出命名

指令文件导出的对象直接使用主体名，不加后缀：

| 错误 | 正确 |
|------|------|
| `BrowserCommand` | `Browser` |
| `NodeService` | `Node` |
| `TaskManager` | `Task` |
| `EdgeHelper` | `Edge` |

调用时形如 `Node.add()`、`Edge.remove()`、`Task.toggle()`，文件路径 `commands/` 已经说明这是指令，无需在名字上重复。

## Python 命名补充

Python 遵循 PEP 8 的 snake_case 约定，但 HOP 的命名思想不变：

- 函数名：`add_student`、`get_score`、`get_by_id`
- 变量名：`user_name`、`total_score`
- 布尔值：`is_ready`、`has_permission`
- 文件名：`task.py`、`edge.py`（放在 `commands/` 下）
- 缩写在 Python 中保持全小写：`user_id`、`file_url`、`parse_json`
