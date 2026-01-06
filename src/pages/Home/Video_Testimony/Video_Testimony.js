
    // 1. Initial Data (Based on your provided code)
    let testimonialData = [];


    // Helpers from your frontend code
    function isInstagram(url) { return url.includes("instagram.com"); }
    function getYouTubeId(url) { 
        try { 
            const u = new URL(url); 
            if(u.pathname.startsWith('/shorts/')) return u.pathname.split('/')[2]; 
            if(u.hostname==='youtu.be') return u.pathname.slice(1); 
            if(u.hostname.includes('youtube.com')) return u.searchParams.get('v'); 
            return null; 
        } catch(e){return null;} 
    }


    function fetchTestimonials() {
  fetch("http://localhost/GRP-Backend/api/video-testimonials/video-list.php")
    .then(res => res.json())
    .then(data => {
      testimonialData = data;
      renderGrid();
      updateEmptyState();
    });
}

    // Initialize
    document.addEventListener('DOMContentLoaded', () => {
  fetchTestimonials();
  lucide.createIcons();
  setupEventListeners();
});


    // --- RENDER GRID ---
    function renderGrid() {
        const grid = document.getElementById('video-grid');
        const emptyState = document.getElementById('empty-state');
        
        grid.innerHTML = '';
        
        if (testimonialData.length === 0) {
            emptyState.classList.remove('hidden');
            grid.classList.add('hidden');
            return;
        }
        
        emptyState.classList.add('hidden');
        grid.classList.remove('hidden');

        testimonialData.forEach((item, index) => {
            const card = document.createElement('div');
            card.className = `
    video-card group bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden
`;


            card.style.animationDelay = `${index * 0.1}s`;
            // card.style.opacity = '0';
            
            // Determine Icon type
            const isInstagramVideo = isInstagram(item.video_url);
            const platformIcon = isInstagramVideo 
                ? `<div class="platform-badge bg-gradient-to-br from-pink-500 to-purple-600 text-white p-1.5 rounded-lg shadow-lg transform -translate-y-2">
                      <i data-lucide="instagram" class="w-3 h-3"></i>
                   </div>` 
                : `<div class="platform-badge bg-gradient-to-br from-red-500 to-red-600 text-white p-1.5 rounded-lg shadow-lg transform -translate-y-2">
                      <i data-lucide="youtube" class="w-3 h-3"></i>
                   </div>`;

            // Generate stars for rating
            const stars = '★'.repeat(item.rating) + '☆'.repeat(5 - item.rating);
            
            card.innerHTML = `
                <div class="video-thumbnail relative aspect-[9/16] bg-gray-900 overflow-hidden">
    <img src="${item.thumbnail}" class="w-full h-full object-cover">

    <!-- Platform Indicator -->
    <div class="absolute top-3 right-3">
        ${platformIcon}
    </div>

    <!-- Gradient overlay -->
    <div class="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
        <h4 class="text-white font-bold text-sm truncate">${item.title}</h4>
        <p class="text-white/80 text-xs truncate mt-1">"${item.quote}"</p>
    </div>

    <!-- Action buttons -->
    <div class="absolute inset-0 z-20
        bg-gradient-to-b from-black/60 via-transparent to-black/60
        opacity-0 group-hover:opacity-100
        pointer-events-none group-hover:pointer-events-auto
        transition-all duration-300
        flex items-center justify-center gap-3">

        <button onclick="editVideo(${item.id})"
            class="z-30 p-3 bg-white text-gray-700 rounded-full hover:bg-blue-50 hover:text-blue-600 shadow-lg">
            <i data-lucide="pencil" class="w-4 h-4"></i>
        </button>

        <button onclick="deleteVideo(${item.id})"
            class="z-30 p-3 bg-white text-red-500 rounded-full hover:bg-red-50 hover:text-red-600 shadow-lg">
            <i data-lucide="trash-2" class="w-4 h-4"></i>
        </button>
    </div>
</div>

                <div class="p-4">
                    <div class="flex justify-between items-start mb-2">
                        <div>
                            <p class="text-sm font-bold text-gray-800">${item.name}</p>
                            <p class="text-xs text-gray-500">${item.role}</p>
                        </div>
                        <span class="text-xs font-medium bg-gradient-to-r from-amber-50 to-yellow-50 px-2 py-1 rounded text-amber-700 border border-amber-200">
                            ${stars}
                        </span>
                    </div>
                    <div class="mt-3 flex items-center justify-between text-xs text-gray-400 border-t border-gray-100 pt-2">
                        <span class="flex items-center gap-1">
                            <i data-lucide="clock" class="w-3 h-3"></i>
                            ${item.duration}
                        </span>
                        <a href="${item.video_url}" 
                           target="_blank" 
                           class="hover:text-blue-600 flex items-center gap-1 transition-all duration-300 action-btn">
                            Watch <i data-lucide="external-link" class="w-3 h-3"></i>
                        </a>
                    </div>
                </div>
            `;
            grid.appendChild(card);
        });
        
        setTimeout(() => lucide.createIcons(), 100);
    }

    function updateEmptyState() {
        const emptyState = document.getElementById('empty-state');
        const grid = document.getElementById('video-grid');
        
        if (testimonialData.length === 0) {
            emptyState.classList.remove('hidden');
            grid.classList.add('hidden');
        } else {
            emptyState.classList.add('hidden');
            grid.classList.remove('hidden');
        }
    }

    // --- MODAL & FORM LOGIC ---
    const modal = document.getElementById('video-modal');
    const modalContent = document.getElementById('modal-content');

    function openModal(index = null) {
        modal.classList.remove('hidden');
        setTimeout(() => {
            modal.classList.remove('opacity-0');
            modalContent.classList.remove('scale-95');
            modalContent.classList.add('scale-100');
        }, 10);

        const isEdit = index !== null;
        document.getElementById('modal-title').textContent = isEdit ? 'Edit Video Testimonial' : 'Add Video Testimonial';
        document.getElementById('video-index').value = index ?? -1;
        
        if (isEdit) {
            const data = testimonialData[index];
            document.getElementById('input-url').value = data.video_url;
            document.getElementById('input-name').value = data.name;
            document.getElementById('input-role').value = data.role;
            document.getElementById('input-title').value = data.title;
            document.getElementById('input-quote').value = data.quote;
            document.getElementById('input-rating').value = data.rating;
            document.getElementById('input-duration').value = data.duration;
            document.getElementById('input-thumbnail').value = data.thumbnail;
            document.getElementById('thumb-preview').src = data.thumbnail;
            
            // Update rating preview
            updateRatingPreview(data.rating);
        } else {
            document.getElementById('input-url').value = '';
            document.getElementById('input-name').value = '';
            document.getElementById('input-role').value = '';
            document.getElementById('input-title').value = '';
            document.getElementById('input-quote').value = '';
            document.getElementById('input-rating').value = '5';
            document.getElementById('input-duration').value = '';
            document.getElementById('input-thumbnail').value = 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=400&auto=format&fit=crop';
            document.getElementById('thumb-preview').src = document.getElementById('input-thumbnail').value;
            
            // Update rating preview
            updateRatingPreview(5);
        }
        
        // Update character count
        updateQuoteCharCount();
        
        // Focus on URL input
        setTimeout(() => {
            document.getElementById('input-url').focus();
        }, 300);
    }

    function closeModal() {
        modal.classList.add('opacity-0');
        modalContent.classList.remove('scale-100');
        modalContent.classList.add('scale-95');
        setTimeout(() => modal.classList.add('hidden'), 300);
    }
    
    function editVideo(id) {
  const index = testimonialData.findIndex(v => v.id == id);
  if (index === -1) return;

  openModal(index);
}


    // --- PREVIEW LOGIC ---
    function previewThumbnail() {
        const url = document.getElementById('input-url').value.trim();
        const thumbInput = document.getElementById('input-thumbnail');
        const thumbPrev = document.getElementById('thumb-preview');
        const status = document.getElementById('url-status');
        const previewBtn = document.getElementById('preview-btn');
        const urlInput = document.getElementById('input-url');
        
        if (!url) {
            showToast('Please enter a video URL first', 'warning');
            urlInput.classList.add('animate-shake');
            setTimeout(() => urlInput.classList.remove('animate-shake'), 300);
            return;
        }
        
        // Show loading state
        previewBtn.disabled = true;
        previewBtn.innerHTML = '<i data-lucide="loader" class="w-4 h-4 animate-spin"></i><span>Checking...</span>';
        urlInput.classList.add('url-loading', 'loading');
        
        setTimeout(() => {
            if (getYouTubeId(url)) {
                const vid = getYouTubeId(url);
                // Try multiple YouTube thumbnail resolutions
                const ytThumbs = [
                    `https://img.youtube.com/vi/${vid}/maxresdefault.jpg`,
                    `https://img.youtube.com/vi/${vid}/sddefault.jpg`,
                    `https://img.youtube.com/vi/${vid}/hqdefault.jpg`
                ];
                
                thumbInput.value = ytThumbs[0];
                thumbPrev.src = ytThumbs[0];
                
                // Test if maxresdefault exists
                testImage(ytThumbs[0]).then(exists => {
                    if (!exists) {
                        thumbPrev.src = ytThumbs[1];
                        thumbInput.value = ytThumbs[1];
                    }
                });
                
                status.innerHTML = `<span class="flex items-center gap-1"><i data-lucide="check-circle" class="w-3 h-3"></i> YouTube video found: ${vid}</span>`;
                status.className = "text-xs text-green-600 mt-2 flex items-center gap-1";
                
                showToast('YouTube thumbnail loaded successfully!', 'success');
            } else if (isInstagram(url)) {
                status.innerHTML = `<span class="flex items-center gap-1"><i data-lucide="instagram" class="w-3 h-3"></i> Instagram Reel detected. Please paste a manual thumbnail URL.</span>`;
                status.className = "text-xs text-pink-600 mt-2 flex items-center gap-1";
                
                // Use a placeholder for Instagram
                thumbPrev.src = 'https://images.unsplash.com/photo-1611262588024-d12430b98920?q=80&w=400&auto=format&fit=crop';
                thumbInput.value = 'https://images.unsplash.com/photo-1611262588024-d12430b98920?q=80&w=400&auto=format&fit=crop';
                
                showToast('Instagram Reel detected. Please add a thumbnail manually.', 'info');
            } else {
                status.innerHTML = `<span class="flex items-center gap-1"><i data-lucide="alert-circle" class="w-3 h-3"></i> Invalid URL format. Please enter a YouTube or Instagram URL.</span>`;
                status.className = "text-xs text-red-600 mt-2 flex items-center gap-1";
                
                urlInput.classList.add('animate-shake');
                setTimeout(() => urlInput.classList.remove('animate-shake'), 300);
                
                showToast('Invalid URL format', 'error');
            }
            
            // Reset button
            previewBtn.disabled = false;
            previewBtn.innerHTML = '<i data-lucide="search" class="w-4 h-4"></i><span>Preview</span>';
            urlInput.classList.remove('loading');
        }, 800);
    }
    
    function testImage(url) {
        return new Promise(resolve => {
            const img = new Image();
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            img.src = url;
        });
    }

    // --- SAVE / DELETE ---
    function saveVideo() {
  const index = document.getElementById("video-index").value;

  const fd = new FormData();
  fd.append("name", document.getElementById("input-name").value.trim());
  fd.append("role", document.getElementById("input-role").value.trim());
  fd.append("title", document.getElementById("input-title").value.trim());
  fd.append("video_url", document.getElementById("input-url").value.trim());
  fd.append("rating", document.getElementById("input-rating").value);
  fd.append("quote", document.getElementById("input-quote").value.trim());
  fd.append("duration", document.getElementById("input-duration").value.trim());
  fd.append("thumbnail", document.getElementById("input-thumbnail").value.trim());


  // 🔹 thumbnail file (optional)
 

  let api = "video-create.php";

  // ✅ EDIT MODE
  if (index !== "-1") {
    fd.append("id", testimonialData[index].id);
    api = "video-update.php";
  }

  fetch(`http://localhost/GRP-Backend/api/video-testimonials/${api}`, {
    method: "POST",
    body: fd
  })
  .then(r => r.json())
  .then(res => {
    if (!res.status) {
      showToast(res.message, "error");
      return;
    }

    closeModal();
    fetchTestimonials();
    showToast(index === "-1" ? "Video added" : "Video updated", "success");
  })
  .catch(() => showToast("Server error", "error"));
}





    function deleteVideo(id) {
  if (!confirm("Delete this testimonial?")) return;

  const fd = new FormData();
  fd.append("id", id);

  fetch("http://localhost/GRP-Backend/api/video-testimonials/video-delete.php", {
    method: "POST",
    body: fd
  })
  .then(r => r.json())
  .then(() => {
    fetchTestimonials();
    showToast("Video testimonial deleted", "info");
  });
}



    // --- EVENT LISTENERS SETUP ---
    function setupEventListeners() {
        // Quote character counter
        const quoteInput = document.getElementById('input-quote');
        quoteInput.addEventListener('input', updateQuoteCharCount);
        
        // Rating select change
        const ratingInput = document.getElementById('input-rating');
        ratingInput.addEventListener('change', function() {
            updateRatingPreview(parseInt(this.value));
        });
        
        // Thumbnail input change
        const thumbInput = document.getElementById('input-thumbnail');
        thumbInput.addEventListener('input', function() {
            const thumbPrev = document.getElementById('thumb-preview');
            if (this.value) {
                thumbPrev.src = this.value;
            }
        });
        
        // Enter key to trigger preview
        const urlInput = document.getElementById('input-url');
        urlInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                previewThumbnail();
            }
        });
    }
    
    function updateQuoteCharCount() {
        const quoteInput = document.getElementById('input-quote');
        const charCount = document.getElementById('quote-char-count');
        const count = quoteInput.value.length;
        charCount.textContent = `${count}/120 characters`;
        
        if (count > 100) {
            charCount.classList.add('text-amber-600');
            charCount.classList.remove('text-gray-400');
        } else {
            charCount.classList.remove('text-amber-600');
            charCount.classList.add('text-gray-400');
        }
    }
    
    function updateRatingPreview(rating) {
        const ratingPreview = document.getElementById('rating-preview');
        const stars = '★'.repeat(rating) + '☆'.repeat(5 - rating);
        ratingPreview.innerHTML = stars;
        ratingPreview.classList.add('animate-pulse-once');
        setTimeout(() => ratingPreview.classList.remove('animate-pulse-once'), 300);
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
