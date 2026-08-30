# HOP — Human-Oriented Programming

面向人类编程（HOP）是 AI 时代的编程思想。AI 负责写代码，但人类必须能凭直觉掌控代码——看得懂、找得到、改得对、不怕动。

一个产品的业务逻辑往往很简单。HOP 要求代码忠实反映这种简单。

## 为什么需要 HOP

AI 写代码有一些根深蒂固的问题：

> 出问题了只会打补丁，这会导致代码到后期越来越多，但是实际上服务于业务的代码其实很少。AI 很容易把一个小项目做成一个看起来很大的项目。

> AI 很喜欢做加法，但是实际上，我们遇到问题应该尽可能的做减法，遇到问题不加代码修补，而是消除问题发生的条件。让代码变少，或者重新组织新的写法，而不是加代码。

> 一个很简单的项目，全程交给 AI 写完代码后，我再去审查代码或者看看逻辑的时候，总是找不到真正的主业务逻辑在哪，都是各种的"定义""检查"，还有各种脏代码、非业务的小辅助函数，还有大量的文件，大量的分离。

> 一个很小的项目被做成看起来非常大的项目，实际上真正业务代码却很少，我接手过来，我想要改个逻辑都需要找半天代码，还有理解半天确保代码改了不会影响其他部分。

> 很多代码都是在定义类型，定义数据格式，定义一大堆东西，一直想要规范外部传入的东西，生怕传入的有问题，典型的不信任任何传入的信息。但是这会导致很多代码。

> AI 写代码容易把脏代码和业务逻辑代码混在一起，经常变动的代码和不经常变动的代码混在一起，还有经常写一堆辅助函数工具小函数，让一个文件里的方法数量变得非常多，导致大量的心智消耗。

> AI 对我们的目标理解有很大偏差，我让 AI 根据人类直觉来改，但是实际上往往 AI 改完的架构都是反直觉的，有一种大厂思维的感觉，一切都是为了防御和犯错误而写，这就变得非常不灵活，非常沉重，也就是项目变成了大项目。

HOP 要扭转这些问题。

## 核心精神

代码给人的感觉像小项目，即使项目实际很大，每个局部依然轻盈。打开文件看到的就是业务在做什么，改功能只需要改一个地方，读代码像读流程一样顺畅。

## 七条规范

- **业务逻辑优先** — 文件里只看到业务步骤，看不到检查、转换、兜底
- **解决根本** — 让问题不发生，而不是写代码处理问题
- **信任数据** — 内部代码直接使用数据，只在系统边界检查一次
- **逻辑集中** — 理解一个功能只需要看一个地方
- **极简命名** — 能用一个词就不用两个词，归属靠层级表达
- **修改安全** — 改一处只影响一处，删一处只删一处
- **单一来源** — 约定好格式，系统自动发现和使用，改动只需一次

## 安装

安装到当前项目，兼容所有 AI 编程工具（OpenCode、Claude Code、Cursor、Cline、Codex、Amp、Windsurf 等 70+ agent）：

```bash
npx skills add kernel4632/HOP -y --all
```

仅安装到全局（OpenCode）：

```bash
npx skills add kernel4632/HOP -g -y --agent opencode
```

仅安装到全局（Claude Code）：

```bash
npx skills add kernel4632/HOP -g -y --agent claude-code
```

### 手动安装

将本仓库克隆到你的 skills 目录：

```bash
# OpenCode
git clone https://github.com/kernel4632/HOP.git ~/.config/opencode/skills/hop

# Claude Code
git clone https://github.com/kernel4632/HOP.git ~/.claude/skills/hop
```

或者将 `SKILL.md` 及 `examples/`、`references/` 目录复制到项目根目录的 `.opencode/skills/hop/`（或 `.claude/skills/hop/`）下，仅对该项目生效。

## 目录结构

```
HOP/
├── SKILL.md                    # Skill 主入口（七条规范）
├── examples/
│   ├── correct.js              # 正确写法示例（JavaScript）
│   ├── wrong.js                # 错误写法对比
│   └── correct.py              # 正确写法示例（Python）
├── references/
│   ├── architecture.md         # 架构组织
│   ├── comments.md             # 注释格式
│   └── naming.md               # 命名规则
└── README.md
```

## 适用范围

- 语言无关：JavaScript、Python、Go、Rust、Java 等任何语言
- 框架无关：Vue、React、FastAPI、Gin 等任何框架
- 阶段无关：架构设计、编码、重构、审查、调试全流程生效

## 协议

MIT License
