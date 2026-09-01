"""
任务指令集：负责任务的增删改查。
tasks 是外部传入的任务列表，每个任务是字典，含 id、title、done 三个字段。
调用示例：
  tasks = []
  Task.add(tasks, "完成报告")
  Task.remove(tasks, "task_01")
  Task.pending(tasks)
"""


# --- 添加任务 ---
def add(tasks, title):
    if not title or not title.strip():             # 标题为空时拒绝创建（边界校验）
        return None

    id = f"task_{len(tasks) + 1}"                 # 用序号生成唯一任务ID

    task = {                                       # 构建新任务字典
        "id": id,                                    # 任务唯一标识
        "title": title.strip(),                      # 去除首尾空格后的标题
        "done": False,                               # 默认未完成
    }

    tasks.append(task)                             # 写入任务列表
    return id                                      # 返回新任务ID供调用方使用


# --- 删除任务 ---
def remove(tasks, id):
    target = next((t for t in tasks if t["id"] == id), None)  # 找到目标任务
    if not target:                                 # 任务不存在，直接返回
        return
    tasks.remove(target)                           # 从列表中移除该任务


# --- 切换完成状态 ---
def toggle(tasks, id):
    task = get(tasks, id)                          # 查找目标任务
    if not task:                                   # 任务不存在，直接返回
        return
    task["done"] = not task["done"]                # 反转完成状态


# --- 重命名任务 ---
def rename(tasks, id, title):
    if not title or not title.strip():             # 新标题为空时拒绝修改（边界校验）
        return
    task = get(tasks, id)                          # 查找目标任务
    if not task:                                   # 任务不存在，直接返回
        return
    task["title"] = title.strip()                  # 更新任务标题


# --- 按ID获取任务 ---
def get(tasks, id):
    return next(                                   # 返回匹配任务，找不到为 None
        (t for t in tasks if t["id"] == id), None
    )


# --- 获取未完成任务列表 ---
def pending(tasks):
    return [t for t in tasks if not t["done"]]     # 过滤出所有未完成的任务


# --- 获取已完成任务列表 ---
def done(tasks):
    return [t for t in tasks if t["done"]]         # 过滤出所有已完成的任务


# --- 清空已完成任务 ---
def clear(tasks):
    ids = [t["id"] for t in tasks if t["done"]]    # 提取已完成任务的ID列表
    for id in ids:                                 # 逐个调用 remove，保持单一职责
        remove(tasks, id)
