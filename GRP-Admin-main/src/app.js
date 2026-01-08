
// ==========================================
// 1. Sidebar Component
// ==========================================
function renderSidebar() {
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
            <a href="src/pages/hero/About us/aboutus.html" class="w-full flex items-center px-4 py-3 text-sm font-medium text-gray-400 hover:bg-slate-800 hover:text-white rounded-lg transition-colors">
                <i data-lucide="info" class="w-5 h-5 mr-3"></i> About Us
            </a>
            <a href="src/pages/hero/services/services.html" class="w-full flex items-center px-4 py-3 text-sm font-medium text-gray-400 hover:bg-slate-800 hover:text-white rounded-lg transition-colors">
                <i data-lucide="briefcase" class="w-5 h-5 mr-3"></i> Services
            </a>
            <a href="src/pages/hero/gallery/gallery.html" class="w-full flex items-center px-4 py-3 text-sm font-medium text-gray-400 hover:bg-slate-800 hover:text-white rounded-lg transition-colors">
                <i data-lucide="image" class="w-5 h-5 mr-3"></i> Gallery
            </a>
            <a href="src/pages/hero/products/products.html" class="w-full flex items-center px-4 py-3 text-sm font-medium text-gray-400 hover:bg-slate-800 hover:text-white rounded-lg transition-colors">
                <i data-lucide="shopping-bag" class="w-5 h-5 mr-3"></i> Products
            </a>
            <button onclick="loadPage('contact')" class="w-full flex items-center px-4 py-3 text-sm font-medium text-gray-400 hover:bg-slate-800 hover:text-white rounded-lg transition-colors">
                <i data-lucide="mail" class="w-5 h-5 mr-3"></i> Contact
            </button>
        </nav>

        <div class="absolute bottom-0 w-full p-4 bg-slate-950 border-t border-slate-800">
             <button onclick="window.logout()" class="w-full flex items-center justify-center px-4 py-2 text-sm font-bold text-red-500 hover:bg-red-500/10 rounded-lg transition-colors">
                <i data-lucide="log-out" class="w-4 h-4 mr-2"></i> Log Out
            </button>
        </div>
    </aside>
    `;
}

// ==========================================
// 2. Dashboard Component
// ==========================================
function renderDashboard() {
    return `
        <div class="max-w-6xl mx-auto">
            <h1 class="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h1>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-sm font-medium text-gray-500">Total Visits</h3>
                        <div class="p-2 bg-blue-50 text-blue-600 rounded-lg">
                            <i data-lucide="eye" class="w-5 h-5"></i>
                        </div>
                    </div>
                    <div class="text-2xl font-bold text-gray-800">24,500</div>
                    <p class="text-xs text-green-500 mt-1 flex items-center">
                        <i data-lucide="arrow-up" class="w-3 h-3 mr-1"></i> +12% this month
                    </p>
                </div>

                <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-sm font-medium text-gray-500">Messages</h3>
                        <div class="p-2 bg-purple-50 text-purple-600 rounded-lg">
                            <i data-lucide="message-square" class="w-5 h-5"></i>
                        </div>
                    </div>
                    <div class="text-2xl font-bold text-gray-800">48</div>
                    <p class="text-xs text-gray-400 mt-1">5 unread messages</p>
                </div>

                <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-sm font-medium text-gray-500">Services</h3>
                        <div class="p-2 bg-green-50 text-green-600 rounded-lg">
                            <i data-lucide="activity" class="w-5 h-5"></i>
                        </div>
                    </div>
                    <div class="text-2xl font-bold text-gray-800">12</div>
                    <p class="text-xs text-gray-400 mt-1">Active Services</p>
                </div>

                <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-sm font-medium text-gray-500">Gallery Items</h3>
                        <div class="p-2 bg-orange-50 text-orange-600 rounded-lg">
                            <i data-lucide="image" class="w-5 h-5"></i>
                        </div>
                    </div>
                    <div class="text-2xl font-bold text-gray-800">156</div>
                    <p class="text-xs text-green-500 mt-1">+4 added today</p>
                </div>
            </div>

            <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div class="p-6 border-b border-gray-100 flex items-center justify-between">
                    <h3 class="font-semibold text-gray-800">Recent Updates</h3>
                </div>
                <div class="p-6">
                    <div class="space-y-6">
                        <div class="flex items-start">
                            <div class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 shrink-0">
                                <i data-lucide="edit-3" class="w-5 h-5"></i>
                            </div>
                            <div class="ml-4">
                                <p class="text-sm font-medium text-gray-800">Updated "About Us"</p>
                                <p class="text-xs text-gray-500 mt-0.5">Changed company history text.</p>
                                <p class="text-xs text-gray-400 mt-2">2 hours ago</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// ==========================================
// 3. Gallery Component
// ==========================================
const renderGallery = () => {
    return `
    <div class="p-6 bg-gray-50 min-h-screen font-sans">
    <!-- Header -->
    <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-800">Gallery <span class="text-gray-400 text-xl font-normal">List</span></h1>
        <div class="flex items-center text-sm text-gray-500 mt-1">
            <i data-lucide="home" class="w-4 h-4 mr-1"></i> <span class="mx-1">/</span> Gallery
        </div>
    </div>

    <!-- Toolbar -->
    <div class="bg-white p-4 rounded-t-xl border-b border-gray-200 flex flex-wrap items-center justify-between gap-4 shadow-sm">
        <div class="flex items-center gap-2">
            <button id="add-image-btn" class="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded shadow-sm text-sm font-medium flex items-center gap-2 transition-colors">
                <i data-lucide="plus" class="w-4 h-4"></i> New
            </button>
            
            <button id="delete-selected-btn" class="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded shadow-sm text-sm font-medium flex items-center gap-2 transition-colors hidden">
                <i data-lucide="trash-2" class="w-4 h-4 text-red-500"></i> Delete Selected
            </button>

            <div class="relative group">
                <button class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow-sm text-sm font-medium flex items-center gap-2 transition-colors">
                    <i data-lucide="filter" class="w-4 h-4"></i> Filter
                </button>
                <div class="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 hidden group-hover:block z-10 p-2">
                    <select id="gallery-filter" class="w-full border-none focus:ring-0 text-sm p-1 text-gray-600 bg-transparent">
                        <option value="all">All Categories</option>
                        <option value="Roofing">Roofing</option>
                        <option value="Attic">Attic</option>
                        <option value="Installation">Installation</option>
                        <option value="Repair">Repair</option>
                    </select>
                </div>
            </div>
            

        </div>

        <div class="flex items-center gap-2">
             <div class="relative">
                <input type="text" id="gallery-search" placeholder="Search..." class="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64">
                <i data-lucide="search" class="w-4 h-4 text-gray-400 absolute left-3 top-2.5"></i>
            </div>
            <button class="bg-white border border-gray-300 text-gray-700 px-3 py-2 rounded shadow-sm hover:bg-gray-50 text-sm font-medium">
                <i data-lucide="download" class="w-4 h-4"></i> Export
            </button>
        </div>
    </div>

    <!-- Table -->
    <div class="bg-white rounded-b-xl shadow-sm border border-gray-200 overflow-hidden">
        <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
                <thead>
                    <tr class="bg-gray-50 border-b border-gray-200 text-xs uppercase text-gray-500 font-semibold tracking-wider">
                        <th class="px-6 py-4 w-12 text-center">
                            <input type="checkbox" id="select-all" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500">
                        </th>
                        <th class="px-6 py-4 cursor-pointer hover:bg-gray-100 transition-colors group">
                            ID <i data-lucide="arrow-up-down" class="w-3 h-3 inline-block ml-1 text-gray-300 group-hover:text-gray-500"></i>
                        </th>
                        <th class="px-6 py-4">Image</th>
                        <th class="px-6 py-4">Title / Description</th>
                        <th class="px-6 py-4">Category</th>
                        <th class="px-6 py-4">Created Date</th>
                        <th class="px-6 py-4 text-right">Action</th>
                    </tr>
                </thead>
                <tbody id="gallery-table-body" class="divide-y divide-gray-100 text-sm text-gray-700">
                    <!-- Rows injected via JS -->
                </tbody>
            </table>
        </div>
        
        <!-- Pagination -->
        <div class="bg-white px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <div class="text-xs text-gray-500">
                Showing <span class="font-medium text-gray-900">1</span> to <span class="font-medium text-gray-900" id="page-count">10</span> of <span class="font-medium text-gray-900" id="total-count">20</span> results
            </div>
            <div class="flex items-center gap-2">
                <button class="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 text-gray-600 disabled:opacity-50 text-xs font-medium">Previous</button>
                <button class="px-3 py-1 bg-blue-50 border border-blue-500 text-blue-600 rounded text-xs font-medium">1</button>
                <button class="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 text-gray-600 text-xs font-medium">2</button>
                <button class="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 text-gray-600 text-xs font-medium">3</button>
                <button class="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 text-gray-600 disabled:opacity-50 text-xs font-medium">Next</button>
            </div>
        </div>
    </div>
    
    <!-- Empty State (Hidden by default) -->
    <div id="gallery-empty" class="hidden flex flex-col items-center justify-center py-24 text-gray-400 bg-white rounded-b-xl border border-t-0 border-gray-200">
        <i data-lucide="inbox" class="w-16 h-16 mb-4 text-gray-200"></i>
        <p class="text-sm">No records found</p>
    </div>

    <!-- Modal -->
    <div id="gallery-modal" class="fixed inset-0 bg-black/50 hidden flex items-center justify-center z-50 backdrop-blur-sm transition-opacity">
        <div class="bg-white rounded-lg shadow-xl w-full max-w-md transform transition-all scale-100 animate-in fade-in zoom-in duration-200">
            <div class="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50 rounded-t-lg">
                <h3 id="modal-title" class="text-lg font-bold text-gray-800">Add New Record</h3>
                <button id="close-modal-btn" class="text-gray-400 hover:text-red-500 transition-colors">
                    <i data-lucide="x" class="w-5 h-5"></i>
                </button>
            </div>
            
            <form id="gallery-form" class="p-6 space-y-5">
                <input type="hidden" id="image-id">
                
                <div>
                    <label class="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Upload Image</label>
                    <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-emerald-500 transition-colors cursor-pointer relative" id="drop-zone">
                        <div class="space-y-1 text-center">
                            <i data-lucide="image-plus" class="mx-auto h-12 w-12 text-gray-400"></i>
                            <div class="flex text-sm text-gray-600 justify-center">
                                <label for="image-file" class="relative cursor-pointer bg-white rounded-md font-medium text-emerald-600 hover:text-emerald-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-emerald-500">
                                    <span>Upload a file</span>
                                    <input id="image-file" name="image-file" type="file" accept="image/*" class="sr-only">
                                </label>
                                <p class="pl-1">or drag and drop</p>
                            </div>
                            <p class="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                        </div>
                    </div>
                     <!-- Preview -->
                    <div id="image-preview-container" class="mt-4 hidden p-2 border border-blue-100 bg-blue-50 rounded-lg flex items-center justify-between">
                        <div class="flex items-center gap-3">
                            <img id="image-preview" src="" alt="Preview" class="h-12 w-12 object-cover rounded-md border border-blue-200">
                            <span id="file-name" class="text-sm text-blue-700 font-medium truncate max-w-[150px]"></span>
                        </div>
                        <button type="button" id="remove-file-btn" class="text-gray-400 hover:text-red-500">
                            <i data-lucide="x" class="w-4 h-4"></i>
                        </button>
                    </div>
                </div>

                <div>
                    <label class="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Title</label>
                    <input type="text" id="image-title" required placeholder="Image Title" 
                        class="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-colors">
                </div>

                <div>
                    <label class="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Category</label>
                    <div class="relative">
                        <select id="image-category" class="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-colors appearance-none">
                            <option value="Roofing">Roofing</option>
                            <option value="Attic">Attic</option>
                            <option value="Installation">Installation</option>
                            <option value="Repair">Repair</option>
                        </select>
                         <i data-lucide="chevron-down" class="w-4 h-4 text-gray-400 absolute right-3 top-2.5 pointer-events-none"></i>
                    </div>
                </div>

                <div class="pt-4 flex justify-end gap-3 border-t border-gray-100 mt-4">
                    <button type="button" id="cancel-btn" class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded text-sm font-medium transition-colors">Cancel</button>
                    <button type="submit" class="px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded text-sm font-bold shadow-sm shadow-emerald-200 transition-all transform active:scale-95">Save</button>
                </div>
            </form>
        </div>
    </div>
</div>
    `;
};

const setupGalleryInteractions = () => {
    const tableBody = document.getElementById('gallery-table-body');
    const emptyState = document.getElementById('gallery-empty');
    const modal = document.getElementById('gallery-modal');
    const form = document.getElementById('gallery-form');
    const addBtn = document.getElementById('add-image-btn');
    const closeBtn = document.getElementById('close-modal-btn');
    const cancelBtn = document.getElementById('cancel-btn');
    const searchInput = document.getElementById('gallery-search');
    const filterSelect = document.getElementById('gallery-filter');
    const selectAllCheckbox = document.getElementById('select-all');
    const deleteSelectedBtn = document.getElementById('delete-selected-btn');

    // File inputs
    const fileInput = document.getElementById('image-file');
    const previewContainer = document.getElementById('image-preview-container');
    const previewImage = document.getElementById('image-preview');
    const fileNameSpan = document.getElementById('file-name');
    const removeFileBtn = document.getElementById('remove-file-btn');
    const dropZone = document.getElementById('drop-zone');

    const totalCountSpan = document.getElementById('total-count');
    const pageCountSpan = document.getElementById('page-count');

    // State
    let galleryData = JSON.parse(localStorage.getItem('galleryData')) || [
        { id: '1', url: 'https://images.unsplash.com/photo-1632759905292-cc232758f8b8?q=80&w=600&auto=format&fit=crop', title: 'Modern Clay Roof', category: 'Roofing', date: '2024-01-15' },
        { id: '2', url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=600&auto=format&fit=crop', title: 'Attic Insulation Setup', category: 'Attic', date: '2024-02-10' },
        { id: '3', url: 'https://images.unsplash.com/photo-1596256860361-b952c87ba9b6?q=80&w=600&auto=format&fit=crop', title: 'Solar Panel Update', category: 'Installation', date: '2024-03-05' },
    ];

    // We need to store the "current editing URL" to persist it if no new file is uploaded
    let currentEditUrl = '';

    // Helper: Save to LocalStorage
    const save = () => {
        try {
            localStorage.setItem('galleryData', JSON.stringify(galleryData));
            render();
        } catch (e) {
            alert('Storage full! Image might be too large.');
            console.error(e);
        }
    };

    // Helper: Format Date
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toISOString().slice(0, 19).replace('T', ' ');
    };

    // Helper: Read File as Base64
    const readFile = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }

    // File Input Handlers
    const updatePreview = (src, name) => {
        if (src) {
            previewImage.src = src;
            fileNameSpan.innerText = name || 'Uploaded Image';
            previewContainer.classList.remove('hidden');
        } else {
            previewContainer.classList.add('hidden');
            fileInput.value = ''; // Reset input
        }
    }

    fileInput.addEventListener('change', (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            readFile(file).then(url => {
                updatePreview(url, file.name);
            });
        }
    });

    removeFileBtn.addEventListener('click', () => {
        updatePreview(null);
        fileInput.value = ''; // Clear file input
        // If editing, we might want to revert to the original URL or clear it? 
        // For simplicity, clearing means "no change" if editing, or "no image" if new.
        if (document.getElementById('image-id').value) {
            updatePreview(currentEditUrl, 'Current Image');
        }
    });

    // Helper: Render Table
    const render = () => {
        const searchTerm = searchInput.value.toLowerCase();
        const categoryFilter = filterSelect.value;

        const filtered = galleryData.filter(item => {
            const matchesSearch = item.title.toLowerCase().includes(searchTerm) || item.id.includes(searchTerm);
            const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
            return matchesSearch && matchesCategory;
        });

        if (totalCountSpan) totalCountSpan.innerText = filtered.length;
        if (pageCountSpan) pageCountSpan.innerText = filtered.length;

        if (filtered.length === 0) {
            tableBody.innerHTML = '';
            tableBody.closest('table')?.classList.add('hidden');
            emptyState.classList.remove('hidden');
        } else {
            emptyState.classList.add('hidden');
            tableBody.closest('table')?.classList.remove('hidden');

            tableBody.innerHTML = filtered.map(item => `
                <tr class="hover:bg-gray-50 transition-colors group">
                    <td class="px-6 py-4 text-center">
                        <input type="checkbox" class="row-checkbox rounded border-gray-300 text-blue-600 focus:ring-blue-500" value="${item.id}">
                    </td>
                    <td class="px-6 py-4 font-medium text-gray-900">
                        ${item.id}
                    </td>
                    <td class="px-6 py-4">
                        <div class="h-10 w-16 rounded overflow-hidden bg-gray-100 border border-gray-200">
                            <img src="${item.url}" alt="${item.title}" class="w-full h-full object-cover">
                        </div>
                    </td>
                    <td class="px-6 py-4 text-gray-700">
                        ${item.title}
                    </td>
                    <td class="px-6 py-4">
                         <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                            ${item.category === 'Roofing' ? 'bg-orange-100 text-orange-800' :
                    item.category === 'Attic' ? 'bg-purple-100 text-purple-800' :
                        item.category === 'Installation' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}">
                            ${item.category}
                        </span>
                    </td>
                    <td class="px-6 py-4 text-gray-500">
                        <div class="flex items-center gap-1 text-xs">
                             <i data-lucide="clock" class="w-3 h-3"></i> ${formatDate(item.date)}
                        </div>
                    </td>
                    <td class="px-6 py-4 text-right">
                        <div class="flex items-center justify-end gap-2 text-gray-400 group-hover:text-gray-600">
                            <button onclick="window.editImage('${item.id}')" class="p-1 hover:text-blue-600 transition-colors" title="Edit">
                                <i data-lucide="edit-2" class="w-4 h-4"></i>
                            </button>
                            <button onclick="window.deleteImage('${item.id}')" class="p-1 hover:text-red-500 transition-colors" title="Delete">
                                <i data-lucide="trash-2" class="w-4 h-4"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            `).join('');

            if (window.lucide) window.lucide.createIcons();
        }

        updateBulkActionState();
    };

    // Bulk Interactions
    const updateBulkActionState = () => {
        const checkboxes = document.querySelectorAll('.row-checkbox');
        const checked = Array.from(checkboxes).filter(cb => cb.checked);

        if (checked.length > 0) {
            deleteSelectedBtn.classList.remove('hidden');
            deleteSelectedBtn.innerHTML = `<i data-lucide="trash-2" class="w-4 h-4 text-red-500"></i> Delete (${checked.length})`;
            if (window.lucide) window.lucide.createIcons();
        } else {
            deleteSelectedBtn.classList.add('hidden');
        }
    };

    selectAllCheckbox.addEventListener('change', (e) => {
        const checkboxes = document.querySelectorAll('.row-checkbox');
        checkboxes.forEach(cb => cb.checked = e.target.checked);
        updateBulkActionState();
    });

    tableBody.addEventListener('change', (e) => {
        if (e.target.classList.contains('row-checkbox')) {
            updateBulkActionState();
            const allCheckboxes = document.querySelectorAll('.row-checkbox');
            const allChecked = Array.from(allCheckboxes).every(cb => cb.checked);
            selectAllCheckbox.checked = allChecked;
        }
    });

    deleteSelectedBtn.addEventListener('click', () => {
        const checkboxes = document.querySelectorAll('.row-checkbox:checked');
        const idsToDelete = Array.from(checkboxes).map(cb => cb.value);

        if (confirm(`Are you sure you want to delete ${idsToDelete.length} items?`)) {
            galleryData = galleryData.filter(item => !idsToDelete.includes(item.id));
            save();
            selectAllCheckbox.checked = false;
        }
    });

    const openModal = (isEdit = false, id = null) => {
        modal.classList.remove('hidden');
        if (isEdit) {
            const item = galleryData.find(d => d.id === id);
            document.getElementById('modal-title').innerText = 'Edit Record';
            document.getElementById('image-id').value = item.id;

            // Set current URL logic
            currentEditUrl = item.url;
            updatePreview(item.url, 'Current Image');

            document.getElementById('image-title').value = item.title;
            document.getElementById('image-category').value = item.category;
        } else {
            document.getElementById('modal-title').innerText = 'New Record';
            form.reset();
            document.getElementById('image-id').value = '';
            currentEditUrl = '';
            updatePreview(null);
        }
    };

    const closeModal = () => {
        modal.classList.add('hidden');
        form.reset();
        updatePreview(null);
    };

    addBtn.addEventListener('click', () => openModal(false));
    closeBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = document.getElementById('image-id').value;
        const title = document.getElementById('image-title').value;
        const category = document.getElementById('image-category').value;
        const date = new Date().toISOString();

        let url = currentEditUrl;

        // Check if new file uploaded
        if (fileInput.files.length > 0) {
            try {
                url = await readFile(fileInput.files[0]);
            } catch (err) {
                console.error("Error reading file", err);
                alert("Failed to read file");
                return;
            }
        } else if (!url && !id) {
            alert("Please upload an image");
            return;
        }

        if (id) {
            const index = galleryData.findIndex(item => item.id === id);
            if (index !== -1) {
                galleryData[index] = { ...galleryData[index], url, title, category };
            }
        } else {
            const newId = (galleryData.length > 0 ? Math.max(...galleryData.map(i => parseInt(i.id))) + 1 : 1).toString();
            galleryData.push({ id: newId, url, title, category, date });
        }
        save();
        closeModal();
    });

    searchInput.addEventListener('input', render);
    filterSelect.addEventListener('change', render);

    window.editImage = (id) => openModal(true, id);
    window.deleteImage = (id) => {
        if (confirm('Are you sure you want to delete this record?')) {
            galleryData = galleryData.filter(item => item.id !== id);
            save();
        }
    };

    render();
};

