const questions = [
  {
    question: "How many continents are there on Earth?",
    answers: [
      { text: "5", correct: false },
      { text: "6", correct: false },
      { text: "7", correct: true },
      { text: "8", correct: false }
    ]
  },
  {
    question: "Who wrote 'Harry Potter'?",
    answers: [
      { text: "J.K. Rowling", correct: true },
      { text: "Rick Riordan", correct: false },
      { text: "Roald Dahl", correct: false },
      { text: "Suzanne Collins", correct: false }
    ]
  },
  {
    question: "What is the largest ocean on Earth?",
    answers: [
      { text: "Atlantic Ocean", correct: false },
      { text: "Pacific Ocean", correct: true },
      { text: "Indian Ocean", correct: false },
      { text: "Arctic Ocean", correct: false }
    ]
  },
  {
    question: "Which gas do plants absorb from the atmosphere?",
    answers: [
      { text: "Oxygen", correct: false },
      { text: "Nitrogen", correct: false },
      { text: "Carbon Dioxide", correct: true },
      { text: "Helium", correct: false }
    ]
  },
  {
    question: "How many legs does a spider have?",
    answers: [
      { text: "6", correct: false },
      { text: "8", correct: true },
      { text: "10", correct: false },
      { text: "12", correct: false }
    ]
  },
  {
    question: "What is H2O?",
    answers: [
      { text: "Salt", correct: false },
      { text: "Hydrogen", correct: false },
      { text: "Water", correct: true },
      { text: "Air", correct: false }
    ]
  },
  {
    question: "What is the biggest planet in our solar system?",
    answers: [
      { text: "Earth", correct: false },
      { text: "Mars", correct: false },
      { text: "Saturn", correct: false },
      { text: "Jupiter", correct: true }
    ]
  },
  {
    question: "Which animal is known as the King of the Jungle?",
    answers: [
      { text: "Tiger", correct: false },
      { text: "Elephant", correct: false },
      { text: "Lion", correct: true },
      { text: "Bear", correct: false }
    ]
  },
  {
    question: "How many sides does a hexagon have?",
    answers: [
      { text: "5", correct: false },
      { text: "6", correct: true },
      { text: "7", correct: false },
      { text: "8", correct: false }
    ]
  },
  {
    question: "Which country invented pizza?",
    answers: [
      { text: "Italy", correct: true },
      { text: "France", correct: false },
      { text: "USA", correct: false },
      { text: "Egypt", correct: false }
    ]
  },
  {
    question: "What is the fastest land animal?",
    answers: [
      { text: "Lion", correct: false },
      { text: "Gazelle", correct: false },
      { text: "Cheetah", correct: true },
      { text: "Horse", correct: false }
    ]
  },
  {
    question: "Which bird can fly backwards?",
    answers: [
      { text: "Eagle", correct: false },
      { text: "Hummingbird", correct: true },
      { text: "Owl", correct: false },
      { text: "Parrot", correct: false }
    ]
  },
  {
    question: "How many players are on a soccer team?",
    answers: [
      { text: "9", correct: false },
      { text: "10", correct: false },
      { text: "11", correct: true },
      { text: "12", correct: false }
    ]
  },
  {
    question: "What do bees make?",
    answers: [
      { text: "Milk", correct: false },
      { text: "Honey", correct: true },
      { text: "Chocolate", correct: false },
      { text: "Butter", correct: false }
    ]
  },
  {
    question: "What is the closest star to Earth?",
    answers: [
      { text: "Polaris", correct: false },
      { text: "Sirius", correct: false },
      { text: "The Sun", correct: true },
      { text: "Betelgeuse", correct: false }
    ]
  },
  {
    question: "Which shape has 4 equal sides?",
    answers: [
      { text: "Rectangle", correct: false },
      { text: "Square", correct: true },
      { text: "Triangle", correct: false },
      { text: "Pentagon", correct: false }
    ]
  },
  {
    question: "What is the freezing point of water?",
    answers: [
      { text: "0°C", correct: true },
      { text: "50°C", correct: false },
      { text: "100°C", correct: false },
      { text: "-10°C", correct: false }
    ]
  },
  {
    question: "How many days are in a leap year?",
    answers: [
      { text: "365", correct: false },
      { text: "366", correct: true },
      { text: "364", correct: false },
      { text: "360", correct: false }
    ]
  }
];



const questionEl = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextBtn = document.getElementById("next-btn");
const resultBox = document.getElementById("result-box");
const scoreEl = document.getElementById("score");
const restartBtn = document.getElementById("restart-btn");

let currentQuestion = 0;
let score = 0;

startQuiz();

function startQuiz() {
  currentQuestion = 0;
  score = 0;

  resultBox.classList.add("hide");
  nextBtn.classList.add("hide");

  document.getElementById("quiz-box").classList.remove("hide");

  showQuestion();
}

function showQuestion() {
  resetState();

  let q = questions[currentQuestion];
  questionEl.textContent = q.question;

  q.answers.forEach(answer => {
    const btn = document.createElement("button");
    btn.textContent = answer.text;
    if (answer.correct) {
      btn.dataset.correct = true;
    }
    btn.addEventListener("click", selectAnswer);
    answerButtons.appendChild(btn);
  });
}

function resetState() {
  nextBtn.classList.add("hide");
  answerButtons.innerHTML = "";
}

function selectAnswer(e) {
  const selected = e.target;
  const correct = selected.dataset.correct === "true";

  if (correct) score++;

  Array.from(answerButtons.children).forEach(btn => {
    if (btn.dataset.correct === "true") {
      btn.classList.add("correct");
    } else {
      btn.classList.add("wrong");
    }
    btn.disabled = true;
  });

  nextBtn.classList.remove("hide");
}

nextBtn.addEventListener("click", () => {
  currentQuestion++;

  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResults();
  }
});

function showResults() {
  document.getElementById("quiz-box").classList.add("hide");
  resultBox.classList.remove("hide");

  scoreEl.textContent = `${score} / ${questions.length}`;
}

restartBtn.addEventListener("click", startQuiz);
