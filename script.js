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
let botsTurn = false;

function handleClick(e) {
    e.target.classList.add(player);
    theBoard[e.target.id] = player + e.target.id;
    if (!theBoard.includes('') && !checkForWin(theBoard)) {
        showDraw();
    } else if (!checkForWin(theBoard)) {
        swapPlayers();
    } else if (checkForWin(theBoard)) {
        showWin();
    }
    if (botsTurn) {
        botEasy;
    }
}

function botEasy() {
    let randomNumber = Math.floor(Math.random() * 9);
    while (theBoard[randomNumber] !== '') {
        randomNumber = Math.floor(Math.random() * 9);
    }
    let randomSquare = document.getElementById(`${randomNumber}`);
    randomSquare.classList.add(player);
    randomSquare.removeEventListener('click', handleClick);
    theBoard[randomSquare.id] = player + randomSquare.id;
    if (!theBoard.includes('') && !checkForWin(theBoard)) {
        showDraw();
    } else if (!checkForWin(theBoard)) {
        swapPlayers();
    } else if (checkForWin(theBoard)) {
        showWin();
    }
    botsTurn = !botsTurn;
}

function gamePlay() {
    if (playerDifficultyOne.value === 'human' && playerDifficultyTwo.value === 'human') {
        squares.forEach((square) => {
            square.addEventListener('click', handleClick, {once : true});
        })
    } else if (playerDifficultyOne.value === 'human' && playerDifficultyTwo.value === 'easy') {
        botsTurn = !botsTurn;
        squares.forEach((square) => {
            square.addEventListener('click', handleClick, {once : true});
            botsTurn();
        })
    }
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
    gamePlay();
})

playerDifficultyOne.addEventListener('change', () => {
    playerDifficultyOne = document.querySelector("#player-difficulty-one");
    resetButton.click();
    console.log(playerDifficultyOne.value);
})

playerDifficultyTwo.addEventListener('change', () => {
    playerDifficultyTwo = document.querySelector("#player-difficulty-two");
    resetButton.click();
    console.log(playerDifficultyTwo.value);
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

function showWin() {
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