// ==========================================
// 4. About Us Component (Client Reviews)
// ==========================================
const renderAbout = () => {
    return `
    <div class="p-6 bg-gray-50 min-h-screen font-sans">
        <!-- Header -->
        <div class="mb-8">
            <h1 class="text-3xl font-bold text-gray-800">About Us <span class="text-gray-400 text-xl font-normal">Manager</span></h1>
            <div class="flex items-center text-sm text-gray-500 mt-1">
                <i data-lucide="home" class="w-4 h-4 mr-1"></i> <span class="mx-1">/</span> About Us
            </div>
        </div>

        <!-- Content Sections -->
        <div class="space-y-8">
            
            <!-- Section: Client Reviews -->
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div class="p-6 border-b border-gray-100 flex items-center justify-between">
                    <div>
                        <h2 class="text-lg font-bold text-gray-800">Client Reviews</h2>
                        <p class="text-sm text-gray-500">Manage what your clients say about you.</p>
                    </div>
                    <button id="add-review-btn" class="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded shadow-sm text-sm font-medium flex items-center gap-2 transition-colors">
                        <i data-lucide="plus" class="w-4 h-4"></i> New Review
                    </button>
                </div>
                
                <div class="p-6 bg-gray-50/50">
                    <div id="reviews-grid" class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <!-- Reviews injected here -->
                    </div>
                    
                    <!-- Empty State -->
                    <div id="reviews-empty" class="hidden flex flex-col items-center justify-center py-12 text-gray-400">
                        <i data-lucide="message-square" class="w-12 h-12 mb-3 text-gray-300"></i>
                        <p class="text-sm">No reviews added yet.</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Review Modal -->
        <div id="review-modal" class="fixed inset-0 bg-black/50 hidden flex items-center justify-center z-50 backdrop-blur-sm transition-opacity">
            <div class="bg-white rounded-lg shadow-xl w-full max-w-lg transform transition-all scale-100 animate-in fade-in zoom-in duration-200">
                <div class="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50 rounded-t-lg">
                    <h3 id="review-modal-title" class="text-lg font-bold text-gray-800">Add New Review</h3>
                    <button id="close-review-modal" class="text-gray-400 hover:text-red-500 transition-colors">
                        <i data-lucide="x" class="w-5 h-5"></i>
                    </button>
                </div>
                
                <form id="review-form" class="p-6 space-y-5">
                    <input type="hidden" id="review-id">
                    
                    <!-- Image Upload -->
                    <div>
                        <label class="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Client Photo</label>
                        <div class="flex items-start gap-4">
                            <div class="w-24 h-24 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center overflow-hidden shrink-0 relative group">
                                <img id="review-preview" src="" alt="" class="w-full h-full object-cover hidden">
                                <div id="review-placeholder" class="text-gray-400 flex flex-col items-center">
                                    <i data-lucide="user" class="w-8 h-8 opacity-50"></i>
                                </div>
                            </div>
                            <div class="flex-1">
                                <label for="review-file" class="cursor-pointer inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">
                                    <i data-lucide="upload" class="w-4 h-4 mr-2"></i> Upload Photo
                                    <input id="review-file" type="file" accept="image/*" class="sr-only">
                                </label>
                                <p class="mt-2 text-xs text-gray-500">Square image recommended. JPG, PNG up to 2MB.</p>
                            </div>
                        </div>
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Client Name</label>
                            <input type="text" id="review-name" required placeholder="e.g. David Brown" 
                                class="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-colors">
                        </div>
                        <div>
                            <label class="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Role / Title</label>
                            <input type="text" id="review-role" required placeholder="e.g. Verified Client" 
                                class="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-colors">
                        </div>
                    </div>

                    <div>
                        <label class="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Testimonial</label>
                        <textarea id="review-text" required rows="4" placeholder="What did they say?" 
                            class="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-colors resize-none"></textarea>
                    </div>

                    <div class="pt-4 flex justify-end gap-3 border-t border-gray-100 mt-4">
                        <button type="button" id="cancel-review-btn" class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded text-sm font-medium transition-colors">Cancel</button>
                        <button type="submit" class="px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded text-sm font-bold shadow-sm shadow-emerald-200 transition-all transform active:scale-95">Save Review</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    `;
};

