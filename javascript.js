function gameboard() {

}

const squares = document.querySelectorAll('.square');
let player = 'X';
squares.forEach((square) => {
    square.addEventListener('click', e => {
        if (e.target.textContent === '') {
            e.target.textContent = player;
            if (player === 'X') {
                player = 'O';
            } else {
                player = 'X';
            }
        }
    })
})