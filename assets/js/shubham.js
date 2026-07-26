document.addEventListener('DOMContentLoaded', () => {
    // Cursor glow tracking
    const cursorGlow = document.getElementById('cursor-glow');
    if (cursorGlow) {
        document.addEventListener('mousemove', (e) => {
            cursorGlow.style.left = `${e.clientX}px`;
            cursorGlow.style.top = `${e.clientY}px`;
        });
    }

    // Mobile menu toggle
    const menuBtn = document.getElementById("menuBtn");
    const navMenu = document.getElementById("navMenu");

    if (menuBtn && navMenu) {
        menuBtn.addEventListener("click", () => {
            menuBtn.classList.toggle("active");
            navMenu.classList.toggle("open");
        });

        document.querySelectorAll('#navMenu a').forEach(link => {
            link.addEventListener('click', () => {
                menuBtn.classList.remove("active");
                navMenu.classList.remove("open");
            });
        });
    }

    executeTypingLoop();
    generateStarfieldMatrix();
    scrollRevealObserver();
});

// Typing Effect Animation
const codingPhrases = ["Writing Lyrics", "Writing Shayari", "Singing Songs", "Playing Cricket", "B.Com Student"];
let phaseIdx = 0;
let charIdx = 0;
let removing = false;

function executeTypingLoop() {
    const targetElement = document.querySelector('.typing-text');
    if (!targetElement) return;

    const fullString = codingPhrases[phaseIdx];

    if (removing) {
        targetElement.textContent = fullString.substring(0, charIdx - 1);
        charIdx--;
    } else {
        targetElement.textContent = fullString.substring(0, charIdx + 1);
        charIdx++;
    }

    if (!removing && charIdx === fullString.length) {
        setTimeout(() => removing = true, 2200);
        setTimeout(executeTypingLoop, 2200);
    } else if (removing && charIdx === 0) {
        removing = false;
        phaseIdx = (phaseIdx + 1) % codingPhrases.length;
        setTimeout(executeTypingLoop, 200);
    } else {
        setTimeout(executeTypingLoop, removing ? 40 : 80);
    }
}

// Canvas background particles
function generateStarfieldMatrix() {
    const canvas = document.getElementById('starfield-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let stars = [];
    const count = 45;

    function matchCanvasBounds() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    matchCanvasBounds();
    window.addEventListener('resize', matchCanvasBounds);

    class StarParticle {
        constructor() {
            this.initCoordinates();
        }
        initCoordinates() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 1.3;
            this.alphaDelta = Math.random() * 0.007 + 0.003;
            this.opacity = Math.random();
            this.direction = Math.random() > 0.5 ? 1 : -1;
        }
        drawAndUpdate() {
            this.opacity += this.alphaDelta * this.direction;
            if (this.opacity >= 1 || this.opacity <= 0) {
                this.direction *= -1;
            }
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(157, 78, 221, ${Math.max(0, this.opacity * 0.35)})`;
            ctx.fill();
        }
    }

    for (let i = 0; i < count; i++) {
        stars.push(new StarParticle());
    }

    function animationFrameLoop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        stars.forEach(s => s.drawAndUpdate());
        requestAnimationFrame(animationFrameLoop);
    }
    animationFrameLoop();
}

// Scroll animation observer
function scrollRevealObserver() {
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(reveal => {
        const windowHeight = window.innerHeight;
        const revealTop = reveal.getBoundingClientRect().top;
        const revealPoint = 70;

        if (revealTop < windowHeight - revealPoint) {
            reveal.classList.add('active');
        }
    });
}
window.addEventListener('scroll', scrollRevealObserver);