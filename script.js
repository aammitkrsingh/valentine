// 1. Background Pixel Hearts
const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const hearts = Array.from({ length: 60 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 8 + 4,
    speed: Math.random() * 2 + 1
}));

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#7B3F00';
    hearts.forEach(h => {
        ctx.fillRect(h.x, h.y, h.size, h.size);
        h.y += h.speed;
        if (h.y > canvas.height) h.y = -10;
    });
    requestAnimationFrame(animate);
}
animate();

// 2. The "No" Button Tease Logic (Desktop + Touch)
const noBtn = document.getElementById('no-btn');
let noCount = 0;

function escape() {
    noCount++;
    const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
    const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);
    noBtn.style.position = 'fixed';
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
    if(noCount === 5) alert("Persistence is cute, but I'm faster! Click 'Yes' already! 😉");
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
        if (wrongAttempts === 1) hint.innerText = "Clue: It's why we're together.";
        if (wrongAttempts === 2) hint.innerText = "Clue: Starts with 'L', ends with 'E'.";
        if (wrongAttempts >= 3) hint.innerText = "Rhymes with 'Dove'!";
    }
}

// 4. Final Sequence & Video Fix
function startFinalSequence() {
    document.getElementById('main-content').classList.add('hidden');
    const overlay = document.getElementById('video-overlay');
    const video = document.getElementById('final-video');
    overlay.classList.remove('hidden');
    
    video.muted = false; // User interacted by clicking riddle button
    video.play().catch(() => {
        video.controls = true; // Fallback for strict browsers
    });

    video.onended = () => {
        overlay.classList.add('hidden');
        document.getElementById('final-message').classList.remove('hidden');
        document.body.style.backgroundColor = 'black';
    };
}

// 5. Scroll Reveal
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('reveal');
    });
});
document.querySelectorAll('.photo-card').forEach(card => observer.observe(card));
