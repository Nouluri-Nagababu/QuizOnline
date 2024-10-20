let questions = [];
let currentQuestionIndex = 0;
let score = 0;

const welcomeContainer = document.getElementById("welcome-container");
const quizContainer = document.getElementById("quiz-container");
const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const resultContainer = document.getElementById("result-container");
const scoreElement = document.getElementById("score");
const restartButton = document.getElementById("restart-btn");
const startButton = document.getElementById("start-btn");

startButton.addEventListener("click", startQuiz);

function startQuiz() {
  welcomeContainer.classList.add("hidden");
  quizContainer.classList.remove("hidden");
  currentQuestionIndex = 0;
  score = 0;
  showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  answerButtonsElement.innerHTML = "";
  document.getElementById("question-number").innerText = `Question ${
    currentQuestionIndex + 1
  } of ${questions.length}`;

  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    button.addEventListener("click", () => selectAnswer(answer, button));
    answerButtonsElement.appendChild(button);
  });
}

function selectAnswer(answer, button) {
  const correctAnswer = answer.correct;

  if (correctAnswer) {
    button.classList.add("correct");
    score++;
  } else {
    button.classList.add("incorrect");
    highlightCorrectAnswer();
  }

  Array.from(answerButtonsElement.children).forEach((btn) => {
    btn.disabled = true;
  });

  nextButton.classList.remove("hidden");
}

function highlightCorrectAnswer() {
  const correctAnswer = questions[currentQuestionIndex].answers.find(
    (ans) => ans.correct
  );
  const correctButton = Array.from(answerButtonsElement.children).find(
    (btn) => btn.innerText === correctAnswer.text
  );
  if (correctButton) {
    correctButton.classList.add("correct");
  }
}

function showNextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion(questions[currentQuestionIndex]);
    nextButton.classList.add("hidden");
  } else {
    showScore();
  }
}

function showScore() {
  quizContainer.classList.add("hidden");
  resultContainer.classList.remove("hidden");
  nextButton.classList.add("hidden");
  scoreElement.innerText = `${score} / ${questions.length}`;
}

function restartQuiz() {
  startQuiz();
}

nextButton.addEventListener("click", showNextQuestion);
restartButton.addEventListener("click", restartQuiz);

// Fetch the questions from the file
fetch("questions.json")
  .then((response) => response.json())
  .then((data) => {
    questions = data;
  })
  .catch((error) => console.error("Error loading questions:", error));
