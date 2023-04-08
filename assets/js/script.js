const quiz = document.getElementById("quiz");
const titleText = document.getElementById("title")
const startButton = document.getElementById("start");
const question = {
    text: ["String values must be contained within _____ when being assigned to a variable."],
    choices: ["commas,curly braces,quotes,parentheses"],
    answer: ["quotes"]
}

let timer;
let questionNum;

startButton.addEventListener("click", function() {
    timer = 75;
    questionNum = 0;
	startTimer();
});

function startTimer(){
    setInterval(function() {
        document.getElementById("timer").innerHTML = timer;
        timer--;	
    }, 1000);
}