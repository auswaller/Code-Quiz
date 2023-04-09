const question = {
    text: ["String values must be contained within _____ when being assigned to a variable.","Arrays in JavaScript can be used to store:","Commonly used data types DO NOT include:","The condition of an if/else statment is enclosed with _____","Which HTML element contains a reference to the JavaScript file?","How do you write a comment in JavaScript?","Which operator is used t assign a value to a variable?","How do you call a function the is named 'aFunction'"],
    choices: ["commas,curly braces,quotes,parentheses","numbers and strings,other arrays,booleans,all of the above","strings,numbers,booleans,alerts","quotes,curly braces,parentheses,square brackets","<javascript>,<js>,<script>,<scripting>","//Comment,#Comment,[Comment],<!--Comment-->","-,x,>,=","call aFunction(),aFunction,aFunction(),run aFunction()"],
    answer: ["quotes","all of the above","alerts","parentheses","<script>","//Comment","=","aFunction()"]
}

const quiz = document.getElementById("quiz");
const form = document.getElementById("form");
const titleText = document.getElementById("title")
const startButton = document.getElementById("start");
const answerText = document.getElementById("answer");
const timerDisplay = document.getElementById("timer");
const scoreButton = document.getElementById("high-score");

let timer;
let score;
let questionNum;
let timeInterval;
let currentQuestion;
let highScores = [];
let isGameOver = true;
let askedQuestions = [];


init();

form.addEventListener("submit", function(event){
    event.preventDefault();
    if(isGameOver){
        let scoreInputValue = form.querySelector("#score-input");
        let scoreText = scoreInputValue.value + " - " + score;
        highScores.push(scoreText);
        scoreInputValue.value = "";
    }

    storeInfo();
    showHighScores();
});

quiz.addEventListener("click", function(event){
    event.preventDefault();
    let target = event.target;

    if(target.matches("button") === true){
        if(target.getAttribute("data-value") == "clear-scores"){
            highScores = [];
            storeInfo();
            showHighScores();
        }
        else if(target.getAttribute("data-value") == question.answer[currentQuestion]){
            score += 10;
            console.log("correct! " + target.getAttribute("data-value") + " = " + question.answer[currentQuestion] + " current score " + score);
            answerText.innerHTML = "Correct!";
            nextQuestion();
        }
        else{
            timer -= 10;
            console.log("incorrect! " + target.getAttribute("data-value") + " != " + question.answer[currentQuestion] + " current score " + score);
            answerText.innerHTML = "Incorrect!";
            nextQuestion();
        }
    }
});

scoreButton.addEventListener("click", function(event){
    event.preventDefault();
    isGameOver = true;
    showHighScores();
});

startButton.addEventListener("click", function(event) {
    event.preventDefault();
    isGameOver = false;
    timer = 60;
    questionNum = 0;
    score = 0;
    askedQuestions = [];
    startButton.style.display = "none";
	timeInterval = setInterval(function() {
        timerDisplay.innerHTML = timer;

        if(timer <= 0){
            quizOver();
        }
        timer--;
    }, 1000);
    nextQuestion();
});

function nextQuestion(){
    removeChildren(quiz);
    if(questionNum < 5){
        let randomQuestion = Math.floor(Math.random() * question.text.length);
        if(!checkIfAsked(randomQuestion)){
            currentQuestion = randomQuestion;
            askedQuestions.push(randomQuestion);
            let choicesArr = question.choices[randomQuestion].split(",");
            titleText.innerHTML = "#" + (questionNum + 1) + ": " + question.text[randomQuestion];

            for(let i = 0; i < choicesArr.length; i++){
                let li = document.createElement("li");
                let button = document.createElement("button");
                button.textContent = (i + 1) + ". " + choicesArr[i];
                button.setAttribute("data-value", choicesArr[i]);
                li.appendChild(button);
                quiz.appendChild(li);
            }
            questionNum++;
            return randomQuestion;
        }
        else{
            nextQuestion();
        }
    }
    else{
        quizOver();
    }
}

function checkIfAsked(number){
    if(askedQuestions.includes(number)){
        console.log(number + " has been asked already!");
        return true;
    }
    else{
        console.log(number + " has not been asked yet.")
        return false;
    }
}

function quizOver(){
    clearInterval(timeInterval);
    isGameOver = true;
    answerText.innerHTML = "";
    timerDisplay.innerHTML = 0;
    removeChildren(quiz);
    score += timer;
    titleText.innerHTML = "Your score is: " + score;

    var label = document.createElement("label");
    var input = document.createElement("input");
    label.setAttribute("for", "form");
    label.innerHTML = "Enter your name: ";
    input.setAttribute("id", "score-input")
    input.setAttribute("type", "text")
    input.setAttribute("placeholder", "Name");

    form.appendChild(label);
    form.appendChild(input);
}

function showHighScores(){
    if(timeInterval !== null){
        clearInterval(timeInterval);
    }
    answerText.innerHTML = "";
    timerDisplay.innerHTML = 0;
    titleText.innerHTML = "High Scores"
    startButton.style.display = "block";
    removeChildren(quiz);
    removeChildren(form);

    for(i = 0; i < highScores.length; i++){
        let li = document.createElement("li");
        li.textContent = (i + 1) + ". " + highScores[i];
        quiz.appendChild(li);
    }
    let button = document.createElement("button");
    button.textContent = "Clear Scores";
    button.setAttribute("data-value", "clear-scores");
    quiz.appendChild(button);
}

function storeInfo(){
    localStorage.setItem("scores", JSON.stringify(highScores));
}

function init(){
    let storedScores = JSON.parse(localStorage.getItem("scores"));

    if(storedScores !== null){
        highScores = storedScores;
    }
}

function removeChildren(parent){
    while(parent.hasChildNodes()){
        parent.removeChild(parent.firstChild);
    }
}