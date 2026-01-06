export function renderLogin(container) {

    const loginForm = container.querySelector('#loginForm');
    const emailInput = container.querySelector('#email');
    const passwordInput = container.querySelector('#password');
    const togglePasswordBtn = container.querySelector('#togglePassword');
    const submitBtn = container.querySelector('#submitBtn');
    const messageBox = container.querySelector('#messageBox');

    if (!loginForm || !submitBtn) {
        console.warn('Login DOM not ready');
        return;
    }

    const btnText = submitBtn.querySelector('.btn-text');
    const loader = submitBtn.querySelector('.loader');


    // Toggle Password Visibility
    togglePasswordBtn.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        togglePasswordBtn.textContent = type === 'password' ? 'Show' : 'Hide';
    });

    // Form Submission
    // loginForm.addEventListener('submit', async (e) => {
    //     e.preventDefault();

    //     // Clear previous messages
    //     hideMessage();

    //     const email = emailInput.value.trim();
    //     const password = passwordInput.value.trim();

    //     // Validation
    //     if (!validateEmail(email)) {
    //         showMessage('Please enter a valid email address.', 'error');
    //         return;
    //     }

    //     if (password.length < 6) {
    //         showMessage('Password must be at least 6 characters long.', 'error');
    //         return;
    //     }

    //     // Simulate API Login
    //     setLoading(true);

    //     try {
    //         await mockLogin(email, password);
    //         showMessage('Login successful! Redirecting...', 'success');

    //         // Redirect simulation
    //         setTimeout(() => {
    //             // In a real app, you would redirect here
    //             // window.location.href = '/dashboard';
    //             console.log('Redirecting to dashboard...');

    //             // For demo purposes, just reset form
    //             setLoading(false);
    //             loginForm.reset();
    //             setTimeout(() => hideMessage(), 3000);
    //         }, 1500);

    //     } catch (error) {
    //         showMessage(error.message, 'error');
    //         setLoading(false);
    //     }
    // });

    loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    hideMessage();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!validateEmail(email)) {
        showMessage('Please enter a valid email address.', 'error');
        return;
    }

    if (password.length < 6) {
        showMessage('Password must be at least 6 characters long.', 'error');
        return;
    }

    setButtonLoading(true);

    try {
        const res = await fetch(
            "http://localhost/GRP-Backend/api/auth/admin-login.php",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            }
        );

        const data = await res.json();

        if (!res.ok || !data.status) {
            throw new Error(data.message || "Login failed");
        }

        // ✅ SAVE AUTH DATA
        localStorage.setItem("authToken", data.token);

        const expiryTime =
            Date.now() + (data.expires_in || 3600) * 1000;

        localStorage.setItem("authExpiry", expiryTime);
        

        showMessage("Login successful! Redirecting...", "success");

        setTimeout(() => {
            window.location.hash = "#/dashboard";
        }, 800);

    } catch (err) {
        showMessage(err.message, "error");
        setButtonLoading(false);
    }
});


    // Mock Login API
    

    // Helper Functions
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function showMessage(msg, type) {
        messageBox.textContent = msg;
        messageBox.className = `message-box ${type}`;
        messageBox.style.display = 'block';

        // Shake animation for error
        if (type === 'error') {
            messageBox.classList.add('shake');
            setTimeout(() => messageBox.classList.remove('shake'), 500);
        }
    }

    function hideMessage() {
        messageBox.style.display = 'none';
        messageBox.className = 'message-box';
    }

    function setButtonLoading(isLoading) {
        if (isLoading) {
            submitBtn.disabled = true;
            btnText.style.opacity = '0';
            loader.style.display = 'block';
        } else {
            submitBtn.disabled = false;
            btnText.style.opacity = '1';
            loader.style.display = 'none';
        }
    }

    // --- Background Animation (Atoms forming GRP) ---
    const canvas = container.querySelector('#bg-canvas');
if (!canvas) return;

const ctx = canvas.getContext('2d');

    let particles = [];
    let animationFrameId;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
    }

    class Particle {
        constructor(x, y) {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.destX = x;
            this.destY = y;
            this.vx = (Math.random() - 0.5) * 5;
            this.vy = (Math.random() - 0.5) * 5;
            this.accX = 0;
            this.accY = 0;
            this.friction = 0.96;
            this.color = Math.random() > 0.5 ? '#6366f1' : '#ec4899'; // Primary or Secondary color
            this.size = Math.random() * 2 + 1;
        }

        update() {
            // Physics to move towards destination
            // Distance to target
            const dx = this.destX - this.x;
            const dy = this.destY - this.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            // Force towards target (spring-like)
            const forceDirectionX = dx / dist;
            const forceDirectionY = dy / dist;
            const speed = 0.5; // Strength of pull

            // Spiral/Chaotic movement when far
            if (dist > 50) {
                this.accX += forceDirectionX * 0.1;
                this.accY += forceDirectionY * 0.1;

                // Add some randomness/orbiting effect
                this.vx += (Math.random() - 0.5) * 0.2;
                this.vy += (Math.random() - 0.5) * 0.2;
            } else {
                // Snap to position
                this.accX += (dx * 0.05);
                this.accY += (dy * 0.05);
            }

            this.vx += this.accX;
            this.vy += this.accY;
            this.vx *= this.friction;
            this.vy *= this.friction;

            this.x += this.vx;
            this.y += this.vy;

            // Reset acceleration
            this.accX = 0;
            this.accY = 0;
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initParticles() {
        particles = [];
        // Create an off-screen canvas to sample text
        const textCanvas = document.createElement('canvas');
        const textCtx = textCanvas.getContext('2d');
        textCanvas.width = canvas.width;
        textCanvas.height = canvas.height;

        // Draw Text
        textCtx.fillStyle = 'white';
        textCtx.font = 'bold 20vw "Outfit", sans-serif';
        textCtx.textAlign = 'center';
        textCtx.textBaseline = 'middle';
        textCtx.fillText('GRP', textCanvas.width / 2, textCanvas.height / 2);

        // Sample pixels
        const gap = 8; // Distance between particles
        const imageData = textCtx.getImageData(0, 0, textCanvas.width, textCanvas.height).data;

        for (let y = 0; y < textCanvas.height; y += gap) {
            for (let x = 0; x < textCanvas.width; x += gap) {
                const index = (y * textCanvas.width + x) * 4;
                if (imageData[index + 3] > 128) { // If pixel is visible
                    particles.push(new Particle(x, y));
                }
            }
        }

        // Add some background "star" particles that just float locally
        for (let i = 0; i < 100; i++) {
            const p = new Particle(Math.random() * canvas.width, Math.random() * canvas.height);
            // Remove destination force for these by setting dest to current loop
            p.destX = p.x;
            p.destY = p.y;
            // Let them drift
            p.update = function () {
                this.x += this.vx;
                this.y += this.vy;
                if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
                    this.x = Math.random() * canvas.width;
                    this.y = Math.random() * canvas.height;
                }
            };
            particles.push(p);
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Connect particles with lines if close and forming structure
        // (Optional optimization: only do this for a subset or skip for performance if too many particles)

        particles.forEach(p => {
            p.update();
            p.draw();
        });

        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    animate();

}
