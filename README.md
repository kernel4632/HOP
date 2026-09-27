# HOP — Human-Oriented Programming

面向人类编程（HOP）是一套从接手者的弱点推导出来的项目规范。人会累、会忘、没耐心、看不懂术语，新开会话的 AI 也一样。HOP 让 AI 写出来的项目，任何人零背景打开都能很快找到要改的地方，放心地改，加东西直接加，删东西直接删。

## 安装

**当前项目**（兼容 OpenCode、Claude Code、Cursor、Cline 等 70+ agent）：

```bash
npx skills add kernel4632/HOP -y --all
```

**全局安装（OpenCode）**：

```bash
npx skills add kernel4632/HOP -g -y --agent opencode
```

**全局安装（Claude Code）**：

```bash
npx skills add kernel4632/HOP -g -y --agent claude-code
```

**手动安装**：

```bash
# OpenCode
git clone https://github.com/kernel4632/HOP.git ~/.config/opencode/skills/hop

# Claude Code
git clone https://github.com/kernel4632/HOP.git ~/.claude/skills/hop
```

或者把 `SKILL.md` 和 `examples/` 复制到项目根目录的 `.opencode/skills/hop/`（或 `.claude/skills/hop/`）下，只对该项目生效。

## 内容

```
SKILL.md          规范本身
examples/
  ledger/         按规范写的完整小项目（记账服务），node server.js 直接运行
  js/ py/ go/     同一个"放进文件夹就生效"的工具系统，三种语言写法
  wrong.js        反面写法，逐处标注违反了哪条
```

## 适用范围

语言无关（JavaScript、Python、Go、Rust、Java 等），框架无关（Vue、React、FastAPI、Gin 等），阶段无关（架构设计、编码、重构、审查、调试全流程生效）。
