const LS_KEY = "SYNGE_LC_COACH_V6";
let state = loadState();

/**
 * LC section structure (data-driven).
 * NOTE: Some subjects can vary by year/spec; this is a practical stable v1 structure.
 * You can edit weights later without touching logic.
 */
const LC_STRUCTURE = {
  "English": { H: sections([{k:"P1",l:"Paper 1",w:50},{k:"P2",l:"Paper 2",w:50}]),
              O: sections([{k:"P1",l:"Paper 1",w:50},{k:"P2",l:"Paper 2",w:50}]) },

  "Maths":   { H: sections([{k:"P1",l:"Paper 1",w:50},{k:"P2",l:"Paper 2",w:50}]),
              O: sections([{k:"P1",l:"Paper 1",w:50},{k:"P2",l:"Paper 2",w:50}]) },

  "Spanish": { H: sections([{k:"oral",l:"Oral",w:25},{k:"aural",l:"Aural",w:25},{k:"reading",l:"Reading",w:25},{k:"writing",l:"Writing",w:25}]),
              O: sections([{k:"oral",l:"Oral",w:25},{k:"aural",l:"Aural",w:25},{k:"reading",l:"Reading",w:25},{k:"writing",l:"Writing",w:25}]) },

  "French":  { H: sections([{k:"oral",l:"Oral",w:25},{k:"aural",l:"Aural",w:25},{k:"reading",l:"Reading",w:25},{k:"writing",l:"Writing",w:25}]),
              O: sections([{k:"oral",l:"Oral",w:25},{k:"aural",l:"Aural",w:25},{k:"reading",l:"Reading",w:25},{k:"writing",l:"Writing",w:25}]) },

  "German":  { H: sections([{k:"oral",l:"Oral",w:25},{k:"aural",l:"Aural",w:25},{k:"reading",l:"Reading",w:25},{k:"writing",l:"Writing",w:25}]),
              O: sections([{k:"oral",l:"Oral",w:25},{k:"aural",l:"Aural",w:25},{k:"reading",l:"Reading",w:25},{k:"writing",l:"Writing",w:25}]) },

  "Accounting": { H: sections([{k:"Q1",l:"Q1",w:40},{k:"Q2",l:"Q2",w:30},{k:"Q3",l:"Q3",w:30}]),
                 O: sections([{k:"Q1",l:"Q1",w:40},{k:"Q2",l:"Q2",w:30},{k:"Q3",l:"Q3",w:30}]) },

  "Economics": { H: sections([{k:"srq",l:"Short Questions",w:40},{k:"long",l:"Long Questions",w:60}]),
                O: sections([{k:"srq",l:"Short Questions",w:40},{k:"long",l:"Long Questions",w:60}]) },

  "Physics": { H: sections([{k:"short",l:"Short Questions",w:40},{k:"long",l:"Long Questions",w:60}]),
              O: sections([{k:"short",l:"Short Questions",w:40},{k:"long",l:"Long Questions",w:60}]) },

  "Biology": { H: sections([{k:"A",l:"Short Questions",w:30},{k:"B",l:"Experiments",w:20},{k:"C",l:"Long Questions",w:50}]),
              O: sections([{k:"short",l:"Short Questions",w:40},{k:"long",l:"Long Questions",w:60}]) },

  "Chemistry": { H: sections([{k:"short",l:"Short Questions",w:40},{k:"long",l:"Long Questions",w:60}]),
                O: sections([{k:"short",l:"Short Questions",w:40},{k:"long",l:"Long Questions",w:60}]) },

  "PE": { H: sections([{k:"written",l:"Written",w:70},{k:"project",l:"Project",w:30}]),
         O: sections([{k:"written",l:"Written",w:70},{k:"project",l:"Project",w:30}]) },

  "Home Ec": { H: sections([{k:"core",l:"Core",w:60},{k:"elective",l:"Elective",w:40}]),
              O: sections([{k:"core",l:"Core",w:60},{k:"elective",l:"Elective",w:40}]) },

  "History": { H: sections([{k:"doc",l:"Documents/Source",w:40},{k:"essay",l:"Essays",w:60}]),
              O: sections([{k:"doc",l:"Documents/Source",w:40},{k:"essay",l:"Essays",w:60}]) },

  "Geography": { H: sections([{k:"short",l:"Short Questions",w:40},{k:"long",l:"Long Questions",w:60}]),
                O: sections([{k:"short",l:"Short Questions",w:40},{k:"long",l:"Long Questions",w:60}]) },

  "Business": { H: sections([{k:"srq",l:"Short Questions",w:40},{k:"abq",l:"ABQ / Applied",w:60}]),
               O: sections([{k:"srq",l:"Short Questions",w:40},{k:"abq",l:"ABQ / Applied",w:60}]) },

  "Art": { H: sections([{k:"hist",l:"History/Appreciation",w:50},{k:"pract",l:"Practical/Project",w:50}]),
          O: sections([{k:"hist",l:"History/Appreciation",w:50},{k:"pract",l:"Practical/Project",w:50}]) }
};

