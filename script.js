let basket = document.getElementById('basket');
let coin = document.getElementById('coin');
let scoreDisplay = document.getElementById('score');
let missedDisplay = document.getElementById('missed');

let basketPos = 250;
let coinPos = { x: Math.random() * 580, y: 0 };
let score = 0;
let missed = 0;
let speed = 2;

// Di chuyển rổ bằng phím trái/phải
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' && basketPos > 0) basketPos -= 20;
    if (e.key === 'ArrowRight' && basketPos < 500) basketPos += 20;
    basket.style.left = basketPos + 'px';
});

// Xu rơi
function dropCoin() {
    coinPos.y += speed;
    coin.style.top = coinPos.y + 'px';
    coin.style.left = coinPos.x + 'px';

    // Kiểm tra va chạm
    if (coinPos.y > 380 && coinPos.y < 400 && 
        coinPos.x > basketPos - 20 && coinPos.x < basketPos + 100) {
        score += 10;
        resetCoin();
    } else if (coinPos.y > 400) {
        missed++;
        resetCoin();
    }

    scoreDisplay.textContent = `Điểm: ${score}`;
    missedDisplay.textContent = `Bỏ lỡ: ${missed}`;

    if (missed >= 5) {
        alert(`Trò chơi kết thúc! Điểm: ${score}`);
        score = 0;
        missed = 0;
    }

    requestAnimationFrame(dropCoin);
}

function resetCoin() {
    coinPos = { x: Math.random() * 580, y: 0 };
    speed += 0.1; // Tăng độ khó
}

dropCoin();