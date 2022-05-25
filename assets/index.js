// quiz questions
var chosenAnswer = "";
var correctAnswer = "";
const questions = [
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
    document.getElementById("start-card").style.setProperty("display", "none");
    document.getElementById("start-button").style.setProperty("display", "none");
    document.getElementById("question-card").style.setProperty("display", "block");
    startGame();
});

const numberOfAnswerButtons = document.querySelectorAll(".answer-button").length

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
        // TODO: USE THIS TO CHECK THE ANSWER
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
    let secCounter = 59;
    let min = Math.ceil(60 / totalSec);
    let zeroPad = "";
    let timer = setInterval(function(){
        document.getElementById('timer').innerHTML = min+":"+zeroPad+secCounter;
        if (secCounter < 11 && secCounter > 0){
            zeroPad = "0";
            secCounter -= 1;
        } else if (secCounter > 1){
            secCounter -= 1;
        } else if (secCounter <= 0 && min >= 1){
            secCounter = 59;
            min -= 1;
            zeroPad = ""
        } else if (secCounter <= 0 && min < 1) {
            clearInterval(timer);
            document.getElementById("timer").innerHTML = "Time is up!";
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
        feedbackIsCorrect();
        nextQuestion();
    } else {
        console.log("sorry! No dice.");
        nextQuestion();
    }
}
// TODO: give user feedback on answer
function feedbackIsCorrect(){
    const questionCard = document.getElementById("question-card");
    console.log(questionCard)
    questionCard.classList.add("correct");
    setTimeout(()=>{
        questionCard.classList.remove("correct");
    }, 500);
}
// TODO: call next function
function nextQuestion(){
    displayedQuestion = questions[Math.floor(Math.random() * questions.length)];
    document.getElementById("question").innerHTML = displayedQuestion.question;
    document.getElementById("answer1").innerHTML = displayedQuestion.A;
    document.getElementById("answer2").innerHTML = displayedQuestion.B;
    document.getElementById("answer3").innerHTML = displayedQuestion.C;
    document.getElementById("answer4").innerHTML = displayedQuestion.D;
    correctAnswer = displayedQuestion[displayedQuestion.Ans];
}

// TODO: Track correct and incorrect answers
// TODO: Store correct and incorrect answers
// TODO: End of game function