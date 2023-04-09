const question = {
    text: ["String values must be contained within _____ when being assigned to a variable.","Arrays in JavaScript can be used to store:","Commonly used data types DO NOT include:","The condition of an if/else statment is enclosed with _____","Which HTML element contains a reference to the JavaScript file?","How do you write a comment in JavaScript?","Which operator is used t assign a value to a variable?","How do you call a function the is named 'aFunction'"],
    choices: ["commas,curly braces,quotes,parentheses","numbers and strings,other arrays,booleans,all of the above","strings,numbers,booleans,alerts","quotes,curly braces,parentheses,square brackets","<javascript>,<js>,<script>,<scripting>","//Comment,#Comment,[Comment],<!--Comment-->","-,x,>,=","call aFunction(),aFunction,aFunction(),run aFunction()"],
    answer: ["quotes","all of the above","alerts","parentheses","<script>","//Comment","=","aFunction()"]
}

const quiz = document.getElementById("quiz");
const titleText = document.getElementById("title")
const startButton = document.getElementById("start");
const scoreButton = document.getElementById("high-score");
const timerDisplay = document.getElementById("timer");

let timer;
let questionNum;
let askedQuestions = [];
let currentQuestion;
let score = 0;
let highScores = [];

init();

scoreButton.addEventListener("click", function(event){
    event.preventDefault();
    showHighScores();
});

startButton.addEventListener("click", function(event) {
    event.preventDefault();
    timer = 60;
    questionNum = 0;
    startButton.style.display = "none";
	timeInterval = setInterval(function() {
        timerDisplay.innerHTML = timer;

        if(timer < 0){
            quizOver();
        }
        timer--;
    }, 1000);
    currentQuestion = nextQuestion();
    console.log(currentQuestion);
});

function nextQuestion(){
    if(questionNum < 5){
        let randomQuestion = Math.floor(Math.random() * question.text.length);
        if(!checkIfAsked(randomQuestion)){
            askedQuestions.push(randomQuestion);
            let choicesArr = question.choices[randomQuestion].split(",");
            titleText.innerHTML = "#" + (questionNum + 1) + ": " + question.text[randomQuestion];

            for(let i = 0; i < choicesArr.length; i++){
                let li = document.createElement("li");
                let button = document.createElement("button");
                button.textContent = (i + 1) + ". " + choicesArr[i];
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
    console.log("got here " + number);

    if(askedQuestions.includes(number)){
        return true;
    }
    else{
        return false;
    }
}

function quizOver(){
    clearInterval(timeInterval);
    timerDisplay.innerHTML = 0;
    removeChildren();
    
}

function showHighScores(){
    clearInterval(timeInterval);
    timerDisplay.innerHTML = 0;
    titleText.innerHTML = "High Scores"
    startButton.style.display = "block";
    removeChildren();

    for(i = 0; i < highScores.length; i++){
        let li = document.createElement("li");
        li.textContent = (i + 1) + ". " + highScores[i];
        quiz.appendChild(li);
    }
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

function removeChildren(){
    while(quiz.hasChildNodes()){
        quiz.removeChild(quiz.firstChild);
    }
}