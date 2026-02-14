// 1. Background Pixel Hearts Canvas
const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const hearts = Array.from({ length: 50 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 15 + 10,
    speed: Math.random() * 1.5 + 0.5
}));

function drawPixelHeart(x, y, size) {
    ctx.fillStyle = '#7B3F00';
    // Simplified heart path for performance and "retro" feel
    ctx.beginPath();
    ctx.moveTo(x, y + size / 4);
    ctx.quadraticCurveTo(x, y, x + size / 4, y);
    ctx.quadraticCurveTo(x + size / 2, y, x + size / 2, y + size / 4);
    ctx.quadraticCurveTo(x + (size * 3) / 4, y, x + size, y + size / 4);
    ctx.quadraticCurveTo(x + size, y + size / 2, x + size / 2, y + size);
    ctx.quadraticCurveTo(x, y + size / 2, x, y + size / 4);
    ctx.fill();
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    hearts.forEach(h => {
        drawPixelHeart(h.x, h.y, h.size);
        h.y += h.speed;
        if (h.y > canvas.height) h.y = -h.size;
    });
    requestAnimationFrame(animate);
}
animate();

// 2. Tease Logic
const noBtn = document.getElementById('no-btn');
let noCount = 0;
function escape() {
    noCount++;
    const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
    const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);
    noBtn.style.position = 'fixed';
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
    if(noCount === 5) alert("Persistence is cute! But 'Yes' is the right answer. 😉");
}
noBtn.addEventListener('mouseover', escape);
noBtn.addEventListener('touchstart', (e) => { e.preventDefault(); escape(); });

// 3. Riddle Logic
let wrongAttempts = 0;
function showRiddle() {
    document.getElementById('riddle-gate').classList.remove('hidden');
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
}

function checkRiddle() {
    const val = document.getElementById('riddle-input').value.toLowerCase().trim();
    const hint = document.getElementById('riddle-hint');
    if (val === 'love') {
        startFinalSequence();
    } else {
        wrongAttempts++;
        if (wrongAttempts === 1) hint.innerText = "Hint: It grows when shared.";
        if (wrongAttempts === 2) hint.innerText = "Hint: Starts with 'L', ends with 'E'.";
        if (wrongAttempts >= 3) hint.innerText = "It rhymes with 'Dove'!";
    }
}

// 4. Final Sequence
function startFinalSequence() {
    document.getElementById('main-content').classList.add('hidden');
    const overlay = document.getElementById('video-overlay');
    const video = document.getElementById('final-video');
    overlay.classList.remove('hidden');
    
    video.muted = false; 
    video.play().catch(() => {
        video.muted = true;
        video.play();
    });

    video.onended = () => {
        overlay.classList.add('hidden');
        document.getElementById('final-message').classList.remove('hidden');
        document.body.style.backgroundColor = #FF0000;
    };
}

// 5. Scroll Reveal
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('reveal');
    });
}, { threshold: 0.1 });
document.querySelectorAll('.photo-card').forEach(card => observer.observe(card));
