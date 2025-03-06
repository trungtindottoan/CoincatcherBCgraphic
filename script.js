let basket = document.getElementById('basket');
let coin = document.getElementById('coin');
let scoreDisplay = document.getElementById('score');
let missedDisplay = document.getElementById('missed');

let basketPos = 40; // Vị trí ban đầu giữa màn hình
let coinPos = { x: Math.random() * 90, y: 0 }; // 90% để xu không sát lề
let score = 0;
let missed = 0;
let initialSpeed = 0.3; // Tốc độ ban đầu (chậm)
let speed = initialSpeed; // Gán speed ban đầu
let containerWidth = document.getElementById('game-container').offsetWidth;

// Điều khiển bằng phím (máy tính)
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' && basketPos > 0) basketPos -= 5;
    if (e.key === 'ArrowRight' && basketPos < 80) basketPos += 5;
    basket.style.left = basketPos + '%';
});

// Điều khiển bằng cảm ứng (điện thoại)
basket.addEventListener('touchmove', (e) => {
    e.preventDefault();
    let touch = e.touches[0];
    let newPos = (touch.clientX / containerWidth) * 100 - 10;
    basketPos = Math.max(0, Math.min(80, newPos));
    basket.style.left = basketPos + '%';
});

// Xu rơi
function dropCoin() {
    coinPos.y += speed;
    coin.style.top = coinPos.y + 'vh';
    coin.style.left = coinPos.x + '%';

    // Kiểm tra va chạm
    if (coinPos.y > 75 && coinPos.y < 80 && 
        coinPos.x > basketPos - 5 && coinPos.x < basketPos + 20) {
        score += 10;
        resetCoin();
    } else if (coinPos.y > 80) {
        missed++;
        resetCoin();
    }

    scoreDisplay.textContent = `Điểm: ${score}`;
    missedDisplay.textContent = `Bỏ lỡ: ${missed}`;

    if (missed >= 5) {
        alert(`Trò chơi kết thúc! Điểm: ${score}`);
        score = 0;
        missed = 0;
        speed = initialSpeed; // Đặt lại tốc độ về ban đầu
    }

    requestAnimationFrame(dropCoin);
}

function resetCoin() {
    coinPos = { x: Math.random() * 90, y: 0 };
    speed += 0.02; // Tăng tốc độ dần trong ván hiện tại
}

// Cập nhật kích thước khi thay đổi
window.addEventListener('resize', () => {
    containerWidth = document.getElementById('game-container').offsetWidth;
});

dropCoin();
