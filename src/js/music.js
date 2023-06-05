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
    id: 1,
    question: "Which of the following is not a type of music notation?",
    choices: [
      "Standard notation",
      "Tab notation",
      "Morse code notation",
      "Graphics notation",
    ],
    answer: "Morse code notation",
    category: "music",
  },
  {
    id: 2,
    question: "What is the most common time signature in classical music?",
    choices: ["3/4", "4/4", "5/4", "6/8"],
    answer: "4/4",
    category: "music",
  },
  {
    id: 3,
    question:
      "Which of the following is not a type of instrument in a symphony orchestra?",
    choices: ["Violin", "Piano", "Harp", "Theremin"],
    answer: "Theremin",
    category: "music",
  },
  {
    id: 4,
    question: "What is the most common key in pop music?",
    choices: ["C Major", "G Major", "D Major", "A Major"],
    answer: "C Major",
    category: "music",
  },
  {
    id: 5,
    question: "Which of the following is not a type of chord?",
    choices: ["Major", "Minor", "Diminished", "Flat"],
    answer: "Flat",
    category: "music",
  },
  {
    id: 6,
    question: "Which of the following is not a type of music genre?",
    choices: ["Jazz", "Blues", "Rock", "Applesauce"],
    answer: "Applesauce",
    category: "music",
  },
  {
    id: 7,
    question: "Which of the following is not a type of music theory?",
    choices: ["Harmony", "Counterpoint", "Form", "Cooking"],
    answer: "Cooking",
    category: "music",
  },
  {
    id: 8,
    question: "What is the most common tempo marking in classical music?",
    choices: ["Allegro", "Andante", "Adagio", "Moderato"],
    answer: "Allegro",
    category: "music",
  },
  {
    id: 9,
    question: "Which of the following is not a type of musical form?",
    choices: ["Sonata", "Symphony", "Concerto", "Spaghetti"],
    answer: "Spaghetti",
    category: "music",
  },
  {
    id: 10,
    question:
      "Which of the following is not a type of music notation software?",
    choices: ["Sibelius", "Finale", "MuseScore", "Microsoft Word"],
    answer: "Microsoft Word",
    category: "music",
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
