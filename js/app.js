let data;        // 포지션별 카드 수
let teams;       // 팀 목록
let positions;   // 포지션 목록

let teamTotals = {};
let globalRatio = {};
let totalCards = 0;

// 잠재력 데이터 (CSV -> 객체)
const potentialGrades = ["E","D","D+","C","C+","B","B+","A","A+","S","S+","SS","SS+","SR","SR+"];
const potentialCsv = `현재잠재력,목표잠재력,하급,중급,상급
E,D,100,0,0
E,D+,300,400,0
E,C,600,850,0
E,C+,1000,1350,0
E,B,1000,1950,700
E,B+,1000,2600,1450
E,A,1000,3350,2250
E,A+,1000,4200,3100
E,S,1000,5100,4000
E,S+,1000,6050,4950
E,SS,1000,7050,5950
E,SS+,1000,8100,7000
E,SR,1000,9200,8100
E,SR+,1000,10350,9250
D,D,0,0,0
D,D+,200,400,0
D,C,500,850,0
D,C+,900,1350,0
D,B,900,1950,700
D,B+,900,2600,1450
D,A,900,3350,2250
D,A+,900,4200,3100
D,S,900,5100,4000
D,S+,900,6050,4950
D,SS,900,7050,5950
D,SS+,900,8100,7000
D,SR,900,9200,8100
D,SR+,900,10350,9250
D+,D,0,0,0
D+,D+,0,0,0
D+,C,300,450,0
D+,C+,700,950,0
D+,B,700,1550,700
D+,B+,700,2200,1450
D+,A,700,2950,2250
D+,A+,700,3800,3100
D+,S,700,4700,4000
D+,S+,700,5650,4950
D+,SS,700,6650,5950
D+,SS+,700,7700,7000
D+,SR,700,8800,8100
D+,SR+,700,9950,9250
C,D,0,0,0
C,D+,0,0,0
C,C,0,0,0
C,C+,400,500,0
C,B,400,1100,700
C,B+,400,1750,1450
C,A,400,2500,2250
C,A+,400,3350,3100
C,S,400,4250,4000
C,S+,400,5200,4950
C,SS,400,6200,5950
C,SS+,400,7250,7000
C,SR,400,8350,8100
C,SR+,400,9500,9250
C+,D,0,0,0
C+,D+,0,0,0
C+,C,0,0,0
C+,C+,0,0,0
C+,B,0,600,700
C+,B+,0,1250,1450
C+,A,0,2000,2250
C+,A+,0,2850,3100
C+,S,0,3750,4000
C+,S+,0,4700,4950
C+,SS,0,5700,5950
C+,SS+,0,6750,7000
C+,SR,0,7850,8100
C+,SR+,0,9000,9250
B,D,0,0,0
B,D+,0,0,0
B,C,0,0,0
B,C+,0,0,0
B,B,0,0,0
B,B+,0,650,750
B,A,0,1400,1550
B,A+,0,2250,2400
B,S,0,3150,3300
B,S+,0,4100,4250
B,SS,0,5100,5250
B,SS+,0,6150,6300
B,SR,0,7250,7400
B,SR+,0,8400,8550
B+,D,0,0,0
B+,D+,0,0,0
B+,C,0,0,0
B+,C+,0,0,0
B+,B,0,0,0
B+,B+,0,0,0
B+,A,0,750,800
B+,A+,0,1600,1650
B+,S,0,2500,2550
B+,S+,0,3450,3500
B+,SS,0,4450,4500
B+,SS+,0,5500,5550
B+,SR,0,6600,6650
B+,SR+,0,7750,7800
A,D,0,0,0
A,D+,0,0,0
A,C,0,0,0
A,C+,0,0,0
A,B,0,0,0
A,B+,0,0,0
A,A,0,0,0
A,A+,0,850,850
A,S,0,1750,1750
A,S+,0,2700,2700
A,SS,0,3700,3700
A,SS+,0,4750,4750
A,SR,0,5850,5850
A,SR+,0,7000,7000
A+,D,0,0,0
A+,D+,0,0,0
A+,C,0,0,0
A+,C+,0,0,0
A+,B,0,0,0
A+,B+,0,0,0
A+,A,0,0,0
A+,A+,0,0,0
A+,S,0,900,900
A+,S+,0,1850,1850
A+,SS,0,2850,2850
A+,SS+,0,3900,3900
A+,SR,0,5000,5000
A+,SR+,0,6150,6150
S,D,0,0,0
S,D+,0,0,0
S,C,0,0,0
S,C+,0,0,0
S,B,0,0,0
S,B+,0,0,0
S,A,0,0,0
S,A+,0,0,0
S,S,0,0,0
S,S+,0,950,950
S,SS,0,1950,1950
S,SS+,0,3000,3000
S,SR,0,4100,4100
S,SR+,0,5250,5250
S+,D,0,0,0
S+,D+,0,0,0
S+,C,0,0,0
S+,C+,0,0,0
S+,B,0,0,0
S+,B+,0,0,0
S+,A,0,0,0
S+,A+,0,0,0
S+,S,0,0,0
S+,S+,0,0,0
S+,SS,0,1000,1000
S+,SS+,0,2050,2050
S+,SR,0,3150,3150
S+,SR+,0,4300,4300
SS,D,0,0,0
SS,D+,0,0,0
SS,C,0,0,0
SS,C+,0,0,0
SS,B,0,0,0
SS,B+,0,0,0
SS,A,0,0,0
SS,A+,0,0,0
SS,S,0,0,0
SS,S+,0,0,0
SS,SS,0,0,0
SS,SS+,0,1050,1050
SS,SR,0,2150,2150
SS,SR+,0,3300,3300
SS+,D,0,0,0
SS+,D+,0,0,0
SS+,C,0,0,0
SS+,C+,0,0,0
SS+,B,0,0,0
SS+,B+,0,0,0
SS+,A,0,0,0
SS+,A+,0,0,0
SS+,S,0,0,0
SS+,S+,0,0,0
SS+,SS,0,0,0
SS+,SS+,0,0,0
SS+,SR,0,1100,1100
SS+,SR+,0,2250,2250
SR,D,0,0,0
SR,D+,0,0,0
SR,C,0,0,0
SR,C+,0,0,0
SR,B,0,0,0
SR,B+,0,0,0
SR,A,0,0,0
SR,A+,0,0,0
SR,S,0,0,0
SR,S+,0,0,0
SR,SS,0,0,0
SR,SS+,0,0,0
SR,SR,0,0,0
SR,SR+,0,1150,1150
SR+,D,0,0,0
SR+,D+,0,0,0
SR+,C,0,0,0
SR+,C+,0,0,0
SR+,B,0,0,0
SR+,B+,0,0,0
SR+,A,0,0,0
SR+,A+,0,0,0
SR+,S,0,0,0
SR+,S+,0,0,0
SR+,SS,0,0,0
SR+,SS+,0,0,0
SR+,SR,0,0,0
SR+,SR+,0,0,0`;

