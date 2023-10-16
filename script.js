let theBoard = ['','','','','','','','',''];
let player = 'x';

const boardContainer = document.querySelector('#container');
const squares = document.querySelectorAll('.square');
const winningMessage = document.querySelector('#reset');
const text = document.querySelector('.text');
const resetButton = document.querySelector('button');

let playerNameOne = document.querySelector('#player-name-one');
let playerNameTwo = document.querySelector('#player-name-two');
let playerDifficultyOne = document.querySelector("#player-difficulty-one");
let playerDifficultyTwo = document.querySelector("#player-difficulty-two");
let botInterval;

function handleClick(e) {
    e.target.classList.add(player);
    theBoard[e.target.id] = player + e.target.id;
    if (!theBoard.includes('') && !checkForWin(theBoard)) {
        showDraw();
    } else if (!checkForWin(theBoard)) {
        swapPlayers();
    } else if (checkForWin(theBoard)) {
        showResult();
    }
    if (playerDifficultyTwo.value === 'easy' && !checkForWin(theBoard)) {
        setTimeout(botEasy, 200);
    } else if (playerDifficultyOne.value === 'easy' && playerDifficultyTwo.value === 'human') {
        setTimeout(botEasy, 200);
    // } else if (playerDifficultyTwo.value === 'unbeatable' && !checkForWin(theBoard)) {
    //     setTimeout(botUnbeatable, 200);
    }
}

// function botUnbeatable() {
//     let chosenSquare = document.getElementById(`${getIdNumber(findBestMove(board))}`);
//     if (!checkForWin(theBoard) && theBoard.includes('')) {
//         chosenSquare.classList.add(player);
//         chosenSquare.removeEventListener('click', handleClick);
//         theBoard[chosenSquare.id] = player + chosenSquare.id;
//     }
//     if (!theBoard.includes('') && !checkForWin(theBoard)) {
//         showDraw();
//     } else if (!checkForWin(theBoard)) {
//         swapPlayers();
//     } else if (checkForWin(theBoard)) {
//         showResult();
//     }
// }


function botEasy() {
    let randomNumber = Math.floor(Math.random() * 9);
    while (theBoard[randomNumber] !== '' && theBoard.includes('')) {
        randomNumber = Math.floor(Math.random() * 9);
    }
    let randomSquare = document.getElementById(`${randomNumber}`);
    if (!checkForWin(theBoard) && theBoard.includes('')) {
        randomSquare.classList.add(player);
        randomSquare.removeEventListener('click', handleClick);
        theBoard[randomSquare.id] = player + randomSquare.id;
    }
    if (!theBoard.includes('') && !checkForWin(theBoard)) {
        showDraw();
    } else if (!checkForWin(theBoard)) {
        swapPlayers();
    } else if (checkForWin(theBoard)) {
        showResult();
    }
}

function botVsBot() {
    if (playerDifficultyOne.value === 'easy' && playerDifficultyTwo.value === 'easy') {
        squares.forEach((square) => square.removeEventListener('click', handleClick));
        botInterval = setInterval(() => {
            if (!checkForWin(theBoard) && theBoard.includes('')) {
                botEasy();
            } else {
                clearInterval(botInterval);
            }
        }, 1000);
    }
}

function gamePlay() {
    squares.forEach((square) => {
        square.addEventListener('click', handleClick, {once : true});
    })
}

resetButton.addEventListener('click', () => {
    theBoard = ['','','','','','','','',''];
    player = 'x';
    boardContainer.classList.add('x');
    winningMessage.classList.remove('show');
    squares.forEach((square) => {
        square.classList.remove('x');
        square.classList.remove('o');
        });
    squares.forEach((square) => square.removeEventListener('click', handleClick));
    clearInterval(botInterval);
    gamePlay();
})

playerDifficultyOne.addEventListener('change', () => {
    playerDifficultyOne = document.querySelector("#player-difficulty-one");
    resetButton.click();
    console.log(playerDifficultyOne.value);
    if (playerDifficultyOne.value === 'easy' && playerDifficultyTwo.value === 'easy') {
        botVsBot();
    } else if (playerDifficultyOne.value === 'easy' && playerDifficultyTwo.value === 'human') {
        botEasy();
    }
})

playerDifficultyTwo.addEventListener('change', () => {
    playerDifficultyTwo = document.querySelector("#player-difficulty-two");
    resetButton.click();
    console.log(playerDifficultyTwo.value);
    if (playerDifficultyOne.value === 'easy' && playerDifficultyTwo.value === 'easy') {
        botVsBot();
    }
})

function swapPlayers() {
    if (player === 'x') {
        boardContainer.classList.remove('x');
        boardContainer.classList.add('o');
        player = 'o';
    } else {
        boardContainer.classList.remove('o');
        boardContainer.classList.add('x');
        player = 'x';
    }
}

function showResult() {
    winningMessage.classList.add('show');
    boardContainer.classList.remove('o');
    boardContainer.classList.remove('x');
    text.innerText = `${(player === 'x') ? playerNameOne.value : playerNameTwo.value} Wins!`;
}

function showDraw() {
    winningMessage.classList.add('show');
    boardContainer.classList.remove('o');
    boardContainer.classList.remove('x');
    text.innerText = `It's a Draw!`;
}

function checkForWin(theBoard) {
    const winningCombos = [
        ['x0','x1','x2'], 
        ['x3','x4','x5'], 
        ['x6','x7','x8'],
        ['x0','x3','x6'], 
        ['x1','x4','x7'], 
        ['x2','x5','x8'], 
        ['x0','x4','x8'], 
        ['x2','x4','x6'], 
        ['o0','o1','o2'], 
        ['o3','o4','o5'], 
        ['o6','o7','o8'], 
        ['o0','o3','o6'], 
        ['o1','o4','o7'], 
        ['o2','o5','o8'], 
        ['o0','o4','o8'], 
        ['o2','o4','o6']
    ];
    for (let combo of winningCombos) {
        if (combo.every(item => theBoard.includes(item))) {
            return true;
        }
    }
}

