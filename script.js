/* LC Performance Coach — v1
   - Student-only, localStorage persistence
   - Tiles + progress bars + stars
   - Subject section weighting (configurable)
   - Chart per subject
   - Uses existing Cloudflare Worker via window.classifyAnswer({task,answer,lang})
*/

const LS_KEY = "LC_COACH_V1";
let state = loadState();

let currentSubjectKey = null;
let chart = null;

const SUBJECTS = {
  maths: {
    name: "OL Maths",
    level: "O",
    // Simple spec-style split for modelling (editable later)
    sections: [
      { key: "paper1", label: "Paper 1", weight: 50 },
      { key: "paper2", label: "Paper 2", weight: 50 }
    ]
  },
  biology: {
    name: "Biology",
    level: "H",
    sections: [
      { key: "short", label: "Short Questions", weight: 30 },
      { key: "long", label: "Long Questions", weight: 50 },
      { key: "practical", label: "Practical / Experiments", weight: 20 }
    ]
  },
  pe: {
    name: "PE",
    level: "H",
    sections: [
      { key: "written", label: "Written Paper", weight: 70 },
      { key: "project", label: "Project", weight: 30 }
    ]
  },
  homeec: {
    name: "Home Ec",
    level: "H",
    sections: [
      { key: "short", label: "Short Questions", weight: 40 },
      { key: "long", label: "Long Questions", weight: 60 }
    ]
  },
  english: {
    name: "HL English",
    level: "H",
    sections: [
      { key: "paper1", label: "Paper 1", weight: 50 },
      { key: "paper2", label: "Paper 2", weight: 50 }
    ]
  }
};

boot();

function boot(){
  // wire UI
  byId("btnEnter").addEventListener("click", onEnter);
  byId("btnClose").addEventListener("click", closeModal);
  byId("btnAdd").addEventListener("click", addResult);
  byId("btnCoach").addEventListener("click", runCoach);
  byId("btnReset").addEventListener("click", resetLocal);

  // date default
  const today = new Date();
  byId("date").value = today.toISOString().slice(0,10);

  if(state.profile?.name){
    showDashboard();
  } else {
    showLogin();
  }
}

function onEnter(){
  const name = byId("name").value.trim();
  const target = byId("target").value.trim();
  if(!name) return;

  state.profile = { name, target };
  saveState();

  showDashboard();
}

function showLogin(){
  byId("login").classList.remove("hidden");
  byId("dash").classList.add("hidden");
  byId("who").classList.add("hidden");
}

function showDashboard(){
  byId("login").classList.add("hidden");
  byId("dash").classList.remove("hidden");
  byId("who").classList.remove("hidden");
  byId("whoName").textContent = state.profile.name;

  renderTiles();
  renderOverallStats();
}

function renderTiles(){
  const tiles = byId("tiles");
  tiles.innerHTML = "";

  Object.keys(SUBJECTS).forEach(key=>{
    const subj = SUBJECTS[key];
    const results = state.results[key] || [];
    const avg = results.length ? Math.round(avgOf(results.map(r=>r.score))) : null;

    const stars = calcStars(results);
    const starsStr = "★".repeat(stars) + "☆".repeat(5-stars);

    const label = avg===null ? "—" : `${avg}%`;
    const fill = avg===null ? 0 : clamp(avg,0,100);

    const last = results.length ? results[results.length-1] : null;
    const lastMeta = last ? `${last.type} • ${last.date}` : "No results yet";

    const div = document.createElement("div");
    div.className = "tile";
    div.innerHTML = `
      <div class="tileTop">
        <div>
          <div class="tileName">${subj.name}</div>
          <div class="tileMeta">${lastMeta}</div>
        </div>
        <div style="text-align:right">
          <div style="font-weight:900;font-size:22px">${label}</div>
          <div class="tileMeta">${subj.level} level</div>
        </div>
      </div>
      <div class="bar"><div class="fill" style="width:${fill}%"></div></div>
      <div class="stars" title="Milestones">${starsStr}</div>
    `;
    div.addEventListener("click", ()=>openModal(key));
    tiles.appendChild(div);
  });
}

