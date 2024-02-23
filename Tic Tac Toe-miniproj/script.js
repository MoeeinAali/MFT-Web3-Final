$(document).ready(function () {
    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    $('.cell').on('click', function () {
        const index = $(this).data('index');

        if (gameBoard[index] === '' && gameActive) {
            gameBoard[index] = currentPlayer;
            $(this).text(currentPlayer);

            if (checkWinner()) {
                alert(currentPlayer + ' wins!');
                gameActive = false;
            } else if (isBoardFull()) {
                alert('It\'s a draw!');
                gameActive = false;
            } else {
                currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
            }
        }
    });

    $('#reset-button').on('click', function () {
        resetGame();
    });

    function checkWinner() {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (let combo of winningCombinations) {
            const [a, b, c] = combo;
            if (gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[b] === gameBoard[c]) {
                highlightWinnerCells(combo);
                return true;
            }
        }
        return false;
    }

    function highlightWinnerCells(cells) {
        for (let cellIndex of cells) {
            $(`.cell[data-index=${cellIndex}]`).addClass('winner');
        }
    }

    function isBoardFull() {
        return !gameBoard.includes('');
    }

    function resetGame() {
        $('.cell').text('').removeClass('winner');
        gameBoard = ['', '', '', '', '', '', '', '', null];
        currentPlayer = 'X';
        gameActive = true;
    }
});
