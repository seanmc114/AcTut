const LS_KEY = "SYNGE_LC_COACH_V6_GYM";
let state = loadState();

const LC_STRUCTURE = {
  "English": { H: normSections([{k:"P1",l:"Paper 1",w:50},{k:"P2",l:"Paper 2",w:50}]),
              O: normSections([{k:"P1",l:"Paper 1",w:50},{k:"P2",l:"Paper 2",w:50}]) },

  "Maths":   { H: normSections([{k:"P1",l:"Paper 1",w:50},{k:"P2",l:"Paper 2",w:50}]),
              O: normSections([{k:"P1",l:"Paper 1",w:50},{k:"P2",l:"Paper 2",w:50}]) },

  "Spanish": { H: normSections([{k:"oral",l:"Oral",w:25},{k:"aural",l:"Aural",w:25},{k:"reading",l:"Reading",w:25},{k:"writing",l:"Writing",w:25}]),
              O: normSections([{k:"oral",l:"Oral",w:25},{k:"aural",l:"Aural",w:25},{k:"reading",l:"Reading",w:25},{k:"writing",l:"Writing",w:25}]) },

  "French":  { H: normSections([{k:"oral",l:"Oral",w:25},{k:"aural",l:"Aural",w:25},{k:"reading",l:"Reading",w:25},{k:"writing",l:"Writing",w:25}]),
              O: normSections([{k:"oral",l:"Oral",w:25},{k:"aural",l:"Aural",w:25},{k:"reading",l:"Reading",w:25},{k:"writing",l:"Writing",w:25}]) },

  "German":  { H: normSections([{k:"oral",l:"Oral",w:25},{k:"aural",l:"Aural",w:25},{k:"reading",l:"Reading",w:25},{k:"writing",l:"Writing",w:25}]),
              O: normSections([{k:"oral",l:"Oral",w:25},{k:"aural",l:"Aural",w:25},{k:"reading",l:"Reading",w:25},{k:"writing",l:"Writing",w:25}]) },

  "Accounting": { H: normSections([{k:"Q1",l:"Q1",w:40},{k:"Q2",l:"Q2",w:30},{k:"Q3",l:"Q3",w:30}]),
                 O: normSections([{k:"Q1",l:"Q1",w:40},{k:"Q2",l:"Q2",w:30},{k:"Q3",l:"Q3",w:30}]) },

  "Economics": { H: normSections([{k:"srq",l:"Short Questions",w:40},{k:"long",l:"Long Questions",w:60}]),
                O: normSections([{k:"srq",l:"Short Questions",w:40},{k:"long",l:"Long Questions",w:60}]) },

  "Physics": { H: normSections([{k:"short",l:"Short Questions",w:40},{k:"long",l:"Long Questions",w:60}]),
              O: normSections([{k:"short",l:"Short Questions",w:40},{k:"long",l:"Long Questions",w:60}]) },

  "Biology": { H: normSections([{k:"A",l:"Short Questions",w:30},{k:"B",l:"Experiments",w:20},{k:"C",l:"Long Questions",w:50}]),
              O: normSections([{k:"short",l:"Short Questions",w:40},{k:"long",l:"Long Questions",w:60}]) },

  "Chemistry": { H: normSections([{k:"short",l:"Short Questions",w:40},{k:"long",l:"Long Questions",w:60}]),
                O: normSections([{k:"short",l:"Short Questions",w:40},{k:"long",l:"Long Questions",w:60}]) },

  "PE": { H: normSections([{k:"written",l:"Written",w:70},{k:"project",l:"Project",w:30}]),
         O: normSections([{k:"written",l:"Written",w:70},{k:"project",l:"Project",w:30}]) },

  "Home Ec": { H: normSections([{k:"core",l:"Core",w:60},{k:"elective",l:"Elective",w:40}]),
              O: normSections([{k:"core",l:"Core",w:60},{k:"elective",l:"Elective",w:40}]) },

  "History": { H: normSections([{k:"doc",l:"Documents/Source",w:40},{k:"essay",l:"Essays",w:60}]),
              O: normSections([{k:"doc",l:"Documents/Source",w:40},{k:"essay",l:"Essays",w:60}]) },

  "Geography": { H: normSections([{k:"short",l:"Short Questions",w:40},{k:"long",l:"Long Questions",w:60}]),
                O: normSections([{k:"short",l:"Short Questions",w:40},{k:"long",l:"Long Questions",w:60}]) },

  "Business": { H: normSections([{k:"srq",l:"Short Questions",w:40},{k:"abq",l:"ABQ / Applied",w:60}]),
               O: normSections([{k:"srq",l:"Short Questions",w:40},{k:"abq",l:"ABQ / Applied",w:60}]) },

  "Art": { H: normSections([{k:"hist",l:"History/Appreciation",w:50},{k:"pract",l:"Practical/Project",w:50}]),
          O: normSections([{k:"hist",l:"History/Appreciation",w:50},{k:"pract",l:"Practical/Project",w:50}]) }
};

