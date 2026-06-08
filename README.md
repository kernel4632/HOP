# HOP — Human-Oriented Programming

面向人类编程（HOP）是一套通用的代码规范与工程思想，目标是让任何人——包括刚学编程的初学者——只看局部代码就能理解、学习并接手项目。

## 核心理念

- 代码即文档，注释即教材，命名即说明书
- 不依赖任何背景知识，不需要记住项目架构和历史
- 高密度精华注释，初学者能连续阅读不中断
- 触发事件 → 指令执行 → 数据修改 → 效果反馈
- 模块独立可拔插，数据流显式可追踪

## 安装

### OpenCode / Claude Code

```bash
npx skills add <your-github-username>/HOP -g -y
```

### 手动安装

将本仓库克隆到你的 skills 目录：

```bash
git clone https://github.com/<your-github-username>/HOP.git ~/.config/opencode/skills/hop
```

或者将 `SKILL.md` 及 `examples/`、`references/` 目录复制到项目根目录的 `.opencode/skills/hop/` 下，仅对该项目生效。

## 目录结构

```
HOP/
├── SKILL.md                    # Skill 主入口（规范原则 + 引用子文件）
├── examples/
│   ├── correct.js              # 黄金示例 — 正确写法（JavaScript）
│   ├── wrong.js                # 反面示例 — 错误写法与标注
│   └── correct.py             # 黄金示例 — 正确写法（Python）
├── references/
│   ├── architecture.md         # 架构主线详解
│   ├── comments.md             # 注释准则详解
│   └── naming.md               # 命名准则详解
└── README.md                   # 本文件
```

## 适用范围

- 语言无关：JavaScript、TypeScript、Python、Go、Rust、Java 等任何语言均适用
- 框架无关：Vue、React、FastAPI、Gin 等任何框架均适用
- 阶段无关：架构设计、编码、重构、审查、调试、测试全流程生效

## 协议

MIT License
