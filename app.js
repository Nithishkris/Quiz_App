const questions = [
    {
        question: "Which is the largest animal in the world?",
        answers: [
            {text: "shark", correct : false},
            {text: "Blue whale", correct : true},
            {text: "Elephant", correct : false},
            {text: "Giraffe", correct : false},
        ]
    },
    {
        question: "What is the currency of India?",
        answers: [
            {text: "Rupee", correct : true},
            {text: "Dollar", correct : false},
            {text: "Euro", correct : false},
            {text: "Yuan", correct : false},
        ]
    },
    {
        question: "Which country is known as land of rising sun?",
        answers: [
            {text: "India", correct : false},
            {text: "America", correct : false},
            {text: "Dubai", correct : false},
            {text: "Japan", correct : true},
        ]
    },
    {
        question: "Which city is Known as \"Eternal city\"?",
        answers: [
            {text: "mumbai", correct : false},
            {text: "Istanbul", correct : false},
            {text: "Rome", correct : true},
            {text: "Yangon", correct : false},
        ]
    },
    {
        question: "Which is the Smallest continent in the world?",
        answers: [
            {text: "Asia", correct : false},
            {text: "Australia", correct : true},
            {text: "Arctic", correct : false},
            {text: "Africa", correct : false},
        ]
    }
];

const questionsElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz()
{
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion()
{
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionsElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}
function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e)
{
    const selectedBtn = e.target;
    const iscorrect = selectedBtn.dataset.correct === "true";
    if(iscorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("Incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore()
{
    resetState();
    questionsElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length)
    {
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click",() => {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
})

startQuiz(); 