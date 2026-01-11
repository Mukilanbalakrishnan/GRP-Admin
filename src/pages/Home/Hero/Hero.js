
const API_BASE_URL = window.ENV?.API_BASE_URL;

if (!API_BASE_URL) {
  console.error("❌ API_BASE_URL missing (env.js not loaded)");
}
        let heroState = {
    images: [] 
};



        let replaceIndex = null;
        let isDragging = false;
        let dragStartY = 0;
        let dragStartX = 0;
        
        // Initialize
        document.addEventListener('DOMContentLoaded', () => {
            lucide.createIcons();
            loadHeroImages();
            renderImages();
            setupFileUpload();
            setupReplaceLogic();
            setupImageDragAndDrop();

            updateEmptyState();
        });

        // ---------------- RENDER ----------------
        function renderImages() {
            const grid = document.getElementById('image-grid');
            const count = document.getElementById('img-count');
            const emptyState = document.getElementById('empty-state');

            grid.innerHTML = '';
            
            // Update count with animation
            count.classList.add('animate-pulse-once');
            setTimeout(() => count.classList.remove('animate-pulse-once'), 300);
            count.innerText = `${heroState.images.length} Image${heroState.images.length !== 1 ? 's' : ''}`;
            
            // Show/hide empty state
            if (heroState.images.length === 0) {
                emptyState.classList.remove('hidden');
                grid.classList.add('hidden');
            } else {
                emptyState.classList.add('hidden');
                grid.classList.remove('hidden');
                
                heroState.images.forEach((img, index) => {
    const imageURL = img.isNew
        ? URL.createObjectURL(img.file)
        : `${API_BASE_URL}/` + img.image_path;


    const card = document.createElement('div');
    card.className =
        "image-card group relative aspect-video bg-gray-100 rounded-lg overflow-hidden border shadow-sm";
    card.setAttribute("data-index", index);
    card.setAttribute("draggable", "true");

    card.innerHTML = `
        <img src="${imageURL}" class="w-full h-full object-cover">

        <div class="hover-buttons absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end justify-center p-4">
            <div class="flex gap-2">
                <button onclick="triggerReplace(${index})"
                    class="p-3 bg-white rounded-full">
                    <i data-lucide="pencil"></i>
                </button>

                <button onclick="removeImage(${index})"
                    class="p-3 bg-white rounded-full text-red-500">
                    <i data-lucide="trash-2"></i>
                </button>

                <button class="p-3 bg-white rounded-full cursor-move handle">
                    <i data-lucide="grip-vertical"></i>
                </button>
            </div>
        </div>

        <span class="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
            Slide ${index + 1}
        </span>
    `;

    grid.appendChild(card);
});

                
                // Reinitialize icons after adding new images
                setTimeout(() => lucide.createIcons(), 100);
                
                // Setup drag and drop for reordering
                setupImageDragAndDrop();
            }
        }
        
        // ---------------- DRAG AND DROP REORDERING ----------------
        function setupImageDragAndDrop() {
            const grid = document.getElementById('image-grid');
            const cards = grid.querySelectorAll('.image-card');
            let draggedItem = null;
            
            cards.forEach(card => {
                const handle = card.querySelector('.handle');
                
                // Use the handle for dragging
                if (handle) {
                    handle.addEventListener('mousedown', startDrag);
                    handle.addEventListener('touchstart', startDragTouch);
                }
                
                // Or allow dragging from anywhere on the card
                card.addEventListener('dragstart', handleDragStart);
                card.addEventListener('dragover', handleDragOver);
                card.addEventListener('dragenter', handleDragEnter);
                card.addEventListener('dragleave', handleDragLeave);
                card.addEventListener('drop', handleDrop);
                card.addEventListener('dragend', handleDragEnd);
            });
        }
        
        function startDrag(e) {
            const card = e.target.closest('.image-card');
            card.draggable = true;
            card.setAttribute('dragging', 'true');
            
            // Create a ghost image for dragging
            const ghost = card.cloneNode(true);
            ghost.style.width = `${card.offsetWidth}px`;
            ghost.style.position = 'absolute';
            ghost.style.opacity = '0.8';
            ghost.style.zIndex = '1000';
            ghost.style.pointerEvents = 'none';
            ghost.classList.add('sortable-drag');
            document.body.appendChild(ghost);
            
            // Position the ghost image at the cursor
            const moveGhost = (e) => {
                ghost.style.left = `${e.clientX - ghost.offsetWidth / 2}px`;
                ghost.style.top = `${e.clientY - ghost.offsetHeight / 2}px`;
            };
            
            document.addEventListener('mousemove', moveGhost);
            
            // Clean up on mouseup
            const stopDrag = () => {
                document.removeEventListener('mousemove', moveGhost);
                document.body.removeChild(ghost);
                card.removeAttribute('dragging');
                document.removeEventListener('mouseup', stopDrag);
            };
            
            document.addEventListener('mouseup', stopDrag);
            
            e.preventDefault();
        }
        
        function startDragTouch(e) {
            // Similar logic for touch devices
            e.preventDefault();
        }
        
        function handleDragStart(e) {
            draggedItem = this;
            setTimeout(() => this.classList.add('sortable-ghost'), 0);
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/html', this.innerHTML);
        }
        
        function handleDragOver(e) {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
            return false;
        }
        
        function handleDragEnter(e) {
            this.classList.add('sortable-chosen');
        }
        
        function handleDragLeave(e) {
            this.classList.remove('sortable-chosen');
        }
        
        function handleDrop(e) {
            e.stopPropagation();
            e.preventDefault();
            
            if (draggedItem !== this) {
                const draggedIndex = parseInt(draggedItem.getAttribute('data-index'));
                const targetIndex = parseInt(this.getAttribute('data-index'));
                
                // Swap the images in the array
                [heroState.images[draggedIndex], heroState.images[targetIndex]] = 
                [heroState.images[targetIndex], heroState.images[draggedIndex]];
                
                // Re-render with animation
                renderImages();
                showToast('Images reordered successfully!', 'success');
            }
            
            this.classList.remove('sortable-chosen');
            return false;
        }
        
        function handleDragEnd(e) {
            const cards = document.querySelectorAll('.image-card');
            cards.forEach(card => {
                card.classList.remove('sortable-ghost');
                card.classList.remove('sortable-chosen');
            });
            draggedItem = null;
        }

        // ---------------- UPLOAD ----------------
        function setupFileUpload() {
            const dropZone = document.getElementById('drop-zone');
            const fileInput = document.getElementById('file-input');

            dropZone.addEventListener('click', () => {
                fileInput.click();
                dropZone.classList.add('animate-pulse-once');
                setTimeout(() => dropZone.classList.remove('animate-pulse-once'), 300);
            });

            fileInput.addEventListener('change', e => {
                if (handleFiles(e.target.files)) {
                    dropZone.classList.add('animate-pulse-once');
                    setTimeout(() => dropZone.classList.remove('animate-pulse-once'), 300);
                }
                fileInput.value = '';
            });

            ['dragenter', 'dragover'].forEach(evt =>
                dropZone.addEventListener(evt, e => {
                    e.preventDefault();
                    dropZone.classList.add('drag-active');
                })
            );

            ['dragleave', 'drop'].forEach(evt =>
                dropZone.addEventListener(evt, e => {
                    e.preventDefault();
                    dropZone.classList.remove('drag-active');
                })
            );

            dropZone.addEventListener('drop', e => {
                if (handleFiles(e.dataTransfer.files)) {
                    dropZone.classList.add('animate-pulse-once');
                    setTimeout(() => dropZone.classList.remove('animate-pulse-once'), 300);
                }
            });
        }

        function handleFiles(files) {
    if (!files || files.length === 0) return false;

    for (const file of files) {
        if (!file.type.startsWith("image/")) {
            showToast(`${file.name} is not an image`, "error");
            return false;
        }

        if (file.size > 5 * 1024 * 1024) {
            showToast(`${file.name} exceeds 5MB`, "error");
            return false;
        }

        heroState.images.push({
            file,
            isNew: true
        });
    }

    renderImages();
    updateEmptyState();
    showToast("Images added (not saved yet)", "info");
    return true;
}

    


        
        function updateEmptyState() {
            const emptyState = document.getElementById('empty-state');
            const grid = document.getElementById('image-grid');
            
            if (heroState.images.length === 0) {
                emptyState.classList.remove('hidden');
                grid.classList.add('hidden');
            } else {
                emptyState.classList.add('hidden');
                grid.classList.remove('hidden');
            }
        }

        // ---------------- REPLACE ----------------
        function setupReplaceLogic() {
            const replaceInput = document.getElementById('replace-input');

            replaceInput.addEventListener('change', e => {
                const file = e.target.files[0];
                if (!file || !file.type.startsWith('image/')) return;

                if (file.size > 5 * 1024 * 1024) {
                    showToast('File size must be less than 5MB', 'error');
                    return;
                }

                const reader = new FileReader();
                reader.onload = ev => {
                    heroState.images[replaceIndex] = ev.target.result;
                    replaceIndex = null;
                    renderImages();
                    showToast('Image replaced successfully', 'success');
                };
                reader.readAsDataURL(file);
                replaceInput.value = '';
            });
        }

        function triggerReplace(index) {
            // Add animation to the clicked card
            const cards = document.querySelectorAll('.image-card');
            if (cards[index]) {
                cards[index].classList.add('animate-pulse-once');
                setTimeout(() => cards[index].classList.remove('animate-pulse-once'), 300);
            }
            
            replaceIndex = index;
            document.getElementById('replace-input').click();
        }

        // ---------------- DELETE ----------------
        

        // ---------------- SAVE ----------------
       async function saveChanges() {
    const saveButton = document.getElementById('save-button');
    saveButton.disabled = true;

    try {
        let position = 1;

        for (const img of heroState.images) {
            if (!img.isNew) {
                position++;
                continue;
            }

            const formData = new FormData();
            formData.append("image", img.file);
            formData.append("position", position);

            const res = await fetch(
                `${API_BASE_URL}/api/hero/hero-upload.php`,
                {
                    method: "POST",
                    body: formData
                }
            );

            const result = await res.json();
            if (!result.status) throw new Error("Upload failed");

            img.isNew = false;
            img.image_path = result.path;
            delete img.file;

            position++;
        }

        await loadHeroImages(); // 🔄 reload from DB
        showToast("Images saved successfully", "success");

    } catch (e) {
        console.error(e);
        showToast("Upload failed", "error");
    }

    saveButton.disabled = false;
}





        
        // ---------------- TOAST NOTIFICATION ----------------
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

        // ---------------- BACK ----------------
        function goBack() {
    const container = document.querySelector('.max-w-5xl');

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

    // Navigate AFTER animation completes
    setTimeout(() => {
        navigateHome();
    }, 300); // must match animation duration
}


