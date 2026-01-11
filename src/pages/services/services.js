// import { renderservices } from './pages/services/services.js';


const API = {
  LIST: "http://localhost/GRP-Backend/api/main_services/service-list.php",
  CREATE: "http://localhost/GRP-Backend/api/main_services/service-create.php",
  UPDATE: "http://localhost/GRP-Backend/api/main_services/service-update.php",
  DELETE: "http://localhost/GRP-Backend/api/main_services/service-delete.php"
};

const BACKEND_BASE = "http://localhost/GRP-Backend/";


export function renderservices(){
    



    // Initialize Icons
    lucide.createIcons();

    const servicesGrid = document.getElementById('services-grid');
    const emptyState = document.getElementById('services-empty');
    const modal = document.getElementById('service-modal');
    const form = document.getElementById('service-form');
    const addBtn = document.getElementById('add-service-btn');
    const closeBtn = document.getElementById('close-modal-btn');
    const cancelBtn = document.getElementById('cancel-btn');

    // Inputs
    const fileInput = document.getElementById('image-file');
    const previewSection = document.getElementById('preview-section');
    const previewImage = document.getElementById('image-preview');
    const removeImageBtn = document.getElementById('remove-image-btn');
    const fileNameDisplay = document.getElementById('file-name-display');

    // Video Inputs & Previews
    const videoInputs = [];

for (let i = 1; i <= 4; i++) {
  const input = document.getElementById(`video-url-${i}`);
  const preview = document.getElementById(`preview-video-${i}`);

  if (input && preview) {
    videoInputs.push({ input, preview });
  }
}


    // State
    let servicesData = [];


    let currentEditThumbnail = '';

    // --- Helper Functions ---

    

    const readFile = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    // YouTube ID Extractor
    const getYouTubeId = (url) => {
        if (!url) return null;
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    // Update Video Preview
    const updateVideoPreview = (inputObj) => {
        const url = inputObj.input.value;
        const videoId = getYouTubeId(url);

        if (videoId) {
            inputObj.preview.src = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
            inputObj.preview.classList.remove('hidden');
        } else {
            inputObj.preview.src = '';
            inputObj.preview.classList.add('hidden');
        }
    };

    // Listeners for Video Inputs
    videoInputs.forEach(obj => {
  obj.input.addEventListener('input', () => {
    const url = obj.input.value.trim();

    if (!url) {
      obj.preview.classList.add('hidden');
      return;
    }

    const match = url.match(/(?:v=|youtu\.be\/|shorts\/)([^?&/]+)/);

    if (!match) {
      obj.preview.classList.add('hidden');
      return;
    }

    obj.preview.src = `https://img.youtube.com/vi/${match[1]}/mqdefault.jpg`;
    obj.preview.classList.remove('hidden');
  });
});



    // --- Image Handling ---

    const updateImagePreview = (src, name) => {
        if (src) {
            previewImage.src = src;
            previewSection.classList.remove('hidden');
            fileNameDisplay.innerText = name || 'Image Selected';
            fileNameDisplay.classList.add('text-blue-600');
        } else {
            previewSection.classList.add('hidden');
            fileNameDisplay.innerText = 'No file chosen';
            fileNameDisplay.classList.remove('text-blue-600');
            fileInput.value = '';
        }
    };

    if (fileInput) {
  fileInput.addEventListener('change', async (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            try {
                const base64 = await readFile(file);
                updateImagePreview(base64, file.name);
            } catch (err) {
                console.error(err);
                alert("Error reading file");
            }
        }
    });

    if (removeImageBtn) {
  removeImageBtn.addEventListener('click', () => {
    updateImagePreview(null);
    currentEditThumbnail = '';
  });
}

if (addBtn) {
  addBtn.addEventListener('click', () => openModal(false));
}



async function fetchServices() {
    try {
        const res = await fetch(API.LIST);
        const result = await res.json();

        if (!result.status) return;

        servicesData = result.data.map(service => ({
    id: service.id,
    title: service.title,
    shortDesc: service.short_desc,
    thumbnail: service.thumbnail
        ? BACKEND_BASE + service.thumbnail
        : null,
    aboutTitle: service.about_title,
    aboutIntro: service.about_intro,
    features: service.features || [],
    videoUrls: service.video_urls || []
}));


        render(); // 👈 uses YOUR existing render()
    } catch (err) {
        console.error("Failed to load services", err);
    }
}

    // --- Rendering ---

    const render = () => {
        if (servicesData.length === 0) {
            servicesGrid.classList.add('hidden');
            emptyState.classList.remove('hidden');
        } else {
            emptyState.classList.add('hidden');
            servicesGrid.classList.remove('hidden');

            servicesGrid.innerHTML = servicesData.map(service => `
                <div class="bg-white rounded-xl shadow-sm hover:shadow-md border border-gray-100 overflow-hidden transition-all duration-300 group flex flex-col h-full">
                    <!-- Image Area -->
                    <div class="h-48 overflow-hidden relative bg-gray-100">
                        <img src="${service.thumbnail || 'https://via.placeholder.com/400x300?text=No+Image'}" 
                             alt="${service.title}" 
                             class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500">
                        
                        <div class="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <button onclick="window.editService('${service.id}')" class="bg-white/90 p-2 rounded-full shadow-sm hover:bg-blue-500 hover:text-white transition-colors text-gray-600">
                                <i data-lucide="edit-2" class="w-4 h-4"></i>
                            </button>
                            <button onclick="window.deleteService('${service.id}')" class="bg-white/90 p-2 rounded-full shadow-sm hover:bg-red-500 hover:text-white transition-colors text-gray-600">
                                <i data-lucide="trash-2" class="w-4 h-4"></i>
                            </button>
                        </div>
                    </div>

                    <!-- Content Area -->
                    <div class="p-5 flex-1 flex flex-col">
                        <div class="flex-1">
                            <h3 class="font-bold text-gray-800 text-lg mb-2 line-clamp-1">${service.title}</h3>
                            <p class="text-sm text-gray-500 leading-relaxed line-clamp-2 mb-4">${service.shortDesc || ''}</p>
                            
                            <!-- Mini Details badges -->
                            <div class="flex flex-wrap gap-2 mb-4">
                                ${(service.videoUrls && service.videoUrls.length > 0) || service.videoUrl ? `<span class="inline-flex items-center gap-1 px-2 py-1 bg-red-50 text-red-600 text-[10px] font-bold uppercase tracking-wider rounded">
                                    <i data-lucide="video" class="w-3 h-3"></i> ${service.videoUrls ? service.videoUrls.length : 1} Videos
                                </span>` : ''}
                                <span class="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-wider rounded">
                                    ${service.features ? service.features.length : 0} Features
                                </span>
                            </div>
                        </div>

                        <div class="pt-4 border-t border-gray-50 flex items-center justify-between text-xs text-gray-400">
                            <span>ID: ${service.id}</span>
                        </div>
                    </div>
                </div>
            `).join('');

            lucide.createIcons();
        }
    };

    const refresh = () => {
    fetchServices();
};


    // --- Modal & Form Handling ---

    const openModal = (isEdit = false, id = null) => {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling

        if (isEdit) {
            const service = servicesData.find(s => s.id === id);
            if (!service) return;

            document.getElementById('modal-title').innerText = 'Edit Service';
            document.getElementById('service-id').value = service.id;

            // Populate Fields
            document.getElementById('service-title').value = service.title;
            document.getElementById('service-short-desc').value = service.shortDesc;
            document.getElementById('about-title').value = service.aboutTitle || '';
            document.getElementById('about-intro').value = service.aboutIntro || '';
            document.getElementById('service-features').value = (service.features || []).join('\n');

            // Populate Video URLs
            const urls = service.videoUrls || (service.videoUrl ? [service.videoUrl] : []);

            videoInputs.forEach((obj, index) => {
                obj.input.value = urls[index] || '';
                updateVideoPreview(obj);
            });

            // Handle Image
            currentEditThumbnail = service.thumbnail;
            updateImagePreview(service.thumbnail, 'Current Service Image');

        } else {
            document.getElementById('modal-title').innerText = 'Add New Service';
            form.reset();
            document.getElementById('service-id').value = '';
            currentEditThumbnail = '';
            updateImagePreview(null);
        }
    };

    const closeModal = () => {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
        form.reset();
        updateImagePreview(null);
        videoInputs.forEach(obj => updateVideoPreview(obj));
    };

    // Global Window Functions (for inline onClick)
    window.editService = (id) => openModal(true, id);

    window.deleteService = async (id) => {
    if (!confirm('Are you sure you want to delete this service?')) return;

    await fetch(API.DELETE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
    });

    refresh();
};


    

    // Event Listeners
    addBtn.addEventListener('click', () => openModal(false));
    closeBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const id = document.getElementById('service-id').value;

    let thumbnail = currentEditThumbnail;
    if (fileInput.files.length > 0) {
        thumbnail = await readFile(fileInput.files[0]);
    }

    const payload = {
        id,
        title: document.getElementById('service-title').value,
        shortDesc: document.getElementById('service-short-desc').value,
        aboutTitle: document.getElementById('about-title').value,
        aboutIntro: document.getElementById('about-intro').value,
        features: document.getElementById('service-features')
            .value.split('\n').filter(Boolean),
        videoUrls: [
            document.getElementById('video-url-1').value,
            document.getElementById('video-url-2').value,
            document.getElementById('video-url-3').value,
            document.getElementById('video-url-4').value
        ].filter(Boolean),
        thumbnail
    };

    await fetch(id ? API.UPDATE : API.CREATE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    });

    closeModal();
    refresh();
});


    // Initial Render
    fetchServices();



}
}

renderservices();
