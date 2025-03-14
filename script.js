const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const finalScoreDisplay = document.getElementById('final-score');
const highScoreDisplay = document.getElementById('high-score');
const gameOverScreen = document.getElementById('game-over');

const popSound = document.getElementById('pop-sound');
const backgroundMusic = document.getElementById('background-music');

let score = 0;
let timeLeft = 60;
let gameInterval;
let balloonInterval;
let gameRunning = false;

// Récupérer le meilleur score depuis le stockage local
let highScore = localStorage.getItem('highScore') || 0;
highScoreDisplay.textContent = highScore;

// Démarrer la musique de fond
backgroundMusic.play();

// Fonction pour créer un ballon
function createBalloon() {
    const balloon = document.createElement('div');
    balloon.className = `balloon`;
    balloon.style.left = `${Math.random() * 90}vw`;
    balloon.style.background = getRandomColor();

    // Gérer le clic sur le ballon
    balloon.addEventListener('click', () => {
        score++;
        scoreDisplay.textContent = score;
        
        // Jouer le son de pop
        popSound.currentTime = 0;
        popSound.play();

        balloon.classList.add('pop');
        setTimeout(() => balloon.remove(), 300);
    });

    document.body.appendChild(balloon);
}

// Fonction pour obtenir une couleur aléatoire
function getRandomColor() {
    const colors = ['#ff1493', '#00bfff', '#ff4500', '#32cd32', '#ffd700'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Fonction pour démarrer le jeu
function startGame() {
    gameRunning = true;
    score = 0;
    timeLeft = 60;
    scoreDisplay.textContent = score;
    timerDisplay.textContent = timeLeft;
    gameOverScreen.style.display = 'none';

    // Générer des ballons à intervalles réguliers
    balloonInterval = setInterval(createBalloon, 1000);

    // Démarrer le chronomètre
    gameInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;

        // Augmenter la vitesse des ballons avec le score
        if (score > 10) document.documentElement.style.setProperty('--balloon-speed', '15s');
        if (score > 20) document.documentElement.style.setProperty('--balloon-speed', '10s');
        if (score > 30) document.documentElement.style.setProperty('--balloon-speed', '7s');

        // Vérifier si le temps est écoulé
        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

// Fonction pour terminer le jeu
function endGame() {
    gameRunning = false;
    clearInterval(gameInterval);
    clearInterval(balloonInterval);
    document.querySelectorAll('.balloon').forEach(balloon => balloon.remove());

    // Mettre à jour le score final et le meilleur score
    finalScoreDisplay.textContent = score;
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('highScore', highScore);
        highScoreDisplay.textContent = highScore;
    }

    gameOverScreen.style.display = 'block';
}

// Fonction pour recommencer le jeu
function restartGame() {
    startGame();
}

// Lancer automatiquement le jeu
startGame();
