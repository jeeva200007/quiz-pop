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
    id: 21,
    question: "What is the correct syntax for an if statement in Python?",
    choices: [
      "if (condition):",
      "if condition",
      "if: condition",
      "if condition:",
    ],
    answer: "if condition:",
    category: "coding",
  },
  {
    id: 22,
    question: "Which of the following is not a data type in JavaScript?",
    choices: ["String", "Number", "Boolean", "ArrayList"],
    answer: "ArrayList",
    category: "coding",
  },
  {
    id: 23,
    question: "Which of the following is used to declare a variable in Java?",
    choices: ["var", "let", "const", "int"],
    answer: "int",
    category: "coding",
  },
  {
    id: 24,
    question: "What is the correct syntax for a for loop in C#?",
    choices: [
      "for i = 0 to 10",
      "for (i = 0; i <= 10; i++)",
      "for (int i = 0; i <= 10)",
      "for i in range(0, 10)",
    ],
    answer: "for (i = 0; i <= 10; i++)",
    category: "coding",
  },
  {
    id: 25,
    question: "Which of the following is not a looping structure in PHP?",
    choices: ["while", "for", "do-while", "foreach"],
    answer: "foreach",
    category: "coding",
  },
  {
    id: 26,
    question: "Which of the following is not a valid operator in C++?",
    choices: ["+", "-", "*", "$"],
    answer: "$",
    category: "coding",
  },
  {
    id: 27,
    question:
      "In which programming language is 'print' used for displaying output?",
    choices: ["Python", "JavaScript", "Java", "C++"],
    answer: "Python",
    category: "coding",
  },
  {
    id: 28,
    question: "What is the correct syntax for a function in Ruby?",
    choices: ["function name()", "def name", "function name", "def name()"],
    answer: "def name()",
    category: "coding",
  },
  {
    id: 29,
    question: "Which of the following is not a type of variable in Swift?",
    choices: ["Int", "String", "Double", "Object"],
    answer: "Object",
    category: "coding",
  },
  {
    id: 30,
    question: "In which programming language is '#' used for commenting?",
    choices: ["Python", "JavaScript", "Java", "C++"],
    answer: "C++",
    category: "coding",
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