document.addEventListener("DOMContentLoaded", () => {
  wire();
  renderPicker();

  if(state.profile && state.profile.picked?.length){
    showDash();
  } else {
    showSetup();
  }
});

function wire(){
  byId("btnStart")?.addEventListener("click", start);
  byId("btnReset")?.addEventListener("click", resetLocal);

  byId("btnSubmitDrill")?.addEventListener("click", submitDrillAnswer);
  byId("btnExitDrill")?.addEventListener("click", ()=> exitDrill(true));

  byId("btnDrillAgain")?.addEventListener("click", ()=> restartLastDrill());
  byId("btnBackSubject")?.addEventListener("click", ()=> backToSubject());
  byId("btnBackDash")?.addEventListener("click", ()=> backToDash());

  byId("drillAnswer")?.addEventListener("keydown", (e)=>{
    if(e.key === "Enter") submitDrillAnswer();
  });
}

function showSetup(){
  showOnly("setup");
}
function showDash(){
  showOnly("dash");
  renderTiles();
  renderOverall();
}
function showOnly(id){
  ["setup","dash","drillScreen","drillResults"].forEach(x=>{
    const el = byId(x);
    if(!el) return;
    el.classList.toggle("hidden", x !== id);
  });
}

function renderPicker(){
  const box = byId("subjectPicker");
  if(!box) return;
  box.innerHTML = "";

  Object.keys(LC_STRUCTURE).forEach(subject=>{
    const row = document.createElement("div");
    row.className = "pickRow";
    row.innerHTML = `
      <label>
        <input type="checkbox" data-sub="${subject}">
        ${subject}
      </label>
      <select data-lvl="${subject}">
        <option value="H">Higher</option>
        <option value="O">Ordinary</option>
      </select>
    `;
    box.appendChild(row);
  });
}

function start(){
  const name = (byId("name")?.value || "").trim();
  if(!name){ alert("Enter a nickname."); return; }

  const picked = [];
  document.querySelectorAll('input[type="checkbox"][data-sub]').forEach(cb=>{
    if(cb.checked){
      const subject = cb.dataset.sub;
      const sel = document.querySelector(`select[data-lvl="${subject}"]`);
      const level = sel ? sel.value : "H";
      picked.push({ subject, level });
    }
  });

  if(!picked.length){ alert("Pick at least one subject."); return; }

  state.profile = { name, picked };
  state.results = state.results || {};
  state.drills = state.drills || {};

  for(const p of picked){
    if(!state.results[p.subject]) state.results[p.subject] = [];
    if(!state.drills[p.subject]) state.drills[p.subject] = [];
  }

  saveState();
  showDash();
}

function renderTiles(){
  const tiles = byId("tiles");
  if(!tiles) return;
  tiles.innerHTML = "";

  const picked = state.profile?.picked || [];
  picked.forEach(({subject, level})=>{
    const attempts = state.results?.[subject] || [];
    const avg = attempts.length ? Math.round(attempts.reduce((a,b)=>a + (b.overall ?? 0), 0) / attempts.length) : null;
    const weak = attempts.length ? weakestSectionLabel(subject, level, attempts[attempts.length-1].sections || {}) : null;

    const t = document.createElement("div");
    t.className = "tile";
    t.innerHTML = `
      <div class="tileTop">
        <div class="tileName">${subject}</div>
        <div class="pill">${level === "H" ? "Higher" : "Ordinary"}</div>
      </div>
      <div class="tileMeta">
        <span>Avg: <strong>${avg === null ? "—" : avg + "%"}</strong></span>
        <span>Weakest: <strong>${weak || "—"}</strong></span>
      </div>
    `;
    t.addEventListener("click", ()=> openSubjectPanel(subject));
    tiles.appendChild(t);
  });
}