function renderOverallStats(){
  const all = Object.keys(SUBJECTS)
    .map(k => state.results[k] || [])
    .filter(arr => arr.length)
    .map(arr => Math.round(avgOf(arr.map(r=>r.score))));

  if(!all.length){
    byId("overallAvg").textContent = "—";
    byId("overallBand").textContent = "—";
    byId("marksRecovered").textContent = "0";
    return;
  }

  const overall = Math.round(avgOf(all));
  byId("overallAvg").textContent = `${overall}%`;
  byId("overallBand").textContent = gradeBand(overall, "H");

  // marks recovered = sum of (current avg - first score) per subject where any
  let recovered = 0;
  Object.keys(SUBJECTS).forEach(k=>{
    const arr = state.results[k] || [];
    if(arr.length){
      const first = arr[0].score;
      const current = Math.round(avgOf(arr.map(r=>r.score)));
      recovered += (current - first);
    }
  });
  byId("marksRecovered").textContent = String(recovered);
}

function openModal(subjectKey){
  currentSubjectKey = subjectKey;
  const subj = SUBJECTS[subjectKey];

  byId("subTitle").textContent = subj.name;
  byId("subHint").textContent = `Enter results and get short coaching + drills.`;

  // clear inputs
  byId("overall").value = "";
  byId("examType").value = "Christmas";
  byId("weightedPreview").textContent = "";

  // render section inputs
  renderSectionInputs(subjectKey);

  // render chart + history
  renderChart(subjectKey);
  renderHistoryLine(subjectKey);

  // clear coach
  byId("coachBox").innerHTML = `<div class="muted">Add at least two results for best guidance.</div>`;
  byId("drills").innerHTML = `<li class="muted">Drills appear after AI coaching.</li>`;

  byId("modal").classList.remove("hidden");
}

function closeModal(){
  byId("modal").classList.add("hidden");
  currentSubjectKey = null;
}

function renderSectionInputs(subjectKey){
  const subj = SUBJECTS[subjectKey];
  const box = byId("sections");
  box.innerHTML = "";

  subj.sections.forEach(s=>{
    const item = document.createElement("div");
    item.className = "sectionItem";
    item.innerHTML = `
      <div style="display:flex;justify-content:space-between;gap:10px;align-items:center">
        <div>
          <div style="font-weight:800">${s.label}</div>
          <div class="w">${s.weight}% weight</div>
        </div>
        <div style="width:120px">
          <input data-sec="${s.key}" type="number" min="0" max="100" placeholder="%" />
        </div>
      </div>
    `;
    box.appendChild(item);
  });

  // live weighted preview
  box.querySelectorAll("input").forEach(inp=>{
    inp.addEventListener("input", ()=>{
      const weighted = computeWeightedFromUI(subjectKey);
      if(weighted !== null){
        byId("weightedPreview").textContent = `Weighted score (from sections): ${weighted}%`;
      } else {
        byId("weightedPreview").textContent = "";
      }
    });
  });
}

function computeWeightedFromUI(subjectKey){
  const subj = SUBJECTS[subjectKey];
  const inputs = [...byId("sections").querySelectorAll("input[data-sec]")];
  let gotAny = false;
  let sum = 0;
  let wsum = 0;

  subj.sections.forEach(sec=>{
    const inp = inputs.find(i => i.dataset.sec === sec.key);
    const v = inp ? parseNum(inp.value) : null;
    if(v !== null){
      gotAny = true;
      sum += v * sec.weight;
      wsum += sec.weight;
    }
  });

  // require at least one section, and weights present
  if(!gotAny || wsum === 0) return null;

  // If they filled only some sections, scale by provided weights (so partial entry still works)
  return Math.round(sum / wsum);
}

