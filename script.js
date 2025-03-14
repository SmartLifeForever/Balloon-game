const startScreen = document.getElementById('start-screen');
const startBtn = document.getElementById('start-btn');
const gameContainer = document.getElementById('game-container');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const highScoreDisplay = document.getElementById('high-score');
const gameOverScreen = document.getElementById('game-over');
const finalScoreDisplay = document.getElementById('final-score');
const messageDisplay = document.getElementById('message');
const themeToggle = document.getElementById('theme-toggle');
const popSound = document.getElementById('pop-sound');
const bgMusic = document.getElementById('background-music');

let score = 0;
let timeLeft = 60;
let highScore = localStorage.getItem('highScore') || 0;
highScoreDisplay.textContent = highScore;

function startGame() {
    startScreen.style.display = 'none';
    gameContainer.style.display = 'block';
    score = 0;
    timeLeft = 60;
    scoreDisplay.textContent = score;
    timerDisplay.textContent = timeLeft;
    gameOverScreen.style.display = 'none';
    bgMusic.play();
    startTimer();
    createBalloons();
}

function createBalloons() {
    setInterval(() => {
        const balloon = document.createElement('div');
        balloon.className = 'balloon';
        balloon.style.width = `${Math.random() * 60 + 40}px`;
        balloon.style.height = balloon.style.width;
        balloon.style.left = `${Math.random() * 90}vw`;
        balloon.style.background = getRandomColor();

        balloon.onclick = () => popBalloon(balloon);
        document.body.appendChild(balloon);
    }, 800);
}

function popBalloon(balloon) {
    score++;
    scoreDisplay.textContent = score;
    popSound.play();
    balloon.remove();
    showMessage(score);
}

function showMessage(score) {
    if (score % 10 === 0) {
        messageDisplay.textContent = '🔥 Continue comme ça !';
        messageDisplay.style.display = 'block';
        setTimeout(() => messageDisplay.style.display = 'none', 1000);
    }
}

function startTimer() {
    const interval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(interval);
            endGame();
        }
    }, 1000);
}

function endGame() {
    gameOverScreen.style.display = 'block';
    finalScoreDisplay.textContent = score;
    bgMusic.pause();
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('highScore', highScore);
    }
}

function restartGame() {
    window.location.reload();
}

themeToggle.onclick = () => {
    document.body.classList.toggle('night');
};

startBtn.onclick = startGame;
