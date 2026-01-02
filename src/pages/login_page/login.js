// Authentication Check: If already logged in, go to dashboard
if (localStorage.getItem('authToken')) {
    window.location.href = '../../../../index.html';
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('login-form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const errorMessage = document.getElementById('error-message');
    const togglePasswordBtn = document.getElementById('toggle-password');

    // Hardcoded credentials
    const ADMIN_EMAIL = 'admin@grp.com';
    const ADMIN_PASS = 'admin123';

    // Password Visibility Toggle
    togglePasswordBtn.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        // Refresh icon
        const icon = type === 'password' ? 'eye' : 'eye-off';
        togglePasswordBtn.innerHTML = `<i data-lucide="${icon}" class="h-4 w-4 text-gray-400 hover:text-gray-600 transition-colors"></i>`;
        lucide.createIcons();
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        if (email === ADMIN_EMAIL && password === ADMIN_PASS) {
            // Successful Login
            localStorage.setItem('authToken', 'grp-admin-token-' + Date.now());

            // Redirect to main app
            // Path from: src/pages/hero/login page/login.html -> root/index.html
            window.location.href = '../../../../index.html';
        } else {
            // Error
            errorMessage.classList.remove('hidden');
            passwordInput.value = '';

            // Shake animation
            form.classList.add('animate-pulse');
            setTimeout(() => form.classList.remove('animate-pulse'), 500);
        }
    });

    // Clear error on input
    emailInput.addEventListener('input', () => errorMessage.classList.add('hidden'));
    passwordInput.addEventListener('input', () => errorMessage.classList.add('hidden'));

    // ==========================================
    // Particle Animation Logic
    // ==========================================
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');

    let particles = [];
    const textToForm = "GRP";

    // Resize handling
    let width, height;
    const resize = () => {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        initParticles();
    };

    // Particle Class
    class Particle {
        constructor(targetX, targetY) {
            // Start at random position
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            // Target position from text
            this.targetX = targetX;
            this.targetY = targetY;
            // Physics
            this.vx = (Math.random() - 0.5) * 2;
            this.vy = (Math.random() - 0.5) * 2;
            this.ease = 0.05 + Math.random() * 0.05; // Ease factor
            this.friction = 0.95;
            this.size = 1.5 + Math.random() * 2;
            this.color = `rgba(37, 99, 235, ${0.4 + Math.random() * 0.6})`; // Blue-ish

            // Interaction
            this.rootX = this.x;
            this.rootY = this.y;
        }

        update() {
            // Move towards target
            const dx = this.targetX - this.x;
            const dy = this.targetY - this.y;

            this.x += dx * this.ease;
            this.y += dy * this.ease;

            // Add slight jitter for "atom" feel
            this.x += (Math.random() - 0.5) * 0.5;
            this.y += (Math.random() - 0.5) * 0.5;
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    const initParticles = () => {
        particles = [];

        // 1. Draw text on a temporary off-screen canvas (or just clear rect) to sample pixels
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = 'white'; // Placeholder
        ctx.font = '900 20vw "Clash Display", sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Measure text to center it carefully
        ctx.fillStyle = 'rgba(0,0,0,1)';
        ctx.fillText(textToForm, width / 2, height / 2);

        // 2. Get Image Data
        // We only scan a portion of the screen where text likely is to save perf
        const idata = ctx.getImageData(0, 0, width, height);
        const buffer32 = new Uint32Array(idata.data.buffer);

        // 3. Sample grid
        const grid = 6; // Check every 6th pixel (lower = more particles)

        for (let y = 0; y < height; y += grid) {
            for (let x = 0; x < width; x += grid) {
                if (buffer32[y * width + x]) { // If pixel is not empty
                    particles.push(new Particle(x, y));
                }
            }
        }

        // Add some random background particles for depth
        for (let i = 0; i < 100; i++) {
            const p = new Particle(Math.random() * width, Math.random() * height);
            p.ease = 0.01; // Move very slowly to random target
            p.targetX = Math.random() * width;
            p.targetY = Math.random() * height;
            p.color = '#e2e8f0'; // Gray
            p.size = Math.random() * 3;
            particles.push(p);
        }
    };

    const animate = () => {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    };

    // Initial delay to wait for fonts? Or just go.
    setTimeout(() => {
        resize();
        animate();
    }, 100);

    window.addEventListener('resize', () => {
        // Debounce could be added
        resize();
    });
});
