

export function renderabout(){

    
    const API_BASE_URL = window.ENV?.API_BASE_URL;

if (!API_BASE_URL) {
  console.error("❌ API_BASE_URL missing (env.js not loaded)");
}
        let heroState = {
    images: [] 
};



    // Initialize Icons
    lucide.createIcons();

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

    if (!grid || !emptyState || !modal || !form) {
    console.warn('About page not mounted yet');
    return;
}

    // State
    let reviewsData  =[
        
    ];

    let currentEditImage = '';

    // Save Helper
    

    // File Reading
    

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

    fileInput && fileInput.addEventListener('change', (e) => {
    if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];

        // 🔥 Local preview only (no upload yet)
        const previewUrl = URL.createObjectURL(file);
        setPreview(previewUrl);
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
  ? `<img 
        src="${API_BASE_URL}/${review.image}" 
        class="w-full h-full object-cover" 
        alt="${review.name}"
     />`
  : `<div class="w-full h-full flex items-center justify-center text-gray-300">
        <i data-lucide="user" class="w-12 h-12"></i>
     </div>`
}

                        </div>
                    </div>

                    <!-- Content Side (Right) -->
                    <div class="flex-1 flex flex-col justify-center text-center md:text-left">
                        <h3 class="text-xl font-bold text-gray-900">${review.name}</h3>
                        <p class="text-xs font-bold text-blue-500 tracking-wider uppercase mb-3">${review.role}</p>
                        <p class="text-gray-600 italic text-sm leading-relaxed">"${review.text}"</p>
                        
                        <div class="mt-4 flex items-center justify-center md:justify-start gap-1">
                            <i data-lucide="star" class="w-4 h-4 text-emerald-500 fill-current"></i>
                            <i data-lucide="star" class="w-4 h-4 text-emerald-500 fill-current"></i>
                            <i data-lucide="star" class="w-4 h-4 text-emerald-500 fill-current"></i>
                            <i data-lucide="star" class="w-4 h-4 text-emerald-500 fill-current"></i>
                            <i data-lucide="star" class="w-4 h-4 text-emerald-500 fill-current"></i>
                        </div>
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
            setPreview(item.image ? `${API_BASE_URL}/${item.image}` : null);

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

    addBtn && addBtn.addEventListener('click', () => openModal(false));
closeBtn && closeBtn.addEventListener('click', closeModal);
cancelBtn && cancelBtn.addEventListener('click', closeModal);

    modal && modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
});


    form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const id = document.getElementById('review-id').value;

    const fd = new FormData();
    fd.append("name", document.getElementById('review-name').value);
    fd.append("role", document.getElementById('review-role').value);
    fd.append("text", document.getElementById('review-text').value);

    if (fileInput.files[0]) {
        fd.append("image", fileInput.files[0]);
    }

    let api = "about-create.php";
    if (id) {
        fd.append("id", id);
        api = "about-update.php";
    }

    fetch(`${API_BASE_URL}/api/about/${api}`, {
        method: "POST",
        body: fd
    })
    .then(r => r.json())
    .then(res => {
        if (!res.status) {
            alert(res.message);
            return;
        }
        closeModal();
        fetchReviews();
    });
});



function fetchReviews() {
    fetch(`${API_BASE_URL}/api/about/about-list.php`)
        .then(res => res.json())
        .then(data => {
            reviewsData = data;
            render();
        });
}



    // Global Handlers (attached to window for onclick HTML attributes)
    window.editReview = (id) => openModal(true, id);
    window.deleteReview = (id) => {
    if (!confirm("Delete this review?")) return;

    const fd = new FormData();
    fd.append("id", id);

    fetch(`${API_BASE_URL}/api/about/about-delete.php`, {
        method: "POST",
        body: fd
    })
    .then(r => r.json())
    .then(() => fetchReviews());
};


    

    fetchReviews();


}

renderabout();