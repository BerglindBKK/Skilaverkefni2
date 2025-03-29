const board = document.getElementById('board');
const status = document.getElementById('status');
// currentPlayer set as let to be able to toggle between X and O
let currentPlayer = 'O';
const gameBoard = Array(9).fill(null);
const cells = []; // Store cell references
const xgames = [];
const ogames = [];

const WIN_PATTERNS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function handleClick(index) {
    // TODO: Implement a function that when a cell of index is pressed, fills it with the symbol
    // TODO: of the player whose turn it is, and check if there's a winner.
    // TODO: If there is no winner, swap player's turn

    // Add a click event listener to check for a click
    cells.forEach(cell => {
        cell.addEventListener('click', function () {
            // If cell is empty, place an X inside the clicked cell
            if (cell.textContent === '') {
                cell.textContent = currentPlayer;
                console.log('Cell clicked:', cell.textContent);
                console.log('Cell clicked:', cell.id);
                let cellNumber = cell.id.split('-')[1];
                console.log('Cell number:', cellNumber);

                //swap players turn
                if (currentPlayer === 'X') {
                    xgames.push(cellNumber);
                    console.log('Xgames:', xgames);
                    currentPlayer = 'O';
                }
                else if (currentPlayer === 'O') {
                    ogames.push(cellNumber);
                    console.log('Ogames:', ogames);
                    currentPlayer = 'X';
                }

                //check if there's a winner
                let isXWinner = false;
                let isOWinner = false;

                for (let i = 0; i < WIN_PATTERNS.length; i++) {

                    if (WIN_PATTERNS[i].every(position => xgames.includes(position))) {
                        isXWinner = true;
                        break; // If X wins, no need to check further
                    }
                    // Check if O has won for this pattern
                    if (WIN_PATTERNS[i].every(position => ogames.includes(position))) {
                        isOWinner = true;
                        break; // If O wins, no need to check further
                    }

                    if (isXWinner) {
                        console.log("X won");
                    }
                    else if (isOWinner) {
                        console.log("O won");
                    }

                    if (!isXWinner && !isOWinner) {
                        console.log("No one won yet");
                    }
                }


            }


        });
    });

}

function checkWinner() {
    // Loop through the cells and check if any win pattern matches with the board for a single player
    return false;
}


function resetGame() {
    // Reset the board, allowing for a new game to be played
}

//creates a board 
function createBoard() {
    for (let index = 0; index < 9; index++) { //creates 9 cells
        const cell = document.createElement('div'); //reates a new div element that will represent a cell on the game board
        cell.classList.add('cell'); //adds a CSS class called 'cell' to the newly created div element.
        cell.id = `cell-${index}`; //assigns a unique id to each div (cell-0, cell-1, ..., cell-8)
        cell.addEventListener('click', () => handleClick(index)); //sets up an event listener for each cell, riggers the handleClick function
        board.appendChild(cell); //adds the newly created cell to a parent element (likely a container for the entire game board, referred to as board
        cells.push(cell); // stores a reference to the newly created cell in the cells array
    }
}

createBoard();