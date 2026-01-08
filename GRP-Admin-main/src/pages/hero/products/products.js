// Auth Check
if (!localStorage.getItem('authToken')) window.location.href = '../../../../index.html';

document.addEventListener('DOMContentLoaded', () => {
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

    // State
    /* 
       Data Structure:
       [
         { 
           id: "sec_1", title: "Ceramic", description: "...", thumbnail: "...",
           tiles: [
             { id: "tile_1", name: "Elbano", image: "...", colours: [{ name: "Red", image: "..." }] }
           ]
         }
       ]
    */
    let productsData = JSON.parse(localStorage.getItem('productsData')) || [];
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

    const save = () => {
        localStorage.setItem('productsData', JSON.stringify(productsData));
        render();
    };

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

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                        <div class="h-56 bg-gray-100 relative">
                            <img src="${tile.image || 'https://via.placeholder.com/400x300?text=Tile'}" class="w-full h-full object-cover">
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
                                        <div class="w-6 h-6 rounded-full border border-gray-200 shadow-sm relative group/color" title="${c.name || 'Colour'}">
                                            <img src="${c.image}" class="w-full h-full object-cover rounded-full">
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
            state.tempSectionThumb = section.thumbnail;
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

    sectionForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = sectionIdInput.value;
        const newData = {
            id: id || Date.now().toString(),
            title: sectionTitleInput.value,
            description: sectionDescInput.value,
            thumbnail: state.tempSectionThumb,
            tiles: id ? (productsData.find(s => s.id === id)?.tiles || []) : []
        };

        if (id) {
            const index = productsData.findIndex(s => s.id === id);
            productsData[index] = newData;
        } else {
            productsData.push(newData);
        }
        save();
        sectionModal.classList.add('hidden');
    });

    // --- MODAL & LOGIC: TILES ---

    const openTileModal = (id = null) => {
        tileModal.classList.remove('hidden');
        tileForm.reset();
        coloursList.innerHTML = '';
        state.tempColours = [];

        if (id) {
            const section = productsData.find(s => s.id === state.currentSectionId);
            const tile = section.tiles.find(t => t.id === id);

            tileIdInput.value = tile.id;
            tileNameInput.value = tile.name;
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

    window.removeColour = (index) => {
        state.tempColours.splice(index, 1);
        renderColoursList();
    };

    tileForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const sectionIndex = productsData.findIndex(s => s.id === state.currentSectionId);
        const tileId = tileIdInput.value;

        const newTile = {
            id: tileId || Date.now().toString() + '_tile',
            name: tileNameInput.value,
            image: state.tempTileImage,
            colours: state.tempColours
        };

        if (!productsData[sectionIndex].tiles) productsData[sectionIndex].tiles = [];

        if (tileId) {
            const tileIndex = productsData[sectionIndex].tiles.findIndex(t => t.id === tileId);
            productsData[sectionIndex].tiles[tileIndex] = newTile;
        } else {
            productsData[sectionIndex].tiles.push(newTile);
        }

        save();
        tileModal.classList.add('hidden');
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

    window.deleteSection = (id) => {
        if (confirm('Delete this section and all its contents?')) {
            productsData = productsData.filter(s => s.id !== id);
            save();
        }
    };

    window.editTile = (id) => {
        openTileModal(id);
    };

    window.deleteTile = (id) => {
        const sIndex = productsData.findIndex(s => s.id === state.currentSectionId);
        if (confirm('Delete this series?')) {
            productsData[sIndex].tiles = productsData[sIndex].tiles.filter(t => t.id !== id);
            save();
        }
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

    render();
});
