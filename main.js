
// =======================
// IMPORTS
// =======================
import { renderDashboard } from './src/components/Dashboard/Dashboard.js';
import { renderHome } from './src/pages/Home/Home.js';
import { renderSidebar } from './src/components/Sidebar.js';
import { renderservices } from './src/pages/services/services.js';
import { renderabout } from './src/pages/About_us/aboutus.js';
import { rendergallery } from './src/pages/gallery/gallery.js';
import { renderLogin } from './src/pages/Login/login.js';
import { renderproducts } from './src/pages/products/products.js';

// =======================
// AUTH HELPERS
// =======================
function isAuthenticated() {
    const token = localStorage.getItem("authToken");
    const expiry = localStorage.getItem("authExpiry");

    if (!token || !expiry) return false;

    if (Date.now() > Number(expiry)) {
        logout();
        return false;
    }
    return true;
}

// =======================
// ROUTER
// =======================
async function router() {
    const app = document.getElementById('app');
    const sidebarContainer = document.getElementById('sidebar-container');
    const pageTitle = document.getElementById('page-title');

    const hash = window.location.hash || '#/login';
    const loggedIn = isAuthenticated();

    // 🔐 Route protection
    if (!loggedIn && hash !== '#/login') {
        window.location.hash = '#/login';
        return;
    }

    if (loggedIn && hash === '#/login') {
        window.location.hash = '#/dashboard';
        return;
    }

    // Mobile menu button
document.addEventListener('click', (e) => {
    if (e.target.closest('#mobile-menu-btn')) {
        document.body.classList.add('sidebar-open');
    }
});

window.toggleSidebar = (open) => {
    if (open) {
        document.body.classList.add('sidebar-open');
    } else {
        document.body.classList.remove('sidebar-open');
    }
};


    // 🔄 RESET UI
    app.innerHTML = '';
    sidebarContainer.innerHTML = '';
    pageTitle.textContent = '';

    // 🔄 RESET MODE
    document.body.classList.remove('login-mode');

    switch (hash) {

        // =======================
        // LOGIN (FULL SCREEN)
        // =======================
        case '#/login':
            document.body.classList.add('login-mode');

            app.innerHTML = await fetch('./src/pages/Login/login.html')
                .then(r => r.text());

            // bind JS + canvas
            renderLogin(document);
            return; // ⛔ STOP HERE

        // =======================
        // DASHBOARD
        // =======================
        case '#/dashboard':
            sidebarContainer.innerHTML = renderSidebar('dashboard');
            pageTitle.textContent = 'Dashboard';

            app.innerHTML = await fetch('./src/components/Dashboard/Dashboard.html')
                .then(res => res.text());

            renderDashboard();
            break;

        case '#/home':
            sidebarContainer.innerHTML = renderSidebar('home');
            pageTitle.textContent = 'Home';
            renderHome();
            break;

        case '#/services':
            sidebarContainer.innerHTML = renderSidebar('services');
            pageTitle.textContent = 'Services';
            app.innerHTML = await fetch('./src/pages/services/services.html').then(r => r.text());
            renderservices();
            break;
        case '#/product':
            sidebarContainer.innerHTML = renderSidebar('product');
            pageTitle.textContent = 'Product';
            app.innerHTML = await fetch('./src/pages/products/products.html').then(r => r.text());
            renderproducts();
            break;

        case '#/about':
            sidebarContainer.innerHTML = renderSidebar('about');
            pageTitle.textContent = 'About Us';
            app.innerHTML = await fetch('./src/pages/About_us/aboutus.html').then(r => r.text());
            renderabout();
            break;

        case '#/gallery':
            sidebarContainer.innerHTML = renderSidebar('gallery');
            pageTitle.textContent = 'Gallery';
            app.innerHTML = await fetch('./src/pages/gallery/gallery.html').then(r => r.text());
            rendergallery();
            break;

        default:
            window.location.hash = '#/login';
    }

    lucide.createIcons();
}

// =======================
// LOGOUT
// =======================
window.logout = function () {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authExpiry");
    window.location.hash = '#/login';
};

// =======================
// SIDEBAR NAV
// =======================
window.handleNavigation = (pageId) => {
    window.location.hash = `#/${pageId}`;
};

// =======================
// INIT
// =======================
window.addEventListener('hashchange', router);
window.addEventListener('DOMContentLoaded', router);
