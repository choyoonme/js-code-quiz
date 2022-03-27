//declare variables in global scope
const answerButtons = document.querySelectorAll(".answer");
let currentQuestion = 0;
let currentAnswer = [];

//array object defining 5 unique keys and values containing questions, choices, and an answer index
const questions = [{
        text: "Inside which HTML element do we put JavaScript?",
        choices: ["<link>", "<script>", "<java>", "<js>"],
        answer: 2,
    },
    {
        text: "question 2",
        choices: ["a", "b", "c", "d"],
        answer: 1,
    },
    {
        text: "question 3",
        choices: ["a", "b", "c", "d"],
        answer: 0,
    },
    {
        text: "question 4",
        choices: ["a", "b", "c", "d"],
        answer: 2,
    },
    {
        text: "question 5",
        choices: ["a", "b", "c", "d"],
        answer: 3,
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
    document.querySelector("#start-page").classList.add("hidden");
    document.querySelector("#quiz-page").classList.remove("hidden");
}
//use current question variable and add 1 to move to the next set of key values
//use conditional to show end page after last question is answered
function continueQuiz() {
    currentQuestion = currentQuestion + 1;
    if (currentQuestion === questions.length) {
        document.querySelector("#end-page").classList.remove("hidden");
        document.querySelector("#quiz-page").classList.add("hidden");
    } else {
        populateRound();
    }
}
//look up how to send text input to local storage along with score
function submitInitials() {

}

//add event listeners to start, next, submit, and view high score buttons
document.querySelector(".start").addEventListener("click", startQuiz);

document.querySelector(".nextQ").addEventListener("click", continueQuiz);

document.querySelector(".submit").addEventListener("click", submitInitials);

//add timer and figure out how to keep score/time 
//add view high score window alert with info collected in local storage