# HOP — Human-Oriented Programming

面向人类编程（HOP）是 AI 时代的编程思想。AI 负责写代码，但人类必须能凭直觉掌控代码——看得懂、找得到、改得对、不怕动。

一个产品的业务逻辑往往很简单。HOP 要求代码忠实反映这种简单。

## 核心精神

好的代码给人的感觉像一份菜谱——扫一眼就知道做什么、用什么、几步做完。

- 打开文件第一眼看到的是业务在做什么
- 想改就改，改完不出事
- 加功能放进去就生效，删功能删掉就消失
- 即使项目实际很大，每个局部依然轻盈
- 代码复杂度 = 业务复杂度，不多一分

## 方向

- **业务逻辑是绝对主角** — 其他一切退到背景
- **永远做减法** — 遇到问题让代码变少，不打补丁（KISS / YAGNI / 奥卡姆剃刀）
- **信任数据，直奔业务** — 数据来了就用，有问题让它自然报错
- **直觉即安全** — 人按直觉改代码，结果就是正确的（最小惊讶原则）
- **行为局部性** — 理解一件事只看一个地方
- **模块独立，即插即用** — 零注册，放进去就生效删掉就消失
- **复用克制** — 只用一次就地写，稳定两次再提取
- **语境命名** — 不重复上下文已有的信息

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
├── SKILL.md                    # Skill 主入口（精神 + 方向 + 参考链接）
├── examples/
│   ├── correct.js              # 正确写法示例（JavaScript）
│   ├── wrong.js                # 错误写法对比
│   └── correct.py              # 正确写法示例（Python）
├── references/
│   ├── architecture.md         # 架构组织方式
│   ├── comments.md             # 注释格式与密度
│   ├── naming.md               # 命名具体规则
│   └── principles.md           # 经典原则详解
└── README.md
```

## 适用范围

- 语言无关：JavaScript、Python、Go、Rust、Java 等任何语言
- 框架无关：Vue、React、FastAPI、Gin 等任何框架
- 阶段无关：架构设计、编码、重构、审查、调试全流程生效

## 协议

MIT License
