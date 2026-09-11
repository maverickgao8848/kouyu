# 口语练习台（Kouyu）

一个面向 Codex / ChatGPT 的英语口语陪练 Skill：先生成场景化预习卡，再进入角色扮演，过程中提供渐进式中文提示和轻量纠错，结束后把学习记录保存到本地复习台。

![口语练习台首页](docs/screenshots/practice.png)

## 能做什么

- 覆盖超市、健身房、咖啡店、餐厅、酒店、机场、理发、面试等真实场景，也支持自定义主题
- 提供 5、10、20、40 分钟四种训练节奏，以及入门、中级、进阶难度
- 提供沉浸式、引导式、学习式三种辅助模式；课程目标不变，只调整中文提示与句型支架出现的时机
- 先预习重点单词、实用词组和完整句型，再开始角色扮演
- 按“中文意图提示 → 英文关键词 → 完整示范”逐级提供帮助
- 只纠正影响理解、重复出现或与本课目标直接相关的问题
- 区分独立使用、提示后使用和模仿使用，不会把“看过”误判成“掌握”
- 将训练结果归档为 JSON 和 Markdown，并提供本地可视化复习台
- 英语材料使用独立的 `english_kouyu` 来源范围，不会混入多语种示例课程

![我的复习台](docs/screenshots/review.png)

## 安装

需要 **Python 3.10+**（仅标准库，无需 pip / Node.js / API Key）、Git，以及能加载本地 Skill 并执行脚本的客户端。网页本身负责配置练习和查看归档；不会直接发起 AI 对话或语音通话。普通聊天页面不能仅通过输入 `$kouyu` 读取本机 Skill 和保存本地记录。

把仓库克隆到 Codex 的 Skills 目录：

```bash
git clone https://github.com/maverickgao8848/kouyu.git ~/.codex/skills/kouyu
```

重新打开 Codex 后即可使用。也可以把本仓库的完整目录复制到你所使用客户端的 Skills 目录中。

Windows PowerShell：

```powershell
git clone https://github.com/maverickgao8848/kouyu.git "$env:USERPROFILE/.codex/skills/kouyu"
```

如已安装，不要重复克隆；在安装目录运行 `git pull --ff-only` 更新。若配置了自定义 Skills 目录，请相应替换路径。

## 开始练习

直接说：

```text
使用 $kouyu 帮我做一次 20 分钟的英语口语训练。
主题：在国外理发
程度：中级
中文辅助：引导
```

Skill 会先生成预习卡。准备好后说 **“I'm ready.”** 开始角色扮演；想结束并查看报告时说 **“Let's wrap up.”**。

## 本地复习台

以下相对路径命令均在仓库根目录（包含 `SKILL.md` 的目录）执行。`serve` 会自动初始化空工作台，可以直接启动：

```bash
python scripts/workbench.py serve --data-dir english-speaking-workbench
```

Windows 安装后可从任意目录启动，并固定使用同一份数据：

```powershell
python "$env:USERPROFILE/.codex/skills/kouyu/scripts/workbench.py" serve --data-dir "$env:USERPROFILE/english-speaking-workbench"
```

默认地址是 **http://127.0.0.1:8765/**。保持终端运行，按 `Ctrl+C` 停止。选择主题、时长和辅助模式，点击复制指令，再粘贴到已加载 Skill 的客户端。归档时使用相同的 `--data-dir`；切换“我的复习台”会重新读取最新记录。

### 归档与数据

初始化数据目录：

```bash
python scripts/workbench.py init --data-dir english-speaking-workbench
```

归档一次训练：

```bash
python scripts/workbench.py archive --input path/to/session.json --data-dir english-speaking-workbench
```

Session 格式见 [数据规范](references/workbench-data.md)。数据只写入你指定的目录，不会上传到远端。备份时复制整个数据目录；同一份数据请避免同时运行多个写入进程。

### 打不开时

- 找不到 `python`：先安装 Python 3.10+；Windows 也可把命令中的 `python` 换成 `py -3`。
- 8765 端口被占用：追加 `--port 8766`，打开终端输出的新地址。
- 浏览器没有自动弹出：手动打开终端输出的地址；也可用 `--no-open` 禁用自动打开。
- 显示“预览模式”：通过 Python 服务的 HTTP 地址访问，直接双击 HTML 不能连接归档。
- 看不到已有记录：确认启动与归档使用同一个数据目录。默认相对路径取决于运行命令时所在的目录。

## 项目结构

```text
.
├── SKILL.md                    # Skill 入口与行为约定
├── agents/openai.yaml          # 名称、简介与默认提示词
├── curriculum/                # 英语课程来源范围与登记信息
├── references/                # 课程设计、会话、报告和数据规范
├── scripts/workbench.py        # 本地归档与网页服务
├── assets/workbench/           # 复习台前端
└── tests/test_workbench.py     # 归档、HTTP 服务和记录保护测试
```

## 测试

```bash
python -m unittest discover -s tests -v
```

## 隐私

口语训练记录默认保存在本地 `english-speaking-workbench` 目录。仓库不包含个人练习数据，提交前也请确认不要把自己的 session JSON 推送到公开仓库。
