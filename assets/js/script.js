//Assign Variables
var timer = 0;
var currQuesNum = 0;
var score = 0;
var highscores = [];
var start = true;
var currentQuestion;
//Assign DOM elements
var startButtonEl = document.getElementById('start');
var a1ButtonEl = document.getElementById('a1');
var a2ButtonEl = document.getElementById('a2');
var a3ButtonEl = document.getElementById('a3');
var a4ButtonEl = document.getElementById('a4');
var timerTextEl = document.getElementById('timer');
var startDisplayEl = document.getElementById('startdisplay');
var quizTextEl = document.getElementById('quiz');
var quizDispEl = document.getElementById('quiz-display');
var quizConEl = document.getElementById('quiz-container');
var answerDispEl = document.getElementById('answer');
var resultsConEl = document.getElementById('result-container');
var rresultsDispEl = document.getElementById('results');
var finalScoreEl = document.getElementById('final-score');
var highscoreLinkEl = document.getElementById('hslink');
var submitButtonEl = document.getElementById('submit');
var highscoreDispEl = document.getElementById('highscores');
var gobackButtonEl = document.getElementById('goback');
var clearButtonEl = document.getElementById('clear');
var highscoreListEl = document.getElementById('hslist');

//Add click eventlisteners
startButtonEl.addEventListener('click', startQuiz);
highscoreLinkEl.addEventListener('click', viewHighscore);
submitButtonEl.addEventListener('click', submitHighscore);
gobackButtonEl.addEventListener('click', closeHighscore);
clearButtonEl.addEventListener('click', clearHighscore);
a1ButtonEl.addEventListener("click", () => { evaluateAnswer(1); });
a2ButtonEl.addEventListener("click", () => { evaluateAnswer(2); });
a3ButtonEl.addEventListener("click", () => { evaluateAnswer(3); });
a4ButtonEl.addEventListener("click", () => { evaluateAnswer(4); });

//Initialize the quiz when page first loads
function initialize() {
    //Hide the elements that are not needed for the start page
    quizDispEl.style.display = 'none';
    resultsConEl.style.display = 'none';
    highscoreDispEl.style.display = 'none'
}

//Start the quiz when the Start Quiz button is clicked
function startQuiz() {
    //Hide start page elements, set start boolean to false for highscore view purposes
    start = false;
    startDisplayEl.style.display = 'none';
    quizDispEl.style.display = 'flex';
    resultsConEl.style.display = 'flex';
    rresultsDispEl.style.display = 'none';
    answerDispEl.style.display = 'none';

    //Display the first question and start the timer
    displayQuestion(currQuesNum);
    startTimer();

}

//Increment the current question variable
function nextQuestion() {
    displayQuestion(currQuesNum + 1);
}

//Display subsequent questions after the first question
function displayQuestion(num) {
    currentQuestion = questions[currQuesNum];
    //Iterate through the answers for the current question and display them as buttons
    for (i = 0; i < currentQuestion.answers.length; i++) {
        var ansq = "#a" + (i + 1);
        document.querySelector(ansq).innerHTML = (i + 1) + ". " + currentQuestion.answers[i];
    }
    //Update the text field to display the current question
    quizTextEl.innerHTML = currentQuestion.question;
}

//Evaluate the answer that the user clicked
function evaluateAnswer(num) {
    //Check to see if the answer that the user clicked is equal to the correct answer
    if (currentQuestion.correctAnswer === num) {
        answerDispEl.innerHTML = "Right";
        answerDispEl.style.display = 'flex';
    }
    else {
        answerDispEl.innerHTML = "Wrong";
        timer = timer - 10;
        answerDispEl.style.display = 'flex';
    }
    //Check to see if the end of the quiz was reached, if it was set the score as the timer and display the final score
    currQuesNum++;
    if ((currQuesNum + 1) > questions.length) {
        score = timer;
        quizConEl.style.display = 'none';
        finalScoreEl.innerHTML = "Your final score is " + score;
        rresultsDispEl.style.display = 'flex';
    }
    else {
        displayQuestion(currQuesNum);
    }
}

