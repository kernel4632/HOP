"""
任务指令集：负责任务的增删改查。
数据存储在 store["tasks"] 列表中，每个任务是字典，含 id、title、done 三个字段。
调用示例：Task.add("完成报告")、Task.remove("task_01")、Task.toggle("task_01")、Task.pending()
"""
from store import store                            # 引入全局状态
from utils.generate_id import generate_id          # 引入唯一ID生成器


# --- 添加任务 ---
def add(title):
    if not title or not title.strip():             # 标题为空时拒绝创建
        return None

    id = generate_id()                             # 生成唯一任务ID

    task = {                                       # 构建新任务
        "id": id,                                    # 任务唯一标识
        "title": title.strip(),                      # 任务标题，去除首尾空格
        "done": False,                               # 默认未完成
    }

    store["tasks"].append(task)                    # 将任务加入全局列表
    return id                                      # 返回新任务ID供调用方使用


# --- 删除任务 ---
def remove(id):
    tasks = store["tasks"]                         # 读取任务列表
    target = next((t for t in tasks if t["id"] == id), None)  # 查找目标任务
    if not target:                                 # 任务不存在直接返回
        return
    tasks.remove(target)                           # 从列表中移除该任务


# --- 切换完成状态 ---
def toggle(id):
    task = get(id)                                 # 查找目标任务
    if not task:                                   # 任务不存在直接返回
        return
    task["done"] = not task["done"]                # 反转完成状态


# --- 重命名任务 ---
def rename(id, title):
    if not title or not title.strip():             # 新标题为空时拒绝修改
        return
    task = get(id)                                 # 查找目标任务
    if not task:                                   # 任务不存在直接返回
        return
    task["title"] = title.strip()                  # 更新任务标题


# --- 按ID获取任务 ---
def get(id):
    return next((t for t in store["tasks"] if t["id"] == id), None)  # 返回匹配任务或None


# --- 获取未完成任务 ---
def pending():
    return [t for t in store["tasks"] if not t["done"]]  # 过滤出未完成任务


# --- 获取已完成任务 ---
def done():
    return [t for t in store["tasks"] if t["done"]]  # 过滤出已完成任务


# --- 清空已完成任务 ---
def clear():
    ids = [t["id"] for t in store["tasks"] if t["done"]]  # 提取已完成任务ID列表
    for id in ids:                                 # 逐个删除已完成任务
        remove(id)