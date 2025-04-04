import { questions } from "./questions.js";

class Quiz {
  constructor(questions) {
    this.questions = questions;
    this.currentIndex = 0;
    this.score = 0;

    // Elementos do DOM
    this.quizContainer = document.getElementById("quiz-container");
    this.card = document.getElementById("quiz-card");
    this.questionText = document.getElementById("question-text");
    this.contextText = document.getElementById("context-text");
    this.resultContainer = document.getElementById("result");
    this.loadingScreen = document.getElementById("loading");
    this.scoreMessage = document.getElementById("score-message");

    // Botões principais
    this.startBtn = document.getElementById("startBtn");
    this.restartBtn = document.getElementById("restartBtn");

    // Liga os eventos
    this.startBtn.addEventListener("click", () => this.startQuiz());
    this.restartBtn.addEventListener("click", () => this.restartQuiz());

    this.loadButtons();
  }

  loadButtons() {
    const btnYes = document.getElementById("btn-yes");
    const btnNo = document.getElementById("btn-no");
    const nextBtn = document.getElementById("next-question");

    // Substitui por clones para remover event listeners anteriores
    const newBtnYes = btnYes.cloneNode(true);
    const newBtnNo = btnNo.cloneNode(true);
    const newNext = nextBtn.cloneNode(true);

    btnYes.replaceWith(newBtnYes);
    btnNo.replaceWith(newBtnNo);
    nextBtn.replaceWith(newNext);

    newBtnYes.addEventListener("click", () => this.answer(true));
    newBtnNo.addEventListener("click", () => this.answer(false));
    newNext.addEventListener("click", () => this.goToNextQuestion());
  }

  startQuiz() {
    document.getElementById("start").classList.add("hidden");
    this.quizContainer.classList.remove("hidden");
    this.loadQuestion();
  }

  loadQuestion() {
    const current = this.questions[this.currentIndex];
    this.questionText.innerText = current.text;
    this.contextText.innerText = current.context;
    this.loadButtons();
  }

  answer(isYes) {
    if (isYes) this.score++;
    this.card.classList.add("flip");
  }

  goToNextQuestion() {
    this.card.classList.remove("flip");
    this.currentIndex++;

    if (this.currentIndex < this.questions.length) {
      this.loadQuestion();
    } else {
      this.showResult();
    }
  }

  showResult() {
    // Esconde quiz, mostra loading
    this.quizContainer.classList.add("hidden");
    this.resultContainer.classList.add("hidden");
    this.loadingScreen.classList.remove("hidden");

    setTimeout(() => {
      this.loadingScreen.classList.add("hidden");
      this.resultContainer.classList.remove("hidden");

      const percent = (this.score / this.questions.length) * 100;

      if (percent >= 70) {
        this.scoreMessage.innerText =
          "⚠️ Risco Elevado. Procure ajuda imediatamente.";
      } else if (percent >= 40) {
        this.scoreMessage.innerText =
          "⚠️ Risco Moderado. Mantenha-se alerta e procure ajuda.";
      } else {
        this.scoreMessage.innerText =
          "✅ Risco Baixo. No entanto, esteja alerta aos sinais.";
      }
    }, 2000);
  }

  restartQuiz() {
    this.currentIndex = 0;
    this.score = 0;

    // Esconde tudo
    this.quizContainer.classList.add("hidden");
    this.resultContainer.classList.add("hidden");
    this.loadingScreen.classList.add("hidden");

    // Volta ao menu inicial
    document.getElementById("start").classList.remove("hidden");
  }
}

// Inicializa o quiz
new Quiz(questions);
