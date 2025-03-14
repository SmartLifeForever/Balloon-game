// Variables de jeu
const gameContainer = document.body;
const scoreDisplay = document.getElementById("score");
const bestScoreDisplay = document.getElementById("best-score");
const countdownDisplay = document.getElementById("countdown");
let score = 0;
let bestScore = 0;
let gameInterval;
let gameDuration = 60; // Durée du jeu en secondes

// Fonction pour créer un ballon
function createBalloon() {
    const balloon = document.createElement("div");
    balloon.classList.add("balloon");

    // Position aléatoire
    const xPos = Math.random() * (window.innerWidth - 60);
    balloon.style.left = `${xPos}px`;

    // Ajouter le ballon à l'écran
    gameContainer.appendChild(balloon);

    // Gestion du clic sur le ballon
    balloon.addEventListener("click", () => {
        score++;
        scoreDisplay.innerText = score;

        // Ajouter le son lors de l'éclatement
        const popSound = new Audio("https://www.soundjay.com/button/beep-07.wav");
        popSound.play();

        balloon.remove();
    });

    // Supprimer le ballon après un certain temps pour éviter la surcharge
    setTimeout(() => {
        balloon.remove();
    }, 6000);
}

// Fonction pour démarrer le jeu
function startGame() {
    score = 0;
    scoreDisplay.innerText = score;
    countdownDisplay.innerText = `${gameDuration}s`;

    // Faire apparaître des ballons à intervalles réguliers
    gameInterval = setInterval(() => {
        createBalloon();
    }, 800); // Un ballon toutes les 800ms

    // Gestion du temps restant
    let timeLeft = gameDuration;
    const countdownInterval = setInterval(() => {
        timeLeft--;
        countdownDisplay.innerText = `${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            clearInterval(gameInterval);
            endGame();
        }
    }, 1000);
}

// Fonction pour terminer le jeu
function endGame() {
    if (score > bestScore) {
        bestScore = score;
        bestScoreDisplay.innerText = bestScore;
    }

    alert("Temps écoulé ! Ton score : " + score);
}

// Démarrage automatique du jeu
window.onload = startGame;
