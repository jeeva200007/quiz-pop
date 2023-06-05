const container = document.querySelector(".container");
const questionBox = document.querySelector(".question");
const choicesBox = document.querySelector(".choices");
const nextBtn = document.querySelector(".nextBtn");
const scoreCard = document.querySelector(".scoreCard");
const alert = document.querySelector(".alert");
const startBtn = document.querySelector(".startBtn");
const timer = document.querySelector(".timer");
const quiz = [
  {
    id: 11,
    question: "Which artist is known for coining the term 'Surrealism'?",
    choices: [
      "Pablo Picasso",
      "Salvador Dali",
      "Vincent van Gogh",
      "Henri Matisse",
    ],
    answer: "Salvador Dali",
    category: "modern-art",
  },
  {
    id: 12,
    question:
      "Which movement is associated with the use of abstract forms and shapes in art?",
    choices: ["Impressionism", "Expressionism", "Futurism", "Cubism"],
    answer: "Cubism",
    category: "modern-art",
  },
  {
    id: 13,
    question:
      "Which artist is known for painting the work 'The Persistence of Memory'?",
    choices: [
      "Pablo Picasso",
      "Salvador Dali",
      "Vincent van Gogh",
      "Henri Matisse",
    ],
    answer: "Salvador Dali",
    category: "modern-art",
  },
  {
    id: 14,
    question: "Which artist is known for creating the painting 'The Scream'?",
    choices: [
      "Vincent van Gogh",
      "Salvador Dali",
      "Edvard Munch",
      "Claude Monet",
    ],
    answer: "Edvard Munch",
    category: "modern-art",
  },
  {
    id: 15,
    question:
      "What movement was associated with the use of bold, bright colors and thick brushstrokes?",
    choices: ["Impressionism", "Expressionism", "Fauvism", "Cubism"],
    answer: "Fauvism",
    category: "modern-art",
  },
  {
    id: 16,
    question:
      "What movement was associated with the use of bright colors, simplified forms, and a focus on movement and speed",
    choices: [
      "Impressionism",
      "Futurism",
      "Surrealism",
      "Abstract Expressionism",
    ],
    answer: "Futurism",
    category: "modern-art",
  },
  {
    id: 17,
    question: "Which artist is known for creating the painting 'Water Lilies'?",
    choices: ["Claude Monet", "Paul Cezanne", "Paul Gauguin", "Paul Klee"],
    answer: "Claude Monet",
    category: "modern-art",
  },
  {
    id: 18,
    question:
      "Which artist is known for creating the painting 'Les Demoiselles d'Avignon'?",
    choices: [
      "Henri Matisse",
      "Vincent van Gogh",
      "Salvador Dali",
      "Pablo Picasso",
    ],
    answer: "Pablo Picasso",
    category: "modern-art",
  },
  {
    id: 19,
    question: "Which artist is known for creating the painting 'Guernica'?",
    choices: [
      "Claude Mone",
      "Paul Cezanne",
      "Pablo Picasso",
      "Vincent van Gogh",
    ],
    answer: "Pablo Picasso",
    category: "modern-art",
  },
  {
    id: 20,
    question: "Which artist is known for creating the sculpture 'The Thinker'?",
    choices: ["Auguste Rodin", "Alexander Calder", "Jean Arp", "Henry Moore"],
    answer: "Auguste Rodin",
    category: "modern-art",
  },
];
// Making Variables
let currentQuestionIndex = 0;
let score = 0;
let quizOver = false;
let timeLeft = 15;
let timerID = null;

// Arrow Function to Show Questions
const showQuestions = () => {
  const questionDetails = quiz[currentQuestionIndex];
  questionBox.textContent = questionDetails.question;

  choicesBox.textContent = "";
  for (let i = 0; i < questionDetails.choices.length; i++) {
    const currentChoice = questionDetails.choices[i];
    const choiceDiv = document.createElement("div");
    choiceDiv.textContent = currentChoice;
    choiceDiv.classList.add("choice");
    choicesBox.appendChild(choiceDiv);

    choiceDiv.addEventListener("click", () => {
      if (choiceDiv.classList.contains("selected")) {
        choiceDiv.classList.remove("selected");
      } else {
        choiceDiv.classList.add("selected");
      }
    });
  }

  if (currentQuestionIndex < quiz.length) {
    startTimer();
  }
};

// Function to check answers
const checkAnswer = () => {
  const selectedChoice = document.querySelector(".choice.selected");
  if (selectedChoice.textContent === quiz[currentQuestionIndex].answer) {
    // alert("Correct Answer!");
    displayAlert("Correct Answer!");
    score++;
  } else {
    // alert("Wrong answer");
    displayAlert(
      `Wrong Answer! ${quiz[currentQuestionIndex].answer} is the Correct Answer`
    );
  }
  timeLeft = 15;
  currentQuestionIndex++;
  if (currentQuestionIndex < quiz.length) {
    showQuestions();
  } else {
    stopTimer();
    showScore();
  }
};

// Function to show score
const showScore = () => {
  questionBox.textContent = "";
  choicesBox.textContent = "";
  scoreCard.textContent = `You Scored ${score} out of ${quiz.length}!`;
  displayAlert("You have completed this quiz!");
  nextBtn.textContent = "Play Again";
  quizOver = true;
  timer.style.display = "none";
};

// Function to Show Alert
const displayAlert = (msg) => {
  alert.style.display = "block";
  alert.textContent = msg;
  setTimeout(() => {
    alert.style.display = "none";
  }, 2000);
};

// Function to Start Timer
const startTimer = () => {
  clearInterval(timerID); // Check for any exist timers
  timer.textContent = timeLeft;

  const countDown = () => {
    timeLeft--;
    timer.textContent = timeLeft;
    if (timeLeft === 0) {
      const confirmUser = confirm(
        "Time Up!!! Do you want to play the quiz again"
      );
      if (confirmUser) {
        timeLeft = 15;
        startQuiz();
      } else {
        startBtn.style.display = "block";
        container.style.display = "none";
        return;
      }
    }
  };
  timerID = setInterval(countDown, 1000);
};

// Function to Stop Timer
const stopTimer = () => {
  clearInterval(timerID);
};

// Function to shuffle question
const shuffleQuestions = () => {
  for (let i = quiz.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [quiz[i], quiz[j]] = [quiz[j], quiz[i]];
  }
  currentQuestionIndex = 0;
  showQuestions();
};

// Function to Start Quiz
const startQuiz = () => {
  timeLeft = 15;
  timer.style.display = "flex";
  shuffleQuestions();
};

// Adding Event Listener to Start Button
startBtn.addEventListener("click", () => {
  startBtn.style.display = "none";
  container.style.display = "block";
  startQuiz();
});

nextBtn.addEventListener("click", () => {
  const selectedChoice = document.querySelector(".choice.selected");
  if (!selectedChoice && nextBtn.textContent === "Next") {
    // alert("Select your answer");
    displayAlert("Select your answer");
    return;
  }
  if (quizOver) {
    nextBtn.textContent = "Next";
    scoreCard.textContent = "";
    currentQuestionIndex = 0;
    quizOver = false;
    score = 0;
    startQuiz();
  } else {
    checkAnswer();
  }
});
