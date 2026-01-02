
        let heroState = {
            images: [
                "https://images.unsplash.com/photo-1632759145351-1d592919f522?q=80&w=800",
                "https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?q=80&w=800",
                "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w-800"
            ]
        };

        let replaceIndex = null;
        let isDragging = false;
        let dragStartY = 0;
        let dragStartX = 0;
        
        // Initialize
        document.addEventListener('DOMContentLoaded', () => {
            lucide.createIcons();
            renderImages();
            setupFileUpload();
            setupReplaceLogic();
            setupDragAndDrop();
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
                
                heroState.images.forEach((url, index) => {
                    const card = document.createElement('div');
                    card.className = `image-card group relative aspect-video bg-gray-100 rounded-lg overflow-hidden border shadow-sm`;
                    card.setAttribute('data-index', index);
                    card.setAttribute('draggable', 'true');
                    
                    // Add staggered animation
                    card.style.animation = `fadeIn 0.5s ease-out ${index * 0.1}s forwards`;
                    card.style.opacity = '0';
                    
                    card.innerHTML = `
                        <img src="${url}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105">
                        
                        <div class="hover-buttons absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end justify-center p-4">
                            <div class="flex gap-2">
                                <button onclick="triggerReplace(${index})"
                                    class="button-scale p-3 bg-white rounded-full hover:text-blue-600 hover:shadow-lg transition-all duration-300"
                                    title="Replace image">
                                    <i data-lucide="pencil" class="w-4 h-4"></i>
                                </button>
                                
                                <button onclick="removeImage(${index})"
                                    class="button-scale p-3 bg-white rounded-full text-red-500 hover:text-red-600 hover:shadow-lg transition-all duration-300"
                                    title="Delete image">
                                    <i data-lucide="trash-2" class="w-4 h-4"></i>
                                </button>
                                
                                <button class="button-scale p-3 bg-white rounded-full text-gray-600 hover:text-gray-800 hover:shadow-lg transition-all duration-300 cursor-move handle"
                                    title="Drag to reorder">
                                    <i data-lucide="grip-vertical" class="w-4 h-4"></i>
                                </button>
                            </div>
                        </div>
                        
                        <span class="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded transition-all duration-300 group-hover:bg-black/80">
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
            if (heroState.images.length + files.length > 10) {
                showToast('Maximum 10 images allowed', 'error');
                return false;
            }
            
            let validFiles = 0;
            let oversizedFiles = 0;
            
            [...files].forEach(file => {
                if (!file.type.startsWith('image/')) {
                    showToast(`${file.name} is not an image file`, 'error');
                    return;
                }
                
                if (file.size > 5 * 1024 * 1024) { // 5MB limit
                    oversizedFiles++;
                    return;
                }
                
                validFiles++;
                const reader = new FileReader();
                reader.onload = e => {
                    heroState.images.push(e.target.result);
                    renderImages();
                    updateEmptyState();
                    
                    // Show a success toast for each image
                    if (validFiles === 1) {
                        showToast(`${file.name} uploaded successfully`, 'success');
                    }
                };
                reader.readAsDataURL(file);
            });
            
            if (oversizedFiles > 0) {
                showToast(`${oversizedFiles} file(s) exceeded 5MB limit`, 'error');
            }
            
            if (validFiles > 1) {
                showToast(`${validFiles} images uploaded successfully`, 'success');
            }
            
            return validFiles > 0;
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
        function removeImage(index) {
            // Add shake animation
            const cards = document.querySelectorAll('.image-card');
            if (cards[index]) {
                cards[index].classList.add('animate-shake');
                
                setTimeout(() => {
                    if (confirm('Are you sure you want to delete this image?')) {
                        // Add fade out animation
                        cards[index].style.opacity = '0';
                        cards[index].style.transform = 'scale(0.8)';
                        
                        setTimeout(() => {
                            heroState.images.splice(index, 1);
                            renderImages();
                            updateEmptyState();
                            showToast('Image deleted', 'info');
                        }, 300);
                    } else {
                        cards[index].classList.remove('animate-shake');
                    }
                }, 300);
            }
        }

        // ---------------- SAVE ----------------
        function saveChanges() {
            const saveButton = document.getElementById('save-button');
            const saveText = document.getElementById('save-text');
            const saveSpinner = document.getElementById('save-spinner');
            
            // Disable button and show spinner
            saveButton.disabled = true;
            saveText.classList.add('hidden');
            saveSpinner.classList.remove('hidden');
            saveButton.classList.remove('hover:bg-blue-700');
            
            // Simulate API call delay
            setTimeout(() => {
                console.log('Hero Images:', heroState.images);
                
                // Show success animation
                saveButton.classList.remove('bg-blue-600');
                saveButton.classList.add('bg-green-600');
                saveButton.classList.add('animate-pulse-once');
                
                // Show success toast
                showToast('Changes saved successfully!', 'success');
                
                // Reset button after delay
                setTimeout(() => {
                    saveButton.classList.remove('bg-green-600');
                    saveButton.classList.remove('animate-pulse-once');
                    saveButton.classList.add('bg-blue-600');
                    saveButton.classList.add('hover:bg-blue-700');
                    
                    saveText.classList.remove('hidden');
                    saveSpinner.classList.add('hidden');
                    saveButton.disabled = false;
                }, 1500);
            }, 1200);
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