const setupAboutInteractions = () => {
    const grid = document.getElementById('reviews-grid');
    const emptyState = document.getElementById('reviews-empty');
    const modal = document.getElementById('review-modal');
    const form = document.getElementById('review-form');
    const addBtn = document.getElementById('add-review-btn');
    const closeBtn = document.getElementById('close-review-modal');
    const cancelBtn = document.getElementById('cancel-review-btn');

    // Inputs
    const fileInput = document.getElementById('review-file');
    const previewImg = document.getElementById('review-preview');
    const placeholder = document.getElementById('review-placeholder');

    // State
    let reviewsData = JSON.parse(localStorage.getItem('clientReviews')) || [
        {
            id: '1',
            name: 'David Brown',
            role: 'Verified Client',
            text: 'They helped us scale our MVP into a full-fledged product. Their technical guidance was invaluable.',
            image: '' // Empty string can use a default placeholder if needed logic
        }
    ];

    let currentEditImage = '';

    // Save Helper
    const save = () => {
        try {
            localStorage.setItem('clientReviews', JSON.stringify(reviewsData));
            render();
        } catch (e) {
            alert('Storage Link Error: Image size might be too big.');
        }
    };

    // File Reading
    const readFile = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    // Preview Helper
    const setPreview = (src) => {
        if (src) {
            previewImg.src = src;
            previewImg.classList.remove('hidden');
            placeholder.classList.add('hidden');
        } else {
            previewImg.src = '';
            previewImg.classList.add('hidden');
            placeholder.classList.remove('hidden');
        }
    };

    fileInput.addEventListener('change', async (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            try {
                const url = await readFile(file);
                setPreview(url);
            } catch (err) {
                console.error(err);
            }
        }
    });

    // Render Grid
    const render = () => {
        if (reviewsData.length === 0) {
            grid.innerHTML = '';
            emptyState.classList.remove('hidden');
        } else {
            emptyState.classList.add('hidden');
            grid.innerHTML = reviewsData.map(review => `
                <div class="bg-white p-6 rounded-lg border border-gray-100 shadow-sm flex flex-col md:flex-row gap-6 relative group hover:shadow-md transition-shadow">
                    <!-- Actions -->
                    <div class="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                         <button onclick="window.editReview('${review.id}')" class="p-1.5 bg-white border border-gray-200 rounded text-gray-500 hover:text-blue-600 shadow-sm">
                            <i data-lucide="edit-2" class="w-3 h-3"></i>
                        </button>
                        <button onclick="window.deleteReview('${review.id}')" class="p-1.5 bg-white border border-gray-200 rounded text-gray-500 hover:text-red-500 shadow-sm">
                            <i data-lucide="trash-2" class="w-3 h-3"></i>
                        </button>
                    </div>

                    <!-- Image Side (Left) -->
                    <div class="w-full md:w-1/3 shrink-0">
                        <div class="aspect-square rounded-lg bg-gray-100 overflow-hidden relative">
                             ${review.image
                    ? `<img src="${review.image}" class="w-full h-full object-cover" alt="${review.name}">`
                    : `<div class="w-full h-full flex items-center justify-center text-gray-300"><i data-lucide="user" class="w-12 h-12"></i></div>`
                }
                        </div>
                    </div>

                    <!-- Content Side (Right) -->
                    <div class="flex-1 flex flex-col justify-center text-center md:text-left">
                        <h3 class="text-xl font-bold text-gray-900">${review.name}</h3>
                        <p class="text-xs font-bold text-blue-500 tracking-wider uppercase mb-3">${review.role}</p>
                        <p class="text-gray-600 italic text-sm leading-relaxed">"${review.text}"</p>
                    </div>
                </div>
            `).join('');

            if (window.lucide) window.lucide.createIcons();
        }
    };

    // Modal Logic
    const openModal = (isEdit = false, id = null) => {
        modal.classList.remove('hidden');
        if (isEdit) {
            const item = reviewsData.find(r => r.id === id);
            document.getElementById('review-modal-title').innerText = 'Edit Review';
            document.getElementById('review-id').value = item.id;
            document.getElementById('review-name').value = item.name;
            document.getElementById('review-role').value = item.role;
            document.getElementById('review-text').value = item.text;

            currentEditImage = item.image;
            setPreview(item.image);
        } else {
            document.getElementById('review-modal-title').innerText = 'New Review';
            form.reset();
            document.getElementById('review-id').value = '';
            currentEditImage = '';
            setPreview(null);
        }
    };

    const closeModal = () => {
        modal.classList.add('hidden');
        form.reset();
        setPreview(null);
    };

    addBtn.addEventListener('click', () => openModal(false));
    closeBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = document.getElementById('review-id').value;
        const name = document.getElementById('review-name').value;
        const role = document.getElementById('review-role').value;
        const text = document.getElementById('review-text').value;

        let image = currentEditImage;

        if (fileInput.files.length > 0) {
            try {
                image = await readFile(fileInput.files[0]);
            } catch (err) {
                console.error(err);
                return;
            }
        }

        if (id) {
            const index = reviewsData.findIndex(r => r.id === id);
            if (index !== -1) reviewsData[index] = { ...reviewsData[index], name, role, text, image };
        } else {
            const newId = Date.now().toString();
            reviewsData.push({ id: newId, name, role, text, image });
        }

        save();
        closeModal();
    });

    // Global Handlers
    window.editReview = (id) => openModal(true, id);
    window.deleteReview = (id) => {
        if (confirm('Delete this review?')) {
            reviewsData = reviewsData.filter(r => r.id !== id);
            save();
        }
    };

    render();
};

