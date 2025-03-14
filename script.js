// Sélection de l'élément qui affiche le score
const scoreDisplay = document.getElementById('score');
let score = 0;

// Fonction pour créer un ballon
function createBalloon() {
    const balloon = document.createElement('div');
    balloon.className = `balloon balloon${Math.floor(Math.random() * 5) + 1}`;
    balloon.style.left = `${Math.random() * 100}%`;

    // Gestion du clic sur un ballon
    balloon.addEventListener('click', () => {
        score++;
        scoreDisplay.textContent = score;
        balloon.classList.add('pop');
        
        // Supprimer le ballon après l'animation de "pop"
        balloon.addEventListener('animationend', () => {
            balloon.remove();
        });
    });

    // Ajouter le ballon à la page
    document.body.appendChild(balloon);

    // Créer un autre ballon après 1 seconde
    setTimeout(createBalloon, 1000);
}

// Lancer la création des ballons
createBalloon();
