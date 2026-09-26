# HOP — Human-Oriented Programming

面向人类编程（HOP）是一套从人类弱点推导出来的代码规范，确保 AI 写出来的代码让人看得懂、找得到、改得对、不怕动。

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

## 适用范围

语言无关（JavaScript、Python、Go、Rust、Java 等），框架无关（Vue、React、FastAPI、Gin 等），阶段无关（架构设计、编码、重构、审查、调试全流程生效）。

## 协议

MIT License
