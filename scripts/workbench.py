#!/usr/bin/env python3
"""Persist speaking sessions and serve the local review workbench."""

from __future__ import annotations

import argparse
import json
import re
import tempfile
import threading
import webbrowser
from collections import defaultdict
from datetime import datetime
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlparse

VERSION = 1
MAX_BODY = 2 * 1024 * 1024
ALLOWED_STATUS = {"mastered", "developing", "needs_review", "not_observed"}
ALLOWED_SUPPORT = {"independent", "intent_hint", "keyword_hint", "model", "none"}


def empty_state() -> dict:
    return {
        "version": VERSION,
        "preferences": {"level": "intermediate", "hint_mode": "guided"},
        "sessions": [],
    }


def atomic_json(path: Path, payload: dict) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.NamedTemporaryFile("w", encoding="utf-8", dir=path.parent, delete=False, suffix=".tmp") as handle:
        json.dump(payload, handle, ensure_ascii=False, indent=2)
        handle.write("\n")
        temp_path = Path(handle.name)
    temp_path.replace(path)


def load_state(data_dir: Path) -> dict:
    path = data_dir / "workbench-data.json"
    if not path.exists():
        state = empty_state()
        atomic_json(path, state)
        return state
    with path.open(encoding="utf-8-sig") as handle:
        state = json.load(handle)
    validate_state(state)
    return state


def require(value: object, expected: type, label: str) -> None:
    if not isinstance(value, expected):
        raise ValueError(f"{label} must be {expected.__name__}")


def validate_session(session: dict) -> None:
    require(session, dict, "session")
    for key in ("id", "created_at", "topic", "duration_minutes", "level", "hint_mode", "targets"):
        if key not in session:
            raise ValueError(f"missing required field: {key}")
    if not re.fullmatch(r"[A-Za-z0-9._-]+", str(session["id"])):
        raise ValueError("id may contain only letters, digits, dot, underscore, and hyphen")
    require(session["topic"], dict, "topic")
    require(session["topic"].get("id"), str, "topic.id")
    require(session["topic"].get("label"), str, "topic.label")
    if not isinstance(session["duration_minutes"], (int, float)) or not 1 <= session["duration_minutes"] <= 240:
        raise ValueError("duration_minutes must be between 1 and 240")
    require(session["targets"], list, "targets")
    for index, target in enumerate(session["targets"]):
        require(target, dict, f"targets[{index}]")
        require(target.get("expression"), str, f"targets[{index}].expression")
        if target.get("status") not in ALLOWED_STATUS:
            raise ValueError(f"targets[{index}].status is invalid")
        if target.get("support", "none") not in ALLOWED_SUPPORT:
            raise ValueError(f"targets[{index}].support is invalid")
    repairs = session.get("repairs", [])
    require(repairs, list, "repairs")
    for index, repair in enumerate(repairs):
        require(repair, dict, f"repairs[{index}]")
        require(repair.get("learner"), str, f"repairs[{index}].learner")
        require(repair.get("natural"), str, f"repairs[{index}].natural")
        require(repair.get("reason_zh"), str, f"repairs[{index}].reason_zh")
    focus_next = session.get("focus_next", [])
    require(focus_next, list, "focus_next")
    if not all(isinstance(item, str) and item.strip() for item in focus_next):
        raise ValueError("focus_next must contain non-empty strings")
    if "next_drill" in session:
        require(session["next_drill"], str, "next_drill")


def validate_state(state: dict) -> None:
    require(state, dict, "state")
    require(state.get("sessions"), list, "sessions")
    for session in state["sessions"]:
        validate_session(session)


def latest_targets(items: list[dict]) -> list[dict]:
    latest: dict[str, dict] = {}
    for session in items:
        for target in session.get("targets", []):
            expression = target.get("expression", "").strip()
            if expression and expression not in latest:
                latest[expression] = target
    return list(latest.values())


def recent_repairs(items: list[dict], limit: int = 3) -> list[dict]:
    seen: set[tuple[str, str]] = set()
    result: list[dict] = []
    for session in items:
        for repair in session.get("repairs", []):
            key = (repair.get("learner", ""), repair.get("natural", ""))
            if key not in seen:
                seen.add(key)
                result.append(repair)
                if len(result) == limit:
                    return result
    return result


def render_dashboard(state: dict) -> str:
    sessions = sorted(state["sessions"], key=lambda item: item.get("created_at", ""), reverse=True)
    grouped: dict[str, list[dict]] = defaultdict(list)
    for session in sessions:
        grouped[session["topic"]["label"]].append(session)

    lines = ["# 口语复习台", "", f"> 已归档 {len(sessions)} 次练习。", ""]
    if not sessions:
        lines += ["还没有练习记录。完成第一次场景对话后，这里会自动生成复习内容。", ""]
    for topic, items in grouped.items():
        targets = latest_targets(items)
        mastered = sum(target.get("status") == "mastered" for target in targets)
        review = [target.get("expression", "") for target in targets if target.get("status") in {"developing", "needs_review"}]
        repairs = recent_repairs(items)
        latest = items[0]
        lines += [f"## {items[0]['topic'].get('emoji', '💬')} {topic}", ""]
        lines += [f"- 练习次数：{len(items)}", f"- 已掌握表达：{mastered}/{len(targets)}", f"- 最近练习：{items[0].get('created_at', '')}"]
        if review:
            unique = list(dict.fromkeys(filter(None, review)))[:5]
            lines.append(f"- 下次复习：{'、'.join(unique)}")
        focus_next = [item for item in latest.get("focus_next", []) if item][:3]
        if focus_next:
            lines.append(f"- 下次重点：{'、'.join(focus_next)}")
        if latest.get("next_drill"):
            lines.append(f"- 迁移练习：{latest['next_drill']}")
        if repairs:
            lines += ["", "### 重点纠正", ""]
            for repair in repairs:
                lines.append(f"- `{repair['learner']}` → `{repair['natural']}`：{repair['reason_zh']}")
        lines.append("")
    lines += ["---", "", f"更新时间：{datetime.now().astimezone().isoformat(timespec='seconds')}", ""]
    return "\n".join(lines)


