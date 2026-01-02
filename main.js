// Point to the file inside src/pages/home/
import { renderDashboard } from './src/components/Dashboard.js';
import { renderHome } from './src/pages/Home/Home.js';
import { renderSidebar } from './src/components/Sidebar.js';
import { renderservices } from './src/pages/services/services.js';
import { renderabout } from './src/pages/About_us/aboutus.js';
import { rendergallery } from './src/pages/gallery/gallery.js';

// 🔐 AUTH GUARD — must be first
if (!localStorage.getItem('authToken')) {
    window.location.href = './login.html';
}


document.addEventListener('DOMContentLoaded', () => {
    // 1. Render Sidebar
    document.querySelector('#sidebar-container').innerHTML = renderSidebar();

    // 2. Decide FIRST PAGE
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    if (isLoggedIn) {
        renderDashboard();   // ✅ Dashboard first
    } else {
        renderHome();        // ❌ Only if not logged in
    }

    // 3. Initialize Icons
    lucide.createIcons();

    // 4. Sidebar Logic
    setupSidebarInteractions();
});

// ---------------- ROUTER ----------------
window.loadPage = async (pageName) => {
    const app = document.getElementById('app');
    app.innerHTML = '';

    switch (pageName) {
        case 'dashboard':
            renderDashboard();
            break;
        case 'home':
            renderHome();
            break;
        
        case 'services':
             const res = await fetch('./src/pages/services/services.html');
            app.innerHTML = await res.text();
            renderservices();
            break;
        case 'about':
            // 1️⃣ Inject HTML first
            app.innerHTML = await fetch('./src/pages/About_us/aboutus.html')
                .then(res => res.text());

            // 2️⃣ THEN mount JS
            renderabout();
            break;
        case 'gallery':
            // 1️⃣ Inject HTML first
            app.innerHTML = await fetch('./src/pages/gallery/gallery.html')
                .then(res => res.text());

            // 2️⃣ THEN mount JS
            rendergallery();
            break;
        default:
            renderDashboard(); // ✅ safer default
    }

    lucide.createIcons();
};

// ---------------- SIDEBAR ----------------
function setupSidebarInteractions() {
    const sidebar = document.getElementById('sidebar');
    const openBtn = document.getElementById('mobile-menu-btn');

    window.toggleSidebar = (show) => {
        if (!sidebar) return;
        sidebar.classList.toggle('-translate-x-full', !show);
    };

    if (openBtn) {
        openBtn.addEventListener('click', () => toggleSidebar(true));
    }
}
