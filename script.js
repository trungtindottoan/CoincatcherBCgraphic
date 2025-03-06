const startScreen = document.getElementById('startScreen');
const settingsMenu = document.getElementById('settingsMenu');
const gameCanvas = document.getElementById('gameCanvas');
const pauseMenu = document.getElementById('pauseMenu');
const startButton = document.getElementById('startButton');
const settingsButton = document.getElementById('settingsButton');
const backButton = document.getElementById('backButton');
const resumeButton = document.getElementById('resumeButton');
const settingsPauseButton = document.getElementById('settingsPauseButton');
const homePauseButton = document.getElementById('homePauseButton');
const homeButton = document.getElementById('homeButton');

let player, coin, scoreDisplay, missesDisplay;
let score = 0;
let misses = 0;
let highScore = 0;
let highScores = [];
let playerX = 350; // Vị trí giữa của canvas 800px
let coinX, coinY;
let fallSpeed = 5;
let isPaused = false;
let gameInterval;

startButton.addEventListener('click', startGame);
settingsButton.addEventListener('click', showSettings);
backButton.addEventListener('click', () => {
    settingsMenu.style.display = 'none';
    startScreen.style.display = 'block';
});
resumeButton.addEventListener('click', resumeGame);
settingsPauseButton.addEventListener('click', () => {
    pauseMenu.style.display = 'none';
    showSettings();
});
homePauseButton.addEventListener('click', () => {
    pauseMenu.style.display = 'none';
    gameCanvas.style.display = 'none';
    startScreen.style.display = 'block';
    isPaused = false;
    gameCanvas.style.opacity = '1';
});
homeButton.addEventListener('click', showPauseMenu);
document.addEventListener('keydown', handleKey);
gameCanvas.addEventListener('click', showPauseMenu);

function handleKey(e) {
    if (e.key === 'ArrowLeft' && !isPaused) {
        playerX -= 20;
        if (playerX < 0) playerX = 0;
        player.style.left = playerX + 'px';
    } else if (e.key === 'ArrowRight' && !isPaused) {
        playerX += 20;
        if (playerX > 700) playerX = 700; // 800 - 100 (chiều rộng player)
        player.style.left = playerX + 'px';
    } else if (e.key === ' ' && gameCanvas.style.display === 'block') {
        showPauseMenu();
    }
}

function startGame() {
    startScreen.style.display = 'none';
    gameCanvas.style.display = 'block';
    pauseMenu.style.display = 'none';
    score = 0;
    misses = 0;
    playerX = 350;
    fallSpeed = 5;
    isPaused = false;

    // Khởi tạo các phần tử trong gameCanvas
    gameCanvas.innerHTML = '<button id="homeButton">🏠</button>';
    const newHomeButton = document.getElementById('homeButton');
    newHomeButton.addEventListener('click', showPauseMenu);

    player = document.createElement('div');
    player.id = 'player';
    player.style.left = playerX + 'px';
    gameCanvas.appendChild(player);

    scoreDisplay = document.createElement('div');
    scoreDisplay.id = 'score';
    scoreDisplay.textContent = `Score: ${score}`;
    gameCanvas.appendChild(scoreDisplay);

    missesDisplay = document.createElement('div');
    missesDisplay.id = 'misses';
    missesDisplay.textContent = `Misses: ${misses}/5`;
    gameCanvas.appendChild(missesDisplay);

    createCoin();
    gameLoop();
}

function showSettings() {
    startScreen.style.display = 'none';
    gameCanvas.style.display = 'none';
    settingsMenu.style.display = 'block';
    updateHighScoreList();
}

function createCoin() {
    if (isPaused) return;
    if (coin) coin.remove(); // Xóa đồng xu cũ nếu có
    coin = document.createElement('div');
    coin.id = 'coin';
    coinX = Math.random() * 780; // 800 - 20 (chiều rộng coin)
    coinY = 0;
    coin.style.left = coinX + 'px';
    coin.style.top = coinY + 'px';
    gameCanvas.appendChild(coin);
}

function updateGame() {
    if (isPaused || misses >= 5) {
        if (misses >= 5) endGame();
        return;
    }

    // Tăng tốc độ mỗi 50 điểm
    fallSpeed = 5 + Math.floor(score / 50) * 2;

    coinY += fallSpeed;
    coin.style.top = coinY + 'px';

    if (coinY > 600) {
        coin.remove();
        misses++;
        missesDisplay.textContent = `Misses: ${misses}/5`;
        createCoin();
    } else if (coinY + 20 > 590 && coinX + 20 > playerX && coinX < playerX + 100) {
        coin.remove();
        score += 10; // Cộng 10 điểm mỗi lần hứng
        scoreDisplay.textContent = `Score: ${score}`;
        createCoin();
    }
}

function endGame() {
    const highScoreDisplay = document.querySelector('#highScore span');
    const highScorePauseDisplay = document.querySelector('#highScorePause span');
    if (score > highScore) {
        highScore = score;
        highScoreDisplay.textContent = highScore;
        highScorePauseDisplay.textContent = highScore;
    }
    highScores.push(score);
    highScores.sort((a, b) => b - a);
    highScores = highScores.slice(0, 5);
    gameCanvas.style.display = 'none';
    startScreen.style.display = 'block';
    clearInterval(gameInterval);
}

function showPauseMenu() {
    isPaused = true;
    pauseMenu.style.display = 'block';
    gameCanvas.style.opacity = '0.5';
}

function resumeGame() {
    isPaused = false;
    pauseMenu.style.display = 'none';
    gameCanvas.style.opacity = '1';
}

function updateHighScoreList() {
    highScoreList.innerHTML = '';
    highScores.forEach((score, index) => {
        const li = document.createElement('li');
        li.textContent = `#${index + 1}: ${score}`;
        highScoreList.appendChild(li);
    });
}

function gameLoop() {
    clearInterval(gameInterval);
    gameInterval = setInterval(updateGame, 20);
}
