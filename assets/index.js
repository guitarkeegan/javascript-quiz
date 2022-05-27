// Global variables
var chosenAnswer = "";
var correctAnswer = "";
let answeredCorrectly = 0;
let answeredIncorrectly = 0;
let top3Players = []
const numberOfAnswerButtons = document.querySelectorAll(".answer-button").length
const questionCard = document.getElementById("question-card");
const startCard = document.getElementById("start-card");
const startButton = document.getElementById("start-button");
const question = document.getElementById("question");
const btn1 = document.getElementById("answer1");
const btn2 = document.getElementById("answer2");
const btn3 = document.getElementById("answer3");
const btn4 = document.getElementById("answer4");
const player1 = startCard.children[2].children[0];
const player2 = startCard.children[2].children[1];
const player3 = startCard.children[2].children[2];
const player1Score = player1.children[0];
const player2Score = player2.children[0];
const player3Score = player3.children[0];
let timerSecCounter = 59;


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
        C: 'The number of seconds since Netscape‚Äôs public stock offering.',
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

// event handlers
document.getElementById("start-button").addEventListener("click", function(){
    startCard.style.setProperty("display", "none");
    startButton.style.setProperty("display", "none");
    questionCard.style.setProperty("display", "block");
    startGame();
});



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

// TODO: start game function
function startGame(){
    gameTimer();
    nextQuestion();
}
// TODO: create timer
function gameTimer(){
    let totalSec = 120;
    let min = Math.ceil(60 / totalSec);
    let zeroPad = "";
    let timer = setInterval(function(){
        document.getElementById('timer').innerText = min+":"+zeroPad+timerSecCounter;
        if (timerSecCounter < 11 && timerSecCounter > 0){
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
        } else if (timerSecCounter < 0 && min > 0){
            timerSecCounter = 60 + timerSecCounter;
            min -= 1;
            zeroPad = "";
            document.getElementById('timer').innerText = "10 Second Penalty!"
        } else {
            document.getElementById("timer").innerHTML = "Something has gone terribly wrong!"; 
        }
    }, 1000);
}

// TODO: check answer function
function checkAnswer(chosenAnswer) {
    console.log(chosenAnswer);
    console.log(correctAnswer);
    if (chosenAnswer === correctAnswer){
        console.log("correct!");
        answeredCorrectly += 1;
        feedback(true);
        nextQuestion();
    } else {
        feedback(false);
        answeredIncorrectly += 1;
        nextQuestion();
    }
}
// TODO: give user feedback on answer
function feedback(correct){
    if (correct){
        questionCard.classList.add("correct");
        setTimeout(()=>{
        questionCard.classList.remove("correct");
    }, 500);
    } else {
        questionCard.classList.add("incorrect");
        setTimeout(()=>{
            questionCard.classList.remove("incorrect");
        }, 500)
        timerSecCounter -= 10;
    }
}
// TODO: call next function
function nextQuestion(){
    displayedQuestion = questionsBank[Math.floor(Math.random() * questionsBank.length)];
    question.innerHTML = displayedQuestion.question;
    btn1.innerText = displayedQuestion.A;
    btn2.innerText = displayedQuestion.B;
    btn3.innerText = displayedQuestion.C;
    btn4.innerText = displayedQuestion.D;
    correctAnswer = displayedQuestion[displayedQuestion.Ans];
}

// TODO: End of game function
function endGame(){
    let gotInitials = false;
    while (!gotInitials){
        currentUserInitials = prompt("Enter your initials to see how you rank!");
        currentUserInitials = currentUserInitials.toUpperCase();
        if (currentUserInitials.length <= 3) {
            const playerProfile = {
                initials: currentUserInitials,
                score: `Score: ${answeredCorrectly}/${answeredCorrectly+answeredIncorrectly}    Accuracy: ${(answeredCorrectly/(answeredCorrectly+answeredIncorrectly) * 100).toPrecision(3)}%`
            }
            top3Players.push(playerProfile);
            startButton.style.setProperty("display", "block");
            startCard.style.setProperty("display", "block");
            questionCard.style.setProperty("display", "none");
            gotInitials = true;
        } else {
            alert("Initials can only be 3 characters long");
            continue;
        }
    }
    returnToStartScreen();
}
// TODO: Reset Game
function returnToStartScreen(){
    player1.innerText = top3Players[0].initials + "    " + top3Players[0].score;
}