const potentialCosts = buildPotentialCosts(potentialCsv);

// JSON 로드
fetch("data/cards.json")
    .then(res => res.json())
    .then(json => {
        data = json.positions;
        teams = json.teams;
        positions = Object.keys(data);

        init();
    })
    .catch(err => {
        document.getElementById("result").innerHTML =
            "<h2>데이터 로딩 실패</h2><p>cards.json을 확인하세요.</p>";
        console.error(err);
    });

function init() {
    calculateTotals();
    renderButtons();
    renderTable();
}

// ---------------- 계산 ----------------

function calculateTotals() {
    // 팀별 전체 카드 수
    teams.forEach(team => {
        teamTotals[team] = positions.reduce(
            (sum, pos) => sum + data[pos][team], 0
        );
    });

    totalCards = Object.values(teamTotals).reduce((a, b) => a + b, 0);

    // 포지션별 전체 평균 비율
    positions.forEach(pos => {
        const posTotal = teams.reduce(
            (sum, team) => sum + data[pos][team], 0
        );
        globalRatio[pos] = posTotal / totalCards;
    });
}

// ---------------- 렌더링 ----------------

function renderButtons() {
    const container = document.getElementById("position-buttons");
    positions.forEach(pos => {
        const btn = document.createElement("button");
        btn.className = "position-btn";
        btn.dataset.position = pos;
        btn.innerText = pos;
        btn.onclick = () => {
            btn.classList.toggle("selected");
            updateResult();
        };
        container.appendChild(btn);
    });
}