gamePlay();

// let board = changeBoard(theBoard);
        
// function changeBoard(theBoard) {
//     let temp = theBoard.map(item => item.charAt(0));
//     let result = [];
//     for (let i = 0; i < 9; i += 3) {
//         result.push(temp.slice(i, i + 3));
//     }
//     return result;
// }

// function evaluate(b) {
// // Checking for Rows for X or O victory.
// for (let row = 0; row < 3; row++) {
//     if (b[row][0] == b[row][1] && b[row][1] == b[row][2]) {
//         if (b[row][0] == 'x') return +10;
//         else if (b[row][0] == 'o') return -10;
//     }
// }
// // Checking for Columns for X or O victory.
// for (let col = 0; col < 3; col++) {
//     if (b[0][col] == b[1][col] && b[1][col] == b[2][col]) {
//         if (b[0][col] == 'x') return +10;
//         else if (b[0][col] == 'o') return -10;
//     }
// }
// // Checking for Diagonals for X or O victory.
// if (b[0][0] == b[1][1] && b[1][1] == b[2][2]) {
//     if (b[0][0] == 'x') return +10;
//     else if (b[0][0] == 'o') return -10;
// }
// if (b[0][2] == b[1][1] && b[1][1] == b[2][0]) {
//     if (b[0][2] == 'x') return +10;
//     else if (b[0][2] == 'o') return -10;
// }
// // Else if none of them have won then return 0
// return 0;
// }

// class Move { 
//     constructor() { 
//         let row, col;
//     }
// } 

// // let board = [ ['o','x','o'], 
// //             ['x','x','o'], 
// //             ['','',''] 
// //             ];

// let opponent = 'o'; 
// player = 'x';

// function isMoveLeft(board) { 
//     for(let i = 0; i < 3; i++) {
//         for(let j = 0; j < 3; j++) {
//             if (board[i][j] == '') {
//                 return true;
//             }
//         }
//     }
//     return false;
// } 

// function minimax(board, depth, isMax) { 
//     let score = evaluate(board); 
//     // If Maximizer has won the game return his/her evaluated score 
//     if (score === 10) return score;
//     // If Minimizer has won the game return his/her evaluated score 
//     if (score === -10) return score; 
//     // If there are no more moves and no winner then it is a tie 
//     if (isMoveLeft(board) === false) return 0; 
//     // If maximizer's move 
//     if (isMax) { 
//         let best = -1000; 
//         // Traverse all cells 
//         for(let i = 0; i < 3; i++) { 
//             for(let j = 0; j < 3; j++){ 
//                 // Check if cell is empty 
//                 if (board[i][j] === '') { 
//                     // Make the move
//                     board[i][j] = player; 
//                     // Call minimax recursively and choose the maximum value 
//                     best = Math.max(best, minimax(board, depth + 1, !isMax));
//                     // Undo the move 
//                     board[i][j] = ''; 
//                 } 
//             } 
//         }
//         return best; 
//     }
//     // If minimizer's move 
//     else { 
//         let best = 1000; 
//         // Traverse all cells 
//         for(let i = 0; i < 3; i++) { 
//             for(let j = 0; j < 3; j++) { 
//                 // Check if cell is empty 
//                 if (board[i][j] === '') {
//                     // Make the move 
//                     board[i][j] = opponent; 
//                     // Call minimax recursively and choose the minimum value 
//                     best = Math.min(best, minimax(board, depth + 1, !isMax)); 
//                     // Undo the move 
//                     board[i][j] = ''; 
//                 }
//             }
//         }
//         return best; 
//     } 
// } 
// // This will return the best possible move for the player 
// function findBestMove(board, isMax) { 
//     board = changeBoard(theBoard);
//     console.log(board);
//     let bestVal = isMax ? -1000 : 1000;
//     let bestMove = new Move(); 
//     bestMove.row = -1;
//     bestMove.col = -1;
//     // Traverse all cells, evaluate minimax function for all empty cells. And return the cell with optimal value. 
//     for(let i = 0; i < 3; i++) { 
//         for(let j = 0; j < 3; j++) {   
//             // Check if cell is empty 
//             if (board[i][j] === '') { 
//                 // Make the move 
//                 board[i][j] = isMax ? player : opponent; 
//                 // compute evaluation function for this move. 
//                 let moveVal = minimax(board, 0, !isMax); 
//                 // Undo the move 
//                 board[i][j] = ''; 
//                 // If the value of the current move is more than the best value, then update best 
//                 if (isMax) {
//                     if (moveVal > bestVal) {
//                         bestMove.row = i;
//                         bestMove.col = j;
//                         bestVal = moveVal;
//                     }
//                 } else {
//                     if (moveVal < bestVal) {
//                         bestMove.row = i;
//                         bestMove.col = j;
//                         bestVal = moveVal;
//                     }
//                 }
//             }
//         }
//     }
//     return bestMove;
// }

// function logBestMove(board, isMax) {
//     let bestMove = findBestMove(board, isMax);
//     console.log("The Optimal Move is:"); 
//     console.log("ROW: " + bestMove.row + " COL: "+ bestMove.col); 
// }

// function getIdNumber(bestMove) {
//     logBestMove(board)
//     let i = bestMove.row * 3 + bestMove.col;
//     return i;
// }
