// Authentication Check
if (!localStorage.getItem('authToken')) {
    window.location.href = '../login page/login.html';
}

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Icons
    lucide.createIcons();

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
    const totalCountSpan = document.getElementById('total-count');
    const pageCountSpan = document.getElementById('page-count');

    // File inputs
    const fileInput = document.getElementById('image-file');
    const previewContainer = document.getElementById('image-preview-container');
    const previewImage = document.getElementById('image-preview');
    const fileNameSpan = document.getElementById('file-name');
    const removeFileBtn = document.getElementById('remove-file-btn');
    const dropZone = document.getElementById('drop-zone');

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

    window.logout = () => {
        if (confirm('Are you sure you want to log out?')) {
            localStorage.removeItem('authToken');
            window.location.href = '../login page/login.html';
        }
    };

    render();
});