function renderTable() {
    const head = document.getElementById("table-head");
    const body = document.getElementById("data-body");

    // 헤더
    teams.forEach(team => {
        const th = document.createElement("th");
        th.innerText = team;
        head.appendChild(th);
    });

    // 바디
    positions.forEach(pos => {
        const tr = document.createElement("tr");
        tr.innerHTML = `<td>${pos}</td>`;
        teams.forEach(team => {
            tr.innerHTML += `<td>${data[pos][team]}</td>`;
        });
        body.appendChild(tr);
    });
}

// ---------------- 결과 계산 ----------------

function updateResult() {
    const selected = [...document.querySelectorAll(".position-btn.selected")]
        .map(btn => btn.dataset.position);

    if (selected.length === 0) {
        document.getElementById("result").innerHTML =
            "<h2>포지션을 선택하세요</h2>";
        return;
    }

    const scores = {};
    teams.forEach(team => {
        scores[team] = selected.reduce((sum, pos) => {
            const actual = data[pos][team];
            const expected = teamTotals[team] * globalRatio[pos];
            return sum + (actual - expected);
        }, 0);
    });

    const maxScore = Math.max(...Object.values(scores));
    const winners = Object.entries(scores)
        .filter(([_, s]) => s === maxScore)
        .map(([t]) => t);

    let html = `<h2>선택 포지션: ${selected.join(", ")}</h2>`;
    html += `<div class="winner">최적 구단: ${winners.join(", ")}</div>`;
    html += `<h3>특화도 순위</h3>`;

    Object.entries(scores)
        .sort((a, b) => b[1] - a[1])
        .forEach(([team, score], i) => {
            html += `
            <div class="detail-item">
                <span>${i + 1}. ${team}</span>
                <span>${score.toFixed(2)}</span>
            </div>`;
        });

    document.getElementById("result").innerHTML = html;
}

// ---------------- 잠재력 계산기 ----------------

function buildPotentialCosts(csv) {
    const lines = csv.trim().split(/\r?\n/).slice(1);
    return lines.reduce((table, line) => {
        const [current, target, low, mid, high] = line.split(",").map(s => s.trim());
        if (!table[current]) table[current] = {};
        table[current][target] = {
            low: Number(low),
            mid: Number(mid),
            high: Number(high)
        };
        return table;
    }, {});
}

function setupNavigation() {
    const buttons = document.querySelectorAll(".nav-btn");
    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            buttons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            showPage(btn.dataset.target);
        });
    });
}

function showPage(targetId) {
    document.querySelectorAll(".page").forEach(section => {
        section.classList.toggle("active", section.id === targetId);
    });
}

function renderPotentialSelects() {
    const currentSelect = document.getElementById("current-grade");
    const targetSelect = document.getElementById("target-grade");

    potentialGrades.forEach(grade => {
        const optCurrent = document.createElement("option");
        optCurrent.value = grade;
        optCurrent.innerText = grade;
        currentSelect.appendChild(optCurrent);

        const optTarget = document.createElement("option");
        optTarget.value = grade;
        optTarget.innerText = grade;
        targetSelect.appendChild(optTarget);
    });

    currentSelect.value = "E";
    targetSelect.value = "SR+";

    currentSelect.onchange = updatePotentialResult;
    targetSelect.onchange = updatePotentialResult;
}

function updatePotentialResult() {
    const current = document.getElementById("current-grade").value;
    const target = document.getElementById("target-grade").value;
    const resultBox = document.getElementById("potential-result");

    const cost = potentialCosts[current] && potentialCosts[current][target];

    if (!cost) {
        resultBox.innerHTML = `<h3>계산 불가</h3><p>선택한 조합에 대한 데이터가 없습니다.</p>`;
        return;
    }

    resultBox.innerHTML = `
        <h3>${current} → ${target}</h3>
        <div class="tokens">
            <div class="token-box">
                <div class="label">하급</div>
                <div class="value">${formatNumber(cost.low)}개</div>
            </div>
            <div class="token-box">
                <div class="label">중급</div>
                <div class="value">${formatNumber(cost.mid)}개</div>
            </div>
            <div class="token-box">
                <div class="label">상급</div>
                <div class="value">${formatNumber(cost.high)}개</div>
            </div>
        </div>
    `;
}

function formatNumber(num) {
    return Number(num || 0).toLocaleString();
}

// 초기화 (탭/잠재력)
setupNavigation();
renderPotentialSelects();
updatePotentialResult();
