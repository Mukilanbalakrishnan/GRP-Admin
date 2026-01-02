
    /* ============================
       GRADIENT POOL (FIXED ORDER)
    ============================ */

    const GRADIENTS = [
        "from-orange-600 to-amber-500",
        "from-emerald-600 to-teal-500",
        "from-blue-600 to-cyan-500",
        "from-amber-600 to-yellow-500",
        "from-yellow-500 to-orange-500",
        "from-purple-600 to-indigo-500"
    ];

    /* ============================
       SERVICES DATA
    ============================ */

    let servicesData = [
        {
            title: "Industrial Roofing",
            desc: "Heavy-duty metal and composite roofing",
            iconSvg: `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                 fill="none" stroke="currentColor" stroke-width="1.5"
                 class="w-8 h-8 text-white">
                <path d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18" />
            </svg>
            `
        }
    ];

    /* ============================
       INIT
    ============================ */

    document.addEventListener('DOMContentLoaded', () => {
        renderServices();
        lucide.createIcons();
        setupFileUpload();
        setupDescriptionCounter();
    });

    /* ============================
       RENDER SERVICES
    ============================ */

    function renderServices() {
        const grid = document.getElementById('services-grid');
        const emptyState = document.getElementById('empty-state');
        
        grid.innerHTML = '';
        
        if (servicesData.length === 0) {
            emptyState.classList.remove('hidden');
            grid.classList.add('hidden');
            return;
        }
        
        emptyState.classList.add('hidden');
        grid.classList.remove('hidden');

        servicesData.forEach((service, index) => {
            // 🔁 AUTO GRADIENT (1,2,3,4,5,6,1,2...)
            const gradient = GRADIENTS[index % GRADIENTS.length];

            const card = document.createElement('div');
            card.className = `service-card bg-white p-6 rounded-xl shadow-sm border border-gray-200 animate-fade-in-up`;
            card.style.animationDelay = `${index * 0.1}s`;
            card.style.opacity = '0';

            card.innerHTML = `
                <div class="flex items-start justify-between mb-4">
                    <div class="icon-container w-14 h-14 rounded-xl bg-gradient-to-br ${gradient}
                        flex items-center justify-center shadow-lg group">
                        ${service.iconSvg}
                        <div class="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    <div class="flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                        <button onclick="editService(${index})"
                            class="p-2 bg-gray-100 hover:bg-blue-50 text-gray-500 hover:text-blue-600 rounded-lg action-btn"
                            title="Edit service">
                            <i data-lucide="pencil" class="w-4 h-4"></i>
                        </button>
                        <button onclick="deleteService(${index})"
                            class="p-2 bg-gray-100 hover:bg-red-50 text-gray-500 hover:text-red-600 rounded-lg action-btn"
                            title="Delete service">
                            <i data-lucide="trash-2" class="w-4 h-4"></i>
                        </button>
                    </div>
                </div>

                <h3 class="text-lg font-bold text-gray-800 mb-2">${service.title}</h3>
                <p class="text-sm text-gray-500">${service.desc}</p>
                
                <div class="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                    <span class="text-xs text-gray-400">Slide ${index + 1}</span>
                    <span class="text-xs px-2 py-1 rounded-full bg-gradient-to-r ${gradient} text-white">
                        Active
                    </span>
                </div>
            `;

            grid.appendChild(card);
        });

        setTimeout(() => lucide.createIcons(), 100);
    }

    /* ============================
       MODAL CONTROLS
    ============================ */

    const modal = document.getElementById('service-modal');
    const modalContent = document.getElementById('modal-content');

    window.openModal = function (index = null) {
        modal.classList.remove('hidden');
        setTimeout(() => {
            modal.classList.remove('opacity-0');
            modalContent.classList.remove('scale-95');
            modalContent.classList.add('scale-100');
        }, 10);

        const isEdit = index !== null;
        document.getElementById('modal-title').textContent = isEdit ? 'Edit Service' : 'Add New Service';
        document.getElementById('service-index').value = index ?? -1;
        document.getElementById('input-title').value = isEdit ? servicesData[index].title : '';
        document.getElementById('input-desc').value = isEdit ? servicesData[index].desc : '';
        document.getElementById('input-icon-file').value = '';
        
        // Reset preview
        document.getElementById('icon-preview').classList.add('hidden');
        document.getElementById('file-name').classList.add('hidden');
        document.getElementById('file-name').textContent = '';
        
        // Update character count
        updateCharCount();
        
        // Focus on title input
        setTimeout(() => {
            document.getElementById('input-title').focus();
        }, 300);
    };

    window.closeModal = function () {
        modal.classList.add('opacity-0');
        modalContent.classList.remove('scale-100');
        modalContent.classList.add('scale-95');
        setTimeout(() => modal.classList.add('hidden'), 300);
    };

    /* ============================
       FILE UPLOAD SETUP
    ============================ */

    function setupFileUpload() {
        const fileUploadArea = document.getElementById('file-upload-area');
        const fileInput = document.getElementById('input-icon-file');
        
        fileUploadArea.addEventListener('click', () => {
            fileInput.click();
            fileUploadArea.classList.add('animate-pulse-once');
            setTimeout(() => fileUploadArea.classList.remove('animate-pulse-once'), 300);
        });
        
        fileInput.addEventListener('change', handleFileSelect);
        
        // Drag and drop
        ['dragenter', 'dragover'].forEach(event => {
            fileUploadArea.addEventListener(event, (e) => {
                e.preventDefault();
                fileUploadArea.classList.add('drag-over');
            });
        });
        
        ['dragleave', 'drop'].forEach(event => {
            fileUploadArea.addEventListener(event, (e) => {
                e.preventDefault();
                fileUploadArea.classList.remove('drag-over');
            });
        });
        
        fileUploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            fileUploadArea.classList.remove('drag-over');
            if (e.dataTransfer.files.length) {
                fileInput.files = e.dataTransfer.files;
                handleFileSelect({ target: fileInput });
            }
        });
    }
    
    function handleFileSelect(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        // Check file type
        if (!file.name.endsWith('.svg')) {
            showToast('Please upload an SVG file', 'error');
            return;
        }
        
        // Show file name
        const fileNameElement = document.getElementById('file-name');
        fileNameElement.textContent = file.name;
        fileNameElement.classList.remove('hidden');
        
        // Preview the SVG
        readSvgFile(file, (svgContent) => {
            const previewContainer = document.getElementById('preview-container');
            previewContainer.innerHTML = svgContent;
            document.getElementById('icon-preview').classList.remove('hidden');
            previewContainer.classList.add('animate-scale-in');
        });
    }

    /* ============================
       SVG FILE READER
    ============================ */

    function readSvgFile(file, callback) {
        const reader = new FileReader();

        reader.onload = (e) => {
            let svgText = e.target.result;

            if (!svgText.includes('<svg')) {
                showToast('Invalid SVG file', 'error');
                return;
            }

            svgText = svgText.replace(
                '<svg',
                '<svg class="w-8 h-8 text-white"'
            );

            callback(svgText);
        };

        reader.readAsText(file);
    }

    /* ============================
       DESCRIPTION CHARACTER COUNTER
    ============================ */

    function setupDescriptionCounter() {
        const descInput = document.getElementById('input-desc');
        descInput.addEventListener('input', updateCharCount);
    }
    
    function updateCharCount() {
        const descInput = document.getElementById('input-desc');
        const charCount = document.getElementById('char-count');
        const count = descInput.value.length;
        charCount.textContent = `${count}/150 characters`;
        
        if (count > 140) {
            charCount.classList.add('text-amber-600');
            charCount.classList.remove('text-gray-400');
        } else {
            charCount.classList.remove('text-amber-600');
            charCount.classList.add('text-gray-400');
        }
    }

    /* ============================
       SAVE SERVICE
    ============================ */

    window.saveService = function () {
        const title = document.getElementById('input-title').value.trim();
        const desc = document.getElementById('input-desc').value.trim();
        const index = parseInt(document.getElementById('service-index').value);
        const fileInput = document.getElementById('input-icon-file');
        
        // Validation
        if (!title) {
            showToast('Please enter a service title', 'error');
            document.getElementById('input-title').classList.add('animate-shake');
            setTimeout(() => document.getElementById('input-title').classList.remove('animate-shake'), 300);
            return;
        }
        
        if (!desc) {
            showToast('Please enter a service description', 'error');
            document.getElementById('input-desc').classList.add('animate-shake');
            setTimeout(() => document.getElementById('input-desc').classList.remove('animate-shake'), 300);
            return;
        }
        
        if (desc.length > 150) {
            showToast('Description must be 150 characters or less', 'error');
            return;
        }
        
        // Show loading state
        const saveBtn = document.getElementById('save-service-btn');
        const saveBtnText = document.getElementById('save-btn-text');
        const saveSpinner = document.getElementById('save-spinner');
        
        saveBtn.disabled = true;
        saveBtnText.textContent = 'Saving...';
        saveSpinner.classList.remove('hidden');
        
        // Simulate API call
        setTimeout(() => {
            // ✏️ EDIT (NO ICON CHANGE)
            if (index >= 0 && fileInput.files.length === 0) {
                servicesData[index] = {
                    ...servicesData[index],
                    title,
                    desc
                };
                showToast('Service updated successfully', 'success');
            }
            // ➕ ADD or REPLACE ICON
            else if (fileInput.files.length > 0) {
                readSvgFile(fileInput.files[0], (svgContent) => {
                    const newService = {
                        title,
                        desc,
                        iconSvg: svgContent
                    };

                    if (index >= 0) {
                        servicesData[index] = newService;
                        showToast('Service updated successfully', 'success');
                    } else {
                        servicesData.push(newService);
                        showToast('Service added successfully', 'success');
                    }
                    
                    renderServices();
                    closeModal();
                    
                    // Reset save button
                    saveBtn.disabled = false;
                    saveBtnText.textContent = 'Save Service';
                    saveSpinner.classList.add('hidden');
                });
                return;
            } else {
                // Adding new service without icon
                showToast('Please upload an SVG icon for new services', 'error');
                saveBtn.disabled = false;
                saveBtnText.textContent = 'Save Service';
                saveSpinner.classList.add('hidden');
                return;
            }
            
            renderServices();
            closeModal();
            
            // Reset save button
            saveBtn.disabled = false;
            saveBtnText.textContent = 'Save Service';
            saveSpinner.classList.add('hidden');
        }, 800);
    };

    /* ============================
       EDIT SERVICE (Separate from openModal for clarity)
    ============================ */

    window.editService = function (index) {
        // Add animation to the clicked card
        const cards = document.querySelectorAll('.service-card');
        if (cards[index]) {
            cards[index].classList.add('animate-pulse-once');
            setTimeout(() => cards[index].classList.remove('animate-pulse-once'), 300);
        }
        
        openModal(index);
    };

    /* ============================
       DELETE SERVICE
    ============================ */

    window.deleteService = function (index) {
        // Add shake animation to the card
        const cards = document.querySelectorAll('.service-card');
        if (cards[index]) {
            cards[index].classList.add('animate-shake');
            
            setTimeout(() => {
                if (confirm("Are you sure you want to delete this service?")) {
                    // Add fade out animation
                    cards[index].style.opacity = '0.5';
                    cards[index].style.transform = 'scale(0.95)';
                    
                    setTimeout(() => {
                        servicesData.splice(index, 1);
                        renderServices();
                        showToast('Service deleted', 'info');
                    }, 300);
                } else {
                    cards[index].classList.remove('animate-shake');
                }
            }, 300);
        }
    };

    /* ============================
       TOAST NOTIFICATION
    ============================ */

    function showToast(message, type = 'info') {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.className = `toast ${type}`;
        
        // Show toast
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);
        
        // Hide toast after 3 seconds
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    /* ============================
       NAVIGATION
    ============================ */

   window.goBack = function () {
    const container = document.querySelector('.max-w-6xl');

    // Fallback safety
    if (!container) {
        navigateHome();
        return;
    }

    // Exit animation
    container.style.transition = 'opacity 0.3s ease';
    container.style.opacity = '1';

    requestAnimationFrame(() => {
        container.style.opacity = '0';
    });

    // Navigate AFTER animation
    setTimeout(() => {
        navigateHome();
    }, 300); // must match CSS transition
};

/* ============================
   ACTUAL NAVIGATION FUNCTION
============================ */

function navigateHome() {
    parent.document.getElementById('app').innerHTML = `
        <iframe 
            src="./src/pages/Home/Home.html"
            class="w-full h-[calc(100vh-64px)] border-0">
        </iframe>
    `;
}

