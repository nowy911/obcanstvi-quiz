const content = document.getElementById("content");

function startExam() {
  const questions = shuffle([...QUESTIONS]).slice(0, 30);

  let html = "<h2>Zkouška</h2>";

  questions.forEach((q, index) => {
    html += `
      <div class="question">
        <h3>${index + 1}. ${q.question}</h3>

        ${Object.entries(q.options)
          .map(
            ([key, value]) => `
          <label>
            <input type="radio" name="q${index}" value="${key}">
            ${key}) ${value}
          </label><br>
        `
          )
          .join("")}
      </div>
      <hr>
    `;
  });

  html += `<button onclick="checkExam()">Vyhodnotit</button>`;

  content.innerHTML = html;

  window.currentExam = questions;
}

function checkExam() {
  let score = 0;

  currentExam.forEach((q, index) => {
    const selected = document.querySelector(
      `input[name="q${index}"]:checked`
    );

    if (selected && selected.value === q.correct) {
      score++;
    }
  });

  const percent = Math.round((score / currentExam.length) * 100);

  content.innerHTML += `
    <h2>Výsledek</h2>
    <p>${score} / ${currentExam.length}</p>
    <p>${percent}%</p>
  `;
}

function startPractice() {
  content.innerHTML =
    "<h2>Procvičování bude doplněno v dalším kroku</h2>";
}

function showStats() {
  content.innerHTML =
    "<h2>Statistiky budou doplněny v dalším kroku</h2>";
}

function showMistakes() {
  content.innerHTML =
    "<h2>Moje chyby budou doplněny v dalším kroku</h2>";
}

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}
