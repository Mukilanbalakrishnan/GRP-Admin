import { renderSidebar } from './components/Sidebar.js';
import { renderDashboard } from './pages/Dashboard.js'; // Import the new page
import { renderHome } from './pages/Home.js';
import { renderAbout } from './pages/About.js';

document.addEventListener('DOMContentLoaded', () => {
    // 1. Inject Sidebar
    document.getElementById('sidebar-container').innerHTML = renderSidebar();
    
    // 2. CHANGE THIS: Load 'dashboard' instead of 'home' by default
    loadPage('dashboard');

    lucide.createIcons();
    setupNavigation();
});

window.loadPage = (pageName) => {
    const app = document.getElementById('app');
    const pageTitle = document.getElementById('page-title');

    // Update the switch case
    switch(pageName) {
        case 'dashboard':
            app.innerHTML = renderDashboard();
            pageTitle.innerText = 'Dashboard Overview';
            break;
        case 'home':
            app.innerHTML = renderHome();
            pageTitle.innerText = 'Home Page Manager';
            break;
        case 'about':
            app.innerHTML = renderAbout();
            pageTitle.innerText = 'About Us Manager';
            break;
        case 'services':
            app.innerHTML = `<div class="p-4 text-gray-500">Services Manager</div>`;
            pageTitle.innerText = 'Services Manager';
            break;
        case 'gallery':
            app.innerHTML = `<div class="p-4 text-gray-500">Gallery Manager</div>`;
            pageTitle.innerText = 'Gallery Manager';
            break;
        case 'contact':
            app.innerHTML = `<div class="p-4 text-gray-500">Contact Manager</div>`;
            pageTitle.innerText = 'Contact Manager';
            break;
        default:
            app.innerHTML = renderDashboard(); // Default to dashboard
    }

    lucide.createIcons();
    
    // Only run accordion logic if we are on the Home Editor page
    if(pageName === 'home') setupHomeInteractions();

    if(window.innerWidth < 1024) toggleSidebar(false);
};

// ... keep your existing setupNavigation() and setupHomeInteractions() functions below ...
function setupNavigation() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const closeBtn = document.getElementById('close-sidebar');

    window.toggleSidebar = (show) => {
        if(show) {
            sidebar.classList.remove('-translate-x-full');
            overlay.classList.remove('hidden');
            setTimeout(() => overlay.classList.remove('opacity-0'), 10);
        } else {
            sidebar.classList.add('-translate-x-full');
            overlay.classList.add('opacity-0');
            setTimeout(() => overlay.classList.add('hidden'), 300);
        }
    };

    mobileBtn?.addEventListener('click', () => toggleSidebar(true));
    closeBtn?.addEventListener('click', () => toggleSidebar(false));
    overlay?.addEventListener('click', () => toggleSidebar(false));
}

function setupHomeInteractions() {
    const triggers = document.querySelectorAll('.accordion-trigger');
    
    triggers.forEach(button => {
        button.addEventListener('click', () => {
            const content = button.nextElementSibling;
            const icon = button.querySelector('.chevron-icon');
            
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
                icon.style.transform = 'rotate(0deg)';
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
                icon.style.transform = 'rotate(180deg)';
            }
        });
    });
}