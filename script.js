// Floating Pixel Hearts Animation
const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext(' those');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const hearts = [];
for(let i=0; i<60; i++) {
    hearts.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 8 + 4,
        speed: Math.random() * 2 + 1
    });
}

function animateHearts() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#7B3F00';
    hearts.forEach(h => {
        ctx.fillRect(h.x, h.y, h.size, h.size); // Pixel style
        h.y += h.speed;
        if(h.y > canvas.height) h.y = -10;
    });
    requestAnimationFrame(animateHearts);
}
animateHearts();

// Interactive Functions
const noBtn = document.getElementById('no-btn');
noBtn.addEventListener('mouseover', () => {
    noBtn.style.position = 'fixed';
    noBtn.style.left = Math.random() * 80 + '%';
    noBtn.style.top = Math.random() * 80 + '%';
});

function showRiddle() {
    document.getElementById('riddle-gate').classList.remove('hidden');
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
}

function checkRiddle() {
    const val = document.getElementById('riddle-input').value.toLowerCase().trim();
    if(val === 'echo') {
        startFinalSequence();
    }
}

function startFinalSequence() {
    document.getElementById('main-content').classList.add('hidden');
    const overlay = document.getElementById('video-overlay');
    const video = document.getElementById('final-video');
    overlay.classList.remove('hidden');
    video.play();

    video.onended = () => {
        overlay.classList.add('hidden');
        document.getElementById('final-message').classList.remove('hidden');
        document.body.style.background = 'black';
    };
}
