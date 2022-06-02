// Global variables
var chosenAnswer = "";
var correctAnswer = "";
let chosenIndex = 0;
let answeredCorrectly = 0;
let answeredIncorrectly = 0;
let allScores = []
let pickedQuestions = []
let currentUserInitials = "";
var timer;
// timer variables
let timerSecCounter = 59;
let totalSec = 120;
let min = Math.ceil(60 / totalSec);
let zeroPad = "";
// dom references
const numberOfAnswerButtons = document.querySelectorAll(".answer-button").length
const questionCard = document.getElementById("question-card");
const startCard = document.getElementById("start-card");
const startButton = document.getElementById("start-button");
const initialsCard = document.getElementById("initials-card");
const initialsForm = document.getElementById("initials-form");
const formInput = document.getElementById("initials-input");
const formButton = document.getElementById("initials-button");
const question = document.getElementById("question");
const btn1 = document.getElementById("answer1");
const btn2 = document.getElementById("answer2");
const btn3 = document.getElementById("answer3");
const btn4 = document.getElementById("answer4");
const startOl = document.getElementById("top-scores");


const questionsBank = [
    {
        question: 'When a user views a page containing a JavaScript program, which machine actually executes the script?',
        A: "The User’s machine running a Web browser",
        B: 'The Web server',
        C: "A central machine deep within Netscape’s corporate offices",
        D: 'None of the above',
        Ans: 'A'
    },
    {
        question: '______ JavaScript is also called client-side JavaScript.',
        A: 'Microsoft', B: 'Navigator', C: 'LiveWire', D: 'Native', Ans: 'B'
    },
    {
        question: '__________ JavaScript is also called server-side JavaScript.',
        A: 'Microsoft',
        B: 'Navigator',
        C: 'LiveWire',
        D: 'Native',
        Ans: 'C'},
    {
        question: 'What are variables used for in JavaScript Programs?',
        A: 'Storing numbers, dates, or other values',
        B: 'Varying randomly',
        C: 'Causing high-school algebra flashbacks',
        D: 'None of the above',
        Ans: 'A'},
    {
        question: '_____ JavaScript statements embedded in an HTML page can respond to user events such as mouse-clicks, form input, and page navigation.',
        A: 'Client-side',
        B: 'Server-side',
        C: 'Local',
        D: 'Native',
        Ans: 'A'},
    {
        question: 'Which of the following are capabilities of functions in JavaScript?',
        A: 'Return a value',
        B: 'Accept parameters and Return a value',
        C: 'Accept parameters',
        D: 'None of the above',
        Ans: 'C'},
    {
        question: 'Which of the following is not a valid JavaScript variable name?',
        A: '2names',
        B: '_first_and_last_names',
        C: 'FirstAndLast',
        D: 'None of the above',
        Ans: 'A'},
    {
        question: 'How does JavaScript store dates in a date object?',
        A: 'The number of milliseconds since January 1st, 1970',
        B: 'The number of days since January 1st, 1900',
        C: "The number of seconds since Netscape's public stock offering.",
        D: 'None of the above',
        Ans: 'A'},
    {
        question: 'Which of the following attribute can hold the JavaScript version?',
        A: 'LANGUAGE',
        B: 'SCRIPT',
        C: 'VERSION',
        D: 'None of the above',
        Ans: 'A'}, 
    {
        question: 'Which types of image maps can be used with JavaScript?',
        A: 'Server-side image maps',
        B: 'Client-side image maps',
        C: 'Server-side image maps and Client-side image maps',
        D: 'None of the above',
        Ans: 'B'}
    ]

let unpickedQuestions = [...questionsBank];

// listener to start the game
startButton.addEventListener("click", function(){
    startCard.style.setProperty("display", "none");
    startButton.style.setProperty("display", "none");
    questionCard.style.setProperty("display", "block");
    startGame();
});
// listener to submit initials, log score to local storage, and display the start menu again
initialsForm.addEventListener("submit", function(event){
    event.preventDefault();
    currentUserInitials = formInput.value;
    if (currentUserInitials.length <= 3 && currentUserInitials.length >= 1) {
        currentUserInitials = currentUserInitials.toUpperCase();
        const playerProfile = {
            initials: currentUserInitials,
            accuracy: parseFloat((answeredCorrectly/(answeredCorrectly+answeredIncorrectly) * 100).toPrecision(3)),
            score: answeredCorrectly
        }
        allScores.push(playerProfile);
        formInput.value = "";
        questionCard.style.setProperty("display", "none");
        startCard.style.setProperty("display", "block");
        startButton.style.setProperty("display", "block");
        initialsCard.style.setProperty("display", "none");
        getScores();
    } else {
        alert("Initials can only be 3 characters long");
    }
})


// create event listeners for the answer choice buttons (list items)
for (let i=0;i<numberOfAnswerButtons; i++){
    let answerLetter = "";
    switch (i) {
        case 0:
            answerLetter = "A";
            break;
        case 1:
            answerLetter = "B";
            break;
        case 2:
            answerLetter = "C";
            break;
        case 3:
            answerLetter = "D";
            break;
        default:
            console.log("this did not work!");
    }
    document.querySelectorAll(".answer-button")[i].addEventListener("click", ()=>{
        checkAnswer(this.displayedQuestion[answerLetter]);
    });
}

