//declare variables in global scope
const answerButtons = document.querySelectorAll(".answer");
let currentQuestion = 0;
let time = 59;
let score = 0;
let intervalId;

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
// target start button start timer when game begins, display the time, start countdown, hide start page, and show quiz page
function startQuiz() {
    currentQuestion = 0;
    populateRound();
    intervalId = setInterval(function() {
        displayTime();
        timerCountdown();
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
        document.querySelector("#quiz-page").classList.add("hidden");
        document.querySelector(".final-score").innerText = score;
        document.querySelector(".end-time").innerText = time;
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
    // console.log(question.answer);
    // console.log(selectedChoice);
    // console.log(question.answer == selectedChoice);
    if (question.answer == selectedChoice) {
        document.querySelector(".right-wrong").textContent = "Yup!";
        addPoints();
        // console.log(score);
        document.querySelector(".points").textContent = score;
    } else {
        document.querySelector(".right-wrong").textContent = "Nope!"
        time = time - 10;
    }
    continueQuiz();
}

//create function to display/start the timer when the game begins

function displayTime() {
    document.querySelector(".timer").textContent = time;
}
//create function to countdown and stop the timer when it reaches 0
function timerCountdown() {
    if (time < 1) {
        document.querySelector(".timer").textContent = 0;
        clearInterval(intervalId);
    };
    time = time - 1;

}
//create function to add 5 points when a question is correctly answered
function addPoints() {
    score = score + 5;
}

//create frunction to store score in local storage with initials 
function handleSubmit() {
    let store = localStorage.score;
    if (store == undefined) {
        let playerInfo = `${document.querySelector(".initials").value},${score}`
        localStorage.score = playerInfo;
    } else {
        //local storage split by comma into an array
        let storeArray = store.split(",");
        let localStorageScore = parseInt(storeArray[1]);
        if (localStorageScore < score) {
            localStorage.score = playerInfo;
        }
    }
    window.location.reload();
}

function viewScore() {

}

//add event listeners to start game, continue to next question, submit initials, and view high score
document.querySelector(".start").addEventListener("click", startQuiz);

document.querySelector(".answer").addEventListener("click", continueQuiz);

document.querySelector(".answer-section").addEventListener("click", checkAnswer);

document.querySelector(".submit").addEventListener("click", handleSubmit);

document.querySelector(".high-score").addEventListener("click", viewScore);