const gameContainer = document.getElementById("gameContainer");
const scoreBoard = document.querySelector(".scoreBoard");
const containerSize = 400;
const pixelSize = 10;
const pixelsPerRow = containerSize/pixelSize;
const pixelsPerCol = containerSize/pixelSize;
let board = [];
for(let i=0; i<pixelsPerRow; i++){
	let row = [];
	for(let j=0; j<pixelsPerCol; j++){
		row.push(0);
	}
	board.push(row);
}
let snakePos = [{row: 19, col: 0}, {row: 19, col: 1}, {row: 19, col: 2}];

// Initialize the score
let score = 0;

// Render the game board
function render() {
  // Clear the game container
  gameContainer.innerHTML = "";
  
  // Render the pixels of the game board
  for (let i = 0; i < pixelsPerRow; i++) {
    for (let j = 0; j < pixelsPerCol; j++) {
      let pixel = document.createElement("div");
      pixel.classList.add("pixel");
      pixel.id = `pixel${i*pixelsPerRow+j}`;
      gameContainer.appendChild(pixel);
    }
  }
  
  // Render the snake body pixels
  snakePos.forEach(pos => {
    let pixel = document.getElementById(`pixel${pos.row*pixelsPerRow+pos.col}`);
    pixel.classList.add("snakeBodyPixel");
  });
  
  // Render the food pixel
  let foodPos = getFoodPos();
  let pixel = document.getElementById(`pixel${foodPos.row*pixelsPerRow+foodPos.col}`);
  pixel.classList.add("food");
  
  // Update the score board
  scoreBoard.textContent = `Score: ${score}`;
}

// Move the snake
function move() {
  // Remove the tail of the snake
  let tail = snakePos.pop();
  let tailPixel = document.getElementById(`pixel${tail.row*pixelsPerRow+tail.col}`);
  tailPixel.classList.remove("snakeBodyPixel");
  
  // Calculate the new head position of the snake
  let head = snakePos[0];
  let newHead = {row: head.row, col: head.col + 1};
  
  // Check if the new head position is out of bounds or hits the snake body
  if (newHead.col < 0 || newHead.col >= pixelsPerCol ||
      board[newHead.row][newHead.col] === 1) {
    clearInterval(moveInterval);
    alert(`Game over! Your score is ${score}`);
  } else {
    // Check if the new head position hits the food
    let foodPos = getFoodPos();
    if (newHead.row === foodPos.row && newHead.col === foodPos.col) {
      // Add a new head to the snake and update the score
      snakePos.unshift(newHead);
      score++;
      render();
    } else {
      // Move the snake head and add a new head
      let headPixel = document.getElementById(`pixel${head.row*pixelsPerRow+head.col}`);
      headPixel.classList.remove("snakeBodyPixel");
      snakePos.unshift(newHead);
      let newHeadPixel = document.getElementById(`pixel${newHead.row*pixelsPerRow+newHead.col}`);
      newHeadPixel.classList.add("snakeBodyPixel");
    }
  }
}

// Generate a random position for the food
function getFoodPos() {
  let row = Math.floor(Math.random() * pixelsPerRow);
  let col = Math.floor(Math.random() * pixelsPerCol);
  while (board[row][col] === 1) {
    row = Math.floor(Math.random() * pixelsPerRow);
    col = Math.floor(Math.random() * pixelsPerCol);
  }
  return {row: row, col: col};
}

// Initialize the game
function init() {
  // Set the starting position of the snake
  snakePos = [{row: 19, col: 0}, {row: 19, col: 1}, {row: 19, col: 2}];
  
  // Initialize the score
  score = 0;
  
  // Render the game board
  render();
  
  // Start moving the snake automatically
  moveInterval = setInterval(move, 100);
}

// Start the game when the page is loaded
window.addEventListener("load", init);