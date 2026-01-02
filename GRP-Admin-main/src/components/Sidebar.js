export function renderSidebar() {
    return `
    <div id="sidebar-overlay" class="fixed inset-0 bg-black/50 z-20 hidden transition-opacity duration-300 opacity-0 lg:hidden"></div>

    <aside id="sidebar" class="fixed inset-y-0 left-0 z-30 w-64 bg-slate-900 text-white transform -translate-x-full transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static h-full">
        <div class="flex items-center justify-between h-16 px-6 bg-slate-950">
            <span class="text-xl font-bold tracking-wider text-blue-400">ADMIN<span class="text-white">PANEL</span></span>
            <button id="close-sidebar" class="lg:hidden text-gray-400 hover:text-white">
                <i data-lucide="x"></i>
            </button>
        </div>

        <nav class="p-4 space-y-2">
            <button onclick="loadPage('dashboard')" class="w-full flex items-center px-4 py-3 text-sm font-medium text-gray-400 hover:bg-slate-800 hover:text-white rounded-lg transition-colors">
                <i data-lucide="bar-chart-2" class="w-5 h-5 mr-3"></i> Dashboard
            </button>

            <div class="pt-4 pb-2">
                <p class="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Website Content</p>
            </div>

            <button onclick="loadPage('home')" class="w-full flex items-center px-4 py-3 text-sm font-medium text-gray-400 hover:bg-slate-800 hover:text-white rounded-lg transition-colors">
                <i data-lucide="layout-template" class="w-5 h-5 mr-3"></i> Home Page
            </button>
            <button onclick="loadPage('about')" class="w-full flex items-center px-4 py-3 text-sm font-medium text-gray-400 hover:bg-slate-800 hover:text-white rounded-lg transition-colors">
                <i data-lucide="info" class="w-5 h-5 mr-3"></i> About Us
            </button>
            <button onclick="loadPage('services')" class="w-full flex items-center px-4 py-3 text-sm font-medium text-gray-400 hover:bg-slate-800 hover:text-white rounded-lg transition-colors">
                <i data-lucide="briefcase" class="w-5 h-5 mr-3"></i> Services
            </button>
            <button onclick="loadPage('gallery')" class="w-full flex items-center px-4 py-3 text-sm font-medium text-gray-400 hover:bg-slate-800 hover:text-white rounded-lg transition-colors">
                <i data-lucide="image" class="w-5 h-5 mr-3"></i> Gallery
            </button>
            <button onclick="loadPage('contact')" class="w-full flex items-center px-4 py-3 text-sm font-medium text-gray-400 hover:bg-slate-800 hover:text-white rounded-lg transition-colors">
                <i data-lucide="mail" class="w-5 h-5 mr-3"></i> Contact
            </button>
        </nav>
    </aside>
    `;
}