def save_state(data_dir: Path, state: dict) -> None:
    validate_state(state)
    state["version"] = VERSION
    atomic_json(data_dir / "workbench-data.json", state)
    (data_dir / "复习台.md").write_text(render_dashboard(state), encoding="utf-8")


def init_workbench(data_dir: Path) -> None:
    data_dir.mkdir(parents=True, exist_ok=True)
    state = load_state(data_dir)
    save_state(data_dir, state)
    print(f"Workbench ready: {data_dir.resolve()}")


def archive_session(data_dir: Path, input_path: Path) -> None:
    with input_path.open(encoding="utf-8-sig") as handle:
        session = json.load(handle)
    validate_session(session)
    state = load_state(data_dir)
    existing = next((item for item in state["sessions"] if item["id"] == session["id"]), None)
    if existing is not None and existing != session:
        raise ValueError(f"session id already exists with different data: {session['id']}")
    if existing is None:
        state["sessions"].append(session)
    sessions_dir = data_dir / "sessions"
    sessions_dir.mkdir(parents=True, exist_ok=True)
    atomic_json(sessions_dir / f"{session['id']}.json", session)
    save_state(data_dir, state)
    print(f"Archived: {session['id']}")


def make_handler(data_dir: Path, static_dir: Path):
    class WorkbenchHandler(SimpleHTTPRequestHandler):
        def __init__(self, *args, **kwargs):
            super().__init__(*args, directory=str(static_dir), **kwargs)

        def send_json(self, payload: dict, status: int = 200) -> None:
            body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
            self.send_response(status)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Content-Length", str(len(body)))
            self.send_header("Cache-Control", "no-store")
            self.end_headers()
            self.wfile.write(body)

        def do_GET(self):
            path = urlparse(self.path).path
            if path == "/api/health":
                self.send_json({"ok": True, "version": VERSION})
                return
            if path == "/api/state":
                try:
                    self.send_json(load_state(data_dir))
                except Exception as error:
                    self.send_json({"error": str(error)}, 500)
                return
            super().do_GET()

        def do_PUT(self):
            if urlparse(self.path).path != "/api/preferences":
                self.send_error(404)
                return
            try:
                length = int(self.headers.get("Content-Length", "0"))
                if length <= 0 or length > MAX_BODY:
                    raise ValueError("invalid request size")
                preferences = json.loads(self.rfile.read(length).decode("utf-8"))
                require(preferences, dict, "preferences")
                # Read current sessions instead of accepting a stale browser snapshot.
                state = load_state(data_dir)
                state["preferences"] = preferences
                save_state(data_dir, state)
                self.send_json({"ok": True})
            except (ValueError, json.JSONDecodeError) as error:
                self.send_json({"error": str(error)}, 400)
            except Exception as error:
                self.send_json({"error": str(error)}, 500)

        def log_message(self, format_string, *args):
            print(f"[{self.log_date_time_string()}] {format_string % args}")

    return WorkbenchHandler


def serve(data_dir: Path, host: str, port: int, open_browser: bool) -> None:
    init_workbench(data_dir)
    static_dir = Path(__file__).resolve().parent.parent / "assets" / "workbench"
    if not (static_dir / "index.html").exists():
        raise FileNotFoundError(f"workbench UI missing: {static_dir}")
    server = ThreadingHTTPServer((host, port), make_handler(data_dir, static_dir))
    actual_port = server.server_address[1]
    url = f"http://{host}:{actual_port}/"
    print(f"Listening on {url}")
    if open_browser:
        threading.Timer(0.35, lambda: webbrowser.open(url)).start()
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description=__doc__)
    subparsers = parser.add_subparsers(dest="command", required=True)
    for command in ("init", "archive"):
        sub = subparsers.add_parser(command)
        sub.add_argument("--data-dir", type=Path, default=Path.home() / "english-speaking-workbench")
        if command == "archive":
            sub.add_argument("--input", type=Path, required=True)
    sub = subparsers.add_parser("serve")
    sub.add_argument("--data-dir", type=Path, default=Path.home() / "english-speaking-workbench")
    sub.add_argument("--host", default="127.0.0.1")
    sub.add_argument("--port", type=int, default=8765)
    sub.add_argument("--no-open", action="store_true")
    return parser


def main() -> None:
    args = build_parser().parse_args()
    if args.command == "init":
        init_workbench(args.data_dir)
    elif args.command == "archive":
        archive_session(args.data_dir, args.input)
    else:
        serve(args.data_dir, args.host, args.port, not args.no_open)


if __name__ == "__main__":
    main()
