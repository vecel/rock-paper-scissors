const ROCK = 0;
const PAPER = 1;
const SCISSORS = 2;

const POINTS_TO_WIN = 5;

const RED_SHADOW = '0 0 1.5em red';

/*  
Animation duration is calculated on the basis of total time needed for animateComputerSelection
function to execute. Its not ideal solution, but it is the simplest one with my current knowledge.
This value is used in playRound function as delay, because before code was executing even thoug the
animation function wasn't over.  
*/
const animationDuration = 3 * 720 + 2000;

const playButton = document.querySelector('.playButton');
const playButtonDiv = document.querySelector('div.playButtonContainer');

const gameInterface = document.querySelector('.gameInterface');

const playerItems = document.querySelectorAll('#playerSelection > .itemContainer');
const computerItems = document.querySelectorAll('#computerSelection > .itemContainer > svg');
console.log(computerItems);

const scoreText = document.querySelector('#scoreValue');

let computerWins = 0;
let playerWins = 0;

// for rick-rolling, change this value if you don't want Rick Astley to appear
let openRickRoll = true;

playButton.addEventListener('click', () => {
    if (!openRickRoll) {
        removePlayButton();
        showGameInterface();
        console.log('Removed play button and showed game interface');
    }
    if (openRickRoll) {
        removePlayButton();
        rickRoll();
    }
})

playerItems.forEach((selectionDiv, selectionType) => {
    selectionDiv.addEventListener('click', () => {
        playRound(selectionType);
    })
});

function playRound(playerSelection) {    
    const playerMove = playerSelection;
    const computerMove = computerPlay();
    
    activateGameItems(false);
    playerItems[playerMove].style.boxShadow = RED_SHADOW;

    console.log(`Playing round, player chose ${playerSelection}, computer
        chose ${computerMove}`);

    animateComputerSelection(computerMove);

    /* 
    setTimeout is used to delay executing code until animateComputerSelection function is over. I use it because
    I don't know how to use Promises yet and it is not the time yet to learn such a concept.
    */
    setTimeout(() => {
        computeResult(playerMove, computerMove);
        updateResult();

        if (gameEnd()) {
            displayFinalResult();
            resetGame();
        }

        playerItems[playerMove].style.boxShadow = 'none';
        activateGameItems(true);
    }, animationDuration);
    
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

async function animateComputerSelection(computerMove) {
    /*
    Every time and delay change has to be taken into calculation of animationDuration const variable
    */
    for (let i = 0; i < 4; ++i) {
        for (let el of computerItems)
            await delayedBoxShadowChange(el, 300 - 80 * i);       
    }
    
    console.log('animate computer selection ' + computerMove);
    
    highlightComputerSelection(computerMove, 2000);
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
    scoreText.textContent = ` ${playerWins} | ${computerWins} `;
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

function highlightComputerSelection(computerMove, miliseconds = 1000) {
    computerItems[computerMove].style.boxShadow = RED_SHADOW;
    setTimeout(() => {
        computerItems[computerMove].style.boxShadow = 'none';
    }, miliseconds);
}

function delayedBoxShadowChange(computerItem, miliseconds) {
    computerItem.style.boxShadow = RED_SHADOW;
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            computerItem.style.boxShadow = 'none';
            resolve();
        }, miliseconds);
    })
}

function removePlayButton() {
    playButtonDiv.style.display = 'none';
}

function showGameInterface() {
    gameInterface.style.display = 'grid';
}

/* below function is used for rick-rolling, it is not a part of actual site */
let rickRoll = () => {
    const rickRollDiv = document.querySelector('.rickRoll');
    rickRollDiv.style.display = 'initial';
    console.log('You got rick-rolled!');
    console.log('To remove Rick Astley image and see website you wanted refresh site and change openRickRoll value to false in console');
}