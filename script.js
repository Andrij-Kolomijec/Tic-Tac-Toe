function gameBoard() {
    let theBoard = ['','','','','','','','',''];
    let player = 'X';
    const squares = document.querySelectorAll('.square');
    const text = document.querySelector('h1');
    const resetButton = document.querySelector('button');
    resetButton.addEventListener('click', () => {
        theBoard = ['','','','','','','','',''];
        squares.forEach((square) => square.textContent = '');
        player = 'X';
        text.textContent = `It is ${player}'s turn.`
    })
    squares.forEach((square) => {
        square.addEventListener('click', e => {
            if (e.target.textContent === '' && !checkForWin(theBoard)) {
                e.target.textContent = player;
                theBoard[e.target.id] = player + e.target.id;
                if (!checkForWin(theBoard)) {
                    if (player === 'X') {
                        player = 'O';
                    } else {
                        player = 'X';
                    }
                    text.textContent = `It is ${player}'s turn.`
                } else {
                    text.textContent = `${player}s WIN!`;
                }
                console.log(theBoard);
            }
            if (!theBoard.includes('')) {
                text.textContent = `It is a DRAW!`;
            }
        })
    })
}

function checkForWin(theBoard) {
    const winningCombos = [
        ['X0','X1','X2'], 
        ['X3','X4','X5'], 
        ['X6','X7','X8'],
        ['X0','X3','X6'], 
        ['X1','X4','X7'], 
        ['X2','X5','X8'], 
        ['X0','X4','X8'], 
        ['X2','X4','X6'], 
        ['O0','O1','O2'], 
        ['O3','O4','O5'], 
        ['O6','O7','O8'], 
        ['O0','O3','O6'], 
        ['O1','O4','O7'], 
        ['O2','O5','O8'], 
        ['O0','O4','O8'], 
        ['O2','O4','O6']
    ];
    for (let combo of winningCombos) {
        if (combo.every(item => theBoard.includes(item))) {
            return true;
        }
    }
}



gameBoard();