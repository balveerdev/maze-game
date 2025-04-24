

//// game /////////////////////////////////////////////////////

const layout = [
  "1111111111111111111111111111",
  "0100010001000101000100010000",
  "0101010111011101010101110111",
  "0101010101000101010101000101",
  "0101010101010101010101011101",
  "0101000101010001010001000101",
  "0101011101011101010101110101",
  "0001010001000101010101010001",
  "0111010111011101011101010101",
  "0100010000010000010100011101",
  "0111010111010111110111010001",
  "0101010100010001010000010101",
  "0101010101111111010111110101",
  "0100000100000000010000000101",
  "1111111111111111111111111111"
];

const maze = document.getElementById("maze");
const rows = layout.length;
const cols = layout[0].length;
let cells = [];

function getIndex(r, c) {
  return r * cols + c;
}

function createMaze() {
  maze.innerHTML = "";
  cells = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      if (layout[r][c] === "1") {
        cell.classList.add("path");
      }
      maze.appendChild(cell);
      cells.push(cell);
    }
  }
}

let currentRow = 7;
let currentCol = 0;

const emoji = document.createElement("div");
emoji.className = "emoji";
emoji.textContent = "🧍";

const goal = document.createElement("div");
goal.className = "goal";
goal.textContent = "🏠";
const goalRow = 1;
const goalCol = 27;

const winMessage = document.getElementById("winMessage");
const playAgainButton = document.getElementById("playAgainButton");

const victorySound = new Audio("assets/sound/click-effect-2s.mp3");

function resetGame() {
  createMaze();

  currentRow = 7;
  currentCol = 0;
  cells[getIndex(currentRow, currentCol)].appendChild(emoji);
  cells[getIndex(goalRow, goalCol)].appendChild(goal);

  winMessage.style.display = "none";
  playAgainButton.style.display = "none";

  document.querySelectorAll(".controls button").forEach(btn => {
    btn.disabled = false;
    btn.style.opacity = 1;
    btn.style.cursor = "pointer";
  });
}

function moveEmoji(dr, dc) {
  const newRow = currentRow + dr;
  const newCol = currentCol + dc;

  if (
    newRow >= 0 && newRow < rows &&
    newCol >= 0 && newCol < cols &&
    layout[newRow][newCol] === "0"
  ) {
    currentRow = newRow;
    currentCol = newCol;
    cells[getIndex(currentRow, currentCol)].appendChild(emoji);

    if (currentRow === goalRow && currentCol === goalCol) {
      winMessage.style.display = "block";
      playAgainButton.style.display = "inline-block";

      victorySound.play().catch((err) => {
        console.error("Audio error:", err);
      });

      document.querySelectorAll(".controls button").forEach(btn => {
        btn.disabled = true;
        btn.style.opacity = 0.5;
        btn.style.cursor = "not-allowed";
      });
    }
  }
}

createMaze();
cells[getIndex(currentRow, currentCol)].appendChild(emoji);
cells[getIndex(goalRow, goalCol)].appendChild(goal);

document.getElementById("up").addEventListener("click", () => moveEmoji(-1, 0));
document.getElementById("down").addEventListener("click", () => moveEmoji(1, 0));
document.getElementById("left").addEventListener("click", () => moveEmoji(0, -1));
document.getElementById("right").addEventListener("click", () => moveEmoji(0, 1));
playAgainButton.addEventListener("click", resetGame);

// Keyboard controls
document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp":
      moveEmoji(-1, 0);
      break;
    case "ArrowDown":
      moveEmoji(1, 0);
      break;
    case "ArrowLeft":
      moveEmoji(0, -1);
      break;
    case "ArrowRight":
      moveEmoji(0, 1);
      break;
  }
});
