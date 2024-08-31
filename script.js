const questionsByLevel = {
    1: [
        { question: "What is the capital of India?", answers: ["Raipur", "Delhi", "Bastar", "Chhattisgarh"], correct: 1 },
        { question: "Which planet is known as the Red Planet?", answers: ["Earth", "Mars", "Jupiter", "Saturn"], correct: 1 },
        { question: "What is the largest ocean on Earth?", answers: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"], correct: 3 },
        { question: "What is the capital of Chhattisgarh?", answers: ["Dantewada", "Raipur", "Bastar", "Bilaspur"], correct: 1 }
        
    ],
    2: [
        { question: "What is the capital of Madhyapradesh" , answers:["Raipur","Delhi","Bastar","Bhopal"], correct:4},
        
    ]
    
};

let currentLevel = 1;
let currentQuestionIndex = 0;
let score = 0;
let questionsAsked = [];
let userID = ''; 


const startPage = document.getElementById('start-page');
const quizPage = document.getElementById('quiz-page');
const resultsPage = document.getElementById('results-page');
const questionContainer = document.getElementById('question-container');
const answerButtons = document.getElementById('answer-buttons');
const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const previousButton = document.getElementById('previous-btn');
const skipButton = document.getElementById('skip-btn');
const submitButton = document.getElementById('submit-btn');
const exitButton = document.getElementById('exit-btn');
const exitResultsButton = document.getElementById('exit-results-btn');
const resultContainer = document.getElementById('result-container');
const profileInfo = document.getElementById('profile-info');
const resultsDetails = document.getElementById('results-details');


startButton.addEventListener('click', startQuiz);
nextButton.addEventListener('click', () => navigateQuestion(1));
previousButton.addEventListener('click', () => navigateQuestion(-1));
skipButton.addEventListener('click', skipQuestion);
submitButton.addEventListener('click', submitQuiz);
exitButton.addEventListener('click', exitQuiz);
exitResultsButton.addEventListener('click', () => {
    startPage.style.display = 'block';
    resultsPage.style.display = 'none';
    quizPage.style.display = 'none'; 
});


function startQuiz() {
    currentLevel = 1;
    currentQuestionIndex = 0;
    score = 0;
    questionsAsked = [];
    startPage.style.display = 'none';
    quizPage.style.display = 'block';
    resultsPage.style.display = 'none';
    showQuestion();
    nextButton.style.display = 'none'; 
    previousButton.style.display = 'none';
    skipButton.style.display = 'block';
    submitButton.style.display = 'none';
}


function showQuestion() {
    const questions = questionsByLevel[currentLevel];
    if (!questions || questions.length === 0) return;

    if (questionsAsked.length === questions.length) {
        submitButton.style.display = 'block'; 
        return;
    }

    let questionIndex;
    do {
        questionIndex = Math.floor(Math.random() * questions.length);
    } while (questionsAsked.includes(questionIndex));
    
    questionsAsked.push(questionIndex);
    const question = questions[questionIndex];
    
    questionContainer.innerText = question.question;
    answerButtons.innerHTML = '';
    question.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.innerText = answer;
        button.classList.add('btn');
        button.addEventListener('click', () => selectAnswer(index));
        answerButtons.appendChild(button);
    });

    
    previousButton.style.display = currentQuestionIndex > 0 ? 'block' : 'none';
}


function selectAnswer(selectedAnswer) {
    const questions = questionsByLevel[currentLevel];
    if (!questions) return;

    const correctAnswer = questions[questionsAsked[currentQuestionIndex]].correct;
    if (selectedAnswer === correctAnswer) {
        score++;
    }
    nextButton.style.display = 'block'; 
    skipButton.style.display = 'block';
    disableAnswerButtons();
}


function disableAnswerButtons() {
    Array.from(answerButtons.children).forEach(button => button.disabled = true);
}


function navigateQuestion(direction) {
    if (direction === 1) {
        if (currentQuestionIndex < questionsByLevel[currentLevel].length - 1) {
            currentQuestionIndex++;
        }
    } else {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
        }
    }
    showQuestion();
    nextButton.style.display = currentQuestionIndex < questionsByLevel[currentLevel].length - 1 ? 'block' : 'none';
    previousButton.style.display = currentQuestionIndex > 0 ? 'block' : 'none';
}


function skipQuestion() {
    if (currentQuestionIndex < questionsByLevel[currentLevel].length - 1) {
        currentQuestionIndex++;
        showQuestion();
    }
}


function submitQuiz() {
    quizPage.style.display = 'none';
    resultsPage.style.display = 'block';

    
    profileInfo.innerText = `You scored ${score} out of ${questionsByLevel[currentLevel].length}`;
    resultsDetails.innerText = `Level: ${currentLevel}\nScore: ${score}\nQuestions Asked: ${questionsAsked.length}`;

    
    saveScore(userID, score, currentLevel);
}


function saveScore(userID, score, level) {
    let userScores = JSON.parse(localStorage.getItem('userScores')) || {};
    userScores[userID] = userScores[userID] || {};
    userScores[userID][level] = score;
    localStorage.setItem('userScores', JSON.stringify(userScores));
}


function exitQuiz() {
    startPage.style.display = 'block';
    quizPage.style.display = 'none';
    resultsPage.style.display = 'none';
}

