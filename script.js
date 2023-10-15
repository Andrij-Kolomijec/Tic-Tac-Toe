let theBoard = ['','','','','','','','',''];
let player = 'x';

const boardContainer = document.querySelector('#container');
const squares = document.querySelectorAll('.square');
const winningMessage = document.querySelector('#reset');
const text = document.querySelector('.text');
const resetButton = document.querySelector('button');

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

function handleClick(e) {
    e.target.classList.add(player);
    theBoard[e.target.id] = player + e.target.id;
    if (!theBoard.includes('') && !checkForWin(theBoard)) {
        winningMessage.classList.add('show');
        boardContainer.classList.remove('o');
        boardContainer.classList.remove('x');
        text.innerText = `It's a DRAW!`;
    } else if (!checkForWin(theBoard)) {
        if (player === 'x') {
            boardContainer.classList.remove('x');
            boardContainer.classList.add('o');
            player = 'o';
        } else {
            boardContainer.classList.remove('o');
            boardContainer.classList.add('x');
            player = 'x';
        }
    } else if (checkForWin(theBoard)) {
        winningMessage.classList.add('show');
        boardContainer.classList.remove('o');
        boardContainer.classList.remove('x');
        text.innerText = `${(player === 'x') ? 'X' : 'O'}'s WIN!`;
    }
}

function gamePlay() {
    squares.forEach((square) => {
        square.addEventListener('click', handleClick, {once : true})
    })
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