// ==========================================
// 5. Services Component
// ==========================================

// State for Services (Global to keep state between renders if needed)
let servicesState = {
    view: 'list', // 'list' or 'detail'
    currentServiceId: null
};

const renderServices = () => {
    // We only render the container here; content is dynamic based on state in setupServicesInteractions
    return `
    <div id="services-container" class="p-6 bg-gray-50 min-h-screen font-sans">
        <!-- Injected via JS -->
    </div>
    <!-- Service Modal (Hidden) -->
    <div id="service-modal" class="fixed inset-0 bg-black/50 hidden flex items-center justify-center z-50 backdrop-blur-sm overflow-y-auto py-10">
        <div class="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6 relative">
            <button id="close-service-modal" class="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                <i data-lucide="x" class="w-5 h-5"></i>
            </button>
            <h3 class="text-xl font-bold mb-6 text-gray-800">Add New Service</h3>
            <form id="service-form" class="space-y-6">
                <input type="hidden" id="service-id">
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <!-- Column 1: Basic Info -->
                    <div class="space-y-4">
                        <h4 class="text-sm font-bold text-blue-600 uppercase tracking-wide border-b pb-2">Basic Info</h4>
                        <div>
                            <label class="block text-xs font-bold text-gray-700 uppercase mb-1">Service Thumbnail</label>
                            <input type="file" id="service-thumb-input" class="w-full text-sm block w-full text-slate-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-full file:border-0
                                file:text-sm file:font-semibold
                                file:bg-blue-50 file:text-blue-700
                                hover:file:bg-blue-100" accept="image/*">
                        </div>
                        <div>
                            <label class="block text-xs font-bold text-gray-700 uppercase mb-1">Service Title</label>
                            <input type="text" id="service-title" placeholder="e.g. Faucet Repair" class="w-full border border-gray-300 p-2 rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none" required>
                        </div>
                        <div>
                            <label class="block text-xs font-bold text-gray-700 uppercase mb-1">Short Description</label>
                            <textarea id="service-desc" placeholder="Brief summary for the card..." class="w-full border border-gray-300 p-2 rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none" rows="3"></textarea>
                        </div>
                    </div>

                    <!-- Column 2: About & Video -->
                    <div class="space-y-4">
                        <h4 class="text-sm font-bold text-blue-600 uppercase tracking-wide border-b pb-2">About & Details</h4>
                        <div>
                            <label class="block text-xs font-bold text-gray-700 uppercase mb-1">About Section Title</label>
                            <input type="text" id="new-about-title" placeholder="e.g. About Faucet Repairs" class="w-full border border-gray-300 p-2 rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none">
                        </div>
                        <div>
                            <label class="block text-xs font-bold text-gray-700 uppercase mb-1">Introduction</label>
                            <textarea id="new-about-intro" placeholder="Detailed introduction..." class="w-full border border-gray-300 p-2 rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none" rows="2"></textarea>
                        </div>
                        <div>
                            <label class="block text-xs font-bold text-gray-700 uppercase mb-1">Features (One per line)</label>
                            <textarea id="new-about-features" placeholder="- Feature 1&#10;- Feature 2" class="w-full border border-gray-300 p-2 rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none" rows="2"></textarea>
                        </div>
                         <div>
                            <label class="block text-xs font-bold text-gray-700 uppercase mb-1">Add Initial Video (Thumbnail)</label>
                            <input type="file" id="new-video-input" class="w-full text-sm block w-full text-slate-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-full file:border-0
                                file:text-sm file:font-semibold
                                file:bg-blue-50 file:text-blue-700
                                hover:file:bg-blue-100" accept="image/*">
                        </div>
                    </div>
                </div>

                <div class="flex justify-end gap-3 pt-4 border-t">
                    <button type="button" id="cancel-service-modal" class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded text-sm font-medium transition-colors">Cancel</button>
                    <button type="submit" class="px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded text-sm font-bold shadow-sm transition-transform active:scale-95">Save Service</button>
                </div>
            </form>
        </div>
    </div>
    `;
};

