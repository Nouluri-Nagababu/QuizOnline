let quizData = [];
let currentQuestionIndex = 0;
let score = 0;
let answerChecked = false;

const quizContainer = document.getElementById("quiz-container");
const welcomeContainer = document.getElementById("welcome-container");
const startButton = document.getElementById("start-button");
const checkButton = document.getElementById("check-button");
const nextButton = document.getElementById("next-button");
const resultDisplay = document.getElementById("result");
const quizElement = document.getElementById("quiz");

startButton.addEventListener("click", () => {
  welcomeContainer.style.display = "none"; // Hide welcome screen
  quizContainer.style.display = "block"; // Show quiz screen
  loadQuestion();
});

// Load questions from JSON file
fetch("questions.json")
  .then((response) => response.json())
  .then((data) => {
    quizData = data;
  })
  .catch((error) => console.error("Error loading questions:", error));

function loadQuestion() {
  answerChecked = false; // Reset for new question
  const currentQuestion = quizData[currentQuestionIndex];
  quizElement.innerHTML = `
    <h2>${currentQuestion.question}</h2>
    <label><input type="radio" name="answer" value="a"> ${currentQuestion.a}</label><br>
    <label><input type="radio" name="answer" value="b"> ${currentQuestion.b}</label><br>
    <label><input type="radio" name="answer" value="c"> ${currentQuestion.c}</label><br>
    <label><input type="radio" name="answer" value="d"> ${currentQuestion.d}</label>
  `;
  nextButton.style.display = "none"; // Hide Next button initially
}

function getSelectedAnswer() {
  const answers = document.querySelectorAll('input[name="answer"]');
  for (const answer of answers) {
    if (answer.checked) {
      return answer.value;
    }
  }
  return null;
}

function highlightAnswers(selectedAnswer) {
  const labels = quizElement.querySelectorAll("label");
  labels.forEach((label) => {
    const input = label.querySelector("input");
    if (input.value === quizData[currentQuestionIndex].correct) {
      label.classList.add("correct");
    } else if (input.value === selectedAnswer) {
      label.classList.add("incorrect");
    }
  });
}

checkButton.addEventListener("click", () => {
  if (answerChecked) return; // Prevent checking the answer again

  const selectedAnswer = getSelectedAnswer();
  if (selectedAnswer) {
    highlightAnswers(selectedAnswer);
    answerChecked = true;

    if (selectedAnswer === quizData[currentQuestionIndex].correct) {
      score++;
    }

    nextButton.style.display = "block"; // Show Next button
  } else {
    alert("Please select an answer!");
  }
});

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < quizData.length) {
    loadQuestion();
  } else {
    resultDisplay.innerHTML = `You scored ${score} out of ${quizData.length}`;
    quizElement.style.display = "none";
    checkButton.style.display = "none"; // Hide Check Answer button
    nextButton.style.display = "none"; // Hide Next button
  }
});
