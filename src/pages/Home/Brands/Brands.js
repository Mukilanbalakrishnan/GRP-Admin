
        // 1. Initial Data (Using Images now)
        let brandsData = [
            { name: "APEX STEEL", image: "https://upload.wikimedia.org/wikipedia/commons/a/ab/Android_O_Preview_Logo.png", color: "from-orange-600 to-amber-500" },
            { name: "CORE DYNAMICS", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/600px-JavaScript-logo.png", color: "from-blue-600 to-cyan-500" },
            { name: "TITAN STRUCT", image: "https://cdn.worldvectorlogo.com/logos/react-2.svg", color: "from-gray-700 to-gray-900" },
            { name: "NEXUS GRID", image: "https://cdn.worldvectorlogo.com/logos/nodejs-icon.svg", color: "from-green-600 to-emerald-500" },
        ];

        // Preset Gradients
        const fixedGradients = [
            "from-orange-600 to-amber-500", "from-blue-600 to-cyan-500",
            "from-gray-700 to-gray-900", "from-green-600 to-emerald-500",
            "from-red-600 to-orange-500", "from-purple-600 to-indigo-500"
        ];

        // Initialize
        document.addEventListener('DOMContentLoaded', () => {
            renderGrid();
            lucide.createIcons();
            setupEventListeners();
        });

        // --- RENDER GRID ---
        function renderGrid() {
  const grid = document.getElementById('brands-grid');
  grid.innerHTML = '';

  brandsData.forEach((item, index) => {
    const card = document.createElement('div');
    card.className =
      "brand-card bg-white p-5 rounded-xl shadow-sm border border-gray-200 flex items-center gap-4 relative group";

    card.innerHTML = `
      <div class="w-14 h-14 rounded-lg 
            bg-gradient-to-br ${item.color}
            flex items-center justify-center
            border border-gray-200 
            overflow-hidden p-2">
  <img src="${item.image}" 
       alt="${item.name}" 
       class="w-full h-full object-contain scale-110">
</div>


      <div class="flex-1 min-w-0">
        <h4 class="font-bold text-gray-800 text-sm truncate">
          ${item.name}
        </h4>
      </div>

      <div class="flex flex-col gap-2 opacity-0 group-hover:opacity-100 
                  transition-opacity absolute right-4 bg-white rounded-lg p-1 shadow">
        <button onclick="openModal(${index})" class="p-1.5 bg-gray-100 hover:bg-blue-50 rounded">
          <i data-lucide="pencil" class="w-4 h-4"></i>
        </button>
        <button onclick="deleteBrand(${index})" class="p-1.5 bg-gray-100 hover:bg-red-50 rounded">
          <i data-lucide="trash-2" class="w-4 h-4"></i>
        </button>
      </div>
    `;

    grid.appendChild(card);
  });

  lucide.createIcons();
}


        // --- MODAL LOGIC ---
        const modal = document.getElementById('brand-modal');
        const modalContent = document.getElementById('modal-content');




        function openModal(index = null) {
  modal.classList.remove('hidden');
  setTimeout(() => {
    modal.classList.remove('opacity-0');
    modalContent.classList.remove('scale-95');
    modalContent.classList.add('scale-100');
  }, 10);

  const idxInput = document.getElementById('brand-index');
  const nameInput = document.getElementById('input-name');
  const imageInput = document.getElementById('input-image');
  const modalTitle = document.getElementById('modal-title');

  if (index !== null) {
    modalTitle.innerText = "Edit Brand";
    const data = brandsData[index];
    idxInput.value = index;
    nameInput.value = data.name;
    imageInput.value = data.image;
    updateImagePreview(data.image);
  } else {
    modalTitle.innerText = "Add Brand";
    idxInput.value = '-1';
    nameInput.value = '';
    imageInput.value = '';
    updateImagePreview('');
  }
}


        function closeModal() {
            modal.classList.add('opacity-0');
            modalContent.classList.remove('scale-100');
            modalContent.classList.add('scale-95');
            setTimeout(() => modal.classList.add('hidden'), 300);
        }

        function getNextGradient(index) {
  return fixedGradients[index % fixedGradients.length];
}


        // --- PREVIEW LOGIC ---
        function setupEventListeners() {
  const imageInput = document.getElementById('input-image');
  if (imageInput) {
    imageInput.addEventListener('input', (e) =>
      updateImagePreview(e.target.value)
    );
  }
}


        function updateColorPreview(colorClass) {
            const preview = document.getElementById('color-preview');
            // Try to apply class, fallback if invalid
            preview.className = `h-full w-full rounded-full bg-gradient-to-r ${colorClass}`;
        }

        function updateImagePreview(src) {
            const img = document.getElementById('img-preview');
            const placeholder = document.getElementById('img-placeholder');
            
            if (src && src.trim() !== "") {
                img.src = src;
                img.classList.remove('hidden');
                placeholder.classList.add('hidden');
            } else {
                img.classList.add('hidden');
                placeholder.classList.remove('hidden');
            }
        }

        // --- FILE UPLOAD ---
        function handleFileUpload(input) {
            if (input.files && input.files[0]) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const result = e.target.result;
                    // Set value to input so it saves
                    document.getElementById('input-image').value = result;
                    updateImagePreview(result);
                };
                reader.readAsDataURL(input.files[0]);
            }
        }

        // --- CRUD ACTIONS ---
        function saveBrand() {
  const index = parseInt(document.getElementById('brand-index').value);
  const name = document.getElementById('input-name').value.trim();
  const image = document.getElementById('input-image').value.trim();

  if (!name || !image) {
    alert("Please fill in Name and Image");
    return;
  }

  const color =
    index >= 0
      ? brandsData[index].color // keep same gradient on edit
      : getNextGradient(brandsData.length); // auto-assign on add

  const newData = { name, image, color };

  if (index >= 0) {
    brandsData[index] = newData;
  } else {
    brandsData.push(newData);
  }

  renderGrid();
  closeModal();
}



        function deleteBrand(index) {
            if(confirm("Delete this brand?")) {
                brandsData.splice(index, 1);
                renderGrid();
            }
        }

        // --- NAVIGATION ---
        function goBack() {
            parent.document.getElementById('app').innerHTML = `
                <iframe src="./src/pages/Home/Home.html" class="w-full h-[calc(100vh-64px)] border-0"></iframe>
            `;
        }
    