function openSubjectPanel(subject){
  const panel = byId("subjectPanel");
  if(!panel) return;

  const picked = (state.profile?.picked || []).find(p=>p.subject===subject);
  const level = picked?.level || "H";
  const struct = LC_STRUCTURE[subject]?.[level] || [];
  const attempts = state.results?.[subject] || [];
  const last = attempts.length ? attempts[attempts.length-1] : null;

  const lastOverall = last?.overall ?? null;
  const weakKey = last ? weakestSectionKey(subject, level, last.sections || {}) : (struct[0]?.k || null);
  const weakLabel = weakKey ? (struct.find(s=>s.k===weakKey)?.l || weakKey) : null;

  panel.classList.remove("hidden");

  panel.innerHTML = `
    <div class="rowBetween">
      <h2 style="margin:0">${subject}</h2>
      <span class="pill">${level === "H" ? "Higher" : "Ordinary"}</span>
    </div>

    <div class="tileMeta" style="margin-top:8px">
      <span>Last Overall: <strong>${lastOverall === null ? "—" : lastOverall + "%"}</strong></span>
      <span>Weakest: <strong>${weakLabel || "—"}</strong></span>
      <span>Attempts: <strong>${attempts.length}</strong></span>
    </div>

    <div class="hr"></div>

    <h3 style="margin:0 0 8px">Enter section scores (%)</h3>
    <div class="panelGrid">
      ${struct.map(s=>`
        <div class="sectionRow">
          <div class="rowBetween">
            <div class="w">${s.l}</div>
            <div class="pill">${s.w}%</div>
          </div>
          <input inputmode="numeric" pattern="[0-9]*" id="sec_${safeId(s.k)}" placeholder="0–100" value="${last?.sections?.[s.k] ?? ""}">
        </div>
      `).join("")}
    </div>

    <div class="panelActions">
      <button class="btn primary" id="btnSaveAttempt">Save Attempt</button>
      <button class="btn primary" id="btnTrainWeak">Train Weakest (5)</button>
      <button class="btn ghost" id="btnClosePanel">Close</button>
    </div>

    <div class="muted" id="calcPreview" style="margin-top:10px"></div>
  `;

  const preview = () => {
    const sectionsObj = readSectionInputs(struct);
    const overall = weightedOverall(struct, sectionsObj);
    const weak = weakestSection(struct, sectionsObj);
    byId("calcPreview").innerHTML =
      `Weighted overall: <strong>${overall === null ? "—" : overall + "%"}</strong> · Weakest: <strong>${weak || "—"}</strong>`;
  };
  struct.forEach(s=>{
    byId(`sec_${safeId(s.k)}`)?.addEventListener("input", preview);
  });
  preview();

  byId("btnSaveAttempt")?.addEventListener("click", ()=>{
    const sectionsObj = readSectionInputs(struct);
    const any = Object.values(sectionsObj).some(v => typeof v === "number");
    if(!any){ alert("Enter at least one section score."); return; }

    const overall = weightedOverall(struct, sectionsObj);
    if(overall === null){ alert("Check section scores (0–100)."); return; }

    state.results[subject] = state.results[subject] || [];
    state.results[subject].push({
      date: new Date().toISOString(),
      level,
      sections: sectionsObj,
      overall
    });

    saveState();
    renderTiles();
    renderOverall();
    openSubjectPanel(subject);
  });

  byId("btnTrainWeak")?.addEventListener("click", ()=>{
    // Use current inputs if any, else last saved attempt if exists
    const currentSections = readSectionInputs(struct);
    const any = Object.values(currentSections).some(v => typeof v === "number");
    const basis = any ? currentSections : (last?.sections || {});
    const wk = weakestSectionKey(subject, level, basis) || struct[0]?.k;

    startDrillBurst({ subject, level, sectionKey: wk });
  });

  byId("btnClosePanel")?.addEventListener("click", ()=>{
    panel.classList.add("hidden");
  });

  // focus the first input if available
  const first = struct[0]?.k;
  if(first) setTimeout(()=> byId(`sec_${safeId(first)}`)?.focus(), 50);
}

