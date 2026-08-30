# 命名规则

## 核心：极简命名

名字要尽可能短，能用一个词就不用两个词。代码的层级关系已经表达了归属，名字里不要再重复说明。

写 `Context.build()`，不写 `Context.buildContext()`。写 `messages`，不写 `messageList`。写 `views/Chat.vue`，不写 `views/ChatView.vue`。方法属于哪个类，通过 `主体.方法` 的调用方式表达，名字里不带类名。

## 方法命名

方法名只说做什么，一个词说清楚：

```js
Context.build()     // 正确：build 就是构建
Context.buildContext()  // 错误：context 重复了类名

Task.add()          // 正确
Task.addTask()      // 错误：task 重复了类名

tool.handle()       // 正确
tool.handleTool()   // 错误：tool 重复了
```

即使多个类都有 `build` 方法，也都只叫 `build`，通过 `Context.build()` 和 `Agent.build()` 区分，而不是给每个方法起不同的名字。

需要区分不同动作时，动词本身通常已经够用：`add`、`remove`、`rename`、`toggle`、`send`、`stop`。这些词本身就能表达差异，不需要再加名词。

## 变量命名

变量名直接说是什么，不加类型后缀：

```js
messages       // 正确：就是消息
messageList    // 错误：List 是类型后缀，多余

users          // 正确
userArray      // 错误：Array 是类型后缀，多余
```

## 文件命名

文件名优先单个单词，目录已经提供了语义：

```js
views/Chat.vue      // 正确：目录 views 已经说明是页面
views/ChatView.vue  // 错误：View 重复了目录名

commands/user.js        // 正确
commands/userCommand.js // 错误：Command 重复了目录名
```

## 禁止技术术语命名

以下技术角色名词禁止出现在名字里，换成业务主体名：

controller、service、repository、model、manager、handler、processor、dispatcher、factory、adapter、decorator、observer、helper、base、abstract、interface

```js
UserController  →  User    // 放在 commands/ 下
OrderService    →  Order   // 放在 commands/ 下
TaskManager     →  Task
```

## 缩写规则

普通人都知道的缩写作为整体保留，不拆开、不变形：

允许的缩写：`id`、`url`、`api`、`http`、`json`、`sse`、`sql`、`html`、`css`、`xml`、`svg`、`tcp`、`udp`、`ip`、`ui`、`io`

禁止的缩写：`usr`、`cfg`、`svc`、`repo`、`mgr`、`btn`、`msg`、`err`、`cb`、`fn`、`ctx`、`req`、`res`、`env`


## Python 补充

Python 用 snake_case，但极简命名的思想不变：

```python
# Task.add() 而不是 Task.add_task()
# Task.get() 而不是 Task.get_task()
```

当然也尽可能的使用所属关系代替下划线：`user.id`、`file.url`、`parse.json`