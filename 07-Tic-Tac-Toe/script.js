function createPlayer(name) {
    let score = 0;
    return {
        name,
        score
    };
}

const player1 = createPlayer("X");
const player2 = createPlayer("O");

const gameState = (function gameRunning() {
    let currentPlayer = player1;

    function changeTurn() {
        gameState.currentPlayer = gameState.currentPlayer === player1 ? player2 : player1;
    }

    return {
        currentPlayer,
        changeTurn
    };
})();

const gameboardFunc = (function createGameboard() {
    let gameboard = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ];

    function checkWinning() {
        const board = gameboardFunc.gameboard;
        const winConditions = [
            [board[0][0], board[0][1], board[0][2]],
            [board[1][0], board[1][1], board[1][2]],
            [board[2][0], board[2][1], board[2][2]],

            [board[0][0], board[1][0], board[2][0]],
            [board[0][1], board[1][1], board[2][1]],
            [board[0][2], board[1][2], board[2][2]],

            [board[0][0], board[1][1], board[2][2]],
            [board[0][2], board[1][1], board[2][0]]
        ];

        for (const condition of winConditions) {
            if (condition[0] === condition[1] && condition[1] === condition[2]) {
                return "Won!";
            }
        }

        let drawCount = 0;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (typeof gameboardFunc.gameboard[i][j] != "number") {
                    drawCount++;
                }
            }
        }
        if (drawCount == 9) {
            return "That's a draw!";
        }

        return "No Win!";
    }

    function playRound(row, col, currentPlayer) {
        if (row < 0 || row > 2 || col < 0 || col > 2) {
            return "Invalid Input! Try Again!"
        } else if (gameboardFunc.gameboard[row][col] == "X" || gameboardFunc.gameboard[row][col] == "O") {
            return "Slot Not Empty! Try Again!";
        }

        gameboardFunc.gameboard[row][col] = currentPlayer.name;
        console.table(gameboardFunc.gameboard);

        const result = gameboardFunc.checkWinning();

        if (result == "No Win!") {
            gameState.changeTurn();
            visualGameboard.turnDisplay();
        } else if (result == "Won!") {
            gameState.currentPlayer.score++;
            visualGameboard.removeEventListeners();
            setTimeout(() => {
                alert(`${currentPlayer.name} Won!`);
            }, 5);
            visualGameboard.displayScores();
        } else {
            setTimeout(() => {
                alert("That's a draw!");
            }, 5);
            return;
        }

        return result ? `${currentPlayer.name} ${result}` : "No Win Yet!";
    }

    function newGame() {
        gameboardFunc.gameboard = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9]
        ];
        gameState.currentPlayer = player1;
        initGame.initGame();
    }

    function resetGame() {
        gameboardFunc.newGame();
        player1.score = 0;
        player2.score = 0;
        visualGameboard.displayScores();
    }

    return {
        gameboard,
        checkWinning,
        playRound,
        newGame,
        resetGame
    };
})();

const visualGameboard = (function() {
    const gameboardHTML = `
    <div class="row">
            <div class="cell" data-cell="00"></div>
            <div class="cell" data-cell="01"></div>
            <div class="cell" data-cell="02"></div>
        </div>
        <div class="row">
            <div class="cell" data-cell="10"></div>
            <div class="cell" data-cell="11"></div>
            <div class="cell" data-cell="12"></div>
        </div>
        <div class="row">
            <div class="cell" data-cell="20"></div>
            <div class="cell" data-cell="21"></div>
            <div class="cell" data-cell="22"></div>
        </div>
        `;
    const gameboardContainer = document.querySelector("#gameboard");

    function newGameboard() {
        gameboardContainer.innerHTML = gameboardHTML;
    };

    function handleCellClick(event) {
        const cell = event.currentTarget;
        const row = cell.dataset.cell[0];
        const col = cell.dataset.cell[1];
        gameboardFunc.playRound(row, col, gameState.currentPlayer);

        let oppositePlayer;
        if (gameboardFunc.checkWinning() === "No Win!") {
            oppositePlayer = gameState.currentPlayer === player1 ? player2 : player1;
        } else {
            oppositePlayer = gameState.currentPlayer;
        }

        cell.textContent = oppositePlayer.name;
    }

    function addEventListeners() {
        const cells = document.querySelectorAll('#gameboard .cell');

        cells.forEach(cell => {
            cell.addEventListener("click", handleCellClick);
        });
    }

    function removeEventListeners() {
        const cells = document.querySelectorAll('#gameboard .cell');

        cells.forEach(cell => {
            cell.removeEventListener("click", handleCellClick);
        });
    }

    function handleButtonsClick() {
        const newGameBtn = document.querySelector('#new-game-btn');
        const resetBtn = document.querySelector('#reset-btn');

        newGameBtn.addEventListener("click", gameboardFunc.newGame);
        resetBtn.addEventListener("click", gameboardFunc.resetGame);
    }

    function displayScores() {
        const player1Score = document.querySelector("#p1-score");
        player1Score.textContent = player1.score;
        const player2Score = document.querySelector("#p2-score");
        player2Score.textContent = player2.score;
    }

    function turnDisplay() {
        let turn = document.querySelector("#turn");
        turn.textContent = gameState.currentPlayer.name;
    }

    return {
        newGameboard,
        addEventListeners,
        removeEventListeners,
        handleButtonsClick,
        displayScores,
        turnDisplay
    };
})();

const initGame = (function initGame() {
    visualGameboard.newGameboard();
    visualGameboard.addEventListeners();
    visualGameboard.handleButtonsClick();

    return {
        initGame
    }
})();