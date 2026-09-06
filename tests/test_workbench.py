import importlib.util
import json
import tempfile
import unittest
from pathlib import Path


MODULE_PATH = Path(__file__).resolve().parents[1] / "scripts" / "workbench.py"
SPEC = importlib.util.spec_from_file_location("workbench", MODULE_PATH)
workbench = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(workbench)


def sample_session():
    return {
        "id": "20260905-143000-grocery-store",
        "created_at": "2026-09-05T14:30:00+08:00",
        "topic": {"id": "grocery-store", "label": "超市买菜", "emoji": "🥕"},
        "duration_minutes": 20,
        "level": "intermediate",
        "hint_mode": "guided",
        "targets": [
            {
                "expression": "I'm looking for...",
                "meaning_zh": "我在找……",
                "status": "mastered",
                "support": "independent",
            },
            {
                "expression": "Is this on sale?",
                "meaning_zh": "这个在打折吗？",
                "status": "needs_review",
                "support": "intent_hint",
            },
        ],
    }


class WorkbenchTests(unittest.TestCase):
    def test_init_and_archive_are_idempotent(self):
        with tempfile.TemporaryDirectory() as temp:
            root = Path(temp)
            source = root / "session.json"
            source.write_text(json.dumps(sample_session(), ensure_ascii=False), encoding="utf-8")

            workbench.init_workbench(root / "data")
            workbench.archive_session(root / "data", source)
            workbench.archive_session(root / "data", source)

            state = workbench.load_state(root / "data")
            self.assertEqual(len(state["sessions"]), 1)
            self.assertTrue((root / "data" / "sessions" / f"{sample_session()['id']}.json").exists())
            dashboard = (root / "data" / "复习台.md").read_text(encoding="utf-8")
            self.assertIn("超市买菜", dashboard)
            self.assertIn("Is this on sale?", dashboard)

    def test_rejects_invalid_mastery_status(self):
        session = sample_session()
        session["targets"][0]["status"] = "perfect"
        with self.assertRaisesRegex(ValueError, "status is invalid"):
            workbench.validate_session(session)

    def test_rejects_unsafe_session_id(self):
        session = sample_session()
        session["id"] = "../escape"
        with self.assertRaisesRegex(ValueError, "id may contain"):
            workbench.validate_session(session)


if __name__ == "__main__":
    unittest.main()