// ------- boot -------
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
}

function showSetup(){
  byId("setup")?.classList.remove("hidden");
  byId("dash")?.classList.add("hidden");
}

function showDash(){
  byId("setup")?.classList.add("hidden");
  byId("dash")?.classList.remove("hidden");
  renderTiles();
  renderOverall();
}

// ------- setup picker -------
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

  for(const p of picked){
    if(!state.results[p.subject]) state.results[p.subject] = [];
  }

  saveState();
  showDash();
}

// ------- dashboard tiles -------
function renderTiles(){
  const tiles = byId("tiles");
  if(!tiles) return;
  tiles.innerHTML = "";

  const picked = state.profile?.picked || [];
  picked.forEach(({subject, level})=>{
    const attempts = state.results?.[subject] || [];
    const avg = attempts.length ? Math.round(attempts.reduce((a,b)=>a + (b.overall ?? 0), 0) / attempts.length) : null;
    const weak = attempts.length ? weakestSectionFromAttempt(attempts[attempts.length-1]) : null;

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

// ------- subject panel -------
function openSubjectPanel(subject){
  const panel = byId("subjectPanel");
  if(!panel) return;

  const picked = (state.profile?.picked || []).find(p=>p.subject===subject);
  const level = picked?.level || "H";

  const struct = (LC_STRUCTURE[subject] && LC_STRUCTURE[subject][level]) ? LC_STRUCTURE[subject][level] : [];
  const attempts = state.results?.[subject] || [];
  const last = attempts.length ? attempts[attempts.length-1] : null;

  const lastOverall = last?.overall ?? null;
  const lastWeak = last ? weakestSectionFromAttempt(last) : null;

  panel.classList.remove("hidden");

  panel.innerHTML = `
    <div class="rowBetween">
      <h2 style="margin:0">${subject}</h2>
      <span class="pill">${level === "H" ? "Higher" : "Ordinary"}</span>
    </div>

    <div class="tileMeta" style="margin-top:8px">
      <span>Last Overall: <strong>${lastOverall === null ? "—" : lastOverall + "%"}</strong></span>
      <span>Last Weakest: <strong>${lastWeak || "—"}</strong></span>
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
      <button class="btn ghost" id="btnClosePanel">Close</button>
    </div>

    <div class="muted" id="calcPreview" style="margin-top:10px"></div>

    <div class="hr"></div>

    <h3 style="margin:0 0 8px">History</h3>
    <div class="muted">${attempts.length ? attempts.slice().reverse().slice(0,8).map(a=> `• ${fmtDate(a.date)} — ${a.overall}% (weakest: ${weakestSectionFromAttempt(a) || "—"})`).join("<br>") : "No attempts yet."}</div>
  `;

  // live preview
  const preview = () => {
    const sectionsObj = readSectionInputs(struct);
    const overall = weightedOverall(struct, sectionsObj);
    const weak = weakestSection(struct, sectionsObj);
    const msg = `Weighted overall (auto): <strong>${overall === null ? "—" : overall + "%"}</strong> · Weakest: <strong>${weak || "—"}</strong>`;
    byId("calcPreview").innerHTML = msg;
  };
  struct.forEach(s=>{
    byId(`sec_${safeId(s.k)}`)?.addEventListener("input", preview);
  });
  preview();

  byId("btnSaveAttempt")?.addEventListener("click", ()=>{
    const sectionsObj = readSectionInputs(struct);

    // must have at least one section filled
    const any = Object.values(sectionsObj).some(v => typeof v === "number");
    if(!any){
      alert("Enter at least one section score.");
      return;
    }

    const overall = weightedOverall(struct, sectionsObj);
    if(overall === null){
      alert("Check your section scores (0–100).");
      return;
    }

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
    openSubjectPanel(subject); // re-render
  });

  byId("btnClosePanel")?.addEventListener("click", ()=>{
    panel.classList.add("hidden");
  });
}

// ------- overall stats -------
function renderOverall(){
  const overallEl = byId("overallAvg");
  const bandEl = byId("overallBand");
  const weakEl = byId("overallWeak");

  const picked = state.profile?.picked || [];
  const latestOveralls = [];
  const weakCounts = new Map();

  for(const {subject} of picked){
    const arr = state.results?.[subject] || [];
    if(!arr.length) continue;
    const last = arr[arr.length-1];
    latestOveralls.push(last.overall);

    const w = weakestSectionFromAttempt(last);
    if(w){
      weakCounts.set(w, (weakCounts.get(w) || 0) + 1);
    }
  }

  if(!latestOveralls.length){
    overallEl.textContent = "—";
    bandEl.textContent = "—";
    weakEl.textContent = "—";
    return;
  }

  const overall = Math.round(latestOveralls.reduce((a,b)=>a+b,0)/latestOveralls.length);
  overallEl.textContent = overall + "%";
  bandEl.textContent = band(overall);

  // pick the most common weak section label
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

// ------- helpers -------
function sections(arr){
  // normalise weights to sum 100 (safety)
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
  // if a section missing, we treat it as “not provided” and renormalise the weights among provided sections
  const provided = struct.filter(s => typeof sectionsObj[s.k] === "number");
  if(!provided.length) return null;

  const wSum = provided.reduce((a,s)=>a+s.w,0);
  if(wSum <= 0) return null;

  let total = 0;
  for(const s of provided){
    const v = sectionsObj[s.k];
    total += v * (s.w / wSum);
  }
  return Math.round(total);
}

function weakestSection(struct, sectionsObj){
  const provided = struct
    .map(s=>({ label:s.l, v: sectionsObj[s.k] }))
    .filter(x => typeof x.v === "number");
  if(!provided.length) return null;
  provided.sort((a,b)=>a.v-b.v);
  return provided[0].label;
}

function weakestSectionFromAttempt(attempt){
  const subject = findSubjectByAttempt(attempt);
  const level = attempt.level || "H";
  const struct = (LC_STRUCTURE[subject] && LC_STRUCTURE[subject][level]) ? LC_STRUCTURE[subject][level] : [];
  return weakestSection(struct, attempt.sections || {});
}

function findSubjectByAttempt(attempt){
  // attempt stored under subject key; we infer by searching results map for reference equality or matching date
  // simple safe approach: store nothing fancy—caller already knows subject; used only for dashboard “weakest counts”
  // We'll search by date+overall match (good enough for local).
  const date = attempt.date;
  for(const subject of Object.keys(state.results || {})){
    const arr = state.results[subject] || [];
    if(arr.some(a => a.date === date)) return subject;
  }
  // fallback
  return Object.keys(state.results || {})[0] || "English";
}

function fmtDate(iso){
  try{
    const d = new Date(iso);
    return d.toLocaleDateString();
  }catch{
    return "";
  }
}

function safeId(k){
  return String(k).replace(/[^a-zA-Z0-9_]/g,"_");
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
