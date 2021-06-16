const ROCK = 0;
const PAPER = 1;
const SCISSORS = 2;

let computerWins = 0;
let playerWins = 0;

game();

function game() {
    for (let i = 0; i < 5; ++i) console.log(playRound());
    const finalResult = computeFinalResult();
    console.log("Final result: " + finalResult);
}

function playRound() {
    const playerSelection = playerPlay();
    const computerSelection = computerPlay();
    if (playerSelection == -1) {
        computerWins++;
        return "You entered improper value, computer won";
    } 
    if (playerSelection - computerSelection == 1 ||
        playerSelection - computerSelection == -2) {
            playerWins++;
            return "You won";
    }
    if (playerSelection == computerSelection) return "Draw";
    
    computerWins++;
    return "Computer won";
}

function computerPlay() {
    return Math.floor(Math.random() * 3);
}

function playerPlay() {
    let move = prompt("Enter your selection: ");
    if (move != null) move = move.toLowerCase();

    if (move === "rock") return ROCK;
    if (move === "paper") return PAPER;
    if (move === "scissors") return SCISSORS;
    return -1;
}

function computeFinalResult() {
    if (playerWins > computerWins) return "Player won.";
    if (playerWins < computerWins) return "Computer won.";
    return "Draw.";
}