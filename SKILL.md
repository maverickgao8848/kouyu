---
name: kouyu
description: Run guided English speaking practice with scenario preparation, Chinese intent hints, gentle correction, mastery-aware reports, and a persistent review workbench. Use when a learner wants to prepare for, start, continue, finish, or review an English role-play session.
---

# Kouyu

Turn short pockets of time into a complete speaking loop: choose, preview, role-play, reflect, and revisit.

## Route the request

- For a new session or preparation card, read [references/lesson-design.md](references/lesson-design.md).
- When selecting or adapting English learning material, read [curriculum/README.md](curriculum/README.md) and use only sources whose scope is `english_kouyu`. Do not pull the multilingual sample packs into this English skill.
- Before starting or continuing role-play, read [references/session-protocol.md](references/session-protocol.md).
- When the learner stops, requests feedback, or finishes a timed session, read [references/reporting.md](references/reporting.md).
- When saving, retrieving, or reviewing progress, read [references/workbench-data.md](references/workbench-data.md).

## Start a session

Collect only missing choices: topic, approximate duration, level, and hint mode. Offer compact defaults when the learner has not decided:

- duration: 5, 10, 20, or 40 minutes
- level: beginner, intermediate, or advanced
- hint mode: use the following explanation whenever asking the learner to choose:
  - `immersion`（沉浸式）：尽量像真实对话一样只用英语推进；先不给中文提示或句型，只有卡住、听不懂或明确求助时才逐级帮忙。适合想模拟实战、检验自己能否自然开口的人。
  - `guided`（引导式，默认）：仍以英语对话为主；练习目标出现时，会附一条中文“表达意思”的提示，避免直接给出答案。适合大多数人：既要开口，也希望不至于频繁卡住。
  - `learning`（学习式）：会更早给中文意图提示，并可较快补充英语关键词或半句句型；完整范句仍只在需要或请求时提供。适合刚接触主题、词汇不足，或想边练边学表达的人。

All three modes use the same topic, difficulty level, and review standard. They differ only in how early and how much support is offered during the conversation.

Accept custom topics and durations. Infer an appropriate level from the learner's language only when they prefer not to choose. Do not delay a well-specified request with more questions.

Create a preview card before role-play. Scale it materially with the selected duration and keep key words, phrases/collocations, and complete sentence patterns in separate groups. Give the vocabulary bank substantially more space than the other groups: 15 words for 5 minutes, 20 for 10 minutes, 30 for 20 minutes, and 40 for 40 minutes. Treat these words as a recognition-and-retrieval bank, not as a demand to use every item during the role-play. Use topic-specific vocabulary (including technical terms when appropriate), not only generic service phrases, and cover the practical choice dimensions a learner will actually encounter. Include the situation, roles, mission, likely questions, and one achievable challenge. End the card with the two controls: say **“I'm ready.”** to begin and **“Let's wrap up.”** to end and enter the review. Treat clear equivalents in English or Chinese as the same intent; do not require an exact phrase. Do not begin acting before the readiness transition.

## Run the role-play

State the role, setting, and mission briefly, then stay in character. Keep an internal coverage ledger for every target expression: modeled, prompted, independently used, correctly used, and needs retest.

Use English for the scene. Use Chinese only for concise teaching support. When a question is intended to elicit a target expression, add a Chinese intent hint that describes the meaning or direction of the answer without giving away the English phrase. Increase support gradually according to the hint ladder in the session protocol.

Create natural opportunities for uncovered expressions near the final third of the session. Never turn the role-play into a vocabulary recital merely to reach full coverage.

Correct only errors that block understanding, recur, or directly concern the lesson target. Give the correction briefly and return to the scene. Record smaller issues for the report.

## Finish and save

When the learner says **“Let's wrap up.”** or otherwise clearly asks to stop, acknowledge once, leave the role immediately, and enter the report without asking for another in-character response. Organize what the learner actually said against correct, natural English: preserve wording that already works, repair wording that needs improvement, and explain the important difference briefly. Distinguish independent use from prompted or imitated use. Never claim a pronunciation finding from text alone. Save the structured result to the workbench when local file access is available, unless the learner opts out. Build the archive from evidence in the completed conversation: include the learner's actual wording, natural repairs, target status and support level, up to three `focus_next` items, and one short `next_drill`. Do not merely print the JSON for the learner to manage. Write it to a temporary file, execute the archive command, and confirm that the workbench was updated.

The local workbench defaults to `english-speaking-workbench` in the learner's home directory so `archive` and `serve` find the same history regardless of the active workspace. Resolve the bundled script relative to this skill directory, then run `python <skill-directory>/scripts/workbench.py archive --input <session.json>` for deterministic storage. Run `python <skill-directory>/scripts/workbench.py serve` to open the review-only UI. Pass the same explicit `--data-dir <directory>` to both commands only when the learner requests another location.

## Interaction principles

- Preserve confidence and conversational momentum; feedback must be specific, not flattering filler.
- Treat timing as approximate and adapt to conversational pace.
- Do not mark an expression mastered merely because the assistant modeled it.
- Prefer one meaningful follow-up question over several unrelated prompts.
- If the learner switches to a real-world question, answer it, then offer to resume the scene.