// Starts the game, resets several values and the timer from the previous game, and calls the first question.
function startGame(){
    resetGame();
    gameTimer();
    nextQuestion();
}

// The game timer will give proper zero padding when the seconds drop to single digits.
function gameTimer(){

    timer = setInterval(function(){
        if (unpickedQuestions.length === 0){
            setTimeout(()=>clearInterval(timer), 1000);
        } else if (timerSecCounter < 11 && timerSecCounter > 0){
            zeroPad = "0";
            timerSecCounter -= 1;
        } else if (timerSecCounter > 1){
            timerSecCounter -= 1;
        } else if (timerSecCounter === 0 && min >= 1){
            timerSecCounter = 59;
            min -= 1;
            zeroPad = ""
        } else if (timerSecCounter <= 0 && min < 1) {
            clearInterval(timer);
            document.getElementById("timer").innerHTML = "00:00";
            endGame();
        } else if (timerSecCounter < 0){
            timerSecCounter = 60 + timerSecCounter;
            min -= 1;
            zeroPad = "";
            document.getElementById('timer').innerText = "10 Second Penalty!"
        } else {
            document.getElementById("timer").innerHTML = "Something has gone terribly wrong!";
            clearInterval(timer); 
        }
        document.getElementById('timer').innerText = min+":"+zeroPad+timerSecCounter;
    }, 1000);
    
}

// check if answer was correct. It is passed the user's selected answer.
function checkAnswer(chosenAnswer) {
    if (chosenAnswer === correctAnswer){
        answeredCorrectly += 1;
        feedback(true);
    } else {
        answeredIncorrectly += 1;
        feedback(false);
    }
}
// User is given feedback, depending on if the parameter was true or false.
function feedback(correct){
    if (correct){
        const correctH2 = document.createElement("h2");
        correctH2.textContent = "Correct!";
        questionCard.classList.add("correct");
        questionCard.appendChild(correctH2);
        setTimeout(()=>{
            questionCard.removeChild(correctH2)
            questionCard.classList.remove("correct");
    }, 500);
   
    } else {
        const incorrectH2 = document.createElement("h2");
        incorrectH2.textContent = "Incorrect!";
        questionCard.appendChild(incorrectH2);
        questionCard.classList.add("incorrect");
        setTimeout(()=>{
            questionCard.removeChild(incorrectH2);
            questionCard.classList.remove("incorrect");
        }, 500)
        timerSecCounter -= 10;
    }
    removeQuestion();
    nextQuestion();
}
// TODO: call next function
function nextQuestion(){
    if (unpickedQuestions.length === 0){
        setTimeout(endGame, 1000); 
    } else {
        chosenIndex = Math.floor(Math.random() * unpickedQuestions.length);
        displayedQuestion = unpickedQuestions[chosenIndex];
        question.innerHTML = displayedQuestion.question;
        btn1.innerText = displayedQuestion.A;
        btn2.innerText = displayedQuestion.B;
        btn3.innerText = displayedQuestion.C;
        btn4.innerText = displayedQuestion.D;
        correctAnswer = displayedQuestion[displayedQuestion.Ans];
    }
    
}

// TODO: End of game function
function endGame(){
    questionCard.style.setProperty("display", "none");
    initialsCard.style.setProperty("display", "block");
}
// TODO: Reset Game
function resetGame(){ 
    timerSecCounter = 59;
    totalSec = 120;
    min = 1;
    zeroPad = "";
    correctAnswer = "";
    chosenAnswer = "";
    answeredCorrectly = 0;
    answeredIncorrectly = 0;
    pickedQuestions = [];
    currentUserInitials = "";
    if (unpickedQuestions.length === 0){
        unpickedQuestions = [...questionsBank];
    }
    if (startOl.children.length > 0){
        while (startOl.lastElementChild) {
            startOl.removeChild(startOl.lastElementChild);
          }
    }
}

function getScores(){
    if (allScores.length > 0){
        allScores.sort((a, b) => (a.score > b.score) ? 1 : (a.score < b.score) ? -1 : 0);
        allScores.reverse()
        saveLocally();
    for (let i=0; i<allScores.length; i++){
        const scoreLi = document.createElement("li")
        scoreLi.innerText = allScores[i].initials + " " + "Score: " + allScores[i].score + "/" + (questionsBank.length) + " " + "Accuracy: " + allScores[i].accuracy + "%";
        startOl.appendChild(scoreLi);

    }
    }
    return;
}

function removeQuestion(){
    pickedQuestions.push(unpickedQuestions.splice(chosenIndex, 1));
}

function saveLocally(){
    localStorage.setItem("javascript-quiz", JSON.stringify(allScores));
}

function loadLocally(){
    const localScores = JSON.parse(localStorage.getItem("javascript-quiz"));
    if (localScores !== null){
        allScores = [...localScores];
    } else {
        return;
    }
}

loadLocally();
getScores();