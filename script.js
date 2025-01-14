//DOM elements
const questionElement = document.querySelector('.question');
const answerInput = document.querySelector('.answer');
const feedbackElement = document.querySelector('.feedback');
const counterElement = document.querySelector('.counter');
const summaryElement = document.querySelector('.summary');
const summaryMsg = document.querySelector('.summary-msg');

let questionCount = 0;
let correctCount = 0;
let incorrectCount = 0;
const totalQuestions = 15;
let currentQuestion = {};

const generateQuestion = () => {
  const num1 = Math.floor(Math.random() * 13);
  const num2 = Math.floor(Math.random() * 13);
  currentQuestion = {
    num1,
    num2,
    answer: num1 * num2,
  };
  questionElement.textContent = `${num1} x ${num2}`;
};

//add icons depending on the feedback
const updateCounter = (isCorrect) => {
  // Create a wrapper for the icon and number
  const iconWrapper = document.createElement('div');
  iconWrapper.style.display = 'flex';
  iconWrapper.style.flexDirection = 'column';
  iconWrapper.style.alignItems = 'center';
  iconWrapper.style.margin = '0 2px'; // Add space between icons

  // Create the icon element
  const icon = document.createElement('i');
  if (isCorrect) {
    icon.classList.add('fas', 'fa-star', 'correct'); // Add yellow star
    icon.style.color = 'gold';
  } else {
    icon.classList.add('fas', 'fa-times', 'incorrect'); // Add red cross
    icon.style.color = 'red';
  }

  // Create the number element
  const number = document.createElement('span');
  number.textContent = questionCount + 1; // Add 1 since questionCount starts from 0
  number.style.fontSize = '0.8rem'; // Smaller font size for the number
  number.style.marginTop = '5px'; // Add spacing between the icon and the number

  // Append the icon and number to the wrapper
  iconWrapper.appendChild(icon);
  iconWrapper.appendChild(number);

  // Append the wrapper to the counter element
  counterElement.appendChild(iconWrapper);
};

const checkAnswer = (e) => {
  if (e.code === 'Enter' && !answerInput.disabled) {
    const userAnswer = parseInt(answerInput.value, 10);
    answerInput.disabled = true; // Disable the input field
    if (userAnswer === currentQuestion.answer) {
      correctCount++;
      feedbackElement.textContent = 'You are absolutely right!';
      feedbackElement.style.color = 'green';
      updateCounter(true); // Add a yellow star
    } else {
      incorrectCount++;
      feedbackElement.textContent = `Oh no! The correct answer is ${currentQuestion.answer}.`;
      feedbackElement.style.color = 'red';
      updateCounter(false); // Add a red cross
    }
    questionCount++;
    answerInput.value = '';
    setTimeout(() => {
      feedbackElement.textContent = ''; // Clear feedback after 2.5s
      answerInput.disabled = false; // Re-enable the input field
      answerInput.focus(); // Set focus back to the input field
      if (questionCount === totalQuestions) {
        endGame(); // Call endGame only when all questions are completed
      } else {
        generateQuestion(); // Generate the next question if not the last one
      }
    }, 2500);
  }
};

const endGame = () => {
  const accuracy = Math.round((correctCount / totalQuestions) * 100);
  summaryMsg.innerHTML = `<p>You answered ${correctCount} out of ${totalQuestions} questions correctly.</p>
    <p>${
      accuracy >= 90
        ? 'SUPERSTAR! You make me so happy!'
        : accuracy >= 75
        ? 'You are so smart! Great result!'
        : "Not bad! I can see you like maths, let's play again!"
    }
    </p>`;

  summaryElement.style.display = 'block';
  document.querySelector('.problem-container').style.display = 'none';
  counterElement.style.display = 'none';
};

const reset = () => {
  correctCount = 0;
  incorrectCount = 0;
  questionCount = 0;
  currentQuestion = {};
  counterElement.innerHTML = ''; // Clear counter icons
  summaryElement.style.display = 'none';
  document.querySelector('.problem-container').style.display = 'flex';
  counterElement.style.display = 'flex';
  generateQuestion();
  answerInput.value = ''; // Clear any existing input
  answerInput.disabled = false; // Ensure the input is enabled if it was disabled
  answerInput.focus();
};

answerInput.addEventListener('keydown', checkAnswer);
document.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    if (summaryElement.style.display === 'block') {
      reset(); // Restart the game if the summary is visible
    }
  }
});

window.onload = () => {
  generateQuestion();
  answerInput.focus();
};
