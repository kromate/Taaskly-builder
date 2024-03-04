document.addEventListener('DOMContentLoaded', () => {
    const questionEl_v8m6f2d = document.getElementById('question_v8m6f2d')
    const choicesEl_v8m6f2d = document.getElementById('choices_v8m6f2d')
    const prevBtn_v8m6f2d = document.getElementById('prev-btn_v8m6f2d')
    const nextBtn_v8m6f2d = document.getElementById('next-btn_v8m6f2d')
    const submitBtn_v8m6f2d = document.getElementById('submit-btn_v8m6f2d')
    const tryAgainBtn_v8m6f2d = document.getElementById('try-again-btn_v8m6f2d')
    const completionScreen_v8m6f2d = document.getElementById('completion-screen_v8m6f2d')
    const scoreProgress_v8m6f2d = document.getElementById('score-progress_v8m6f2d')
    const quizCard_v8m6f2d = document.getElementById('quiz-card_v8m6f2d')

    let currentQuestionIndex_v8m6f2d = 0
    let score_v8m6f2d = 0

const quizQuestions_v8m6f2d = [
    {
        question: 'What is the capital of France?',
        choices: ['Nigeria', 'London', 'Paris', 'Berlin'],
        answer: 'Paris'
    },
    {
        question: 'Which planet is known as the Red Planet?',
        choices: ['Jupiter', 'Mars', 'Saturn', 'Venus'],
        answer: 'Mars'
    },
    {
        question: 'What is the largest ocean on Earth?',
        choices: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
        answer: 'Pacific Ocean'
    },
    {
        question: 'Who wrote the play \'Romeo and Juliet\'?',
        choices: ['William Shakespeare', 'Charles Dickens', 'Jane Austen', 'Leo Tolstoy'],
        answer: 'William Shakespeare'
    },
    {
        question: 'What is the chemical symbol for gold?',
        choices: ['Au', 'Ag', 'Fe', 'O'],
        answer: 'Au'
    },
    {
        question: 'In what year did the Titanic sink?',
        choices: ['1912', '1910', '1914', '1916'],
        answer: '1912'
    }
]

    function loadQuestion_v8m6f2d() {
        const currentQuestion_v8m6f2d = quizQuestions_v8m6f2d[currentQuestionIndex_v8m6f2d]
        questionEl_v8m6f2d.textContent = currentQuestion_v8m6f2d.question
        choicesEl_v8m6f2d.innerHTML = ''
        currentQuestion_v8m6f2d.choices.forEach((choice) => {
            const button_v8m6f2d = document.createElement('button')
            button_v8m6f2d.textContent = choice
            button_v8m6f2d.className = 'btn'
            button_v8m6f2d.addEventListener('click', () => selectAnswer_v8m6f2d(choice))
            choicesEl_v8m6f2d.appendChild(button_v8m6f2d)
        })
        updateNavButtons_v8m6f2d()
    }

    function updateNavButtons_v8m6f2d() {
        prevBtn_v8m6f2d.disabled = currentQuestionIndex_v8m6f2d === 0
        nextBtn_v8m6f2d.disabled = currentQuestionIndex_v8m6f2d === quizQuestions_v8m6f2d.length - 1
        submitBtn_v8m6f2d.disabled = currentQuestionIndex_v8m6f2d !== quizQuestions_v8m6f2d.length - 1
    }

    function selectAnswer_v8m6f2d(choice) {
        console.log(choice)
        if (choice === quizQuestions_v8m6f2d[currentQuestionIndex_v8m6f2d].answer) {
            score_v8m6f2d++
        }
        nextQuestion_v8m6f2d()
    }

    prevBtn_v8m6f2d.addEventListener('click', () => {
        currentQuestionIndex_v8m6f2d = Math.max(currentQuestionIndex_v8m6f2d - 1, 0)
        loadQuestion_v8m6f2d()
    })

    nextBtn_v8m6f2d.addEventListener('click', () => {
        nextQuestion_v8m6f2d()
    })

    function nextQuestion_v8m6f2d() {
               currentQuestionIndex_v8m6f2d = Math.min(currentQuestionIndex_v8m6f2d + 1, quizQuestions_v8m6f2d.length)
               if (currentQuestionIndex_v8m6f2d >= 6) {
                 showCompletionScreen_v8m6f2d()
               }
        loadQuestion_v8m6f2d()
    }

    submitBtn_v8m6f2d.addEventListener('click', () => {
        showCompletionScreen_v8m6f2d()
    })

    tryAgainBtn_v8m6f2d.addEventListener('click', () => {
        score_v8m6f2d = 0
        currentQuestionIndex_v8m6f2d = 0
        quizCard_v8m6f2d.classList.remove('hidden')
        completionScreen_v8m6f2d.classList.add('hidden')
        loadQuestion_v8m6f2d()
    })

    function showCompletionScreen_v8m6f2d() {
        quizCard_v8m6f2d.classList.add('hidden')
        scoreProgress_v8m6f2d.textContent = `You got ${score_v8m6f2d} out of  ${quizQuestions_v8m6f2d.length} Questions`
        // Add the progress bar drawing logic here
        completionScreen_v8m6f2d.classList.remove('hidden')
    }

    loadQuestion_v8m6f2d()
})
