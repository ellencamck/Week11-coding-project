let playerText = document.getElementById('playerText');
let restartBtn = document.getElementById('restartBtn');
let boxes = Array.from(document.getElementsByClassName('box')); // Array of game boxes

const player1Input = document.getElementById('player1Input');
const player2Input = document.getElementById('player2Input');

// Get the winning indicator color from CSS variables
let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks');

// Define constants for player symbols
const O_TEXT = "O";
const X_TEXT = "X";

// Initialize the current player as X
let currentPlayer = X_TEXT;

// Initialize the game board spaces as an array with 9 null values
let spaces = Array(9).fill(null);

// Function to set up the game at the start
const startGame = () => {
    // Add event listeners to the game boxes
    boxes.forEach(box => box.addEventListener('click', boxClicked));
}
// Function to handle a player's move when a game box is clicked
function boxClicked(e) {
    const id = e.target.id

    if(!spaces[id]){
        // Update the game board and display the player's symbol
        spaces[id] = currentPlayer;
        e.target.innerText = currentPlayer;
        // Check if the player has won
        if(playerHasWon() !==false){
            playerText = `${currentPlayer} has won!`
            let winnig_blocks = playerHasWon()
            // Highlight the winning boxes
            winnig_blocks.map(box => boxes[box].style.backgroundColor=winnerIndicator)
            return
        }
        // Switch to the other player for the next move
        currentPlayer = currentPlayer == X_TEXT ? O_TEXT: X_TEXT
    }
}
// Define the winning combinations for the Tic Tac Toe game
const winningCombos = [
    [0,1,2], 
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
// Function to check if a player has won
function playerHasWon() {
    let isTie = spaces.every(space => space !== null); // Check if all spaces are filled

    if (isTie) {
        // Delay the tie alert using setTimeout
        setTimeout(() => {
            alert("It's a tie!");
        }, 100);
        return true;
    }

    for (const condition of winningCombos) {
        let [a, b, c] = condition;

        if (spaces[a] && (spaces[a] === spaces[b] && spaces[a] === spaces[c])) {
            if (spaces[a] === X_TEXT) {
                // Delay the alert using setTimeout to ensure it's displayed after the game board is updated
                setTimeout(() => {
                    alert(player1Input.value + ' has won!');
                }, 100);
            } else if (spaces[a] === O_TEXT) {
                setTimeout(() => {
                    alert(player2Input.value + ' has won!');
                }, 100);
            }
            return [a, b, c];
        }
    }
    return false;
}
// Add an event listener to the restart button
restartBtn.addEventListener('click', restart) 
// Function to reset the game
function restart() {
    // Clear the game board
    spaces.fill(null)
    boxes.forEach(box => {
        box.innerText = '';
        box.style.backgroundColor = '';
    });

    // Reset the player input values
    player1Input.value = '';
    player2Input.value = '';

    // Set the current player back to X
    currentPlayer = X_TEXT;
}
// Call the startGame function to initialize the game
startGame()