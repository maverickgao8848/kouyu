# 口语练习台（Kouyu）

一个面向 Codex / ChatGPT 的英语口语陪练 Skill：先生成场景化预习卡，再进入角色扮演，过程中提供渐进式中文提示和轻量纠错，结束后把学习记录保存到本地复习台。

![口语练习台首页](docs/screenshots/practice.png)

## 能做什么

- 覆盖超市、健身房、咖啡店、餐厅、酒店、机场、理发、面试等真实场景，也支持自定义主题
- 提供 5、10、20、40 分钟四种训练节奏，以及入门、中级、进阶难度
- 先预习重点单词、实用词组和完整句型，再开始角色扮演
- 按“中文意图提示 → 英文关键词 → 完整示范”逐级提供帮助
- 只纠正影响理解、重复出现或与本课目标直接相关的问题
- 区分独立使用、提示后使用和模仿使用，不会把“看过”误判成“掌握”
- 将训练结果归档为 JSON 和 Markdown，并提供本地可视化复习台

![我的复习台](docs/screenshots/review.png)

## 安装

把仓库克隆到 Codex 的 Skills 目录：

```bash
git clone https://github.com/maverickgao8848/kouyu.git ~/.codex/skills/kouyu
```

重新打开 Codex 后即可使用。也可以把本仓库的完整目录复制到你所使用客户端的 Skills 目录中。

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

初始化数据目录：

```bash
python scripts/workbench.py init --data-dir english-speaking-workbench
```

归档一次训练：

```bash
python scripts/workbench.py archive \
  --input path/to/session.json \
  --data-dir english-speaking-workbench
```

启动网页复习台：

```bash
python scripts/workbench.py serve --data-dir english-speaking-workbench
```

浏览器会打开本地页面。数据只写入你指定的目录，不会上传到远端。

## 项目结构

```text
.
├── SKILL.md                    # Skill 入口与行为约定
├── agents/openai.yaml          # 名称、简介与默认提示词
├── references/                # 课程设计、会话、报告和数据规范
├── scripts/workbench.py        # 本地归档与网页服务
├── assets/workbench/           # 复习台前端
└── tests/test_workbench.py     # 数据归档测试
```

## 测试

```bash
python -m unittest discover -s tests -v
```

## 隐私

口语训练记录默认保存在本地 `english-speaking-workbench` 目录。仓库不包含个人练习数据，提交前也请确认不要把自己的 session JSON 推送到公开仓库。
