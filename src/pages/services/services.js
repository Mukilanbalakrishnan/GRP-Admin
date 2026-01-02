// import { renderservices } from './pages/services/services.js';

export function renderservices() {
    const container = document.getElementById('services-container');
    const modal = document.getElementById('service-modal');
    const form = document.getElementById('service-form');

    if (!container || !modal || !form) {
        console.warn('Services page not mounted yet');
        return;
    }

    lucide.createIcons();

    let servicesData = JSON.parse(localStorage.getItem('servicesData')) || [];

    let servicesState = {
        view: 'list',
        currentServiceId: null
    };

    // Seed
    if (servicesData.length === 0) {
        servicesData = [{
            id: '1',
            title: 'Faucet & Leak Repairs',
            description: 'Stop wasting water and money.',
            thumbnail: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780',
            about: {
                title: 'About Faucet Repairs',
                intro: 'A dripping faucet can waste gallons.',
                features: ['Repair', 'Detection']
            },
            videos: []
        }];
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

            editThumbInput?.addEventListener('change', async (e) => {
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
    };

    

    // Modal Form Logic
    const closeServiceModal = () => modal.classList.add('hidden');
    const closeBtn = document.getElementById('close-service-modal');
    const cancelBtn = document.getElementById('cancel-service-modal');

    closeBtn && closeBtn.addEventListener('click', () => modal.classList.add('hidden'));
cancelBtn && cancelBtn.addEventListener('click', () => modal.classList.add('hidden'));

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
}
window.loadPage = (pageName) => {
    const app = document.getElementById('app');
    app.innerHTML = '';

    switch (pageName) {
        case 'services':
            renderServicesPage();
            break;
    }
};