async function loadHeroImages() {
    const res = await fetch(
        `${API_BASE_URL}/api/hero/hero-list.php`
    );
    const result = await res.json();

    if (!result.status) return;

    heroState.images = result.data;
    renderImages();
    updateEmptyState();
}


async function removeImage(index) {
    const image = heroState.images[index];
    if (!confirm("Delete this image?")) return;

    await fetch(
        `${API_BASE_URL}/api/hero/hero-delete.php`,
        {
            method: "POST",
            body: new URLSearchParams({ id: image.id })
        }
    );

    heroState.images.splice(index, 1);
    renderImages();
}

async function saveOrder() {
    const payload = heroState.images.map((img, i) => ({
        id: img.id,
        position: i + 1
    }));




    await fetch(
        `${API_BASE_URL}/api/hero/hero-reorder.php`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        }
    );
}

    // 🔥 Expose functions used in inline HTML
window.removeImage = removeImage;
window.triggerReplace = triggerReplace;
window.saveChanges = saveChanges;

/* -------------------------
   ACTUAL NAVIGATION
------------------------- */
function navigateHome() {
    parent.document.getElementById('app').innerHTML = `
        <iframe 
            src="./src/pages/Home/Home.html"
            class="w-full h-[calc(100vh-64px)] border-0">
        </iframe>
    `;
}
