const LS_KEY = "SYNGE_LC_COACH_V4";
let state = loadState();

const CORE = [
  "English","Maths","Spanish","French","German",
  "Accounting","Economics","Physics","Biology","Chemistry",
  "PE","Home Ec","History","Geography","Business","Art"
];

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
  byId("setup").classList.remove("hidden");
  byId("dash").classList.add("hidden");
}

function showDash(){
  byId("setup").classList.add("hidden");
  byId("dash").classList.remove("hidden");
  renderTiles();
  renderOverall();
}

function renderPicker(){
  const box = byId("subjectPicker");
  box.innerHTML = "";

  CORE.forEach(name=>{
    const row = document.createElement("div");
    row.className = "pickRow";
    row.innerHTML = `
      <label>
        <input type="checkbox" data-sub="${name}">
        ${name}
      </label>
      <select data-lvl="${name}">
        <option value="H">Higher</option>
        <option value="O">Ordinary</option>
      </select>
    `;
    box.appendChild(row);
  });
}

function start(){
  const name = byId("name").value.trim();
  if(!name){
    alert("Enter a nickname.");
    return;
  }

  const picked = [];

  document.querySelectorAll('input[type="checkbox"][data-sub]').forEach(cb=>{
    if(cb.checked){
      const subject = cb.dataset.sub;
      const sel = document.querySelector(`select[data-lvl="${subject}"]`);
      const level = sel ? sel.value : "H";
      picked.push({ subject, level });
    }
  });

  if(!picked.length){
    alert("Pick at least one subject.");
    return;
  }

  state.profile = { name, picked };
  state.results = state.results || {};

  picked.forEach(p=>{
    if(!state.results[p.subject]){
      state.results[p.subject] = [];
    }
  });

  saveState();
  showDash();
}

function renderTiles(){
  const tiles = byId("tiles");
  tiles.innerHTML = "";

  state.profile.picked.forEach(({subject})=>{
    const results = state.results[subject] || [];
    const avg = results.length
      ? Math.round(results.reduce((a,b)=>a+b.score,0)/results.length)
      : null;

    const tile = document.createElement("div");
    tile.className = "tile";
    tile.innerHTML = `
      <div class="tileName">${subject}</div>
      <div class="tileMeta">
        ${avg === null ? "No results yet" : avg + "%"}
      </div>
    `;

    tile.addEventListener("click", ()=>{
      openSubjectPanel(subject);
    });

    tiles.appendChild(tile);
  });
}

function openSubjectPanel(subject){

  const panel = byId("subjectPanel");
  panel.classList.remove("hidden");

  const results = state.results[subject] || [];
  const avg = results.length
    ? Math.round(results.reduce((a,b)=>a+b.score,0)/results.length)
    : null;

  panel.innerHTML = `
    <h2>${subject}</h2>
    <p><strong>Average:</strong> ${avg === null ? "—" : avg + "%"}</p>

    <input type="number" id="newScore" placeholder="Enter % result">
    <button id="saveScore" class="primary">Save Result</button>
    <button id="closePanel" style="margin-left:10px;">Close</button>

    <hr style="margin:20px 0">

    <div>
      <strong>Results:</strong><br>
      ${
        results.length
        ? results.map(r=>`${r.score}%`).join("<br>")
        : "No results yet."
      }
    </div>
  `;

  byId("saveScore").addEventListener("click", ()=>{
    const val = Number(byId("newScore").value);
    if(!Number.isFinite(val) || val < 0 || val > 100){
      alert("Enter valid percentage.");
      return;
    }

    state.results[subject].push({ score: val });
    saveState();
    renderTiles();
    renderOverall();
    openSubjectPanel(subject);
  });

  byId("closePanel").addEventListener("click", ()=>{
    panel.classList.add("hidden");
  });
}

function renderOverall(){
  const avgs = state.profile.picked
    .map(p=>state.results[p.subject]||[])
    .filter(a=>a.length)
    .map(a=>Math.round(a.reduce((x,y)=>x+y.score,0)/a.length));

  if(!avgs.length){
    byId("overallAvg").textContent = "—";
    byId("overallBand").textContent = "—";
    return;
  }

  const overall = Math.round(avgs.reduce((a,b)=>a+b,0)/avgs.length);
  byId("overallAvg").textContent = overall + "%";
  byId("overallBand").textContent = band(overall);
}

function band(score){
  if(score>=90) return "H1";
  if(score>=80) return "H2";
  if(score>=70) return "H3";
  if(score>=60) return "H4";
  if(score>=50) return "H5";
  if(score>=40) return "H6";
  return "H7/8";
}

function resetLocal(){
  if(confirm("Reset all local data?")){
    localStorage.removeItem(LS_KEY);
    location.reload();
  }
}

function loadState(){
  const raw = localStorage.getItem(LS_KEY);
  if(raw){
    try{return JSON.parse(raw);}catch{}
  }
  return {};
}

function saveState(){
  localStorage.setItem(LS_KEY, JSON.stringify(state));
}

function byId(id){
  return document.getElementById(id);
}
