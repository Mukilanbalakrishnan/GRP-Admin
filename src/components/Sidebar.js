// 1. Define your menu structure here for easy editing
const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'bar-chart-2', type: 'link' },
    { label: 'Website Content', type: 'header' }, // Section Header
    { id: 'home', label: 'Home Page', icon: 'layout-template', type: 'link' },
    { id: 'about', label: 'About Us', icon: 'info', type: 'link' },
    { id: 'services', label: 'Services', icon: 'briefcase', type: 'link' },
    { id: 'gallery', label: 'Gallery', icon: 'image', type: 'link' },
    { id: 'contact', label: 'Contact', icon: 'mail', type: 'link' },
];

// 2. The Render Function
export function renderSidebar(activePage = 'dashboard') {
    // Generate the links dynamically based on the active page
    const navLinks = menuItems.map(item => {
        if (item.type === 'header') {
            return `
                <div class="pt-4 pb-2">
                    <p class="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        ${item.label}
                    </p>
                </div>`;
        }

        const isActive = item.id === activePage;
        
        // Conditional Styling: Active vs Inactive
        const baseClasses = "w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 group relative";
        const activeClasses = "bg-blue-600 text-white shadow-lg shadow-blue-500/20";
        const inactiveClasses = "text-slate-400 hover:bg-slate-800 hover:text-white hover:pl-5"; // Added hover slide effect

        return `
            <button 
                onclick="handleNavigation('${item.id}')" 
                class="${baseClasses} ${isActive ? activeClasses : inactiveClasses}"
            >
                <i data-lucide="${item.icon}" class="w-5 h-5 mr-3 ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-white'} transition-colors"></i>
                ${item.label}
                ${isActive ? '<div class="absolute right-0 h-6 w-1 bg-white rounded-l opacity-20"></div>' : ''}
            </button>
        `;
    }).join('');

    return `
    <div id="sidebar-overlay" 
         onclick="toggleSidebar(false)"
         class="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-20 hidden transition-opacity duration-300 opacity-0 lg:hidden">
    </div>

    <aside id="sidebar" 
           class="fixed inset-y-0 left-0 z-30 w-64 bg-slate-900 border-r border-slate-800 text-white transform -translate-x-full transition-transform duration-300 ease-out lg:translate-x-0 lg:static h-full flex flex-col">
        
        <div class="flex items-center justify-between h-16 px-6 bg-slate-950/50 border-b border-slate-800">
            <span class="text-xl font-bold tracking-wider text-blue-500 flex items-center gap-2">
                <i data-lucide="shield-check" class="w-6 h-6"></i>
                ADMIN<span class="text-white">PANEL</span>
            </span>
            <button onclick="toggleSidebar(false)" class="lg:hidden p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
                <i data-lucide="x" class="w-5 h-5"></i>
            </button>
        </div>

        <nav class="flex-1 overflow-y-auto py-4 px-3 space-y-1 custom-scrollbar">
            ${navLinks}
        </nav>

        <div class="p-4 border-t border-slate-800 bg-slate-950/30">
            <button class="flex items-center w-full px-3 py-2 text-sm text-slate-400 hover:text-white hover:bg-slate-800 rounded-md transition-colors">
                <i data-lucide="log-out" class="w-4 h-4 mr-2"></i>
                Logout
            </button>
        </div>
    </aside>
    `;
}

// 3. Helper Functions (Add these to your main script file)

// Handle clicking a menu item
window.handleNavigation = (pageId) => {
    // 1. Close sidebar on mobile immediately for better UX
    if (window.innerWidth < 1024) {
        toggleSidebar(false);
    }
    // 2. Call your existing loadPage function
    if (typeof loadPage === 'function') {
        loadPage(pageId); 
    }
    // 3. Re-render sidebar to update active state (Optional, depends on how your app refreshes)
    // document.getElementById('sidebar-container').innerHTML = renderSidebar(pageId);
    // lucide.createIcons();
};

// Toggle Sidebar Visibility (Mobile)
window.toggleSidebar = (show) => {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    
    if (!sidebar || !overlay) return;

    if (show) {
        // Show
        overlay.classList.remove('hidden');
        // Small delay to allow display:block to apply before opacity transition
        setTimeout(() => overlay.classList.remove('opacity-0'), 10);
        sidebar.classList.remove('-translate-x-full');
    } else {
        // Hide
        overlay.classList.add('opacity-0');
        sidebar.classList.add('-translate-x-full');
        setTimeout(() => overlay.classList.add('hidden'), 300);
    }
};