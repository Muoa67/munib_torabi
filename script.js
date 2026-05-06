// DOM Elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

const quizQuestions = [
  {
    question: "Who invented the rubik's cube?",
    answers: [
      { text: "Elon Musk", correct: false },
      { text: "Erno rubik", correct: true },
      { text: "Abraham Lincoln", correct: false },
      { text: "George Washington", correct: false },
    ],
  },
  {
    question: "When was the rubik's cube invented?",
    answers: [
      { text: "1974", correct: true },
      { text: "1964", correct: false },
      { text: "2000", correct: false },
      { text: "1999", correct: false },
    ],
  },
  {
    question: "How many possible combinations are there on a rubik's cube?",
    answers: [
      { text: "76 billion", correct: false },
      { text: "10 trillion", correct: false },
      { text: "40 quintillion", correct: false },
      { text: "43 quintillion", correct: true },
    ],
  },
  {
    question: "What was the original name of the rubik's cube?",
    answers: [
      { text: "The color cube", correct: false },
      { text: "The architectural toy", correct: false },
      { text: "The magic cube", correct: true },
      { text: "3D puzzle", correct: false },
    ],
  },
  {
    question: "As of 2026, who holds the official world record for the fastest single 3x3 rubik's cube solve?",
    answers: [
      { text: "Mats Valk", correct: false },
      { text: "Max Park", correct: false },
      { text: "Yusheng Du", correct: true },
      { text: "Feliks Zemdegs", correct: false },
    ],
  },
];

// QUIZ STATE VARS
let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

// event listeners

startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  scoreSpan.textContent = 0;
  answersDisabled = false;

  startScreen.classList.remove("active");
  quizScreen.classList.add("active");

  showQuestion(); // 👈 This actually displays the first question
}

function restartQuiz() {
  console.log("quiz re-started");
}

function showQuestion() {
  // Get the current question object
  const currentQuestion = quizQuestions[currentQuestionIndex];
  questionText.textContent = currentQuestion.question;

  // Clear any previous answers
  answersContainer.innerHTML = "";

  // Loop through all answers and create buttons
  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("answer-btn");

    // Click handler for each answer
    button.addEventListener("click", () => selectAnswer(answer.correct, button));
    answersContainer.appendChild(button);
  });

  // Update progress display
  currentQuestionSpan.textContent = currentQuestionIndex + 1;
  progressBar.style.width = ((currentQuestionIndex + 1) / quizQuestions.length) * 100 + "%";
}

function selectAnswer(isCorrect, button) {
  if (answersDisabled) return;
  answersDisabled = true;

  if (isCorrect) {
    button.classList.add("correct");
    score++;
    scoreSpan.textContent = score;
  } else {
    button.classList.add("incorrect");

    // Highlight the correct answer in green
    const correctBtn = answersContainer.querySelector(
      ".answer-btn:nth-child(" +
        (quizQuestions[currentQuestionIndex].answers.findIndex(a => a.correct) + 1) +
        ")"
    );
    if (correctBtn) correctBtn.classList.add("correct");
  }

  // Disable all buttons
  const allButtons = answersContainer.querySelectorAll(".answer-btn");
  allButtons.forEach(btn => (btn.disabled = true));

  // Move to next question after delay
  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
      answersDisabled = false;
      showQuestion();
    } else {
      showResults();
    }
  }, 1500);
}


function showResults() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  finalScoreSpan.textContent = score;
  resultMessage.textContent =
    score === quizQuestions.length ? "Perfect score! 🏆" : "Good effort!";
}

function restartQuiz() {
  // Reset and go back to start
  resultScreen.classList.remove("active");
  startScreen.classList.add("active");
}
