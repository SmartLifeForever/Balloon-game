// Variables globales
let score = 0;
let highScore = 0;
let timeLeft = 60;
let gameInterval;
let balloonInterval;
const scoreDisplay = document.getElementById("score");
const highScoreDisplay = document.getElementById("high-score");
const timeDisplay = document.getElementById("time");
const balloonContainer = document.getElementById("balloon-container");
const startButton = document.getElementById("start-btn");
const toggleThemeButton = document.getElementById("toggle-theme");

// Sons
const popSound = new Audio("https://www.soundjay.com/button/beep-07.mp3");

// Fonction pour démarrer le jeu
function startGame() {
    resetGame();
    startButton.disabled = true;

    gameInterval = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            timeDisplay.innerText = timeLeft;
        } else {
            endGame();
        }
    }, 1000);

    balloonInterval = setInterval(createBalloon, 1000);
}

// Crée un ballon
function createBalloon() {
    const balloon = document.createElement("div");
    balloon.classList.add("balloon");

    // Position aléatoire
    const posX = Math.random() * (balloonContainer.offsetWidth - 60);
    balloon.style.left = `${posX}px`;

    // Gérer l'explosion
    balloon.onclick = () => {
        score++;
        scoreDisplay.innerText = score;
        popSound.play();
        balloon.remove();
    };

    balloonContainer.appendChild(balloon);

    // Supprimer le ballon après 6 secondes s'il n'est pas éclaté
    setTimeout(() => {
        balloon.remove();
    }, 6000);
}

// Réinitialise le jeu
function resetGame() {
    clearInterval(gameInterval);
    clearInterval(balloonInterval);
    score = 0;
    timeLeft = 60;
    scoreDisplay.innerText = score;
    timeDisplay.innerText = timeLeft;
    balloonContainer.innerHTML = "";
}

// Fin de la partie
function endGame() {
    clearInterval(gameInterval);
    clearInterval(balloonInterval);
    alert(`Temps écoulé ! Votre score : ${score}`);
    if (score > highScore) {
        highScore = score;
        highScoreDisplay.innerText = highScore;
    }
    startButton.disabled = false;
}

// Changer le mode Jour/Nuit
toggleThemeButton.onclick = () => {
    document.body.classList.toggle("dark-mode");
};

// Lancer le jeu au clic sur le bouton
startButton.onclick = startGame;
