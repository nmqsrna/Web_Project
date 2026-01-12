let slideIndex = 1; // Current slide index
let slideshowInterval; // Interval for auto-play
let isPlaying = true; // Slideshow playback state
let currentModalIndex = 0; // Current image in modal
const images = []; // Array to store all image sources

// initialize functions on DOM load
document.addEventListener('DOMContentLoaded', function() {
    initializeGallery();
    initializeDropdown();
    initializeSlideshow();
    setupKeyboardNavigation();
    collectImages();
});

// gallery initialization
/**
 * Initialize gallery functionality
 * Sets up photo cards and prepares modal
 */
function initializeGallery() {
    console.log('Gallery initialized');
    
    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
}

/**
 * Collect all images for modal navigation
 */
function collectImages() {
    const photoCards = document.querySelectorAll('.photo-card');
    photoCards.forEach((card) => {
        const img = card.querySelector('img');
        const caption = card.querySelector('.caption h3');
        if (img && caption) {
            images.push({
                src: img.src,
                title: caption.textContent
            });
        }
    });
}

// dropdown menu
/**
 * Initialize dropdown menu functionality
 * Handles click events and outside clicks
 */
function initializeDropdown() {
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdown = document.querySelector('.dropdown');
    
    if (dropdownToggle && dropdown) {
        // Toggle dropdown on click
        dropdownToggle.addEventListener('click', function(e) {
            e.preventDefault();
            dropdown.classList.toggle('active');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove('active');
            }
        });
    }
}

// modal (lightbox) functionality
/**
 * Open modal with image
 * imageSrc - Source of the image to display
 * imageTitle - Title/caption of the image
 */
function openModal(imageSrc, imageTitle) {
    const modal = document.getElementById('photoModal');
    const modalImg = document.getElementById('modalImg');
    const modalCaption = document.getElementById('modalCaption');
    
    if (modal && modalImg) {
        // Find index of current image
        currentModalIndex = images.findIndex(img => img.src.includes(imageSrc));
        if (currentModalIndex === -1) currentModalIndex = 0;
        
        // Display modal
        modal.style.display = 'flex';
        modalImg.src = imageSrc;
        
        // Set caption if provided
        if (modalCaption && imageTitle) {
            modalCaption.textContent = imageTitle;
        }
        
        // Prevent body scrolling when modal is open
        document.body.style.overflow = 'hidden';
        
        // Add fade-in animation
        modalImg.style.animation = 'zoomIn 0.4s ease';
    }
}

/**
 * Close modal
 */
function closeModal() {
    const modal = document.getElementById('photoModal');
    
    if (modal) {
        modal.style.display = 'none';
        // Restore body scrolling
        document.body.style.overflow = 'auto';
    }
}

/**
 * Navigate through images in modal
 * - 1 for next, -1 for previous
 */
function navigateModal(direction) {
    currentModalIndex += direction;
    
    // Wrap around if at ends
    if (currentModalIndex >= images.length) {
        currentModalIndex = 0;
    } else if (currentModalIndex < 0) {
        currentModalIndex = images.length - 1;
    }
    
    // Update modal with new image
    const modalImg = document.getElementById('modalImg');
    const modalCaption = document.getElementById('modalCaption');
    
    if (modalImg && images[currentModalIndex]) {
        modalImg.src = images[currentModalIndex].src;
        modalImg.style.animation = 'zoomIn 0.3s ease';
        
        if (modalCaption) {
            modalCaption.textContent = images[currentModalIndex].title;
        }
    }
}

// slideshow functionality
/**
 * Initialize slideshow with auto-play
 */
function initializeSlideshow() {
    showSlides(slideIndex);
    startSlideshow();
}

/**
 * Change slide by n steps
 *  Number of steps to move (1 for next, -1 for previous)
 */
function plusSlides(n) {
    showSlides(slideIndex += n);
}

/**
 * Jump to specific slide
 *  Slide number to display
 */
