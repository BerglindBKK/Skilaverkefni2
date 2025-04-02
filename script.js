const board = document.getElementById('board');
const status = document.getElementById('status');

// currentPlayer set as let to be able to toggle between X and O
let currentPlayer = 'O'; //starts with player O
const gameBoard = Array(9).fill(null);
const cells = []; // Store cell references
const xgames = []; //stores all X games
const ogames = []; //stores all O games
let gameOver = false; //keeps track of the state of the game

const WIN_PATTERNS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function handleClick(index) {
    if (gameOver) return;

    const cell = cells[index];
    // TODO: Implement a function that when a cell of index is pressed, fills it with the symbol of the player whose turn it is,  - CHECK
    // TODO: and check if there's a winner. - CHECK
    // TODO: If there is no winner, swap player's turn -CHECK

    // If cell is empty, place the current players symbol inside the clicked cell
    if (cell.textContent === '') {
        cell.textContent = currentPlayer;
        console.log('INDEX:', index);
        console.log('Cell clicked:', cell.textContent);
        console.log('Cell clicked:', cell.id);
        let cellNumber = index;
        console.log('Cell number:', cellNumber);

        //Store the corrent play in an array for each player to later comapre to winner patterns
        if (currentPlayer === 'X') {
            xgames.push(cellNumber);
            console.log('Xgames:', xgames);
        }
        else if (currentPlayer === 'O') {
            ogames.push(cellNumber);
            console.log('Ogames:', ogames);
        }

        //check if there is alredy a winner
        const winner = checkWinner();
        console.log("Check winner: ", winner);

        //if yes, then log "won", end game and disable cells otherwise swap players
        if (winner) {
            console.log(`${currentPlayer} won!`);
            gameOver = true;
            disableCells();
            document.getElementById('status').textContent = `Player ${currentPlayer} won!`;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            console.log("Next player: ", currentPlayer);
        }
    }
}


// Disable the click events on all cells after winner is determined
function disableCells() {
    cells.forEach(cell => {
        cell.removeEventListener('click', handleClick);
        cell.style.pointerEvents = 'none'; //disable all mouse events in the cells
    });
}

//check if there's a winner
function checkWinner() {
    let isXWinner = false;
    let isOWinner = false;

    for (let i = 0; i < WIN_PATTERNS.length; i++) {
        if (WIN_PATTERNS[i].every(position => xgames.includes(position))) {
            isXWinner = true;
            break; // If X wins, no need to check further
        }
        if (WIN_PATTERNS[i].every(position => ogames.includes(position))) {
            isOWinner = true;
            break; // If O wins, no need to check further
        }
    }

    if (isXWinner) {
        console.log("X won");
    }
    else if (isOWinner) {
        console.log("O won");
    }

    // else if (!isXWinner && !isOWinner) {
    //     console.log("No one won yet");

    //     //if no one won yet, swap players
    //     console.log("Curren Player", currentPlayer);
    //     currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    //     console.log("Curren Player after swop", currentPlayer);
    // }
    return isXWinner || isOWinner; //function returns true when either one is a winner

}

// Reset the board, allowing for a new game to be played
function resetGame() {
    gameOver = false;
    currentPlayer = 'O';
    xgames.length = 0; // Clear the array
    console.log("xgames", xgames);
    ogames.length = 0; // Clear the array
    console.log("ogames", ogames);

    cells.forEach(cell => {
        cell.textContent = ''; // Clears the content of the cell
        cell.style.pointerEvents = 'auto'; // Re-enable mouse events
    });


    document.getElementById('status').textContent = `Player ${currentPlayer}'s turn`;

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