function addResult(){
  if(!currentSubjectKey) return;

  const type = byId("examType").value;
  const date = byId("date").value || new Date().toISOString().slice(0,10);
  const overall = parseNum(byId("overall").value);

  const weighted = computeWeightedFromUI(currentSubjectKey);

  // final score preference: weighted if any sections provided, else overall
  const score = (weighted !== null) ? weighted : overall;

  if(score === null){
    alert("Please enter an overall % (or section breakdown).");
    return;
  }

  const sections = collectSections(currentSubjectKey);

  state.results[currentSubjectKey] = state.results[currentSubjectKey] || [];
  state.results[currentSubjectKey].push({ type, date, score, sections });

  saveState();

  renderTiles();
  renderOverallStats();
  renderChart(currentSubjectKey);
  renderHistoryLine(currentSubjectKey);

  // small hint
  byId("coachBox").innerHTML = `<div class="muted">Result added. Click “Coach me (AI)” for focus + drills.</div>`;
}

function collectSections(subjectKey){
  const subj = SUBJECTS[subjectKey];
  const inputs = [...byId("sections").querySelectorAll("input[data-sec]")];
  const out = {};
  subj.sections.forEach(sec=>{
    const inp = inputs.find(i=>i.dataset.sec===sec.key);
    const v = inp ? parseNum(inp.value) : null;
    if(v !== null) out[sec.key] = v;
  });
  return out;
}

async function runCoach(){
  if(!currentSubjectKey) return;

  const subj = SUBJECTS[currentSubjectKey];
  const results = state.results[currentSubjectKey] || [];

  if(results.length < 2){
    byId("coachBox").innerHTML = `<div class="muted">Add at least two results first (e.g. Christmas + Pre-Mock) for meaningful coaching.</div>`;
    return;
  }

  const latest = results[results.length-1];
  const prev = results[results.length-2];

  // Identify most costly weakness (simple heuristic using section deltas if present)
  const leakage = estimateLeakage(subj, latest, prev);

  // Build LC-mode task for your Worker (keeps old game working)
  const task = [
    "LC PERFORMANCE MODE",
    `Subject: ${subj.name}`,
    `Level: ${subj.level}`,
    `Previous: ${prev.type} ${prev.date} — ${prev.score}%`,
    `Latest: ${latest.type} ${latest.date} — ${latest.score}%`,
    leakage ? `Section leakage guess: ${leakage}` : "Section leakage guess: (no section data supplied)",
    "",
    "INSTRUCTIONS:",
    "- You are a calm, motivating exam-performance coach.",
    "- Identify the SINGLE most costly weakness (focus).",
    "- Give short, specific feedback (max 90 words).",
    "- Prescribe 2–3 varied drills appropriate to this subject (avoid essay marking; use short-answer structure, timing, recall, planning drills where relevant).",
    "- Output ONLY valid JSON with keys: score (0-100), focus, feedback, drills (array of strings)."
  ].join("\n");

  byId("coachBox").innerHTML = `<div class="muted">Thinking…</div>`;
  byId("drills").innerHTML = "";

  try{
    const ai = await window.classifyAnswer({ task, answer: "", lang: "lc" });

    // Support either old format OR new (drills optional)
    const score = (ai && typeof ai.score !== "undefined") ? ai.score : null;
    const focus = ai?.focus || "—";
    const feedback = ai?.feedback || "—";
    const drills = Array.isArray(ai?.drills) ? ai.drills : [];

    byId("coachBox").innerHTML = `
      <div><strong>Focus:</strong> ${escapeHtml(focus)}</div>
      ${score !== null ? `<div class="tiny muted">Coach index: ${escapeHtml(String(score))}/100</div>` : ""}
      <div style="margin-top:8px">${escapeHtml(feedback)}</div>
    `;

    if(drills.length){
      byId("drills").innerHTML = drills.map(d=>`<li>${escapeHtml(d)}</li>`).join("");
    } else {
      byId("drills").innerHTML = `<li class="muted">No drills returned. (Worker can be updated to include drills.)</li>`;
    }

  } catch(e){
    byId("coachBox").innerHTML = `<div class="muted">AI connection issue. Try again later.</div>`;
    byId("drills").innerHTML = `<li class="muted">—</li>`;
    console.warn(e);
  }
}

