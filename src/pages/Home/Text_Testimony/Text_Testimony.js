
    // 1. Initial Data (From your main site code)
    let reviewsData = [
        { 
            id: 1, 
            name: "John Doe", 
            role: "Factory Owner", 
            text: "The industrial roofing system exceeded our expectations. Professional, efficient, and top-notch quality.", 
            rating: 5 
        },
        { 
            id: 2, 
            name: "Sarah Lee", 
            role: "Ops Manager", 
            text: "Rapid waterproofing solution executed flawlessly. They truly understand industrial needs.", 
            rating: 5 
        },
        { 
            id: 3, 
            name: "Mike Ross", 
            role: "Facility Director", 
            text: "Preventive maintenance saved us thousands. Highly reliable partners for the long term.", 
            rating: 4 
        },
        { 
            id: 4, 
            name: "Emily White", 
            role: "Lead Architect", 
            text: "Innovative solar integration that respects the building's aesthetic. A pleasure to work with.", 
            rating: 5 
        },
        { 
            id: 5, 
            name: "Robert King", 
            role: "Plant Manager", 
            text: "Waterproofing that withstands extreme chemical exposure. Unmatched technical expertise.", 
            rating: 5 
        },
        { 
            id: 6, 
            name: "Lisa Miller", 
            role: "Property Director", 
            text: "Kept our complex running during severe weather. The most responsive team we've hired.", 
            rating: 5 
        },
    ];

    // Color gradients for avatars
    const avatarGradients = [
        'gradient-bg-1',
        'gradient-bg-2',
        'gradient-bg-3',
        'gradient-bg-4',
        'gradient-bg-5',
        'gradient-bg-6'
    ];

    // Rating labels
    const ratingLabels = {
        1: "1 Star - Poor",
        2: "2 Stars - Fair",
        3: "3 Stars - Good",
        4: "4 Stars - Very Good",
        5: "5 Stars - Excellent"
    };

    // Initialize
    document.addEventListener('DOMContentLoaded', () => {
        renderGrid();
        lucide.createIcons();
        setupEventListeners();
        updateEmptyState();
    });

    // --- HELPER: Generate Star HTML ---
    function getStarsHtml(rating, size = 'w-4 h-4', animate = false) {
        return Array(5).fill(0).map((_, i) => 
            `<svg class="${size} ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'} ${animate ? 'animate-star-glow' : ''}" 
                  style="animation-delay: ${i * 0.1}s"
                  viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>`
        ).join('');
    }

    // --- RENDER GRID ---
    function renderGrid() {
        const grid = document.getElementById('review-grid');
        const emptyState = document.getElementById('empty-state');
        
        grid.innerHTML = '';
        
        if (reviewsData.length === 0) {
            emptyState.classList.remove('hidden');
            grid.classList.add('hidden');
            return;
        }
        
        emptyState.classList.add('hidden');
        grid.classList.remove('hidden');

        reviewsData.forEach((item, index) => {
            const card = document.createElement('div');
            card.className = `
review-card group bg-white p-6 rounded-xl shadow-sm border border-gray-200
flex flex-col justify-between
`;

            card.style.animationDelay = `${index * 0.1}s`;
            // card.style.opacity = '0';
            
            // Get avatar gradient based on index
            const gradientClass = avatarGradients[index % avatarGradients.length];
            
            // Add quote marks
            const quoteMark = `<div class="quote-mark absolute top-2 right-2 text-6xl text-blue-50 font-serif">"</div>`;
            
            card.innerHTML = `
                <div class="relative">
                    ${quoteMark}
                    
                    <div class="flex justify-between items-start mb-4">
                        <div class="flex items-center gap-3">
                            <div class="review-avatar w-12 h-12 rounded-full ${gradientClass} flex items-center justify-center text-white font-bold text-lg shadow-lg">
                                ${item.name.charAt(0)}
                            </div>
                            <div>
                                <h4 class="font-bold text-gray-800">${item.name}</h4>
                                <p class="text-sm text-gray-500 font-medium">${item.role}</p>
                            </div>
                        </div>
                        <div class="star-rating flex gap-1">
                            ${getStarsHtml(item.rating)}
                        </div>
                    </div>
                    
                    <p class="text-gray-600 text-sm italic leading-relaxed mb-4 relative z-10">"${item.text}"</p>
                </div>
                
                <div class="pt-4 border-t border-gray-100 flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                     <button onclick="editReview(${index})" 
                             class="action-btn text-sm font-medium text-blue-600 hover:text-blue-800 px-4 py-2 bg-blue-50 hover:bg-blue-100 rounded-lg transition-all duration-300 flex items-center gap-2">
                         <i data-lucide="pencil" class="w-4 h-4"></i>
                         Edit
                     </button>
                     <button onclick="deleteReview(${index})" 
                             class="action-btn text-sm font-medium text-red-600 hover:text-red-800 px-4 py-2 bg-red-50 hover:bg-red-100 rounded-lg transition-all duration-300 flex items-center gap-2">
                         <i data-lucide="trash-2" class="w-4 h-4"></i>
                         Delete
                     </button>
                </div>
            `;
            grid.appendChild(card);
        });
        
        setTimeout(() => lucide.createIcons(), 100);
    }

    function updateEmptyState() {
        const emptyState = document.getElementById('empty-state');
        const grid = document.getElementById('review-grid');
        
        if (reviewsData.length === 0) {
            emptyState.classList.remove('hidden');
            grid.classList.add('hidden');
        } else {
            emptyState.classList.add('hidden');
            grid.classList.remove('hidden');
        }
    }

    // --- MODAL LOGIC ---
    const modal = document.getElementById('review-modal');
    const modalContent = document.getElementById('modal-content');

    function openModal(index = null) {
        modal.classList.remove('hidden');
        setTimeout(() => {
            modal.classList.remove('opacity-0');
            modalContent.classList.remove('scale-95');
            modalContent.classList.add('scale-100');
        }, 10);

        const isEdit = index !== null;
        document.getElementById('modal-title').textContent = isEdit ? 'Edit Review' : 'Add Review';
        document.getElementById('review-index').value = index ?? -1;
        
        if (isEdit) {
            const data = reviewsData[index];
            document.getElementById('input-name').value = data.name;
            document.getElementById('input-role').value = data.role;
            document.getElementById('input-text').value = data.text;
            document.getElementById('input-rating').value = data.rating;
            updateStarPreview(data.rating);
        } else {
            document.getElementById('input-name').value = '';
            document.getElementById('input-role').value = '';
            document.getElementById('input-text').value = '';
            document.getElementById('input-rating').value = '5';
            updateStarPreview(5);
        }
        
        // Update character count
        updateTextCharCount();
        
        // Focus on name input
        setTimeout(() => {
            document.getElementById('input-name').focus();
        }, 300);
    }

    function closeModal() {
        modal.classList.add('opacity-0');
        modalContent.classList.remove('scale-100');
        modalContent.classList.add('scale-95');
        setTimeout(() => modal.classList.add('hidden'), 300);
    }
    
    function editReview(index) {
        // Add animation to the clicked card
        const cards = document.querySelectorAll('.review-card');
        if (cards[index]) {
            cards[index].classList.add('animate-pulse-once');
            setTimeout(() => cards[index].classList.remove('animate-pulse-once'), 300);
        }
        
        openModal(index);
    }

    function updateStarPreview(value) {
        const ratingPreview = document.getElementById('rating-preview');
        const ratingLabel = document.getElementById('rating-label');
        
        // Update stars
        ratingPreview.innerHTML = getStarsHtml(value, 'w-6 h-6', true);
        
        // Update label
        ratingLabel.textContent = ratingLabels[value];
        ratingLabel.classList.add('animate-pulse-once');
        setTimeout(() => ratingLabel.classList.remove('animate-pulse-once'), 300);
    }

    // --- CRUD ACTIONS ---
    function saveReview() {
        const index = parseInt(document.getElementById('review-index').value);
        const name = document.getElementById('input-name').value.trim();
        const role = document.getElementById('input-role').value.trim();
        const text = document.getElementById('input-text').value.trim();
        const rating = parseInt(document.getElementById('input-rating').value);

        // Validation
        if (!name) {
            showToast('Please enter client name', 'error');
            document.getElementById('input-name').classList.add('animate-shake');
            setTimeout(() => document.getElementById('input-name').classList.remove('animate-shake'), 300);
            return;
        }
        
        if (!text) {
            showToast('Please enter review text', 'error');
            document.getElementById('input-text').classList.add('animate-shake');
            setTimeout(() => document.getElementById('input-text').classList.remove('animate-shake'), 300);
            return;
        }
        
        if (text.length > 300) {
            showToast('Review text must be 300 characters or less', 'error');
            return;
        }

        const newData = { 
            id: Date.now(), 
            name, 
            role, 
            text, 
            rating 
        };

        // Show loading state
        const saveBtn = document.getElementById('save-review-btn');
        const saveBtnText = document.getElementById('save-btn-text');
        const saveSpinner = document.getElementById('save-spinner');
        
        saveBtn.disabled = true;
        saveBtnText.textContent = 'Saving...';
        saveSpinner.classList.remove('hidden');

        // Simulate API call
        setTimeout(() => {
            if (index >= 0) {
                reviewsData[index] = { ...reviewsData[index], ...newData };
                showToast('Review updated successfully!', 'success');
            } else {
                reviewsData.push(newData);
                showToast('Review added successfully!', 'success');
            }

            renderGrid();
            updateEmptyState();
            closeModal();
            
            // Reset save button
            saveBtn.disabled = false;
            saveBtnText.textContent = 'Save Review';
            saveSpinner.classList.add('hidden');
            
            console.log("Updated Reviews:", reviewsData);
        }, 800);
    }

    function deleteReview(index) {
        // Add shake animation to the card
        const cards = document.querySelectorAll('.review-card');
        if (cards[index]) {
            cards[index].classList.add('animate-shake');
            
            setTimeout(() => {
                if (confirm("Are you sure you want to delete this review?")) {
                    // Add fade out animation
                    cards[index].style.opacity = '0.5';
                    cards[index].style.transform = 'scale(0.95)';
                    
                    setTimeout(() => {
                        reviewsData.splice(index, 1);
                        renderGrid();
                        updateEmptyState();
                        showToast('Review deleted', 'info');
                    }, 300);
                } else {
                    cards[index].classList.remove('animate-shake');
                }
            }, 300);
        }
    }

    // --- EVENT LISTENERS SETUP ---
    function setupEventListeners() {
        // Text character counter
        const textInput = document.getElementById('input-text');
        textInput.addEventListener('input', updateTextCharCount);
        
        // Rating slider input
        const ratingInput = document.getElementById('input-rating');
        ratingInput.addEventListener('input', function() {
            updateStarPreview(parseInt(this.value));
        });
        
        // Rating slider mouse wheel
        ratingInput.addEventListener('wheel', function(e) {
            e.preventDefault();
            const delta = e.deltaY > 0 ? -1 : 1;
            const newValue = Math.min(5, Math.max(1, parseInt(this.value) + delta));
            this.value = newValue;
            updateStarPreview(newValue);
        });
    }
    
    function updateTextCharCount() {
        const textInput = document.getElementById('input-text');
        const charCount = document.getElementById('text-char-count');
        const count = textInput.value.length;
        charCount.textContent = `${count}/300 characters`;
        
        if (count > 250) {
            charCount.classList.add('text-red-500');
            charCount.classList.remove('text-gray-400');
        } else if (count > 200) {
            charCount.classList.add('text-amber-500');
            charCount.classList.remove('text-gray-400');
        } else {
            charCount.classList.remove('text-red-500', 'text-amber-500');
            charCount.classList.add('text-gray-400');
        }
    }

    // --- TOAST NOTIFICATION ---
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

    // --- NAVIGATION ---
      function goBack() {
    const container = document.querySelector('.max-w-7xl');

    // Safety fallback
    if (!container) {
        navigateHome();
        return;
    }

    // Exit animation
    container.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    container.style.opacity = '1';
    container.style.transform = 'translateX(0)';

    requestAnimationFrame(() => {
        container.style.opacity = '0';
        container.style.transform = 'translateX(-20px)';
    });

    // Navigate AFTER animation
    setTimeout(() => {
        navigateHome();
    }, 300);
}

/* ============================
   REAL NAVIGATION
============================ */
function navigateHome() {
    parent.document.getElementById('app').innerHTML = `
        <iframe 
            src="./src/pages/Home/Home.html"
            class="w-full h-[calc(100vh-64px)] border-0">
        </iframe>
    `;
}