function currentSlide(n) {
    showSlides(slideIndex = n);
}

/**
 * Display the current slide
 *  Slide index to display
 */
function showSlides(n) {
    let i;
    const slides = document.getElementsByClassName("mySlides");
    const dots = document.getElementsByClassName("dot");
    
    // Validate slides exist
    if (slides.length === 0) return;
    
    // Wrap around at ends
    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }
    
    // Hide all slides
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    
    // Remove active class from all dots
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    
    // Show current slide and activate corresponding dot
    if (slides[slideIndex - 1]) {
        slides[slideIndex - 1].style.display = "block";
    }
    if (dots[slideIndex - 1]) {
        dots[slideIndex - 1].className += " active";
    }
}

/**
 * Start automatic slideshow
 */
function startSlideshow() {
    if (slideshowInterval) {
        clearInterval(slideshowInterval);
    }
    
    // Auto advance every 4 seconds
    slideshowInterval = setInterval(function() {
        if (isPlaying) {
            plusSlides(1);
        }
    }, 4000);
}

/**
 * Toggle slideshow play/pause
 */
function toggleSlideshow() {
    const playPauseBtn = document.getElementById('playPauseBtn');
    const playPauseText = document.getElementById('playPauseText');
    const icon = playPauseBtn.querySelector('i');
    
    isPlaying = !isPlaying;
    
    if (isPlaying) {
        // Change to pause icon
        icon.className = 'fas fa-pause';
        playPauseText.textContent = 'Pause';
        startSlideshow();
    } else {
        // Change to play icon
        icon.className = 'fas fa-play';
        playPauseText.textContent = 'Play';
        clearInterval(slideshowInterval);
    }
}

// keyboard navigation
/**
 * Setup keyboard shortcuts for enhanced navigation
 */
function setupKeyboardNavigation() {
    document.addEventListener('keydown', function(event) {
        const modal = document.getElementById('photoModal');
        
        // Modal is open
        if (modal && modal.style.display === 'flex') {
            switch(event.key) {
                case 'Escape':
                    closeModal();
                    break;
                case 'ArrowLeft':
                    navigateModal(-1);
                    break;
                case 'ArrowRight':
                    navigateModal(1);
                    break;
            }
        } else {
            // Slideshow controls
            switch(event.key) {
                case 'ArrowLeft':
                    plusSlides(-1);
                    break;
                case 'ArrowRight':
                    plusSlides(1);
                    break;
                case ' ': // Spacebar
                    event.preventDefault();
                    toggleSlideshow();
                    break;
            }
        }
    });
}

// smooth scroll to top
window.addEventListener('scroll', function() {
    // Can be extended to show a "back to top" button
    if (window.pageYOffset > 300) {
        // Show button logic here if needed
    }
});

// page visibility API
/**
 * Pause slideshow when tab is not visible
 * Improves performance and user experience
 */
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Page is hidden, pause slideshow
        clearInterval(slideshowInterval);
    } else {
        // Page is visible again, resume if playing
        if (isPlaying) {
            startSlideshow();
        }
    }
});

// lazy loading 
/**
 * Observe images for lazy loading
 * Improves initial page load performance
 */
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    // Observe all images with data-src attribute
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// error handling
/**
 * Handle image loading errors
 */
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        console.warn('Failed to load image:', this.src);
    });
});

// console message
console.log('%c🎨 Gallery Page Loaded Successfully!', 'color: #3498db; font-size: 16px; font-weight: bold;');
console.log('%c💡 Keyboard Shortcuts:', 'color: #2ecc71; font-size: 14px; font-weight: bold;');
console.log('%c   ← → : Navigate slides/modal', 'color: #95a5a6; font-size: 12px;');
console.log('%c   ESC : Close modal', 'color: #95a5a6; font-size: 12px;');
console.log('%c   SPACE : Play/Pause slideshow', 'color: #95a5a6; font-size: 12px;');
