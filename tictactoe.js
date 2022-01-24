const turnTitle = document.getElementById('turn-title');
const gameResult = document.getElementById('game-result');
const restartBtn = document.getElementById('restart-btn');

restartBtn.addEventListener('click', restartGame);

let currentPlayer = 1;
let numOfMoves = 0;

const WINNING_SQUARES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const buttons = document.querySelectorAll('.square');
console.log(buttons);
buttons.forEach((button) => {
  button.addEventListener('click', () => {
    makeMove(button);
  });
});

function makeMove(button) {
  numOfMoves++;
  let playerSymbol = currentPlayer === 1 ? 'X' : 'O';
  button.textContent = playerSymbol;
  button.disabled = true;

  if (didPlayerWin()) {
    gameResult.textContent = `Player ${currentPlayer} Won!`;
    endGame();
  } else if (isTied()) {
    gameResult.textContent = "it's a tie";
  } else {
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    turnTitle.textContent = `Player ${currentPlayer} turn`;
  }

  enableRestart();
}

function didPlayerWin() {
  const relevantText = currentPlayer === 1 ? 'X' : 'O';
  return WINNING_SQUARES.some((condition) => {
    return condition.every((gameSquarePosition) => {
      return buttons[gameSquarePosition].textContent === relevantText;
    });
  });
}

function isTied() {
  return numOfMoves === 9;
}

function enableRestart() {
  restartBtn.style.display = 'block';
}

function restartGame() {
  currentPlayer = 1;
  numOfMoves = 0;
  restartBtn.style.display = 'block';
  gameResult.textContent = '';
  buttons.forEach((button) => {
    button.textContent = '';
    button.disabled = false;
  });
}

function endGame() {
  buttons.forEach((buttons) => {
    buttons.disabled = true;
  });
}
