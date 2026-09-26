"""
工具扫描器：读取 tools 目录，把每个工具文件登记进来，再按名字执行。
每个工具文件都写 name、description、parameters、execute 四样，放进目录就生效。
调用示例：
  import tool
  tool.scan("./tools")
  schema = tool.schema()
  result = tool.run("read", {"path": "./a.txt"})
"""
import importlib.util                             # 按文件路径导入工具文件
from pathlib import Path                           # 列出目录里的文件

tools = {}                                         # 已登记的工具，键是工具名


# --- 扫描工具目录 ---
def scan(folder):
    for file in sorted(Path(folder).glob("*.py")):  # 按名字顺序找出全部工具文件
        spec = importlib.util.spec_from_file_location(file.stem, file)  # 告诉 Python 这个文件在哪
        module = importlib.util.module_from_spec(spec)                  # 准备一个空模块
        spec.loader.exec_module(module)            # 执行文件，把四样东西装进模块
        tools[module.name] = module                # 按工具名登记，同名的后来者覆盖


# --- 读取给模型看的工具说明 ---
def schema():
    return [                                       # 每个工具只取模型需要的三样
        {"name": t.name, "description": t.description, "parameters": t.parameters}
        for t in tools.values()
    ]


# --- 按名字执行工具 ---
def run(name, input):
    if name not in tools:                          # 名字不存在时把提示当结果返回给模型
        return {"output": f"tool not found: {name}"}
    return tools[name].execute(input)              # 交给工具自己执行
