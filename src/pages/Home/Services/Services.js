
        /* ============================
           GRADIENT POOL
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
           INITIAL DATA
        ============================ */
        let servicesData = [
            {
                title: "Industrial Roofing",
                desc: "Heavy-duty metal and composite roofing",
                image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=200&auto=format&fit=crop"
            }
        ];

        /* ============================
           INIT
        ============================ */
        document.addEventListener('DOMContentLoaded', () => {
            renderServices();
            lucide.createIcons();
            setupFileUpload();
            setupInputListeners();
        });

        /* ============================
           RENDER SERVICES GRID
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
                const gradient = GRADIENTS[index % GRADIENTS.length];

                const card = document.createElement('div');
                card.className = `service-card bg-white p-6 rounded-xl shadow-sm border border-gray-200 animate-fade-in-up`;
                card.style.animationDelay = `${index * 0.1}s`;

                card.innerHTML = `
                    <div class="flex items-start justify-between mb-4">
                        <div class="w-16 h-16 rounded-xl p-[2px] bg-gradient-to-br ${gradient} shadow-md group">
                            <div class="w-full h-full rounded-[10px] overflow-hidden bg-white">
                                <img src="${service.image}" alt="${service.title}" class="w-full h-full object-cover">
                            </div>
                        </div>

                        <div class="flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                            <button onclick="editService(${index})" class="p-2 bg-gray-100 hover:bg-blue-50 text-gray-500 hover:text-blue-600 rounded-lg transition-colors" title="Edit">
                                <i data-lucide="pencil" class="w-4 h-4"></i>
                            </button>
                            <button onclick="deleteService(${index})" class="p-2 bg-gray-100 hover:bg-red-50 text-gray-500 hover:text-red-600 rounded-lg transition-colors" title="Delete">
                                <i data-lucide="trash-2" class="w-4 h-4"></i>
                            </button>
                        </div>
                    </div>

                    <h3 class="text-lg font-bold text-gray-800 mb-2">${service.title}</h3>
                    <p class="text-sm text-gray-500 leading-relaxed">${service.desc}</p>
                    
                    <div class="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                        <span class="text-xs text-gray-400">Slide ${index + 1}</span>
                        <span class="text-xs px-2 py-1 rounded-full bg-gradient-to-r ${gradient} text-white">Active</span>
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
            
            if (isEdit) {
                const data = servicesData[index];
                document.getElementById('input-title').value = data.title;
                document.getElementById('input-desc').value = data.desc;
                document.getElementById('input-image').value = data.image;
                updateImagePreview(data.image);
            } else {
                document.getElementById('input-title').value = '';
                document.getElementById('input-desc').value = '';
                document.getElementById('input-image').value = '';
                document.getElementById('input-image-file').value = ''; // Reset file input
                updateImagePreview('');
            }
            
            updateCharCount();
        };

        window.closeModal = function () {
            modal.classList.add('opacity-0');
            modalContent.classList.remove('scale-100');
            modalContent.classList.add('scale-95');
            setTimeout(() => modal.classList.add('hidden'), 300);
        };

        window.editService = function(index) {
            openModal(index);
        }

        /* ============================
           FILE UPLOAD & PREVIEW
        ============================ */
        function setupFileUpload() {
            const area = document.getElementById('file-upload-area');
            const input = document.getElementById('input-image-file');

            area.addEventListener('click', () => input.click());

            input.addEventListener('change', (e) => {
                if (e.target.files && e.target.files[0]) {
                    handleFile(e.target.files[0]);
                }
            });

            // Drag & Drop
            ['dragenter', 'dragover'].forEach(evt => {
                area.addEventListener(evt, (e) => {
                    e.preventDefault();
                    area.classList.add('drag-over');
                });
            });

            ['dragleave', 'drop'].forEach(evt => {
                area.addEventListener(evt, (e) => {
                    e.preventDefault();
                    area.classList.remove('drag-over');
                });
            });

            area.addEventListener('drop', (e) => {
                const dt = e.dataTransfer;
                if (dt.files && dt.files[0]) {
                    handleFile(dt.files[0]);
                }
            });
        }

        function handleFile(file) {
            if (!file.type.startsWith('image/')) {
                alert("Please upload an image file.");
                return;
            }
            const reader = new FileReader();
            reader.onload = (e) => {
                const result = e.target.result;
                document.getElementById('input-image').value = result; // Set URL Input to Base64
                updateImagePreview(result);
            };
            reader.readAsDataURL(file);
        }

        function setupInputListeners() {
            // Live preview from URL input
            document.getElementById('input-image').addEventListener('input', (e) => {
                updateImagePreview(e.target.value);
            });

            // Character count
            document.getElementById('input-desc').addEventListener('input', updateCharCount);
        }

        function updateImagePreview(src) {
            const container = document.getElementById('image-preview-container');
            const img = document.getElementById('img-preview');
            
            if (src && src.trim() !== '') {
                img.src = src;
                container.classList.remove('hidden');
            } else {
                container.classList.add('hidden');
            }
        }

        function updateCharCount() {
            const val = document.getElementById('input-desc').value;
            document.getElementById('char-count').innerText = `${val.length}/150 characters`;
        }

        /* ============================
           SAVE & DELETE
        ============================ */
        window.saveService = function () {
            const title = document.getElementById('input-title').value.trim();
            const desc = document.getElementById('input-desc').value.trim();
            const image = document.getElementById('input-image').value.trim();
            const index = parseInt(document.getElementById('service-index').value);

            if (!title || !desc || !image) {
                alert("Please fill in Title, Description, and provide an Image.");
                return;
            }

            const newData = { title, desc, image };

            if (index >= 0) {
                servicesData[index] = newData;
            } else {
                servicesData.push(newData);
            }

            renderServices();
            closeModal();
            console.log("Services Data:", servicesData);
        };

        window.deleteService = function(index) {
            if(confirm("Are you sure you want to delete this service?")) {
                servicesData.splice(index, 1);
                renderServices();
            }
        };

        /* ============================
           NAVIGATION
        ============================ */
        window.goBack = function () {
            // Check if inside iframe
            if (parent.document.getElementById('app')) {
                parent.document.getElementById('app').innerHTML = `
                    <iframe src="./src/pages/Home/Home.html" class="w-full h-[calc(100vh-64px)] border-0"></iframe>
                `;
            } else {
                console.log("Not in iframe, cannot navigate.");
            }
        };
    