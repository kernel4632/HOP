"""
工具扫描器：读取 tools 目录，把每个工具文件登记进来，再按名字执行。
调用示例：
  import tool
  tool.scan("./tools")
  schema = tool.schema()
  result = tool.run("read", {"path": "./a.txt"})
"""
import importlib.util                             # 按路径导入工具文件
from pathlib import Path                           # 拼出工具文件路径

tools = {}                                         # 已登记的工具，键是工具名


# --- 扫描工具目录 ---
def scan(folder):
    for file in Path(folder).glob("*.py"):         # 找出目录里的全部工具文件
        tool = load(file)                          # 导入这个文件里的工具
        tools[tool.name] = tool                    # 按工具名登记，同名覆盖


# --- 导入一个工具文件 ---
def load(file):
    spec = importlib.util.spec_from_file_location(file.stem, file)  # 按路径建导入信息
    module = importlib.util.module_from_spec(spec)                  # 按导入信息建模块
    spec.loader.exec_module(module)                                 # 执行模块拿到内容
    return module                                              # 返回整个模块当工具用


# --- 读取给模型看的工具说明 ---
def schema():
    list = []                                      # 收集每个工具的说明

    for tool in tools.values():                    # 逐个读取已登记的工具
        list.append({                              # 只取模型需要的三样
            "name": tool.name,
            "description": tool.description,
            "parameters": tool.parameters,
        })

    return list                                    # 返回全部工具的说明


# --- 按名字执行工具 ---
def run(name, input):
    tool = tools.get(name)                         # 按名字取出对应工具
    if not tool:                                   # 名字不存在时直接返回提示
        return f"tool not found: {name}"
    return tool.execute(input)                     # 交给工具自己执行
