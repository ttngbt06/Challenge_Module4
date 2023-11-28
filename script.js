// Access element by using ID
var quizComponent = document.getElementById("quizComponent");
var startQuizBtn = document.getElementById("startQuiz");
var endComponent = document.getElementById("endComponent");
var startComponent = document.getElementById("startComponent");
var highScoresComponent = document.getElementById("highScores");
var timeElement = document.getElementById("time");
var quizElement = document.getElementById("quiz");
var finalScore = document.getElementById("finalScore");
var saveForm = document.getElementById("saveForm");
var scoreElement = document.getElementById("score");
var result = document.getElementById("result");
var goBackElement = document.getElementById("goBack");
var resultText = document.getElementById("resultText");
var initialElement = document.getElementById("initials");
var clearScoresElement = document.getElementById("clearScores");
var highScoresUl = document.getElementById("highScoresUl");
var viewHighScoreBtns = document.querySelectorAll(".view-highscore");

var highScores = [];

// Input questions content
var quizes = [
  {
    id: 1,
    question:
      "Arrays in javascript are defined by which of the following statements?",
    choices: [
      "It is an ordered list of values",
      "It is an ordered list of objects",
      "It is an ordered list of string",
      "It is an ordered list of functions",
    ],
    correctAnswer: 1,
  },
  {
    id: 2,
    question: "Which of the following is not javascript data types?",
    choices: [
      "Null type",
      "Undefined type",
      "Number type",
      "All of the mentioned",
    ],
    correctAnswer: 2,
  },
  {
    id: 3,
    question: "Which of the following scoping type does javascript use?",
    choices: [
        "Sequential", 
        "Segmental", 
        "Lexical", 
        "Literal"
    ],
    correctAnswer: 3,
  },
  {
    id: 4,
    question:
      "Which of the following object is the main entry point to all client-side javascript features and APIs?",
    choices: [
        "Position", 
        "Window", 
        "Standard", 
        "Location"
    ],
    correctAnswer: 2,
  },
  {
    id: 5,
    question: "Why event handlers is needed in JS?",
    choices: [
      "Allows javascript code to alter the behaviour of windows",
      "Adds innerHTML page to the code",
      "Change the server location",
      "Performs handling of exceptions and occurences",
    ],
    correctAnswer: 1,
  },
  {
    id: 6,
    question: "What is Javascript?",
    choices: [
      "Javascript is a scripting language used to make the website interactive",
      "Javascript is an assembly language used to make the website interactive",
      "Javascript is a compiled language used to make the website interactive",
      "None of the mentioned",
    ],
    correctAnswer: 1,
  },
  {
    id: 7,
    question: "Which of the following is correct about Javascript?",
    choices: [
      "Javascript is an Object-Based language",
      "Javascript is an assembly language",
      "Javascript is an Object-Oriented language",
      "Javascript is an High-Level language",
    ],
    correctAnswer: 1,
  },
  {
    id: 8,
    question:
      "What can be done in order to avoid the creation of global variables in Javascript?",
    choices: [
      "To use a method that defines all the variables",
      "To use an object that has the reference to all the variables",
      "To use an object as its namespace",
      "To use global functions",
    ],
    correctAnswer: 3,
  },
  {
    id: 9,
    question: "Which of the following are client-side javascript code?",
    choices: [
        "Database", 
        "Cursor", 
        "Client", 
        "FileUpload"
    ],
    correctAnswer: 4,
  },
  {
    id: 10,
    question:
      "What is the reason for avoiding the attributes property in HTML DOM?",
    choices: [
      "Found unnecessary",
      "Attributes don't have attributes",
      "Attributes have attributes",
      "Considered irrelevant",
    ],
    correctAnswer: 2,
  },
];

// Set up game state.
var gameState = {
  time: 75,
  score: 0,
  playing: false,
  timer: null,
  currentQuiz: -1,
};

