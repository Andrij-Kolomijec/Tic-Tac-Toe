function gameBoard() {
    let theBoard = ['','','','','','','','',''];
    let player = 'X';
    const squares = document.querySelectorAll('.square');
    squares.forEach((square) => {
        square.addEventListener('click', e => {
            if (e.target.textContent === '') {
                e.target.textContent = player;
                if (player === 'X') {
                    player = 'O';
                } else {
                    player = 'X';
                }
                theBoard[e.target.id] = player + e.target.id;
                console.log(theBoard);
                // checkForWin(theBoard);
            }
        })
    })
}

function (theBoard) {
    const winningCombos = [[0,1,2], [3,4,5], [6,7,8], [0,4,6], [1,5,7], [2,6,8], [0,5,8], [3,5,6]];
    for (let combo in winningCombos) {
        
    }
}

gameBoard();