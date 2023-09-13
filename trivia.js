const questions = [
    {
        question: "What is the correct way to comment multiple lines in Python?",
        answers: [
            { text: "// This is a comment", correct: false },
            { text: "/* This is a comment */", correct: false },
            { text: "# This is a comment", correct: true },
            { text: "// This is a comment //", correct: false }
        ]
    },
    {
        question: "Which keyword is used to declare a variable in Python?",
        answers: [
            { text: "var", correct: false },
            { text: "let", correct: false },
            { text: "const", correct: false },
            { text: "None of the above", correct: true }
        ]
    },
    {
        question: "Which programming language is often used for developing Android applications?",
        answers: [
            { text: "Java", correct: true },
            { text: "Python", correct: false },
            { text: "C++", correct: false },
            { text: "Ruby", correct: false }
        ]
    },
    {
        question: "In Python, which keyword is used to define a function?",
        answers: [
            { text: "def", correct: true },
            { text: "func", correct: false },
            { text: "define", correct: false },
            { text: "function", correct: false }
        ]
    },
    {
        question: "What is the result of 5 + '10' in JavaScript?",
        answers: [
            { text: "'510'", correct: false },
            { text: "15", correct: false },
            { text: "'15'", correct: true },
            { text: "Error", correct: false }
        ]
    },
    {
        question: "What data structure uses the Last-In-First-Out (LIFO) principle?",
        answers: [
            { text: "Queue", correct: false },
            { text: "Stack", correct: true },
            { text: "Linked List", correct: false },
            { text: "Tree", correct: false }
        ]
    },
    {
        question: "In object-oriented programming, what is encapsulation?",
        answers: [
            { text: "The process of inheritance", correct: false },
            { text: "The process of data hiding and abstraction", correct: true },
            { text: "The process of method overloading", correct: false },
            { text: "The process of polymorphism", correct: false }
        ]
    },
    {
        question: "Which sorting algorithm has the worst-case time complexity of O(n^2)?",
        answers: [
            { text: "Merge Sort", correct: false },
            { text: "Quick Sort", correct: false },
            { text: "Bubble Sort", correct: true },
            { text: "Insertion Sort", correct: false }
        ]
    },
    {
        question: "What does SQL stand for?",
        answers: [
            { text: "Structured Query Language", correct: true },
            { text: "Server Quality Language", correct: false },
            { text: "Simple Query Language", correct: false },
            { text: "Standard Question Language", correct: false }
        ]
    },
    {
        question: "What is the purpose of a constructor in object-oriented programming?",
        answers: [
            { text: "To create instances of a class", correct: true },
            { text: "To destruct instances of a class", correct: false },
            { text: "To hide class implementation details", correct: false },
            { text: "To declare class properties", correct: false }
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.querySelector(".answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);

        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }

        button.addEventListener("click", selectAnswer);
    });
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    nextButton.style.display = "block";
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function showScore() {
    resetState();
    questionElement.innerText = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();
