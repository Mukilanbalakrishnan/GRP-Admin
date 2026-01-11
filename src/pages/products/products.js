
export function renderproducts(){
     if (!localStorage.getItem('authToken')) {
    console.warn("Auth token missing, redirecting...");
    window.location.href = '../../../../index.html';
    return; // ✅ STOP EXECUTION
  }


  const API_BASE_URL = window.ENV?.API_BASE_URL;

if (!API_BASE_URL) {
  console.error("❌ API_BASE_URL missing (env.js not loaded)");
}
        let heroState = {
    images: [] 
};
    

    const API = {
  SECTIONS: {
    LIST: `${API_BASE_URL}/api/products/list.php`,
    CREATE: `${API_BASE_URL}/api/products/create.php`,
    UPDATE: `${API_BASE_URL}/api/products/update.php`,
    DELETE: `${API_BASE_URL}/api/products/delete.php`,
  },
  BRANDS: {
    CREATE: `${API_BASE_URL}/api/product_brands/create.php`,
    UPDATE: `${API_BASE_URL}/api/product_brands/update.php`,
    DELETE: `${API_BASE_URL}/api/product_brands/delete.php`,
    LIST: `${API_BASE_URL}/api/product_brands/list.php`,
  },
  COLORS: {
    CREATE: `${API_BASE_URL}/api/colours/create.php`,
    UPDATE: `${API_BASE_URL}/api/colours/update.php`,
    DELETE: `${API_BASE_URL}/api/colours/delete.php`,
    LIST: `${API_BASE_URL}/api/colours/list.php`,
  }
};



    lucide.createIcons();

    // DOM Elements - Main
    const mainContainer = document.getElementById('main-container');

    // DOM Elements - Section Modal
    const sectionModal = document.getElementById('section-modal');
    const sectionForm = document.getElementById('section-form');
    const sectionModalTitle = document.getElementById('section-modal-title');
    const sectionIdInput = document.getElementById('section-id');
    const sectionTitleInput = document.getElementById('section-title');
    const sectionDescInput = document.getElementById('section-desc');
    const sectionThumbInput = document.getElementById('section-thumb-input');
    const sectionThumbPreview = document.getElementById('section-thumb-preview');
    const sectionThumbContainer = document.getElementById('section-thumb-preview-container');
    const removeSectionThumbBtn = document.getElementById('remove-section-thumb');

    // DOM Elements - Tile Modal
    const tileModal = document.getElementById('tile-modal');
    const tileForm = document.getElementById('tile-form');
    const tileModalTitle = document.getElementById('tile-modal-title');
    const tileIdInput = document.getElementById('tile-id');
    const tileNameInput = document.getElementById('tile-name');
    const tileImageInput = document.getElementById('tile-image-input');
    const tileImagePreview = document.getElementById('tile-image-preview');
    const tileImageContainer = document.getElementById('tile-image-preview-container');
    const removeTileImageBtn = document.getElementById('remove-tile-image');

    // DOM Elements - Colour Manager (Inside Tile Modal)
    const newColourFile = document.getElementById('new-colour-file');
    const newColourPreview = document.getElementById('new-colour-preview');
    const newColourIcon = document.getElementById('new-colour-icon');
    const newColourName = document.getElementById('new-colour-name');
    const addColourBtn = document.getElementById('add-colour-btn');
    const coloursList = document.getElementById('colours-list');

    
    let productsData = [];

async function fetchProducts() {
  const res = await fetch(API.SECTIONS.LIST);
  const json = await res.json();

  if (!json.status) return;
  productsData = json.data
  .filter(sec => sec.product_name && sec.product_name.trim() !== "")
  .map(sec => ({
    id: sec.id,
    title: sec.product_name,
    description: sec.short_description,
    thumbnail: sec.product_thumbnail
  ? `${API_BASE_URL}/${sec.product_thumbnail}?v=${Date.now()}`
  : "",

    tiles: (sec.tiles || []).map(b => ({
  id: b.id,
  name: b.brand_name,
  image: b.main_image
    ? `${API_BASE_URL}/${b.main_image}`
    : "",
  colours: (b.colours || []).map(c => ({
    id: c.id,
    name: c.colour_name,
    image: c.colour_image
      ? `${API_BASE_URL}/${c.colour_image}`
      : "",
  }))
}))

  }));


  render();
}

    let state = {
        view: 'list', // 'list' or 'detail'
        currentSectionId: null,

        // Modal Temp State
        tempSectionThumb: '',
        tempTileImage: '',
        tempColours: [] // For the tile currently being edited
    };

    // Helper: File Reader
    const readFile = (file) => new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(file);
    });

    

    // --- RENDER FUNCTIONS ---

    const renderList = () => {
        return `
            <div class="flex justify-between items-center mb-8">
                <div>
                    <h1 class="text-3xl font-bold text-gray-800">Products <span class="text-gray-400 text-xl font-normal">Manager</span></h1>
                    <p class="text-gray-500 text-sm mt-1">Manage product sections and series.</p>
                </div>
                <button id="add-section-btn" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg shadow-md text-sm font-semibold flex items-center gap-2">
                    <i data-lucide="plus" class="w-5 h-5"></i> Add Section
                </button>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-24">

                ${productsData.map(section => `
                    <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow group cursor-pointer" onclick="window.viewSection('${section.id}')">
                        <div class="h-48 bg-gray-100 relative">
                            <img src="${section.thumbnail || 'https://via.placeholder.com/400x300?text=Section'}" class="w-full h-full object-cover">
                            <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                <button onclick="event.stopPropagation(); window.editSection('${section.id}')" class="bg-white text-blue-600 p-2 rounded-full hover:bg-blue-50"><i data-lucide="edit-2" class="w-4 h-4"></i></button>
                                <button onclick="event.stopPropagation(); window.deleteSection('${section.id}')" class="bg-white text-red-500 p-2 rounded-full hover:bg-red-50"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
                            </div>
                        </div>
                        <div class="p-6">
                            <h3 class="text-xl font-bold text-gray-900 mb-2">${section.title}</h3>
                            <p class="text-sm text-gray-600 line-clamp-2">${section.description}</p>
                            <p class="text-xs font-bold text-blue-600 mt-4 uppercase tracking-wide">${(section.tiles || []).length} Series Available</p>
                        </div>
                    </div>
                `).join('')}
            </div>
            
            ${productsData.length === 0 ? `
                <div class="flex flex-col items-center justify-center py-24 text-gray-400 bg-white rounded-2xl border border-dashed border-gray-300 mt-6">
                    <i data-lucide="shopping-bag" class="w-12 h-12 mb-3 text-gray-300"></i>
                    <p>No product sections found.</p>
                </div>
            ` : ''}
        `;
    };

    const renderDetail = () => {
        const section = productsData.find(s => s.id === state.currentSectionId);
        if (!section) return 'Section not found';

        return `
            <div class="mb-8">
                <button onclick="window.goBack()" class="text-gray-500 hover:text-gray-800 flex items-center gap-1 text-sm font-medium mb-4">
                    <i data-lucide="arrow-left" class="w-4 h-4"></i> Back to Sections
                </button>
                <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 class="text-3xl font-bold text-gray-800">${section.title}</h1>
                        <p class="text-gray-500 text-sm mt-1">${section.description}</p>
                    </div>
                    <div class="flex gap-3">
                         <button onclick="window.editSection('${section.id}')" class="text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg text-sm font-semibold bg-white border border-blue-100">Edit Info</button>
                         <button id="add-tile-btn" class="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-lg shadow-md text-sm font-semibold flex items-center gap-2">
                            <i data-lucide="plus" class="w-5 h-5"></i> Add New Series
                        </button>
                    </div>
                </div>
            </div>

            <h3 class="text-lg font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">Series & Tiles</h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                ${(section.tiles || []).map(tile => `
                    <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden group">
                        <div class="aspect-square bg-gray-100 relative">
                            <img src="${tile.image || 'http://localhost/GRP-Backend/uploads/placeholder.png'
}" class="w-full h-full object-cover">
                            <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                <button onclick="window.editTile('${tile.id}')" class="bg-white text-blue-600 p-2 rounded-full hover:bg-blue-50"><i data-lucide="edit-2" class="w-4 h-4"></i></button>
                                <button onclick="window.deleteTile('${tile.id}')" class="bg-white text-red-500 p-2 rounded-full hover:bg-red-50"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
                            </div>
                        </div>
                        <div class="p-4">
                            <h4 class="font-bold text-gray-800 mb-3">${tile.name}</h4>
                            
                            <div class="space-y-2">
                                <p class="text-xs font-bold text-gray-500 uppercase tracking-wide">Colours</p>
                                <div class="flex flex-wrap gap-2">
                                    ${(Array.isArray(tile.colours) ? tile.colours : []).map(c => `
  <div class="flex flex-col items-center gap-1 w-12">
    <div class="w-6 h-6 rounded-full border border-gray-200 shadow-sm">
      <img src="${c.image}" class="w-full h-full object-cover rounded-full">
    </div>
    <span class="text-[10px] text-gray-600 text-center truncate">
      ${c.name}
    </span>
  </div>
`).join('')}

                                    ${(!tile.colours || (Array.isArray(tile.colours) && tile.colours.length === 0)) ? '<span class="text-xs text-gray-400">No colours</span>' : ''}
                                </div>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>

             ${(!section.tiles || section.tiles.length === 0) ? `
                <div class="flex flex-col items-center justify-center py-16 text-gray-400 bg-white rounded-xl border border-dashed border-gray-300 mt-4">
                    <p>No tiles/series added to this section.</p>
                </div>
            ` : ''}
        `;
    };

    const render = () => {
        mainContainer.innerHTML = state.view === 'list' ? renderList() : renderDetail();
        lucide.createIcons();

        // Re-attach listeners for dynamically created buttons
        if (state.view === 'list') {
            document.getElementById('add-section-btn')?.addEventListener('click', () => openSectionModal());
        } else {
            document.getElementById('add-tile-btn')?.addEventListener('click', () => openTileModal());
        }
    };

    // --- MODAL & LOGIC: SECTIONS ---

    const openSectionModal = (id = null) => {
        sectionModal.classList.remove('hidden');
        sectionForm.reset();

        if (id) {
            const section = productsData.find(s => s.id === id);
            sectionIdInput.value = section.id;
            sectionTitleInput.value = section.title;
            sectionDescInput.value = section.description;
            state.tempSectionThumb = ""; // reset

            sectionModalTitle.innerText = 'Edit Section';
        } else {
            sectionIdInput.value = '';
            state.tempSectionThumb = '';
            sectionModalTitle.innerText = 'Add Product Section';
        }
        updateSectionThumbPreview();
    };

    const updateSectionThumbPreview = () => {
        if (state.tempSectionThumb) {
            sectionThumbPreview.src = state.tempSectionThumb;
            sectionThumbContainer.classList.remove('hidden');
        } else {
            sectionThumbContainer.classList.add('hidden');
        }
    };

    sectionThumbInput.addEventListener('change', async (e) => {
        if (e.target.files[0]) {
            state.tempSectionThumb = await readFile(e.target.files[0]);
            updateSectionThumbPreview();
        }
    });

    removeSectionThumbBtn.addEventListener('click', () => {
        state.tempSectionThumb = '';
        sectionThumbInput.value = '';
        updateSectionThumbPreview();
    });

    sectionForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const id = sectionIdInput.value;

  const payload = {
  id,
  title: sectionTitleInput.value,
  description: sectionDescInput.value
};

// 🔥 ONLY send thumbnail if user selected new image
if (state.tempSectionThumb && state.tempSectionThumb.startsWith("data:image")) {
  payload.thumbnail = state.tempSectionThumb;
}


  await fetch(id ? API.SECTIONS.UPDATE : API.SECTIONS.CREATE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  sectionModal.classList.add('hidden');
  fetchProducts();
});


    // --- MODAL & LOGIC: TILES ---

    const openTileModal = (id = null) => {
        tileModal.classList.remove('hidden');
        tileForm.reset();
        coloursList.innerHTML = '';
        state.tempColours = [];

        if (id) {
            const section = productsData.find(s => s.id === state.currentSectionId);
            const tile = section.tiles.find(t => String(t.id) === String(id));


            tileIdInput.value = tile.id;
            tileNameInput.value = tile.name || '';

            state.tempTileImage = tile.image;
            state.tempColours = [...(tile.colours || [])];
            tileModalTitle.innerText = 'Edit Tile Series';
        } else {
            tileIdInput.value = '';
            state.tempTileImage = '';
            state.tempColours = [];
            tileModalTitle.innerText = 'Add New Tile Series';
        }
        updateTileImagePreview();
        renderColoursList();
    };

    const updateTileImagePreview = () => {
        if (state.tempTileImage) {
            tileImagePreview.src = state.tempTileImage;
            tileImageContainer.classList.remove('hidden');
        } else {
            tileImageContainer.classList.add('hidden');
        }
    };

    tileImageInput.addEventListener('change', async (e) => {
        if (e.target.files[0]) {
            state.tempTileImage = await readFile(e.target.files[0]);
            updateTileImagePreview();
        }
    });

    removeTileImageBtn.addEventListener('click', () => {
        state.tempTileImage = '';
        tileImageInput.value = '';
        updateTileImagePreview();
    });

    // Colour Manager Logic
    const renderColoursList = () => {
        coloursList.innerHTML = state.tempColours.map((c, index) => `
            <div class="flex items-center justify-between bg-white p-2 rounded border border-gray-100 shadow-sm animate-in fade-in slide-in-from-top-2">
                <div class="flex items-center gap-3">
                    <img src="${c.image}" class="w-8 h-8 rounded-full border border-gray-200 object-cover">
                    <span class="text-sm font-medium text-gray-700">${c.name}</span>
                </div>
                <button type="button" onclick="window.removeColour(${index})" class="text-red-400 hover:text-red-600 p-1"><i data-lucide="x" class="w-4 h-4"></i></button>
            </div>
        `).join('');
        lucide.createIcons();
    };

    // New Colour Input Handling
    let tempNewColourImage = '';

    newColourFile.addEventListener('change', async (e) => {
        if (e.target.files[0]) {
            tempNewColourImage = await readFile(e.target.files[0]);
            newColourPreview.src = tempNewColourImage;
            newColourPreview.classList.remove('hidden');
            newColourIcon.classList.add('hidden');
        }
    });

    addColourBtn.addEventListener('click', () => {
        const name = newColourName.value.trim();
        if (!name) return alert('Please enter a colour name.');
        if (!tempNewColourImage) return alert('Please select a colour image/swatch.');

        state.tempColours.push({
            name,
            image: tempNewColourImage
        });

        // Reset inputs
        newColourName.value = '';
        newColourFile.value = '';
        tempNewColourImage = '';
        newColourPreview.classList.add('hidden');
        newColourIcon.classList.remove('hidden');

        renderColoursList();
    });

    window.removeColour = async (index) => {
  const colour = state.tempColours[index];

  if (colour.id) {
    await fetch(API.COLORS.DELETE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: colour.id })
    });
  }

  state.tempColours.splice(index, 1);
  renderColoursList();
};


tileForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const isEdit = Boolean(tileIdInput.value);
  let brandId = tileIdInput.value;

  /* =========================
     1️⃣ CREATE or UPDATE BRAND
     ========================= */
  const brandPayload = {
    id: brandId,
    product_id: state.currentSectionId,
    name: tileNameInput.value,
    image: state.tempTileImage
  };

  const brandRes = await fetch(
    isEdit ? API.BRANDS.UPDATE : API.BRANDS.CREATE,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(brandPayload)
    }
  );

  const brandResult = await brandRes.json();

  if (!brandResult.status) {
    alert("Brand save failed");
    return;
  }

  // If created, take new ID
  if (!isEdit) {
    brandId = brandResult.id;
  }

  /* =========================
     2️⃣ HANDLE COLOURS
     ========================= */

  // 🔴 SIMPLE RULE (SAFE):
  // Delete old colours first if editing
 /* =========================
   2️⃣ HANDLE COLOURS (CORRECT)
   ========================= */

for (const colour of state.tempColours) {

  const isEdit = Boolean(colour.id);

  const payload = {
    id: colour.id,
    brand_id: brandId,
    name: colour.name
  };

  // ✅ ONLY send image if user changed it
  if (colour.image && colour.image.startsWith("data:image")) {
    payload.image = colour.image;
  }

  await fetch(
    isEdit ? API.COLORS.UPDATE : API.COLORS.CREATE,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    }
  );
}




  /* =========================
     3️⃣ DONE
     ========================= */
  tileModal.classList.add('hidden');
  fetchProducts();
});



    // --- GLOBAL ACTIONS ---



    
    window.viewSection = (id) => {
        state.currentSectionId = id;
        state.view = 'detail';
        render();
    };

    window.editSection = (id) => {
        openSectionModal(id);
    };

   window.deleteSection = async (id) => {
  if (!confirm("Delete this section and all its data?")) return;

  await fetch(API.SECTIONS.DELETE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id })
  });

  fetchProducts();
};

window.deleteTile = async (id) => {
  if (!confirm("Delete this service and all colours?")) return;

  await fetch(API.BRANDS.DELETE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id })
  });

  fetchProducts();

  await fetch(API.COLORS.DELETE, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ id: colourId })
});
};







    window.editTile = (id) => {
        openTileModal(id);
    };

    

    window.goBack = () => {
        state.view = 'list';
        state.currentSectionId = null;
        render();
    };

    window.logout = () => {
        if (confirm('Log out?')) {
            localStorage.removeItem('authToken');
            window.location.href = '../../../../index.html';
        }
    };

    // Modal Close Listeners
    document.getElementById('close-section-modal').onclick = () => sectionModal.classList.add('hidden');
    document.getElementById('cancel-section-btn').onclick = () => sectionModal.classList.add('hidden');
    document.getElementById('close-tile-modal').onclick = () => tileModal.classList.add('hidden');
    document.getElementById('cancel-tile-btn').onclick = () => tileModal.classList.add('hidden');

    fetchProducts();



}

