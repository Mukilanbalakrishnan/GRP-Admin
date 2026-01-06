
        // 1. Initial Data (Using Images now)

        const API_BASE = "http://localhost/GRP-Backend/api/brands";


        // let brandsData = [
        //     { name: "APEX STEEL", image: "https://upload.wikimedia.org/wikipedia/commons/a/ab/Android_O_Preview_Logo.png", color: "from-orange-600 to-amber-500" },
        //     { name: "CORE DYNAMICS", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/600px-JavaScript-logo.png", color: "from-blue-600 to-cyan-500" },
        //     { name: "TITAN STRUCT", image: "https://cdn.worldvectorlogo.com/logos/react-2.svg", color: "from-gray-700 to-gray-900" },
        //     { name: "NEXUS GRID", image: "https://cdn.worldvectorlogo.com/logos/nodejs-icon.svg", color: "from-green-600 to-emerald-500" },
        // ];

        let brandsData = [];


        // Preset Gradients
        const fixedGradients = [
            "from-orange-600 to-amber-500", "from-blue-600 to-cyan-500",
            "from-gray-700 to-gray-900", "from-green-600 to-emerald-500",
            "from-red-600 to-orange-500", "from-purple-600 to-indigo-500"
        ];

        // Initialize
        document.addEventListener("DOMContentLoaded", () => {
  fetchBrands();
  lucide.createIcons();
  
});

function fetchBrands() {
  fetch(`${API_BASE}/brand-list.php`)
    .then(res => res.json())
    .then(data => {
      brandsData = data;
      renderGrid();
    })
    .catch(err => console.error("Brand fetch error:", err));
}


        // --- RENDER GRID ---
        function renderGrid() {
  const grid = document.getElementById("brands-grid");
  grid.innerHTML = "";

  brandsData.forEach((item, index) => {
    const card = document.createElement("div");
    card.className =
      "brand-card bg-white p-5 rounded-xl shadow-sm border border-gray-200 flex items-center gap-4 relative group";

    card.innerHTML = `
      <div class="w-14 h-14 rounded-lg bg-gradient-to-br ${item.gradient}
           flex items-center justify-center border overflow-hidden p-2">
        <img 
  src="http://localhost/GRP-Backend/${item.image_path}"
  onerror="this.style.display='none'"
  class="w-full h-full object-contain scale-110"
>

      </div>

      <div class="flex-1 min-w-0">
        <h4 class="font-bold text-gray-800 text-sm truncate">${item.name}</h4>
      </div>

      <div class="flex flex-col gap-2 opacity-0 group-hover:opacity-100
           transition-opacity absolute right-4 bg-white rounded-lg p-1 shadow">
        <button onclick="openModal(${index})" class="p-1.5 bg-gray-100 hover:bg-blue-50 rounded">
          <i data-lucide="pencil" class="w-4 h-4"></i>
        </button>
        <button onclick="deleteBrand(${item.id})" class="p-1.5 bg-gray-100 hover:bg-red-50 rounded">
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
  modal.classList.remove("hidden");

  setTimeout(() => {
    modal.classList.remove("opacity-0");
    modalContent.classList.add("scale-100");
  }, 10);

  const idx = document.getElementById("brand-index");
  const name = document.getElementById("input-name");
  const fileInput = document.getElementById("file-upload");
  const title = document.getElementById("modal-title");

  fileInput.value = ""; // reset file input

  if (index !== null) {
    const data = brandsData[index];
    title.innerText = "Edit Brand";
    idx.value = data.id;
    name.value = data.name;

    // show existing image (from server)
    updateImagePreview(`http://localhost/GRP-Backend/${data.image_path}`);
  } else {
    title.innerText = "Add Brand";
    idx.value = "-1";
    name.value = "";
    updateImagePreview("");
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
        

        // --- CRUD ACTIONS ---
        function saveBrand() {
  const id = document.getElementById("brand-index").value;
  const name = document.getElementById("input-name").value.trim();
  const fileInput = document.getElementById("file-upload");

  if (!name) {
    alert("Brand name required");
    return;
  }

  const formData = new FormData();
  formData.append("name", name);

  if (fileInput.files.length > 0) {
    formData.append("image", fileInput.files[0]);
  }

  let url;

  if (id !== "-1") {
    formData.append("id", id);
    url = `${API_BASE}/brand-update.php`;
  } else {
    const gradient = getNextGradient(brandsData.length);
    formData.append("gradient", gradient);
    url = `${API_BASE}/brand-upload.php`;
  }

  fetch(url, {
    method: "POST",
    body: formData
  })
    .then(res => res.json())
    .then(resp => {
      if (!resp.status) {
        alert("Operation failed");
        return;
      }
      closeModal();
      fetchBrands();
    })
    .catch(err => console.error("Save error:", err));
}




        function deleteBrand(id) {
  if (!confirm("Delete this brand?")) return;

  const formData = new FormData();
  formData.append("id", id);

  fetch(`${API_BASE}/brand-delete.php`, {
    method: "POST",
    body: formData
  })
    .then(res => res.json())
    .then(resp => {
      if (resp.status) fetchBrands();
      else alert("Delete failed");
    });
}

function handleFileUpload(input) {
  if (input.files && input.files[0]) {
    const file = input.files[0];
    const previewURL = URL.createObjectURL(file);
    updateImagePreview(previewURL);
  }
}


        // --- NAVIGATION ---
        function goBack() {
            parent.document.getElementById('app').innerHTML = `
                <iframe src="./src/pages/Home/Home.html" class="w-full h-[calc(100vh-64px)] border-0"></iframe>
            `;
        }
    