function estimateLeakage(subj, latest, prev){
  // If both have sections, find biggest negative section or lowest section as “leak”
  const a = latest.sections || {};
  const b = prev.sections || {};
  const keys = subj.sections.map(s=>s.key);

  const haveA = keys.some(k => typeof a[k] === "number");
  const haveB = keys.some(k => typeof b[k] === "number");
  if(!haveA && !haveB) return "";

  // choose lowest current section if available
  let lowest = null;
  keys.forEach(k=>{
    if(typeof a[k] === "number"){
      if(lowest === null || a[k] < lowest.v) lowest = { k, v: a[k] };
    }
  });

  if(lowest){
    const label = subj.sections.find(s=>s.key===lowest.k)?.label || lowest.k;
    return `${label} looks weakest (${lowest.v}%).`;
  }
  return "";
}

function renderChart(subjectKey){
  const results = state.results[subjectKey] || [];
  const ctx = byId("chart");

  if(chart) chart.destroy();

  chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: results.map((r,i)=>`${i+1}`),
      datasets: [{
        label: "Score %",
        data: results.map(r=>r.score),
        borderColor: "#2e86de",
        backgroundColor: "rgba(46,134,222,.15)",
        fill: true,
        tension: 0.25,
        pointRadius: 4
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: { min: 0, max: 100 }
      },
      plugins: {
        legend: { display: false }
      }
    }
  });
}

function renderHistoryLine(subjectKey){
  const results = state.results[subjectKey] || [];
  if(!results.length){
    byId("historyLine").textContent = "No results yet.";
    return;
  }
  const last = results[results.length-1];
  byId("historyLine").textContent = `Latest: ${last.type} (${last.date}) — ${last.score}%`;
}

function calcStars(results){
  // 5-star milestone system (non-childish, but rewarding)
  // 1★: first result
  // 2★: 3+ results
  // 3★: improved by +5 from first
  // 4★: improved by +10 from first
  // 5★: latest >= 70
  let s = 0;
  if(results.length >= 1) s++;
  if(results.length >= 3) s++;
  if(results.length >= 2){
    const first = results[0].score;
    const latest = results[results.length-1].score;
    if(latest - first >= 5) s++;
    if(latest - first >= 10) s++;
    if(latest >= 70) s++;
  }
  return clamp(s,0,5);
}

function gradeBand(score, level){
  // Generic band mapping for display (common LC-style)
  if(score >= 90) return level+"1";
  if(score >= 80) return level+"2";
  if(score >= 70) return level+"3";
  if(score >= 60) return level+"4";
  if(score >= 50) return level+"5";
  if(score >= 40) return level+"6";
  return level+"7/8";
}

function loadState(){
  const raw = localStorage.getItem(LS_KEY);
  if(raw){
    try{ return JSON.parse(raw); } catch {}
  }
  return {
    profile: null,
    results: {
      maths: [],
      biology: [],
      pe: [],
      homeec: [],
      english: []
    }
  };
}
function saveState(){
  localStorage.setItem(LS_KEY, JSON.stringify(state));
}

function resetLocal(){
  if(!confirm("Reset all local data on this device?")) return;
  localStorage.removeItem(LS_KEY);
  state = loadState();
  location.reload();
}

function byId(id){ return document.getElementById(id); }
function avgOf(arr){ return arr.reduce((a,b)=>a+b,0)/arr.length; }
function clamp(n,a,b){ return Math.max(a, Math.min(b,n)); }
function parseNum(v){
  const n = Number(String(v).trim());
  return Number.isFinite(n) ? n : null;
}
function escapeHtml(s){
  return String(s)
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}
