let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;
let soundEnabled = true;
let scores = { X: 0, O: 0 };

const cells = document.querySelectorAll(".cell");
const turnIndicator = document.getElementById("turnIndicator");
const winModal = document.getElementById("winModal");
const winnerText = document.getElementById("winnerText");
const soundToggle = document.getElementById("soundToggle");
const player1Score = document.getElementById("player1Score");
const player2Score = document.getElementById("player2Score");

cells.forEach((cell, index) => {
  cell.addEventListener("click", () => handleCellClick(cell, index));
});

function handleCellClick(cell, index) {
  if (gameBoard[index] !== "" || !gameActive) return;

  gameBoard[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add("marked");

  if (checkWin()) {
    const winner = document.getElementById(
      currentPlayer === "X" ? "player1Name" : "player2Name"
    ).value;
    scores[currentPlayer]++;
    updateScores();
    showWinModal(`${winner} Wins!`);
    gameActive = false;
    return;
  }

  if (gameBoard.every((cell) => cell !== "")) {
    showWinModal("It's a Draw!");
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  updateTurnIndicator();
}

function checkWin() {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  return winPatterns.some((pattern) => {
    return pattern.every((index) => gameBoard[index] === currentPlayer);
  });
}

function updateTurnIndicator() {
  const playerName = document.getElementById(
    currentPlayer === "X" ? "player1Name" : "player2Name"
  ).value;
  turnIndicator.textContent = `${playerName}'s Turn`;
}

function showWinModal(text) {
  winnerText.textContent = text;
  winModal.classList.remove("hidden");
}

function updateScores() {
  player1Score.textContent = scores.X;
  player2Score.textContent = scores.O;
}

function resetGame() {
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  currentPlayer = "X";
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("marked");
  });
  updateTurnIndicator();
  winModal.classList.add("hidden");
}

document.getElementById("resetGame").addEventListener("click", () => {
  resetGame();
  scores = { X: 0, O: 0 };
  updateScores();
});

soundToggle.addEventListener("click", () => {
  soundEnabled = !soundEnabled;
  soundToggle.innerHTML = `<i class="ri-volume-${soundEnabled ? "up" : "mute"}-line"></i>`;
});

document.getElementById("player1Name").addEventListener("change", updateTurnIndicator);
document.getElementById("player2Name").addEventListener("change", updateTurnIndicator);