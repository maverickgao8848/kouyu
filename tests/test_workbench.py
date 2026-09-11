from __future__ import annotations

import importlib.util
import json
import tempfile
import unittest
from pathlib import Path


SCRIPT_PATH = Path(__file__).resolve().parents[1] / "scripts" / "workbench.py"
SPEC = importlib.util.spec_from_file_location("kouyu_workbench", SCRIPT_PATH)
assert SPEC and SPEC.loader
workbench = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(workbench)


def sample_session() -> dict:
    return {
        "id": "20260911-120000-grocery-store",
        "created_at": "2026-09-11T12:00:00+08:00",
        "topic": {"id": "grocery-store", "label": "超市买菜", "emoji": "🥕"},
        "duration_minutes": 10,
        "level": "intermediate",
        "hint_mode": "guided",
        "targets": [
            {
                "expression": "I'm looking for...",
                "meaning_zh": "我在找……",
                "status": "mastered",
                "support": "independent",
                "evidence": "I'm looking for fresh basil.",
            }
        ],
        "pronunciation": {"status": "not_observed", "notes": []},
    }


class WorkbenchTests(unittest.TestCase):
    def test_archive_is_self_contained(self):
        with tempfile.TemporaryDirectory() as temporary:
            root = Path(temporary)
            input_path = root / "session.json"
            input_path.write_text(json.dumps(sample_session(), ensure_ascii=False), encoding="utf-8")
            data_dir = root / "workbench"

            workbench.archive_session(data_dir, input_path)

            state = json.loads((data_dir / "workbench-data.json").read_text(encoding="utf-8"))
            self.assertEqual(len(state["sessions"]), 1)
            self.assertTrue((data_dir / "sessions" / "20260911-120000-grocery-store.json").is_file())
            self.assertIn("超市买菜", (data_dir / "复习台.md").read_text(encoding="utf-8"))

    def test_browser_assets_are_bundled(self):
        static_dir = Path(__file__).resolve().parents[1] / "assets" / "workbench"
        self.assertTrue((static_dir / "index.html").is_file())
        self.assertTrue((static_dir / "app.js").is_file())
        self.assertTrue((static_dir / "styles.css").is_file())


if __name__ == "__main__":
    unittest.main()