function renderOverall(){
  const overallEl = byId("overallAvg");
  const bandEl = byId("overallBand");
  const weakEl = byId("overallWeak");

  const picked = state.profile?.picked || [];
  const latest = [];
  const weakCounts = new Map();

  for(const {subject, level} of picked){
    const arr = state.results?.[subject] || [];
    if(!arr.length) continue;
    const last = arr[arr.length-1];
    latest.push(last.overall);

    const wk = weakestSectionLabel(subject, level, last.sections || {});
    if(wk){
      weakCounts.set(wk, (weakCounts.get(wk) || 0) + 1);
    }
  }

  if(!latest.length){
    overallEl.textContent = "—";
    bandEl.textContent = "—";
    weakEl.textContent = "—";
    return;
  }

  const overall = Math.round(latest.reduce((a,b)=>a+b,0)/latest.length);
  overallEl.textContent = overall + "%";
  bandEl.textContent = band(overall);

  let top = "—", topN = 0;
  for(const [k,n] of weakCounts.entries()){
    if(n > topN){ top = k; topN = n; }
  }
  weakEl.textContent = top;
}

function band(p){
  if(p>=90) return "H1";
  if(p>=80) return "H2";
  if(p>=70) return "H3";
  if(p>=60) return "H4";
  if(p>=50) return "H5";
  if(p>=40) return "H6";
  return "H7/H8";
}

/* =========================
   GYM DRILLS (5 Q Burst)
========================= */

let drill = null;      // live drill session
let lastDrillParams = null;

function startDrillBurst({ subject, level, sectionKey }){
  if(!window.DRILL_BANK){
    alert("drills.js not loaded.");
    return;
  }
  const bank = window.DRILL_BANK[subject] || null;
  if(!bank){
    alert("No drill bank for " + subject);
    return;
  }

  // choose mode based on sectionKey
  const mode = pickMode(subject, sectionKey);

  const items = chooseFive(bank, mode);
  if(!items.length){
    alert("No drill items found.");
    return;
  }

  lastDrillParams = { subject, level, sectionKey, mode };

  drill = {
    subject, level, sectionKey, mode,
    items,
    idx: 0,
    correct: 0,
    startMs: Date.now(),
    answered: []
  };

  showOnly("drillScreen");
  byId("subjectPanel")?.classList.add("hidden");

  renderDrillQuestion();
  tickDrillTime();
  setTimeout(()=> byId("drillAnswer")?.focus(), 50);
}

function pickMode(subject, sectionKey){
  const k = String(sectionKey || "").toLowerCase();

  if(subject === "Maths"){
    if(k === "p2") return "structured";
    return "rapid";
  }
  if(subject === "English"){
    if(k === "p2") return "structured";
    return "rapid";
  }

  // Languages
  if(["spanish","french","german"].includes(subject.toLowerCase())){
    if(k.includes("writing")) return "structured";
    if(k.includes("reading") || k.includes("aural") || k.includes("oral")) return "rapid";
    return "rapid";
  }

  // Sciences & others: long/essay -> structured, docs/experiments -> cloze, else rapid
  if(k.includes("long") || k.includes("essay") || k.includes("abq") || k.includes("project")) return "structured";
  if(k.includes("doc") || k.includes("experiment") || k === "b") return "cloze";
  return "rapid";
}

function chooseFive(bank, mode){
  let arr = bank[mode] || [];
  if(!Array.isArray(arr) || !arr.length){
    // fallback order
    arr = bank.rapid || bank.cloze || bank.structured || [];
  }
  const copy = arr.slice();
  shuffle(copy);
  return copy.slice(0,5);
}

function renderDrillQuestion(){
  const qn = drill.idx + 1;
  byId("drillTitle").textContent = `${drill.subject} · Gym`;
  byId("drillMeta").textContent = `${labelSection(drill.subject, drill.level, drill.sectionKey)} · ${drill.mode.toUpperCase()}`;
  byId("drillQn").textContent = String(qn);
  byId("drillCorrect").textContent = String(drill.correct);

  const item = drill.items[drill.idx];
  const prompt = formatItemPrompt(item, drill.mode);
  byId("drillPrompt").textContent = prompt;

  byId("drillAnswer").value = "";
  byId("drillHint").innerHTML = hintForMode(item, drill.mode);
}

function formatItemPrompt(item, mode){
  if(mode === "cloze"){
    return item.text || "Fill the blanks";
  }
  return item.q || "Question";
}

