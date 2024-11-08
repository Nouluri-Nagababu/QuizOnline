let quizData = [];
let currentQuestionIndex = 0;
let score = 0;
let answerChecked = false;

const quizContainer = document.getElementById("quiz");
const checkButton = document.getElementById("check-button");
const nextButton = document.getElementById("next-button");
const resultDisplay = document.getElementById("result");

// Load questions from the JSON file
fetch("questions.json")
  .then((response) => response.json())
  .then((data) => {
    quizData = data;
    loadQuestion();  // Load the first question once the data is available
  })
  .catch((error) => console.error("Error loading questions:", error));

function loadQuestion() {
  // Reset the flag for checking answers
  answerChecked = false;

  const currentQuestion = quizData[currentQuestionIndex];

  // If the current question exists, render it
  if (currentQuestion) {
    quizContainer.innerHTML = `
      <h2>${currentQuestion.question}</h2>
      <label><input type="radio" name="answer" value="a"> ${currentQuestion.a}</label><br>
      <label><input type="radio" name="answer" value="b"> ${currentQuestion.b}</label><br>
      <label><input type="radio" name="answer" value="c"> ${currentQuestion.c}</label><br>
      <label><input type="radio" name="answer" value="d"> ${currentQuestion.d}</label>
    `;
  } else {
    console.error('Current question data is undefined!');
  }

  nextButton.style.display = "none"; // Hide the Next button initially
}

function getSelectedAnswer() {
  // Get the selected radio button value
  const answers = document.querySelectorAll('input[name="answer"]');
  for (const answer of answers) {
    if (answer.checked) {
      return answer.value;
    }
  }
  return null;  // If no answer is selected, return null
}

function highlightAnswers(selectedAnswer) {
  // Highlight the correct/incorrect options based on the user's selection
  const labels = quizContainer.querySelectorAll("label");
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
    highlightAnswers(selectedAnswer);  // Highlight correct/incorrect answers
    answerChecked = true;

    if (selectedAnswer === quizData[currentQuestionIndex].correct) {
      score++;  // Increment score if the answer is correct
    }

    nextButton.style.display = "block"; // Show the Next button
  } else {
    alert("Please select an answer!");  // Alert if no answer is selected
  }
});

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;  // Move to the next question

  if (currentQuestionIndex < quizData.length) {
    loadQuestion();  // Load the next question
  } else {
    // End the quiz and display the final result
    resultDisplay.innerHTML = `You scored ${score} out of ${quizData.length}`;
    quizContainer.style.display = "none";
    checkButton.style.display = "none"; // Hide the Check Answer button
    nextButton.style.display = "none"; // Hide the Next button
  }
});
