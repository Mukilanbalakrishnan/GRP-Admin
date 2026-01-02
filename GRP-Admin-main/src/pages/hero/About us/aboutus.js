// Authentication Check
if (!localStorage.getItem('authToken')) {
    window.location.href = '../login page/login.html';
}

document.addEventListener('DOMContentLoaded', () => {
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

    // State
    let reviewsData = JSON.parse(localStorage.getItem('clientReviews')) || [
        {
            id: '1',
            name: 'David Brown',
            role: 'Verified Client',
            text: 'They helped us scale our MVP into a full-fledged product. Their technical guidance was invaluable.',
            image: ''
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

    // Global Handlers (attached to window for onclick HTML attributes)
    window.editReview = (id) => openModal(true, id);
    window.deleteReview = (id) => {
        if (confirm('Delete this review?')) {
            reviewsData = reviewsData.filter(r => r.id !== id);
            save();
        }
    };

    window.logout = () => {
        if (confirm('Are you sure you want to log out?')) {
            localStorage.removeItem('authToken');
            window.location.href = '../login page/login.html';
        }
    };

    render();
});
