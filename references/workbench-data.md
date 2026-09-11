# Workbench data

The workbench is a local, user-owned archive. Default to `english-speaking-workbench` in the learner's home directory; accept another location when requested, but use the same explicit directory for both archive and serve operations.

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
python <skill-directory>/scripts/workbench.py init
python <skill-directory>/scripts/workbench.py archive --input <session-json>
python <skill-directory>/scripts/workbench.py serve
```

To store the workbench elsewhere, pass the same explicit `--data-dir <workbench>` to every command.

The archive command validates required fields, writes an individual session file, updates `workbench-data.json` atomically, and regenerates `复习台.md`. Never overwrite an existing session with a different payload; generate a new id instead.

The UI is a review-only dashboard. Topic, duration, level, and hint mode are chosen in the conversation, not configured again in the browser. While open, the dashboard periodically reloads `workbench-data.json` so a newly archived session appears without restarting the server. It summarizes current target status, natural repairs, next-focus items, and the transfer drill; it never edits the source session history.
