const $ = selector => document.querySelector(selector);
const escapeHtml = value => String(value ?? "").replace(/[&<>'"]/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[char]));

let state = {version: 1, sessions: []};
let loading = false;

function formatDate(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? String(value || "") : new Intl.DateTimeFormat("zh-CN", {month:"short", day:"numeric", hour:"2-digit", minute:"2-digit"}).format(date);
}

function latestTargets(items) {
  const latest = new Map();
  for (const session of items) {
    for (const target of session.targets || []) {
      const key = target.expression?.trim();
      if (key && !latest.has(key)) latest.set(key, target);
    }
  }
  return [...latest.values()];
}

function recentRepairs(items, limit = 3) {
  const seen = new Set();
  const repairs = [];
  for (const session of items) {
    for (const repair of session.repairs || []) {
      const key = `${repair.learner || ""}\u0000${repair.natural || ""}`;
      if (!seen.has(key) && (repair.learner || repair.natural)) {
        seen.add(key);
        repairs.push(repair);
        if (repairs.length === limit) return repairs;
      }
    }
  }
  return repairs;
}

function firstNonEmpty(items, field) {
  for (const item of items) {
    const value = item[field];
    if (Array.isArray(value) && value.length) return value.filter(Boolean).slice(0, 3);
    if (typeof value === "string" && value.trim()) return value.trim();
  }
  return Array.isArray(items[0]?.[field]) ? [] : "";
}

function targetTag(target) {
  const classes = target.status === "needs_review" ? "review" : target.status === "developing" ? "developing" : "";
  const labels = {mastered: "已掌握", developing: "形成中", needs_review: "待复习", not_observed: "未观察"};
  return `<span class="target-tag ${classes}" title="${escapeHtml(labels[target.status] || target.status)}">${escapeHtml(target.expression)}<small>${escapeHtml(labels[target.status] || "")}</small></span>`;
}

function repairHtml(repairs) {
  if (!repairs.length) return "";
  return `<section class="review-detail"><h3>重点纠正</h3><div class="repair-list">${repairs.map(repair => `
    <div class="repair-item">
      <p><span>原表达</span>${escapeHtml(repair.learner || "本次表达摘要")}</p>
      <p class="natural"><span>更自然</span>${escapeHtml(repair.natural || "")}</p>
      ${repair.reason_zh ? `<small>${escapeHtml(repair.reason_zh)}</small>` : ""}
    </div>`).join("")}</div></section>`;
}

function renderReview() {
  const sessions = [...(state.sessions || [])].sort((a, b) => String(b.created_at).localeCompare(String(a.created_at)));
  const currentTargets = latestTargets(sessions);
  const mastered = currentTargets.filter(target => target.status === "mastered").length;
  const due = currentTargets.filter(target => ["developing", "needs_review"].includes(target.status)).length;
  $("#stat-sessions").textContent = sessions.length;
  $("#stat-mastered").textContent = mastered;
  $("#stat-review").textContent = due;
  $("#session-count").textContent = sessions.length ? `已经开口 ${sessions.length} 次` : "从第 1 次开始";
  $("#empty-review").classList.toggle("hidden", sessions.length > 0);

  const grouped = sessions.reduce((result, session) => {
    const key = session.topic?.id || "other";
    (result[key] ||= []).push(session);
    return result;
  }, {});

  $("#review-list").innerHTML = Object.values(grouped).map(items => {
    const latest = items[0];
    const targets = latestTargets(items);
    const done = targets.filter(target => target.status === "mastered").length;
    const percent = targets.length ? Math.round(done / targets.length * 100) : 0;
    const repairs = recentRepairs(items);
    const focus = firstNonEmpty(items, "focus_next");
    const drill = firstNonEmpty(items, "next_drill");
    const mission = latest.mission_completed === false ? "任务未完成" : latest.mission_completed === true ? "任务已完成" : "已归档";
    return `<article class="review-topic paper-card">
      <div class="review-topic-header"><h2>${escapeHtml(latest.topic?.emoji || "💬")} ${escapeHtml(latest.topic?.label || "口语练习")}</h2><div class="progress" title="掌握 ${percent}%"><i style="width:${percent}%"></i></div></div>
      <p class="review-meta">练过 ${items.length} 次 · ${mission} · 已掌握 ${done}/${targets.length} · 最近 ${escapeHtml(formatDate(latest.created_at))}</p>
      <section class="review-detail"><h3>表达状态</h3><div class="target-tags">${targets.map(targetTag).join("") || "<span class='target-tag developing'>等待表达记录</span>"}</div></section>
      ${repairHtml(repairs)}
      ${focus.length ? `<section class="review-detail"><h3>下次重点</h3><div class="focus-list">${focus.map(item => `<span>${escapeHtml(item)}</span>`).join("")}</div></section>` : ""}
      ${drill ? `<section class="next-drill"><b>迁移练习</b><p>${escapeHtml(drill)}</p></section>` : ""}
    </article>`;
  }).join("");
}

async function loadState() {
  if (loading) return;
  loading = true;
  try {
    const response = await fetch("/api/state", {cache: "no-store"});
    if (!response.ok) throw new Error("not connected");
    state = await response.json();
    renderReview();
    $("#save-status").textContent = `本地存档已同步 · ${new Date().toLocaleTimeString("zh-CN", {hour:"2-digit", minute:"2-digit"})}`;
  } catch {
    $("#save-status").textContent = "暂时无法读取本地存档";
  } finally {
    loading = false;
  }
}

$("#refresh-data").addEventListener("click", loadState);
document.addEventListener("visibilitychange", () => { if (!document.hidden) loadState(); });
loadState();
setInterval(loadState, 8000);