//Start the timer and update the timer text 
function startTimer() {
    timer = 75;
    var interval = setInterval(function () {
        timerTextEl.innerHTML = "Time: " + timer;
        timer--;
//If the timer reaches 0, stop the timer, set the score ad 0 and display the final score
        if (timer <= 0) {
            clearInterval(interval);
            score = timer;
            timerTextEl.innerHTML = "Time: " + timer;
            quizConEl.style.display = 'none';
            finalScoreEl.innerHTML = "Your final score is " + score;
            rresultsDispEl.style.display = 'flex';
        }
    }, 1000);
}

//View the highscores
function viewHighscore() {
    //Remove the other elements and show the highscore elements
    startDisplayEl.style.display = 'none';
    rresultsDispEl.style.display = 'none';
    answerDispEl.style.display = 'none';
    document.getElementById("header").style.display = 'none';
    highscoreDispEl.style.display = 'inline-block'

    //Sort the highscores from highest to lowest
    highscores = highscores.sort(function(a, b){
        return (b.score - a.score);
    });
    //Create a list element for every highscore in the list, limited to 10 scores
    for (i=0; i<highscores.length; i++){
        var listItemEl = document.createElement("li");
        listItemEl.className = "hs-item";
        var listText = document.createTextNode(highscores[i].initials+" - "+highscores[i].score);
        listItemEl.appendChild(listText);
        highscoreListEl.appendChild(listItemEl);
        if(i===9){
            break;
        }
    }
}

//Score is submitted when the submit button is clicked at the of the quiz
function submitHighscore() {
    //Get the initials and store it as an object with the score
    var x = document.getElementById("initials-input").value;
    var hsObj = {
        initials: x,
        score: score
    };
    //Add the object to the highscores array and save it in localstorage
    highscores.push(hsObj);
    localStorage.setItem("highscores", JSON.stringify(highscores));
    document.getElementById("initials-input").value = '';
    viewHighscore();
}

//Close the highscore elements
function closeHighscore() {
    //If start variable is true, show the start screen, otherwise display the final score
    if (start){
        startDisplayEl.style.display = 'flex';
    }
    else {
    rresultsDispEl.style.display = 'flex';
    document.getElementById("initials-input").style.display = 'none';
    document.getElementById("initials").style.display = 'none';
    submitButtonEl.style.display = 'none';
    }
    highscoreDispEl.style.display = 'none'
    document.getElementById("header").style.display = 'flex'
}

//Clear the highscore list - buggy, did not have time to implement correctly
function clearHighscore() {
    localStorage.clear();
    highscores = [];
    var myNode = document.querySelector(".hs-item");
    myNode.innerHTML = '';
    viewHighscore();
}

//Load the highscores
function loadHs(){
    //Get the highscores from localstorage and save them in a variable
    var savedHighscores = [];
    savedHighscores = JSON.parse(localStorage.getItem("highscores"));

    //If there are no save highscores, set highscores to empty, otherwise store the saved scores in highscores
    if (!savedHighscores){
        highscores = [];
        return false;
    } else {
        highscores = savedHighscores;
    }
}

//Question and answer objects
var questions = [
    {
        question: "Commonly used data types DO NOT include:",
        answers: ["strings",
            "booleans",
            "alerts",
            "numbers"],
        correctAnswer: 3
    },
    {
        question: "The condition in an if/else statement is enclosed with _____",
        answers: [
            "quotes",
            "curly brackets",
            "parenthesis",
            "square brackets"
        ],
        correctAnswer: 3
    },
    {
        question: "Arrays in JavaScript can be used to store _____",
        answers: [
            "numbers and strings",
            "other arrays",
            "booleans",
            "all of the above"
        ],
        correctAnswer: 4
    },
    {
        question: "String values must be enclosed within _____ when being assigned to variables",
        answers: ["commas",
            "curly brackets",
            "quotes",
            "parenthesis"],
        correctAnswer: 3
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answers: ["Javascript",
            "terminal/bash",
            "for loops",
            "console.log"],
        correctAnswer: 4
    }
];

//Load highscores and initialize the quiz
loadHs();
initialize();