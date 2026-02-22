let currentStudent = null;
let currentSubject = null;
let chart = null;

const subjects = {
  maths: { name: "OL Maths", band: "O" },
  biology: { name: "Biology", band: "H" },
  pe: { name: "PE", band: "H" },
  homeec: { name: "Home Ec", band: "H" },
  english: { name: "HL English", band: "H" }
};

let data = {};
let initialMock = {};

Object.keys(subjects).forEach(sub => {
  data[sub] = [];
  initialMock[sub] = null;
});

function login() {
  const name = document.getElementById("studentName").value;
  if (!name) return;

  currentStudent = name;
  document.getElementById("studentNameDisplay").innerText = "Welcome, " + name;
  document.getElementById("loginSection").classList.add("hidden");
  document.getElementById("dashboard").classList.remove("hidden");

  renderTiles();
}

function renderTiles() {
  const tileContainer = document.getElementById("tiles");
  tileContainer.innerHTML = "";

  for (let sub in subjects) {
    let avg = data[sub].length ? average(data[sub]) : 0;

    tileContainer.innerHTML += `
      <div class="tile" onclick="openSubject('${sub}')">
        <h3>${subjects[sub].name}</h3>
        <p>${avg ? avg + "%" : "--%"}</p>
        <div class="progressBar">
          <div class="progressFill" style="width:${avg}%"></div>
        </div>
      </div>
    `;
  }

  updateOverall();
}

function openSubject(sub) {
  currentSubject = sub;
  document.getElementById("subjectTitle").innerText = subjects[sub].name;
  document.getElementById("subjectModal").classList.remove("hidden");
  renderChart();
}

function closeSubject() {
  document.getElementById("subjectModal").classList.add("hidden");
}

function addResult() {
  const score = parseInt(document.getElementById("newScore").value);
  if (isNaN(score)) return;

  if (initialMock[currentSubject] === null) {
    initialMock[currentSubject] = score;
  }

  data[currentSubject].push(score);

  renderTiles();
  renderChart();
  coachLogic();
}

function average(arr) {
  return Math.round(arr.reduce((a,b)=>a+b,0)/arr.length);
}

function updateOverall() {
  let total = 0, count = 0;

  for (let sub in data) {
    if (data[sub].length) {
      total += average(data[sub]);
      count++;
    }
  }

  if (count === 0) return;

  const overall = Math.round(total/count);
  document.getElementById("overallAverage").innerText = overall + "%";
  document.getElementById("projectedBand").innerText = gradeBand(overall, "H");

  let recovered = 0;
  for (let sub in data) {
    if (initialMock[sub] !== null) {
      recovered += (average(data[sub]) - initialMock[sub]);
    }
  }

  document.getElementById("marksRecovered").innerText = recovered;
}

function gradeBand(score, level) {
  if (score >= 90) return level + "1";
  if (score >= 80) return level + "2";
  if (score >= 70) return level + "3";
  if (score >= 60) return level + "4";
  if (score >= 50) return level + "5";
  if (score >= 40) return level + "6";
  return level + "7/8";
}

function renderChart() {
  const ctx = document.getElementById("chartCanvas");

  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: data[currentSubject].map((_,i)=>"Test "+(i+1)),
      datasets: [{
        label: "Performance %",
        data: data[currentSubject],
        borderColor: "#4cafef",
        tension: 0.2
      }]
    }
  });
}

function coachLogic() {
  const scores = data[currentSubject];
  if (scores.length < 2) return;

  let latest = scores[scores.length - 1];
  let prev = scores[scores.length - 2];

  let message = "";

  if (latest > prev) {
    message = "Positive upward trend. Continue targeted drills.";
  } else if (latest < prev) {
    message = "Drop detected. Review weakest section immediately.";
  } else {
    message = "Stable. Push for marginal gains.";
  }

  document.getElementById("coachOutput").innerHTML =
    "<p><strong>Coach:</strong> "+message+"</p>";

  document.getElementById("drillOutput").innerHTML =
    "<p><strong>Assigned Drill:</strong> Complete 2 short timed reps in weakest area.</p>";
}