function hintForMode(item, mode){
  // Confidence mode: structured gives scaffold hints, rapid/cloze minimal
  if(mode === "structured"){
    const sc = item.scaffold;
    if(sc && sc.strength){
      return `Outline hint: <strong>${String(sc.strength)}</strong>`;
    }
    return `Write a short outline (20+ characters).`;
  }
  if(mode === "cloze"){
    return `Type the missing word(s).`;
  }
  return `Quick answer. Keep it tight.`;
}

function submitDrillAnswer(){
  if(!drill) return;

  const ans = (byId("drillAnswer").value || "").trim();
  if(!ans){
    alert("Type an answer.");
    return;
  }

  const item = drill.items[drill.idx];
  const ok = checkAnswer(item, drill.mode, ans);

  drill.answered.push({
    ok,
    user: ans,
    item
  });

  if(ok) drill.correct++;

  drill.idx++;

  if(drill.idx >= drill.items.length){
    finishDrill();
    return;
  }

  renderDrillQuestion();
  setTimeout(()=> byId("drillAnswer")?.focus(), 30);
}

function checkAnswer(item, mode, user){
  const norm = (window.__NORM ? window.__NORM : (s)=>String(s||"").trim().toLowerCase());
  const u = norm(user);

  if(mode === "rapid"){
    const answers = item.a || [];
    if(Array.isArray(answers)){
      return answers.some(a => norm(a) === u);
    }
    return false;
  }

  if(mode === "cloze"){
    // require all blanks appear somewhere in user text
    const blanks = item.blanks || [];
    if(!Array.isArray(blanks) || !blanks.length) return u.length >= 1;
    return blanks.every(b => u.includes(norm(b)));
  }

  // structured (confidence): reward genuine attempt
  // mark correct if meaningful length; this is “Gym reps”, not final marking
  return u.length >= 20;
}

function finishDrill(){
  const timeMs = Date.now() - drill.startMs;
  const timeSec = Math.max(1, Math.round(timeMs / 1000));
  const total = drill.items.length;
  const acc = Math.round((drill.correct / total) * 100);

  // Confidence Mode hybrid score:
  // mild time effect: subtract 1 point per 10 seconds, capped at 12
  const penalty = Math.min(12, Math.floor(timeSec / 10));
  const score = Math.max(0, acc - penalty);

  // Save
  state.drills = state.drills || {};
  state.drills[drill.subject] = state.drills[drill.subject] || [];
  const entry = {
    date: new Date().toISOString(),
    sectionKey: drill.sectionKey,
    mode: drill.mode,
    correct: drill.correct,
    total,
    timeSec,
    acc,
    score
  };
  state.drills[drill.subject].push(entry);
  saveState();

  // Compare to previous best for same subject+sectionKey
  const hist = state.drills[drill.subject].filter(x => x.sectionKey === drill.sectionKey);
  const best = Math.max(...hist.map(x => x.score));
  const prev = hist.length >= 2 ? hist[hist.length - 2] : null;

  // UI
  showOnly("drillResults");

  byId("drillSummary").innerHTML = `
    <span>Accuracy: <strong>${acc}%</strong></span>
    <span>Time: <strong>${timeSec}s</strong></span>
    <span>Gym Score: <strong>${score}</strong></span>
    <span>Best: <strong>${best}</strong></span>
  `;

  byId("drillMessage").innerHTML = buildDrillMessage({
    subject: drill.subject,
    sectionLabel: labelSection(drill.subject, drill.level, drill.sectionKey),
    entry,
    prev,
    best
  });

  // clear session
  drill = null;
}

function buildDrillMessage({ subject, sectionLabel, entry, prev, best }){
  const improved = prev ? (entry.score - prev.score) : null;

  let line1 = `**${subject} · ${sectionLabel}**`;
  let line2 = "";

  if(improved === null){
    line2 = `First rep logged. Good — now we build consistency.`;
  } else if(improved > 0){
    line2 = `Up **${improved}** from last time. That’s improvement. Keep the reps.`;
  } else if(improved === 0){
    line2 = `Same score as last time. That’s stable. Next: sharpen one detail.`;
  } else {
    line2 = `Down **${Math.abs(improved)}**. No panic — fatigue happens. Run it again and steady it.`;
  }

  // coaching suggestion
  let tip = "";
  if(entry.acc < 60){
    tip = `Focus next rep on **accuracy**. Slow down slightly; nail the basics.`;
  } else if(entry.timeSec > 70){
    tip = `Accuracy is decent — next rep: keep accuracy and trim time by **10s**.`;
  } else {
    tip = `Strong. Next: try to beat your **best (${best})** with calm speed.`;
  }

  return `
    <div><strong>${line1}</strong></div>
    <div style="margin-top:6px">${line2}</div>
    <div style="margin-top:8px"><strong>Next:</strong> ${tip}</div>
  `;
}

