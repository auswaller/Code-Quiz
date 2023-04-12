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

//wait for form to be filled out and append the final score to the name entered
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

////wait for button clicks and test to see if it was to clear the high scores or an answer to a quiz question. If so verify if correct or incorrent and move onto the next
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

//wait for a click on the high score button and call the function to display them
scoreButton.addEventListener("click", function(event){
    event.preventDefault();
    isGameOver = true;
    showHighScores();
});

//wait for a click on the start button and reset score, timer, which questions that have been asked, and which question number the quiz is on. Then start the timer and ask a question
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

//logic for determining the next question and if 5 questions have been asked yet. Then choose a random one and display the multiple choices
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

//logic to determine if a question has been asked yet or not
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

//logic for what to do after the quiz ends. Determines score and shows an input for entering your name for the score list
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
    input.setAttribute("placeholder", " Name");

    form.appendChild(label);
    form.appendChild(input);
}

//logic for showing the high score list
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

//stores scores to local storage
function storeInfo(){
    localStorage.setItem("scores", JSON.stringify(highScores));
}

//logic for initial page load. looks for stored high scores and if there adds them to the current high score variable
function init(){
    let storedScores = JSON.parse(localStorage.getItem("scores"));

    if(storedScores !== null){
        highScores = storedScores;
    }
}

//logic for dynamically removing child elements
function removeChildren(parent){
    while(parent.hasChildNodes()){
        parent.removeChild(parent.firstChild);
    }
}