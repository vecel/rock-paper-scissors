const ROCK = 1;
const PAPER = 2;
const SCISSORS = 3;

const playButton = document.querySelector('.playButton');
const gameInterface = document.querySelector('.gameInterface');

let computerWins = 0;
let playerWins = 0;

playButton.addEventListener('click', () => {
    removePlayButton();
    showGameInterface();
    console.log('Removed play button and showed game interface');
})

function initGame() {

}

function game() {
    let gameContinue = true;

    while (gameContinue) {
        // czekaj na input gracza
        // wylosuj odpowiedz komputera
        playRound();

        if (computerWins >= 5 || playerWins >= 5) gameContinue = false;
    }
}

function playRound() {
    const playerSelection = playerPlay();
    const computerSelection = computerPlay();
    
}

function computerPlay() {
    return Math.floor(Math.random() * 3);
}

function playerPlay() {
    while (true) {
        if ()
    }
}

function computeFinalResult() {
    if (playerWins > computerWins) return "Player won.";
    if (playerWins < computerWins) return "Computer won.";
    return "Draw.";
}

function removePlayButton() {
    const playButtonDiv = document.querySelector('div.playButtonContainer');
    playButtonDiv.remove();
}

function showGameInterface() {
    gameInterface.style.display = 'grid';
}