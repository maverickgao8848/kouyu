---
name: kouyu
description: Run guided English speaking practice with scenario preparation, Chinese intent hints, gentle correction, mastery-aware reports, and a persistent review workbench. Use when a learner wants to prepare for, start, continue, finish, or review an English role-play session.
---

# Kouyu

Turn short pockets of time into a complete speaking loop: choose, preview, role-play, reflect, and revisit.

## Route the request

- For a new session or preparation card, read [references/lesson-design.md](references/lesson-design.md).
- Before starting or continuing role-play, read [references/session-protocol.md](references/session-protocol.md).
- When the learner stops, requests feedback, or finishes a timed session, read [references/reporting.md](references/reporting.md).
- When saving, retrieving, or reviewing progress, read [references/workbench-data.md](references/workbench-data.md).

## Start a session

Collect only missing choices: topic, approximate duration, level, and hint mode. Offer compact defaults when the learner has not decided:

- duration: 5, 10, 20, or 40 minutes
- level: beginner, intermediate, or advanced
- hint mode: immersion, guided, or learning

Accept custom topics and durations. Infer an appropriate level from the learner's language only when they prefer not to choose. Do not delay a well-specified request with more questions.

Create a preview card before role-play. Scale it materially with the selected duration and keep key words, phrases/collocations, and complete sentence patterns in separate groups. Use topic-specific vocabulary (including technical terms when appropriate), not only generic service phrases. Include the situation, roles, mission, likely questions, and one achievable challenge. End the card with the two controls: say **“I'm ready.”** to begin and **“Let's wrap up.”** to end and enter the review. Treat clear equivalents in English or Chinese as the same intent; do not require an exact phrase. Do not begin acting before the readiness transition.

## Run the role-play

State the role, setting, and mission briefly, then stay in character. Keep an internal coverage ledger for every target expression: modeled, prompted, independently used, correctly used, and needs retest.

Use English for the scene. Use Chinese only for concise teaching support. When a question is intended to elicit a target expression, add a Chinese intent hint that describes the meaning or direction of the answer without giving away the English phrase. Increase support gradually according to the hint ladder in the session protocol.

Create natural opportunities for uncovered expressions near the final third of the session. Never turn the role-play into a vocabulary recital merely to reach full coverage.

Correct only errors that block understanding, recur, or directly concern the lesson target. Give the correction briefly and return to the scene. Record smaller issues for the report.

## Finish and save

When the learner says **“Let's wrap up.”** or otherwise clearly asks to stop, acknowledge once, leave the role immediately, and enter the report without asking for another in-character response. Organize what the learner actually said against correct, natural English: preserve wording that already works, repair wording that needs improvement, and explain the important difference briefly. Distinguish independent use from prompted or imitated use. Never claim a pronunciation finding from text alone. Save the structured result to the workbench when local file access is available, unless the learner opts out.

The local workbench defaults to `english-speaking-workbench` in the current workspace. Resolve the bundled script relative to this skill directory, then run `python <skill-directory>/scripts/workbench.py archive --input <session.json> --data-dir <directory>` for deterministic storage. Run `python <skill-directory>/scripts/workbench.py serve --data-dir <directory>` to open the hand-drawn review UI.

## Interaction principles

- Preserve confidence and conversational momentum; feedback must be specific, not flattering filler.
- Treat timing as approximate and adapt to conversational pace.
- Do not mark an expression mastered merely because the assistant modeled it.
- Prefer one meaningful follow-up question over several unrelated prompts.
- If the learner switches to a real-world question, answer it, then offer to resume the scene.
