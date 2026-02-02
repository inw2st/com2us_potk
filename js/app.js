let data;        // 포지션별 카드 수
let teams;       // 팀 목록
let positions;   // 포지션 목록

let teamTotals = {};
let globalRatio = {};
let totalCards = 0;

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
