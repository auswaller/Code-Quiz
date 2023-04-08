const quiz = document.getElementById("quiz");
const titleText = document.getElementById("title")
const startButton = document.getElementById("start");
const question = {
    text: ["String values must be contained within _____ when being assigned to a variable.","Arrays in JavaScript can be used to store:","Commonly used data types DO NOT include:","The condition of an if/else statment is enclosed with _____","Which HTML element contains a reference to the JavaScript file?","How do you write a comment in JavaScript?","Which operator is used t assign a value to a variable?","How do you call a function the is named 'aFunction'"],
    choices: ["commas,curly braces,quotes,parentheses","numbers and strings,other arrays,booleans,all of the above","strings,numbers,booleans,alerts","quotes,curly braces,parentheses,square brackets","<javascript>,<js>,<script>,<scripting>","//Comment,#Comment,[Comment],<!--Comment-->","-,x,>,=","call aFunction(),aFunction,aFunction(),run aFunction()"],
    answer: ["quotes","all of the above","alerts","parentheses","<script>","//Comment","=","aFunction()"]
}

let timer = 75;
let questionNum = 0;
let askedQuestions = [""];
let currentQuestion;

startButton.addEventListener("click", function() {
    timer = 75;
    questionNum = 0;
    startButton.style.display = "none";
	startTimer();
    currentQuestion = nextQuestion();
    console.log(currentQuestion);
});

function startTimer(){
    setInterval(function() {
        document.getElementById("timer").innerHTML = timer;
        timer--;
    }, 1000);
}

function nextQuestion(){
    let randomQuestion = Math.floor(Math.random() * question.text.length);
    if(!checkIfAsked(randomQuestion)){
        askedQuestions.push(randomQuestion);
        let choicesArr = question.choices[randomQuestion].split(",");
        if(questionNum < 5){
            titleText.innerHTML = "#" + (questionNum + 1) + ": " + question.text[randomQuestion];

            for(let i = 0; i < 4; i++){
                let li = document.createElement("li");
                let button = document.createElement("button");
                button.textContent = choicesArr[i];
                li.appendChild(button);
                quiz.appendChild(li);
            }
        }
        questionNum++;
        return randomQuestion;
    }
    else{
        nextQuestion();
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
