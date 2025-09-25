const questions = {
    "Technical": [
        { question: "Explain the difference between a list and a tuple in Python.", answer: "A list is mutable, whereas a tuple is immutable." },
        { question: "What is the time complexity of searching an element in a binary search tree?", answer: "O(log n)" },
        { question: "Explain polymorphism in object-oriented programming.", answer: "Polymorphism allows methods to take many forms, typically through inheritance or interfaces." }
    ],
    "HR": [
        { question: "Why do you want to work at our company?", answer: "I admire your innovation and growth opportunities." },
        { question: "Where do you see yourself in 5 years?", answer: "I see myself growing within the company and taking on leadership roles." }
    ],
    "Behavioral": [
        { question: "Tell me about a time you handled a difficult situation at work.", answer: "I resolved a conflict between two team members by facilitating a discussion and finding a common ground." },
        { question: "How do you handle stress?", answer: "I prioritize tasks, maintain a positive mindset, and take regular breaks to stay focused." }
    ]
};

let currentCategory = '';
let currentQuestionIndex = 0;
let timer;
let timeRemaining = 180;
let score = 0;
let answers = [];

function startInterview(category) {
    currentCategory = category;
    currentQuestionIndex = 0;
    score = 0;
    answers = [];
    timeRemaining = 180;
    
    document.getElementById('category-selection').classList.add('hidden');
    document.getElementById('interview-section').classList.remove('hidden');
    document.getElementById('result-section').classList.add('hidden');
    
    loadQuestion();
}

function loadQuestion() {
    const question = questions[currentCategory][currentQuestionIndex];
    document.getElementById('question').textContent = question.question;
    document.getElementById('answer').value = '';
    document.getElementById('feedback-container').classList.add('hidden');
    document.getElementById('timer').textContent = `Time Left: ${timeRemaining}s`;

    timer = setInterval(function() {
        if (timeRemaining > 0) {
            timeRemaining--;
            document.getElementById('timer').textContent = `Time Left: ${timeRemaining}s`;
        } else {
            clearInterval(timer);
            submitAnswer();
        }
    }, 1000);
}

function submitAnswer() {
    const userAnswer = document.getElementById('answer').value.trim();
    answers.push(userAnswer);

    const correctAnswer = questions[currentCategory][currentQuestionIndex].answer;
    const feedback = evaluateAnswer(userAnswer, correctAnswer);
    displayFeedback(feedback);
}

function evaluateAnswer(userAnswer, correctAnswer) {
    const correctAnswerLower = correctAnswer.toLowerCase();
    const userAnswerLower = userAnswer.toLowerCase();
    
    if (userAnswerLower === correctAnswerLower) {
        score += 3;
        return "Great answer!";
    } else if (userAnswerLower.includes(correctAnswerLower.split(' ')[0])) {
        score += 2;
        return "Good effort, but you can elaborate more.";
    } else {
        score += 0;
        return "Try to be more specific and accurate in your answer.";
    }
}

function displayFeedback(feedback) {
    document.getElementById('feedback').textContent = feedback;
    document.getElementById('feedback-container').classList.remove('hidden');
}

function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions[currentCategory].length) {
        loadQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    document.getElementById('interview-section').classList.add('hidden');
    document.getElementById('result-section').classList.remove('hidden');
    document.getElementById('score').textContent = `Your Score: ${score} / ${questions[currentCategory].length * 3}`;
}
