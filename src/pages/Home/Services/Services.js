
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
        let servicesData = [];

        /* ============================
           INIT
        ============================ */

        function fetchServices() {
  fetch("http://localhost/GRP-Backend/api/services/service-list.php")
    .then(res => res.json())
    .then(data => {
      servicesData = data;
      renderServices();
    })
    .catch(err => console.error("Service fetch error:", err));
}

        document.addEventListener('DOMContentLoaded', () => {
    fetchServices();   // load from backend
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
                card.className = `service-card group bg-white p-6 rounded-xl shadow-sm border border-gray-200 animate-fade-in-up`;

                card.style.animationDelay = `${index * 0.1}s`;

                card.innerHTML = `
                    <div class="flex items-start justify-between mb-4">
                        <div class="w-16 h-16 rounded-xl p-[2px] bg-gradient-to-br ${gradient} shadow-md group">
                            <div class="w-full h-full rounded-[10px] overflow-hidden bg-white">
                                <img src="http://localhost/GRP-Backend/${service.image_path}"alt="${service.title}" class="w-full h-full object-cover">
                            </div>
                        </div>

                        <div class="flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                            <button onclick="editService(${index})" class="p-2 bg-gray-100 hover:bg-blue-50 text-gray-500 hover:text-blue-600 rounded-lg transition-colors" title="Edit">
                                <i data-lucide="pencil" class="w-4 h-4"></i>
                            </button>
                            <button onclick="deleteService(${service.id})" class="p-2 bg-gray-100 hover:bg-red-50 text-gray-500 hover:text-red-600 rounded-lg transition-colors" title="Delete">
                                <i data-lucide="trash-2" class="w-4 h-4"></i>
                            </button>
                        </div>
                    </div>

                    <h3 class="text-lg font-bold text-gray-800 mb-2">${service.title}</h3>
                    <p class="text-sm text-gray-500 leading-relaxed">${service.description}</p>
                    
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
            document.getElementById('service-index').value = isEdit ? servicesData[index].id : -1;

            
            if (isEdit) {
  const data = servicesData[index];
  document.getElementById('input-title').value = data.title;
  document.getElementById('input-desc').value = data.description;

  // show existing image from backend
  updateImagePreview(`http://localhost/GRP-Backend/${data.image_path}`);
} else {
  document.getElementById('input-title').value = '';
  document.getElementById('input-desc').value = '';
  document.getElementById('input-image-file').value = '';
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
  if (!file.type.startsWith("image/")) {
    alert("Please upload an image file");
    return;
  }

  const previewURL = URL.createObjectURL(file);
  updateImagePreview(previewURL);
}


       function setupInputListeners() {
  const descInput = document.getElementById('input-desc');
  if (descInput) {
    descInput.addEventListener('input', updateCharCount);
  }
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
  const fileInput = document.getElementById('input-image-file');
  const id = document.getElementById('service-index').value;

  if (!title || !desc) {
    alert("Title and description required");
    return;
  }

  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", desc);

  if (fileInput.files.length > 0) {
    formData.append("image", fileInput.files[0]);
  }

  const url = id !== "-1"
    ? "http://localhost/GRP-Backend/api/services/service-update.php"
    : "http://localhost/GRP-Backend/api/services/service-upload.php";

  if (id !== "-1") formData.append("id", id);

  fetch(url, { method: "POST", body: formData })
    .then(res => res.json())
    .then(resp => {
      if (!resp.status) {
        alert("Failed to save service");
        return;
      }
      closeModal();
      fetchServices();
    });
};


        window.deleteService = function(id) {
  if (!confirm("Delete this service?")) return;

  const fd = new FormData();
  fd.append("id", id);

  fetch("http://localhost/GRP-Backend/api/services/service-delete.php", {
    method: "POST",
    body: fd
  })
    .then(res => res.json())
    .then(resp => {
      if (resp.status) fetchServices();
    });
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
    