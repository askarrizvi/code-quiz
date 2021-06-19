var timer = 0;
var currQuesNum = 0;
var btnArr = [];
var currentQuestion;
var startButton = document.getElementById('start');
var a1Button = document.getElementById('a1');
var a2Button = document.getElementById('a2');
var a3Button = document.getElementById('a3');
var a4Button = document.getElementById('a4');
var quizContainer = document.getElementById('quiz');
var timerText = document.getElementById('timer');
var startDisplay = document.getElementById('startdisplay');
var answerDisp = document.getElementById('answer');

startButton.addEventListener('click', startQuiz);
a1Button.addEventListener("click", () => { evaluateAnswer(1); });
a2Button.addEventListener("click", () => { evaluateAnswer(2); });
a3Button.addEventListener("click", () => { evaluateAnswer(3); });
a4Button.addEventListener("click", () => { evaluateAnswer(4); });

function initialize(){
    a1Button.style.display = 'none';
    a2Button.style.display = 'none';
    a3Button.style.display = 'none';
    a4Button.style.display = 'none';
}

function startQuiz() {
    startDisplay.style.display = 'none';
    a1Button.style.display = 'inline-block';
    a2Button.style.display = 'inline-block';
    a3Button.style.display = 'inline-block';
    a4Button.style.display = 'inline-block';

    currentQuestion = questions[currQuesNum];
    console.log(currentQuestion.answers.length);
    for (i = 0; i < currentQuestion.answers.length; i++) {
        var ansq = "#a" + (i + 1);
        console.log(ansq);
        document.querySelector(ansq).innerHTML = (i+1) + ". " + currentQuestion.answers[i];
    }

    document.getElementById('quiz').innerHTML = currentQuestion.question;
    startTimer();

}

function nextQuestion() {
    displayQuestion(currQuesNum + 1);
}

function displayQuestion(num) {
    currentQuestion = questions[currQuesNum];
    //console.log(currentQuestion.answers.length);
    for (i = 0; i < currentQuestion.answers.length; i++) {
        var ansq = "#a" + (i + 1);
        //console.log(ansq);
        document.querySelector(ansq).innerHTML = (i+1) + ". " + currentQuestion.answers[i];
    }
    document.getElementById('quiz').innerHTML = currentQuestion.question;
}

function evaluateAnswer(num) {
    if (currentQuestion.correctAnswer === num) {
        answerDisp.innerHTML = "Right";
    }
    else {
        console.log("wrong answer");
        answerDisp.innerHTML = "Wrong";
        timer = timer - 10;
    }
    currQuesNum++;
    console.log(currQuesNum);
    if ((currQuesNum + 1) > questions.length) {
        console.log("end game");
    }
    else {
        displayQuestion(currQuesNum);
    }
}

function startTimer() {
    timer = 75;
    var interval = setInterval(function () {
        timerText.innerHTML = "Time: " + timer;
        timer--;
        if (timer < 0) {
            console.log("You lost");
            clearInterval(interval);
        }
    }, 1000);
}


var questions = [
    {
        question: "Who invented JavaScript?",
        answers: ["Douglas Crockford",
            "Sheryl Sandberg",
            "Brendan Eich",
            "lol"],
        correctAnswer: 3
    },
    {
        question: "Which one of these is a JavaScript package manager?",
        answers: [
            "Node.js",
            "TypeScript",
            "npm",
            "lol"
        ],
        correctAnswer: 3
    },
    {
        question: "Which tool can you use to ensure code quality?",
        answers: [
            "Angular",
            "jQuery",
            "RequireJS",
            "ESLint"
        ],
        correctAnswer: 4
    }
];

initialize();