function restartLastDrill(){
  if(!lastDrillParams) return backToDash();
  startDrillBurst(lastDrillParams);
}

function backToSubject(){
  // reopen the last subject panel (safe)
  if(lastDrillParams?.subject){
    showDash();
    openSubjectPanel(lastDrillParams.subject);
    // scroll a bit to panel
    setTimeout(()=> byId("subjectPanel")?.scrollIntoView({ behavior:"smooth", block:"start" }), 50);
  } else {
    backToDash();
  }
}

function backToDash(){
  showDash();
}

function exitDrill(confirmExit){
  if(confirmExit && !confirm("Exit the drill?")) return;
  drill = null;
  showDash();
}

/* =========================
   LC helpers
========================= */

function normSections(arr){
  const sum = arr.reduce((a,s)=>a+s.w,0) || 100;
  return arr.map(s=>({ ...s, w: Math.round((s.w/sum)*100) }));
}

function readSectionInputs(struct){
  const obj = {};
  struct.forEach(s=>{
    const raw = (byId(`sec_${safeId(s.k)}`)?.value || "").trim();
    if(raw === "") return;
    const v = Number(raw);
    if(Number.isFinite(v) && v >= 0 && v <= 100){
      obj[s.k] = Math.round(v);
    }
  });
  return obj;
}

function weightedOverall(struct, sectionsObj){
  const provided = struct.filter(s => typeof sectionsObj[s.k] === "number");
  if(!provided.length) return null;

  const wSum = provided.reduce((a,s)=>a+s.w,0);
  if(wSum <= 0) return null;

  let total = 0;
  for(const s of provided){
    total += sectionsObj[s.k] * (s.w / wSum);
  }
  return Math.round(total);
}

function weakestSection(struct, sectionsObj){
  const provided = struct
    .map(s=>({ key:s.k, label:s.l, v: sectionsObj[s.k] }))
    .filter(x => typeof x.v === "number");
  if(!provided.length) return null;
  provided.sort((a,b)=>a.v-b.v);
  return provided[0].label;
}

function weakestSectionKey(subject, level, sectionsObj){
  const struct = LC_STRUCTURE[subject]?.[level] || [];
  const provided = struct
    .map(s=>({ key:s.k, v: sectionsObj[s.k] }))
    .filter(x => typeof x.v === "number");
  if(!provided.length) return null;
  provided.sort((a,b)=>a.v-b.v);
  return provided[0].key;
}

function weakestSectionLabel(subject, level, sectionsObj){
  const struct = LC_STRUCTURE[subject]?.[level] || [];
  const key = weakestSectionKey(subject, level, sectionsObj);
  if(!key) return null;
  return struct.find(s=>s.k===key)?.l || key;
}

function labelSection(subject, level, sectionKey){
  const struct = LC_STRUCTURE[subject]?.[level] || [];
  return struct.find(s=>s.k===sectionKey)?.l || sectionKey || "Section";
}

function safeId(k){
  return String(k).replace(/[^a-zA-Z0-9_]/g,"_");
}

/* =========================
   general helpers
========================= */

function shuffle(a){
  for(let i=a.length-1;i>0;i--){
    const j = Math.floor(Math.random()*(i+1));
    [a[i],a[j]] = [a[j],a[i]];
  }
}

function tickDrillTime(){
  if(!byId("drillScreen") || byId("drillScreen").classList.contains("hidden")) return;
  if(!drill) return;

  const s = Math.round((Date.now() - drill.startMs)/1000);
  byId("drillTime").textContent = String(s);
  setTimeout(tickDrillTime, 250);
}

function resetLocal(){
  if(confirm("Reset all data stored on this device?")){
    localStorage.removeItem(LS_KEY);
    location.reload();
  }
}

function loadState(){
  const raw = localStorage.getItem(LS_KEY);
  if(raw){
    try { return JSON.parse(raw); } catch {}
  }
  return {};
}

function saveState(){
  localStorage.setItem(LS_KEY, JSON.stringify(state));
}

function byId(id){
  return document.getElementById(id);
}