const setupServicesInteractions = () => {
    const container = document.getElementById('services-container');
    const modal = document.getElementById('service-modal');
    const form = document.getElementById('service-form');
    let servicesData = JSON.parse(localStorage.getItem('servicesData')) || [];

    // Initial Seed if empty
    if (servicesData.length === 0) {
        servicesData = [
            {
                id: '1',
                title: 'Faucet & Leak Repairs',
                description: 'Stop wasting water and money. Our experts quickly identify and fix leaks.',
                thumbnail: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?q=80&w=2670&auto=format&fit=crop',
                about: {
                    title: 'About Faucet Repairs',
                    intro: 'A dripping faucet can waste gallons of water. Our team uses advanced technology.',
                    features: ['Faucet repair and replacement', 'Advanced Leak Detection']
                },
                videos: []
            }
        ];
        localStorage.setItem('servicesData', JSON.stringify(servicesData));
    }

    // Helper: Read File
    const readFile = (file) => new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(file);
    });

    const save = () => {
        localStorage.setItem('servicesData', JSON.stringify(servicesData));
        render();
    };

    // --- RENDERERS ---

    const renderList = () => {
        return `
        <div class="mb-8 flex justify-between items-center">
            <div>
                 <h1 class="text-3xl font-bold text-gray-800">Services <span class="text-gray-400 text-xl font-normal">Manager</span></h1>
                 <p class="text-sm text-gray-500 mt-1">Manage your service offerings.</p>
            </div>
            <button id="add-service-btn" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow-sm text-sm font-medium flex items-center gap-2">
                <i data-lucide="plus" class="w-4 h-4"></i> Add Service
            </button>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            ${servicesData.map(service => `
                <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow group">
                    <div class="h-48 bg-gray-100 relative">
                        <img src="${service.thumbnail || ''}" class="w-full h-full object-cover">
                        <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                             <button onclick="window.deleteService('${service.id}')" class="bg-red-500 text-white p-2 rounded-full hover:bg-red-600"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
                        </div>
                    </div>
                    <div class="p-6 text-center">
                        <h3 class="text-xl font-bold text-gray-900 mb-2">${service.title}</h3>
                        <p class="text-sm text-gray-600 line-clamp-2 mb-4">${service.description}</p>
                        <button onclick="window.viewService('${service.id}')" class="text-blue-600 font-semibold text-sm uppercase tracking-wide hover:underline cursor-pointer">
                            View Service &rarr;
                        </button>
                    </div>
                </div>
            `).join('')}
        </div>
        `;
    };

    const renderDetail = () => {
        const service = servicesData.find(s => s.id === servicesState.currentServiceId);
        if (!service) return 'Service not found';

        return `
        <div class="mb-6">
            <button id="back-to-list" class="text-gray-500 hover:text-gray-800 flex items-center gap-1 text-sm font-medium mb-4">
                <i data-lucide="arrow-left" class="w-4 h-4"></i> Back to Services
            </button>
            <div class="flex items-center justify-between">
                <div>
                     <h1 class="text-3xl font-bold text-gray-800">Edit Service</h1>
                     <p class="text-sm text-gray-500">Update service details and content.</p>
                </div>
                <button id="save-service-changes-btn" class="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded shadow-sm text-sm font-bold flex items-center gap-2">
                    <i data-lucide="save" class="w-4 h-4"></i> Save All Changes
                </button>
            </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Left Column: Content -->
            <div class="lg:col-span-2 space-y-6">
                
                <!-- Card 1: Basic Info -->
                <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h2 class="text-lg font-bold text-gray-800 mb-4 pb-2 border-b border-gray-100 table w-full">Basic Information</h2>
                    <div class="space-y-4">
                        <div class="flex items-start gap-4">
                            <div class="w-24 h-24 bg-gray-100 rounded-lg shrink-0 overflow-hidden relative group border border-gray-200">
                                <img src="${service.thumbnail || ''}" id="edit-thumb-preview" class="w-full h-full object-cover">
                                <label class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity">
                                    <i data-lucide="upload" class="w-6 h-6 text-white"></i>
                                    <input type="file" id="edit-thumb-input" class="hidden" accept="image/*">
                                </label>
                            </div>
                            <div class="flex-1 space-y-4">
                                <div>
                                    <label class="block text-xs font-bold text-gray-700 uppercase mb-1">Service Title</label>
                                    <input type="text" id="edit-service-title" value="${service.title}" class="w-full border border-gray-300 rounded p-2 text-sm focus:ring-1 focus:ring-blue-500 outline-none">
                                </div>
                            </div>
                        </div>
                        <div>
                            <label class="block text-xs font-bold text-gray-700 uppercase mb-1">Short Description</label>
                            <textarea id="edit-service-desc" class="w-full border border-gray-300 rounded p-2 text-sm focus:ring-1 focus:ring-blue-500 outline-none" rows="2">${service.description}</textarea>
                        </div>
                    </div>
                </div>

                <!-- Card 2: About Content -->
                <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h2 class="text-lg font-bold text-gray-800 mb-4 pb-2 border-b border-gray-100 table w-full">About Content</h2>
                    <div class="space-y-4">
                        <div>
                            <label class="block text-xs font-bold text-gray-700 uppercase mb-1">Section Title</label>
                            <input type="text" id="about-title" value="${service.about?.title || ''}" class="w-full border border-gray-300 rounded p-2 text-sm focus:ring-1 focus:ring-blue-500 outline-none">
                        </div>
                        <div>
                            <label class="block text-xs font-bold text-gray-700 uppercase mb-1">Introduction</label>
                            <textarea id="about-intro" class="w-full border border-gray-300 rounded p-2 text-sm focus:ring-1 focus:ring-blue-500 outline-none" rows="4">${service.about?.intro || ''}</textarea>
                        </div>
                        <div>
                            <label class="block text-xs font-bold text-gray-700 uppercase mb-1">Features (One per line)</label>
                             <textarea id="about-features" class="w-full border border-gray-300 rounded p-2 text-sm focus:ring-1 focus:ring-blue-500 outline-none" rows="4" placeholder="Feature 1&#10;Feature 2">${(service.about?.features || []).join('\n')}</textarea>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Right Column: Videos -->
            <div class="lg:col-span-1 space-y-6">
                <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div class="flex justify-between items-center mb-4">
                         <h2 class="text-lg font-bold text-gray-800">Videos</h2>
                    </div>
                    
                     <div class="space-y-4">
                        <div class="border-2 border-dashed border-gray-200 rounded-lg p-4 text-center hover:border-blue-400 transition-colors">
                            <label class="cursor-pointer block">
                                <i data-lucide="video" class="w-8 h-8 mx-auto text-gray-400 mb-2"></i>
                                <span class="text-sm text-blue-600 font-medium">Add Video Thumbnail</span>
                                <input type="file" id="video-upload" accept="image/*" class="hidden">
                            </label>
                        </div>

                        <div class="grid grid-cols-2 gap-3" id="videos-grid">
                            ${(service.videos || []).map(v => `
                                <div class="relative group rounded-lg overflow-hidden aspect-[3/4]">
                                    <img src="${v.thumbnail}" class="w-full h-full object-cover">
                                    <div class="absolute inset-0 bg-black/20 flex items-center justify-center">
                                         <div class="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center">
                                            <i data-lucide="play" class="w-4 h-4 text-blue-600 fill-current ml-0.5"></i>
                                         </div>
                                    </div>
                                    <button onclick="window.deleteVideo('${v.id}')" class="absolute top-1 right-1 bg-red-500 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                        <i data-lucide="trash-2" class="w-3 h-3"></i>
                                    </button>
                                </div>
                            `).join('')}
                        </div>
                     </div>
                </div>
            </div>
        </div>
        `;
    };

    const render = () => {
        if (servicesState.view === 'list') {
            container.innerHTML = renderList();

            // Attach List Listeners
            document.getElementById('add-service-btn').addEventListener('click', () => {
                modal.classList.remove('hidden');
                form.reset();
            });
        } else {
            container.innerHTML = renderDetail();

            // Attach Detail Listeners
            document.getElementById('back-to-list').addEventListener('click', () => {
                servicesState.view = 'list';
                servicesState.currentServiceId = null;
                render();
            });

            // Handle Thumbnail Edit Preview
            const editThumbInput = document.getElementById('edit-thumb-input');
            const editThumbPreview = document.getElementById('edit-thumb-preview');

            editThumbInput.addEventListener('change', async (e) => {
                if (e.target.files[0]) {
                    const url = await readFile(e.target.files[0]);
                    editThumbPreview.src = url;
                }
            });

            document.getElementById('save-service-changes-btn').addEventListener('click', async () => {
                const sIndex = servicesData.findIndex(s => s.id === servicesState.currentServiceId);
                if (sIndex > -1) {
                    // Update Core Info
                    servicesData[sIndex].title = document.getElementById('edit-service-title').value;
                    servicesData[sIndex].description = document.getElementById('edit-service-desc').value;

                    // Update Thumbnail if changed
                    if (editThumbInput.files[0]) {
                        servicesData[sIndex].thumbnail = await readFile(editThumbInput.files[0]);
                    }

                    // Update About Information
                    servicesData[sIndex].about = {
                        title: document.getElementById('about-title').value,
                        intro: document.getElementById('about-intro').value,
                        features: document.getElementById('about-features').value.split('\n').filter(l => l.trim())
                    };

                    save();
                    alert('All changes saved successfully!');
                }
            });

            document.getElementById('video-upload').addEventListener('change', async (e) => {
                if (e.target.files[0]) {
                    const thumb = await readFile(e.target.files[0]);
                    const sIndex = servicesData.findIndex(s => s.id === servicesState.currentServiceId);
                    if (!servicesData[sIndex].videos) servicesData[sIndex].videos = [];

                    servicesData[sIndex].videos.push({
                        id: Date.now().toString(),
                        thumbnail: thumb
                    });
                    save();
                }
            });
        }
        if (window.lucide) window.lucide.createIcons();
    };

    // --- GLOBAL ACTIONS ---

    window.viewService = (id) => {
        servicesState.currentServiceId = id;
        servicesState.view = 'detail';
        render();
    };

    window.deleteService = (id) => {
        if (confirm('Delete this service?')) {
            servicesData = servicesData.filter(s => s.id !== id);
            save();
        }
    };

    window.deleteVideo = (vidId) => {
        const sIndex = servicesData.findIndex(s => s.id === servicesState.currentServiceId);
        if (confirm('Remove video?')) {
            servicesData[sIndex].videos = servicesData[sIndex].videos.filter(v => v.id !== vidId);
            save();
        }
    }

    // Modal Form Logic
    const closeServiceModal = () => modal.classList.add('hidden');
    document.getElementById('close-service-modal').addEventListener('click', closeServiceModal);
    document.getElementById('cancel-service-modal').addEventListener('click', closeServiceModal);

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Basic Info
        const title = document.getElementById('service-title').value;
        const desc = document.getElementById('service-desc').value;
        const thumbFile = document.getElementById('service-thumb-input').files[0];

        // About Info
        const aboutTitle = document.getElementById('new-about-title').value;
        const aboutIntro = document.getElementById('new-about-intro').value;
        const aboutFeatures = document.getElementById('new-about-features').value;

        // Video
        const videoFile = document.getElementById('new-video-input').files[0];

        // Process Files
        let thumbUrl = '';
        if (thumbFile) thumbUrl = await readFile(thumbFile);
        else thumbUrl = 'https://via.placeholder.com/400x300?text=Service';

        const newVideos = [];
        if (videoFile) {
            const videoThumb = await readFile(videoFile);
            newVideos.push({
                id: Date.now().toString() + '_vid',
                thumbnail: videoThumb
            });
        }

        servicesData.push({
            id: Date.now().toString(),
            title,
            description: desc,
            thumbnail: thumbUrl,
            about: {
                title: aboutTitle || `About ${title}`,
                intro: aboutIntro || '',
                features: aboutFeatures ? aboutFeatures.split('\n').filter(l => l.trim()) : []
            },
            videos: newVideos
        });

        save();
        closeServiceModal();
    });

    render();
};

