let playerScore = 0;
let computerScore = 0;
let roundWinner = "";

function playRound(playerSelection, computerSelection) {
  if (playerSelection === computerSelection) {
    roundWinner = "tie";
  }
  if (
    (playerSelection === "ROCK" && computerSelection === "SCISSORS") ||
    (playerSelection === "SCISSORS" && computerSelection === "PAPER") ||
    (playerSelection === "PAPER" && computerSelection === "ROCK")
  ) {
    playerScore++;
    roundWinner = "player";
  }
  if (
    (computerSelection === "ROCK" && playerSelection === "SCISSORS") ||
    (computerSelection === "SCISSORS" && playerSelection === "PAPER") ||
    (computerSelection === "PAPER" && playerSelection === "ROCK")
  ) {
    computerScore++;
    roundWinner = "computer";
  }
  updateScoreMessage(roundWinner, playerSelection, computerSelection);
}

function randomChoice() {
  let randomNUm = Math.floor(Math.random() * 3);
  switch (randomNUm) {
    case 0:
      return "ROCK";
    case 1:
      return "PAPER";
    case 2:
      return "SCISSORS";
  }
}

function gameOver() {
  return playerScore === 5 || computerScore === 5;
}
// UI
const rockBtn = document.getElementById("rockBtn");
const paperBtn = document.getElementById("paperBtn");
const scissorBtn = document.getElementById("scissorBtn");
const playScore = document.getElementById("playerScore");
const compScore = document.getElementById("computerScore");
const scoreInfo = document.getElementById("scoreInfo");
const scoreMessage = document.getElementById("scoreMessage");
const endgameMsg = document.getElementById("endgameMsg");
const overlay = document.getElementById("overlay");
const restartBtn = document.getElementById("restartBtn");

rockBtn.addEventListener("click", () => handleClick("ROCK"));
paperBtn.addEventListener("click", () => handleClick("PAPER"));
scissorBtn.addEventListener("click", () => handleClick("SCISSORS"));
restartBtn.addEventListener("click", restartGame);
overlay.addEventListener("click", closeEndgameModal);

function handleClick(playerSelection) {
  if (gameOver()) {
    openEndgameModal();
    return;
  }

  const computerSelection = randomChoice();
  playRound(playerSelection, computerSelection);
  updateScore();

  if (gameOver()) {
    openEndgameModal();
    setFinalMessage();
  }
}

function updateScore() {
  if (roundWinner === "tie") {
    scoreInfo.textContent = "It's a tie!";
  } else if (roundWinner === "player") {
    scoreInfo.textContent = "You won!";
  } else if (roundWinner === "computer") {
    scoreInfo.textContent = "You lost!";
  }

  playScore.textContent = `${playerScore}`;
  compScore.textContent = `${computerScore}`;
}
function updateScoreMessage(winner, playerSelection, computerSelection) {
  if (winner === "player") {
    scoreMessage.textContent = `${capitalizeFirstLetter(
      playerSelection
    )} beats ${computerSelection.toLowerCase()}`;
    return;
  }
  if (winner === "computer") {
    scoreMessage.textContent = `${capitalizeFirstLetter(
      playerSelection
    )} is beaten by ${computerSelection.toLowerCase()}`;
    return;
  }

  scoreMessage.textContent = `${capitalizeFirstLetter(
    playerSelection
  )} ties with ${computerSelection.toLowerCase()}`;
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

function openEndgameModal() {
  endgameModal.classList.add("active");
  overlay.classList.add("active");
}

function closeEndgameModal() {
  endgameModal.classList.remove("active");
  overlay.classList.remove("active");
}

function setFinalMessage() {
  return playerScore > computerScore
    ? (endgameMsg.textContent = "You won!")
    : (endgameMsg.textContent = "You lost...");
}

function restartGame() {
  playerScore = 0;
  computerScore = 0;
  scoreInfo.textContent = "Choose your weapon";
  scoreMessage.textContent = "First to score 5 points wins the game";
  playScore.textContent = "0";
  compScore.textContent = "0";
  endgameModal.classList.remove("active");
  overlay.classList.remove("active");
}
