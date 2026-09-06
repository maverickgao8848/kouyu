# Workbench data

The workbench is a local, user-owned archive. Default to `english-speaking-workbench` under the active workspace; accept another location when requested.

## Session JSON

Archive one object with this shape:

```json
{
  "id": "20260905-143000-grocery-store",
  "created_at": "2026-09-05T14:30:00+08:00",
  "topic": {"id": "grocery-store", "label": "超市买菜", "emoji": "🥕"},
  "duration_minutes": 20,
  "level": "intermediate",
  "hint_mode": "guided",
  "roles": {"learner": "customer", "coach": "store clerk"},
  "mission": "Find dinner ingredients and check out.",
  "mission_completed": true,
  "targets": [
    {
      "expression": "I'm looking for...",
      "meaning_zh": "我在找……",
      "status": "mastered",
      "support": "independent",
      "evidence": "I'm looking for fresh basil."
    }
  ],
  "repairs": [
    {
      "learner": "Where is the place of vegetables?",
      "natural": "Where can I find the vegetables?",
      "reason_zh": "英语里询问商品位置通常使用 where can I find。"
    }
  ],
  "scores": {"task_completion": 4, "clarity": 4, "range": 3, "interaction": 4},
  "focus_next": ["short-term membership"],
  "next_drill": "Ask for a one-week gym pass without using a model sentence.",
  "pronunciation": {"status": "not_observed", "notes": []}
}
```

Allowed target statuses are `mastered`, `developing`, `needs_review`, and `not_observed`. Allowed support values are `independent`, `intent_hint`, `keyword_hint`, `model`, and `none`.

## Storage behavior

Resolve the bundled script relative to the skill directory, not the learner's active workspace. Use:

```text
python <skill-directory>/scripts/workbench.py init --data-dir <workbench>
python <skill-directory>/scripts/workbench.py archive --input <session-json> --data-dir <workbench>
python <skill-directory>/scripts/workbench.py serve --data-dir <workbench>
```

The archive command validates required fields, writes an individual session file, updates `workbench-data.json` atomically, and regenerates `复习台.md`. Never overwrite an existing session with a different payload; generate a new id instead.

The UI reads the same `workbench-data.json` through the local server. The learner uses the dashboard to configure a new session and, with one click, copy the resulting Skill prompt. Do not render a separate local preparation card: the copied prompt asks the Skill to generate the canonical preparation card in ChatGPT before role-play. The UI does not claim to initiate a voice call by itself.
