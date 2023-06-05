### Quiz-Pop app

This repository contains Quiz app buit using HTML,CSS and JAvaScript by create-js-app in terminal.

### Features

1. Three diferent categories of Quiz questions.
2. Style alert button.
3. Differnt types of Questions in three different categories.
4. 4 differernt choices have been given.
5. Properly functioning "Next" button.
6. Score card based your answeres.
7. Timer have been included for 15 sec

> [working demo]

## Instruction

1. Install the Create-js-app
2. need to run npm dev

---

### Making Variables

```js
let currentQuestionIndex = 0;
let score = 0;
let quizOver = false;
let timeLeft = 15;
let timerID = null;
```

### Function to show the questions

```js
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
```

### Function to check answers

```js
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
```

### Function to show Score

```js
const showScore = () => {
  questionBox.textContent = "";
  choicesBox.textContent = "";
  scoreCard.textContent = `You Scored ${score} out of ${quiz.length}!`;
  displayAlert("You have completed this quiz!");
  nextBtn.textContent = "Play Again";
  quizOver = true;
  timer.style.display = "none";
};
```

above these codes plays major role in the Quiz-Pop app.
