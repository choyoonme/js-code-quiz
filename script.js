/*Create variables and target in DOM:

-score
-timer
-button to start game
-question; use textContent to cycle through 5 different questions
-answer button id; use textContent to cycle through each set of 4 answers
-button to submit initials

/*Functions:

-cycle through 5 questions with a set of 4 answers for each question
-show correct or incorrect using conditional statements and data-state: "hidden"
-start timer/game and run for duration of quiz using setInterval
-stop timer when all 5 questions are answered using clearInterval
-store the count of correctly answered questions and submit initials in localStorage    
*/



const answerButtons = document.querySelectorAll(".answer");
let currentQuestion = 0;

// use object variable write an array
const questions = [{
    text: "Inside which HTML element do we put JavaScript?",
    choices: ["<link>", "<script>", "<java>", "<js>"],
    answer: 2,
}]
const question = questions[currentQuestion];
//target html text content and assign to current indexed question.key

function populateButtons() {
    document.querySelector("#question").textContent = question.text

    //use for loop to apply to buttons
    for (let i = 0; i < question.choices.length; i++) {
        //define variables for each button and assigned array of choices
        const answerButton = answerButtons[i];
        const choice = question.choices[i];
        answerButton.textContent = choice;
    }
}

document.querySelector(".nextQ").addEventListener("click", populateButtons);