//declare variables in global scope
const answerButtons = document.querySelectorAll(".answer");
let currentQuestion = 0;
let time = 59;

//array object defining 5 unique keys and values containing questions, choices, and an answer index
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

//populate questions and key values with a for loop wrapped in a function

function populateRound() {
    //declare variable to current question
    const question = questions[currentQuestion];
    document.querySelector("#question").textContent = question.text

    //use for loop to apply to buttons
    for (let i = 0; i < question.choices.length; i++) {
        //define variables for each button and assigned array of choices
        const answerButton = answerButtons[i];
        const choice = question.choices[i];
        answerButton.textContent = choice;
    }
}
//target start button and add a hidden class to hide after clicked on and make quiz page appear
function startQuiz() {
    currentQuestion = 0;
    populateRound();
    setInterval(function() {
        displayTime();
        timerCountdown();
    }, 1000);
    document.querySelector("#start-page").classList.add("hidden");
    document.querySelector("#quiz-page").classList.remove("hidden");
}
//use current question variable and add 1 to move to the next set of key values
//use conditional to show end page after last question is answered
function continueQuiz() {
    currentQuestion = currentQuestion + 1;
    if (currentQuestion === questions.length) {
        console.log("gameover");
        document.querySelector("#end-page").classList.remove("hidden");
        document.querySelector("#quiz-page").classList.add("hidden");
    } else {
        populateRound();

    }
}
//display if answer is correct show and add 5 points
//display if answer is wrong  
//when last question is answered stop timer
//store time and points in local storage
function checkAnswer(event) {

    const selectedChoice = event.target.dataset.choice;
    const question = questions[currentQuestion];
    console.log(question.answer);
    console.log(selectedChoice);
    console.log(question.answer == selectedChoice);
    if (question.answer == selectedChoice) {
        document.querySelector(".right-wrong").textContent = "Yup!";

        //add score
    } else {
        document.querySelector(".right-wrong").textContent = "Nope!"
            //subtract time 
        time = time - 5;

    }

    continueQuiz();
}

document.querySelector(".answer-section").addEventListener("click", checkAnswer);

function displayTime() {
    document.querySelector(".timer").textContent = time;
}

function timerCountdown() {
    time = time - 1;
}
//look up how to send text input to local storage along with score


//add event listeners to start, next, submit, and view high score buttons
document.querySelector(".start").addEventListener("click", startQuiz);

document.querySelector(".answer").addEventListener("click", continueQuiz);


//add timer and figure out how to keep score/time 
//add view high score window alert with info collected in local storage