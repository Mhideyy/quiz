const questionNumber = document.getElementById("question-number");
const questionText = document.getElementById("question-text");
const options = document.querySelectorAll(".options li ");
const answerResult = document.getElementById("answerResult");
const finalScore = document.getElementById("final-score");
const restartButton = document.getElementById("restart-button");
const historyButton = document.getElementById("historybtn");
const historyList = document.getElementById("history-list");
let currentQuestionIndex = 0;
let score = 0;
let history = [];
let data = [];

// addeventlistener Domcontentloaded to fetch questions and display the first question
try {
  document.addEventListener("DOMContentLoaded", async function quiz() {
    const response = await fetch("http://localhost:5000/questions");
    data = await response.json();

    //   display the question and options
    const question = data[currentQuestionIndex];
    //   clear previous options and answer result
    // update the question number and text
    questionNumber.textContent = `Question ${currentQuestionIndex + 1} out of ${data.length}`;
    questionText.textContent = question.question;

    options.forEach((ul, index) => {
      const button = document.createElement("button");
      button.textContent = question.options[index];
      ul.appendChild(button);
      button.addEventListener("click", () => checkAnswer(index));
    });
  });
} catch (error) {
  console.error("Error fetching questions:", error);
}

async function checkAnswer(chosenIndex) {
  try {
    const selectedOption = data[currentQuestionIndex].options[chosenIndex];
    const rightIndex = data[currentQuestionIndex].answer;
    if (selectedOption === rightIndex) {
      document
        .querySelectorAll(".option-btn")
        [chosenIndex].classList.add("correct");
      document
        .querySelectorAll(".option-btn")
        [chosenIndex].classList.remove("incorrect");
      score++;
      //   history.push({
      //     question: data[currentQuestionIndex].question,
      //     selected: data[currentQuestionIndex].options[chosenIndex],
      //     correct: true,
      //   });
    } else {
      document
        .querySelectorAll(".option-btn")
        [chosenIndex].classList.add("incorrect");
      document
        .querySelectorAll(".option-btn")
        [chosenIndex].classList.remove("correct");
      //   history.push({
      //     question: data[currentQuestionIndex].question,
      //     selected: data[currentQuestionIndex].options[chosenIndex],
      //     correct: false,
      //   });
    }
    currentQuestionIndex++;

    answerResult.textContent = "";
    if (currentQuestionIndex < data.length) {
      const question = data[currentQuestionIndex];
      questionNumber.textContent = `Question ${currentQuestionIndex + 1} out of ${data.length}`;
      questionText.textContent = question.question;
    } else {
      finalScore.textContent = `Your final score is ${score} out of ${data.length}`;
      restartButton.style.display = "block";
      historyButton.style.display = "block";
    }
  } catch (error) {
    console.error("Error fetching questions:", error);
  }
}

// function displayHistory() {
//   try {
//     historyList.innerHTML = "";
//     history.forEach((entry, index) => {
//       const listItem = document.createElement("li");
//       listItem.textContent = `Q${index + 1}: ${entry.question} - Your answer: ${entry.selected} - ${
//         entry.correct ? "Correct" : "Wrong"
//       }`;
//       historyList.appendChild(listItem);
//     });
//   } catch (error) {
//     console.error("Error displaying history:", error);
//   }
// }

// try {
//   restartButton.addEventListener("click", () => {
//     currentQuestionIndex = 0;
//     score = 0;
//     history = [];
//     finalScore.textContent = "";
//     restartButton.style.display = "none";
//     quiz();
//   });
// } catch (error) {
//   console.error("Error setting up restart button:", error);
// }
