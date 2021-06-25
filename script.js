const ROCK = 0;
const PAPER = 1;
const SCISSORS = 2;

const POINTS_TO_WIN = 5;

const playButton = document.querySelector('.playButton');
const playButtonDiv = document.querySelector('div.playButtonContainer');

const gameInterface = document.querySelector('.gameInterface');

const playerItems = document.querySelectorAll('#playerSelection > .itemContainer');

const scoreText = document.querySelector('#scoreValue');

let computerWins = 0;
let playerWins = 0;

playButton.addEventListener('click', () => {
    removePlayButton();
    showGameInterface();
    console.log('Removed play button and showed game interface');
})

playerItems.forEach((selectionDiv, selectionType) => {
    selectionDiv.addEventListener('click', () => {
        playRound(selectionType);
    })
});

function playRound(playerSelection) {
    activateGameItems(false);

    const playerMove = playerSelection;
    const computerMove = computerPlay();
    
    /*console.log(`Playing round, player chose ${playerSelection}, computer
        chose ${computerMove}`);*/

    animateComputerSelection(computerMove);

    computeResult(playerMove, computerMove);
    updateResult();

    if (gameEnd()) {
        displayFinalResult();
        resetGame();
    }

    activateGameItems(true);
}

function activateGameItems(mode) {
    playerItems.forEach((item) => {
        if (mode)  item.style.pointerEvents = 'auto';
        if (!mode) item.style.pointerEvents = 'none';
    });
}

function computerPlay() {
    return Math.floor(Math.random() * 3);
}

function animateComputerSelection(computerMove) {
    // zrob animacje
    // na koncu podswietl div-a, ktorego wybral komputer
}

function computeResult(plaMove, comMove) {
    if (plaMove === comMove) return;
    if (plaMove - comMove === 1 ||
        plaMove - comMove === -2) {
        playerWins++;
    }
    else {
        computerWins++;
    }
}

function updateResult() {
    scoreText.textContent = `Player ${playerWins} | ${computerWins} Computer`;
}

function gameEnd() {
    if (computerWins === POINTS_TO_WIN) return true;
    if (playerWins === POINTS_TO_WIN) return true;
    return false;
}

function displayFinalResult() {
    let gameEndMessage;
    if (playerWins >= 5) gameEndMessage = 'Player won';
    if (computerWins >= 5) gameEndMessage = 'Computer won';
    
    alert(gameEndMessage);
}

function resetGame() {
    playerWins = 0;
    computerWins = 0;
    updateResult();
    gameInterface.style.display = 'none';
    playButtonDiv.style.display = 'flex';
    console.log('Reset game');
}

function removePlayButton() {
    playButtonDiv.style.display = 'none';
}

function showGameInterface() {
    gameInterface.style.display = 'grid';
}