// Resets the timer if it is running, hide the quiz section, display the final scores section
function endQuiz() {
  clearInterval(gameState.timer);
  quizComponent.style.display = "none";
  endComponent.style.display = "block";
  finalScore.textContent = gameState.score;
  resetGame();
}

// Reset the game state to inital values
function resetGame() {
  gameState.time = 75;
  gameState.score = 0;
  gameState.playing = false;
  gameState.timer = null;
  gameState.currentQuiz = -1;
}

function updateTimeBoard() {
  timeElement.textContent = gameState.time;
}

// If there's already a timer running, then clear the timer and restart the timer.
function startTimer() {
  if (gameState.timer) {
    clearInterval(gameState.timer);
  }
  gameState.timer = setInterval(() => {
    gameState.time--;
    if (gameState.time <= 0) {
      endQuiz();
    }
    updateTimeBoard();
  }, 1000);
}

// Show Correct/Wrong after each question and hide it after 2 seconds.
function showResult() {
  scoreElement.textContent = gameState.score;
  result.style.display = "block";
  let id = setTimeout(() => {
    result.style.display = "none";
    clearTimeout(id);
  }, 2000);
}

// Takes in a quiz object and create HTML elements and appends it to the UI
function showQuiz(quiz) {
  let h2 = document.createElement("h2");
  h2.textContent = quiz.question;
  let choices = document.createElement("div");
  choices.classList.add("choices");
  quiz.choices.forEach((choice, index) => {
    let btn = document.createElement("button");
    btn.classList.add("btn-primary");
    btn.textContent = `${index + 1}. ${choice}`;
    btn.addEventListener("click", () => {
      // check if the correctAnswer is equal to the element
      if (quiz.correctAnswer === index + 1) {
        gameState.score += 20;
        resultText.textContent = "Correct!";
      } else {
        resultText.textContent = "Wrong!";
        gameState.time -= 10;
      }
      showResult();
      updateQuiz();
    });
    choices.append(btn);
  });
  quizElement.innerHTML = "";
  quizElement.append(h2, choices);
}

// Show the next quiz, if there is no next quiz, then end the game
function updateQuiz() {
  gameState.currentQuiz += 1;
  if (gameState.currentQuiz >= quizes.length) endQuiz();
  else showQuiz(quizes[gameState.currentQuiz]);
}

// Hide the intro section, show the quiz section and start the timer.
function startQuiz() {
  startComponent.style.display = "none";
  quizComponent.style.display = "block";
  resetGame();
  gameState.playing = true;
  startTimer();
  updateQuiz();
}

// Loop through the highscores array, create li for each highscore and append it to the UI
function showHighScores() {
  startComponent.style.display = "none";
  quizComponent.style.display = "none";
  endComponent.style.display = "none";
  highScoresComponent.style.display = "block";
  highScoresUl.innerHTML = "";
  highScores.forEach((score, index) => {
    let li = document.createElement("li");
    li.textContent = `${index + 1}. ${score}`;
    li.classList.add("highScores-li");
    highScoresUl.append(li);
  });
}

// Append the initial and the final score to the highscores array
function saveScore(event) {
  event.preventDefault();
  const initial = initialElement.value;
  highScores.push(`${initial} - ${finalScore.textContent}`);
  initialElement.value = "";
  showHighScores();
}

// Hide the highscores section, show the intro section.
function goBack() {
  highScoresComponent.style.display = "none";
  startComponent.style.display = "block";
}

// Reset the highscores array.
function clearScores() {
  highScores.length = 0;
  highScoresUl.innerHTML = "";
}

startQuizBtn.addEventListener("click", startQuiz);
saveForm.addEventListener("submit", saveScore);
goBackElement.addEventListener("click", goBack);
clearScoresElement.addEventListener("click", clearScores);
viewHighScoreBtns.forEach((button) =>
  button.addEventListener("click", showHighScores)
);
