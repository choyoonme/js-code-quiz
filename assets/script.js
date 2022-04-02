//declare variables in global scope
const answerButtons = document.querySelectorAll(".answer");
let currentQuestion = 0;
let time = 60;
let currentScore = 0;
let intervalId;
let scoreBoard = getScoreBoard();

//use array object defining 5 unique keys and values containing questions, choices, and an answer index
const questions = [{
        text: "Inside which HTML element do we put JavaScript?",
        choices: ["a. <link>", "b. <script>", "c. <java>", "d. <js>"],
        answer: 1,
    },
    {
        text: "Which of the following variables can NOT change?",
        choices: ["a. var", "b. let", "c. const", "d. $var"],
        answer: 2,
    },
    {
        text: "Which pair of symbols is used to invoke a function?",
        choices: ["a. [ ]", "b. ' '", "c. ||", "d. ()"],
        answer: 3,
    },
    {
        text: "What method is used to stop a timer?",
        choices: ["a. stopTimer", "b. endTime", "c. clearInterval", "d. none of the above"],
        answer: 2,
    },
    {
        text: "What does the letter 'i' stand for in a 'for loop'?",
        choices: ["a. increment", "b. index", "c. interval", "d. none of the above"],
        answer: 1,
    },
]

//create a function that uses a for loop to populate each set of question and corresponding answers
function populateRound() {
    //declare variable to current question
    const question = questions[currentQuestion];
    document.querySelector("#question").textContent = question.text

    //use for loop to apply to buttons that contain multiple choice
    for (let i = 0; i < question.choices.length; i++) {
        //define variables for each button and assigned array of choices
        const answerButton = answerButtons[i];
        const choice = question.choices[i];
        answerButton.textContent = choice;
    }
}
//create function to display/start the timer when the game begins

function displayTime() {
    document.querySelector(".timer").textContent = time;
}

//create function to countdown and stop the timer when it reaches 0
function timerCountdown() {
    if (time < 1) {
        gameOver();
    } else {
        time = time - 1;
    }
}

//create function to add 5 points when a question is correctly answered
function addPoints() {
    currentScore = currentScore + 5;
}
//create function to end game and clear interval when timer reaches 0
function gameOver() {
    clearInterval(intervalId);
    document.querySelector("#quiz-page").classList.add("hidden");
    document.querySelector("#end-page").classList.remove("hidden");
    document.querySelector(".timer").textContent = "Game Over";
}
// target start button start timer when game begins, display the time, start countdown, hide start page, and show quiz page
function startQuiz() {
    currentQuestion = 0;
    populateRound();
    intervalId = setInterval(function() {
        timerCountdown();
        displayTime();
    }, 1000);
    document.querySelector("#start-page").classList.add("hidden");
    document.querySelector("#quiz-page").classList.remove("hidden");
}

//use current question variable and add 1 to continue to the next question/set of key values
//use conditional to show end page after last question is answered or if the timer reaches 0
function continueQuiz() {
    currentQuestion = currentQuestion + 1;
    if (currentQuestion === questions.length) {
        clearInterval(intervalId);
        document.querySelector("#end-page").classList.remove("hidden");
        gameOver();
        document.querySelector("#quiz-page").classList.add("hidden");
        document.querySelector(".final-score").innerText = currentScore;

    } else {
        populateRound();
    }
}

//display if answer is correct and add 5 points
//display if answer is wrong and subtract 10 seconds from timer
//when last question is answered game is over and timer stops
//store time and points in local storage
function checkAnswer(event) {
    const selectedChoice = event.target.dataset.choice;
    const question = questions[currentQuestion];
    if (question.answer == selectedChoice) {
        document.querySelector(".right-wrong").textContent = "👍";
        addPoints();
        document.querySelector(".points").textContent = currentScore;
    } else {
        document.querySelector(".right-wrong").textContent = "👎"
        time = time - 10;
    }
    continueQuiz();
}

function storeInitialsAndScore(player) {
    scoreBoard.scores.push(player);
    localStorage.setItem("game", JSON.stringify(scoreBoard))
}


function getScoreBoard() {
    let game = JSON.parse(localStorage.getItem("game"));
    if (!game) {
        game = { scores: [] }
    }
    return game
}

//first you define a string, array or object to localStorage.setItem("something") and use JSON.stringify
//then parse out that string by using .getItem
//create function to store score in local storage with initials 
function handleSubmit() {
    const initials = document.querySelector(".initials").value;
    const player = { initials, score: currentScore };
    // check if player has higher score and replace
    let highScore = JSON.parse(localStorage.getItem("highScore"));
    if (!highScore || currentScore > highScore.score) {
        localStorage.setItem("highScore", JSON.stringify(player));
    }
    storeInitialsAndScore(player);
    viewScore();
}

//create function that populates 5 sets of initials and scores in a list and updates text content with highscore 
function renderScoreBoard() {
    let ranking = getScoreBoard();
    let list = document.querySelector(".player-list")
    for (i = 0; i < ranking.scores.length; i++) {
        const entry = ranking.scores[i]
        const liEntry = document.createElement("li")
        liEntry.textContent = entry.initials + " - " + entry.score;
        list.append(liEntry)
    }
    let highScore = JSON.parse(localStorage.getItem("highScore"));
    document.querySelector(".highest").textContent = highScore.initials + " - " + highScore.score;
}
//write html for score page that lists high score and initials & wire up to view high score button
//use classList to hide or unhide classes associated with pages in DOM
function viewScore() {
    document.querySelector("#score-page").classList.remove("hidden");
    document.querySelector("#start-page").classList.add("hidden");
    document.querySelector("#quiz-page").classList.add("hidden");
    document.querySelector("#end-page").classList.add("hidden");
    renderScoreBoard();
}

function playAgain() {
    document.querySelector("#score-page").classList.add("hidden");
    document.querySelector("#start-page").classList.remove("hidden");
    window.location.reload();
}

//add event listeners to start game, continue to next question, submit initials, and view high score
document.querySelector(".start").addEventListener("click", startQuiz);

document.querySelector(".answer").addEventListener("click", continueQuiz);

document.querySelector(".answer-section").addEventListener("click", checkAnswer);

document.querySelector(".submit").addEventListener("click", handleSubmit);

document.querySelector(".high-score").addEventListener("click", viewScore);

document.querySelector(".back2game").addEventListener("click", playAgain);