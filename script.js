function gameBoard() {
    let theBoard = ['','','','','','','','',''];
    let player = 'X';
    const squares = document.querySelectorAll('.square');
    squares.forEach((square) => {
        square.addEventListener('click', e => {
            if (e.target.textContent === '') {
                e.target.textContent = player;
                theBoard[e.target.id] = player + e.target.id;
                checkForWin(theBoard, player);
                if (player === 'X') {
                    player = 'O';
                } else {
                    player = 'X';
                }
                console.log(theBoard);
            }
        })
    })
}

function checkForWin(theBoard, player) {
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
            console.log(`${player}s wins!`);
        }
    }
}

gameBoard();