document.getElementById("start-button").addEventListener("click", function(){
    console.log("I've been clicked!");
    document.getElementById("start-card").style.setProperty("display", "none");
    document.getElementById("start-button").style.setProperty("display", "none");
    document.getElementById("question-card").style.setProperty("display", "block");
});


console.log(questions[0]);

const questions = [
    {
        question: 'When a user views a page containing a JavaScript program, which machine actually executes the script?',
        A: 'The User’s machine running a Web browser',
        B: 'The Web server',
        C: 'A central machine deep within Netscape’s corporate offices',
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