// ==========================================
// 6. Main App Logic
// ==========================================

// Authentication Check
if (!localStorage.getItem('authToken')) {
    window.location.href = 'src/pages/hero/login page/login.html';
}

document.addEventListener('DOMContentLoaded', () => {
    // 1. Inject Sidebar
    document.getElementById('sidebar-container').innerHTML = renderSidebar();

    // 2. Load page based on URL param or default to 'dashboard'
    const urlParams = new URLSearchParams(window.location.search);
    const page = urlParams.get('page') || 'dashboard';
    loadPage(page);

    if (window.lucide) window.lucide.createIcons();
    setupNavigation();
});

window.loadPage = (pageName) => {
    const app = document.getElementById('app');
    const pageTitle = document.getElementById('page-title');

    // Update the switch case
    switch (pageName) {
        case 'dashboard':
            app.innerHTML = renderDashboard();
            pageTitle.innerText = 'Dashboard Overview';
            break;
        case 'home':
            app.innerHTML = `<div class="p-4 text-gray-500">Home Manager (Coming Soon)</div>`;
            pageTitle.innerText = 'Home Page Manager';
            break;
        case 'about':
            app.innerHTML = renderAbout();
            pageTitle.innerText = 'About Us Manager';
            setupAboutInteractions();
            break;
        case 'services':
            app.innerHTML = renderServices();
            pageTitle.innerText = 'Services Manager';
            setupServicesInteractions();
            break;
        case 'gallery':
            app.innerHTML = renderGallery();
            pageTitle.innerText = 'Gallery Manager';
            setupGalleryInteractions();
            break;
        case 'contact':
            app.innerHTML = `<div class="p-4 text-gray-500">Contact Manager</div>`;
            pageTitle.innerText = 'Contact Manager';
            break;
        default:
            app.innerHTML = renderDashboard();
    }

    if (window.lucide) window.lucide.createIcons();

    if (pageName === 'home') setupHomeInteractions();

    if (window.innerWidth < 1024) toggleSidebar(false);
};

function setupNavigation() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const closeBtn = document.getElementById('close-sidebar');

    window.toggleSidebar = (show) => {
        if (show) {
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

// ==========================================
// 8. Auth Helper
// ==========================================
window.logout = () => {
    if (confirm('Are you sure you want to log out?')) {
        localStorage.removeItem('authToken');
        window.location.href = 'src/pages/hero/login page/login.html';
    }
};