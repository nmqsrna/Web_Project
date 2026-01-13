let currentModalImage = null;
let tableRows = [];

// initialization
document.addEventListener('DOMContentLoaded', function() {
    initializeDropdown();
    initializeTableInteractions();
    initializeSmoothScroll();
    initializeAnimations();
    setupAccessibility();
    console.log('%c Organizational Chart Loaded Successfully!', 'color: #2c3e50; font-size: 16px; font-weight: bold;');
    console.log('%c Features Active:', 'color: #3498db; font-size: 14px; font-weight: bold;');
    console.log('%c   ✓ Dropdown navigation', 'color: #7f8c8d; font-size: 12px;');
    console.log('%c   ✓ Table hover effects', 'color: #7f8c8d; font-size: 12px;');
    console.log('%c   ✓ Image zoom on click', 'color: #7f8c8d; font-size: 12px;');
    console.log('%c   ✓ Smooth scrolling', 'color: #7f8c8d; font-size: 12px;');
    console.log('%c   ✓ Responsive animations', 'color: #7f8c8d; font-size: 12px;');
});

//drop down menu functionality
function initializeDropdown() {
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdown = document.querySelector('.dropdown');
    
    if (dropdownToggle && dropdown) {
        // Toggle dropdown on click
        dropdownToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            dropdown.classList.toggle('active');
            const isActive = dropdown.classList.contains('active');
            dropdownToggle.setAttribute('aria-expanded', isActive);
        });
        
        document.addEventListener('click', function(e) {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove('active');
                dropdownToggle.setAttribute('aria-expanded', 'false');
            }
        });
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && dropdown.classList.contains('active')) {
                dropdown.classList.remove('active');
                dropdownToggle.setAttribute('aria-expanded', 'false');
                dropdownToggle.focus();
            }
        });
    }
}

//table interactions
function initializeTableInteractions() {
    // Get all table images
    const tableImages = document.querySelectorAll('.table-img');
    tableImages.forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', function(e) {
            e.stopPropagation();
            openImageModal(this);
        });
        
        img.setAttribute('tabindex', '0');
        img.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openImageModal(this);
            }
        });
    });
    
    const tableRowsElements = document.querySelectorAll('.styled-table tbody tr');
    tableRows = Array.from(tableRowsElements);
    
    tableRows.forEach(row => {
        row.style.transition = 'all 0.3s ease';
        row.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.boxShadow = '0 5px 15px rgba(52, 152, 219, 0.3)';
        });
        
        row.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'none';
        });
    });
}

// image modal functionality
function openImageModal(imgElement) {
    let modal = document.getElementById('imageModal');
    
    if (!modal) {
        modal = createImageModal();
    }
    
    const modalImg = document.getElementById('modalImage');
    modalImg.src = imgElement.src;
    modalImg.alt = imgElement.alt;
    
    const row = imgElement.closest('tr');
    const nameCell = row ? row.cells[2] : null;
    const memberName = nameCell ? nameCell.textContent : 'COMTECH Member';
    const caption = document.getElementById('modalCaption');
    if (caption) {
        caption.textContent = memberName;
    }
    
    modal.style.display = 'flex';
    currentModalImage = imgElement;
    
    document.body.style.overflow = 'hidden';
    
    modal.focus();
}

/*The created modal element */
function createImageModal() {
    const modal = document.createElement('div');
    modal.id = 'imageModal';
    modal.className = 'image-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('tabindex', '-1');
    
    modal.innerHTML = `
        <span class="close-modal" onclick="closeImageModal()" aria-label="Close modal">&times;</span>
        <img class="modal-content" id="modalImage" alt="Member photo">
        <div class="modal-caption" id="modalCaption"></div>
    `;
    
    // Add styles for modal
    const style = document.createElement('style');
    style.textContent = `
        .image-modal {
            display: none;
            position: fixed;
            z-index: 10000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.9);
            align-items: center;
            justify-content: center;
            flex-direction: column;
            animation: fadeIn 0.3s ease;
        }
        
        .modal-content {
            max-width: 90%;
            max-height: 80%;
            border-radius: 10px;
            box-shadow: 0 15px 50px rgba(0, 0, 0, 0.5);
            animation: zoomIn 0.4s ease;
        }
        
        .close-modal {
            position: absolute;
            top: 30px;
            right: 50px;
            color: #fff;
            font-size: 50px;
            font-weight: bold;
            cursor: pointer;
            transition: color 0.3s ease;
        }
        
        .close-modal:hover,
        .close-modal:focus {
            color: #3498db;
        }
        
        .modal-caption {
            color: #fff;
            font-size: 1.5rem;
            font-family: 'Orbitron', sans-serif;
            margin-top: 20px;
            text-align: center;
        }
        
        @keyframes zoomIn {
            from {
                transform: scale(0.5);
                opacity: 0;
            }
            to {
                transform: scale(1);
                opacity: 1;
            }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(modal);
    
    // Close modal on click outside image
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeImageModal();
        }
    });
    
    // Close modal on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeImageModal();
        }
    });
    
    return modal;
}

/**
 * Close the image modal
 * Accessible globally for onclick handler
 */
function closeImageModal() {
    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        
        // Return focus to the image that opened the modal
        if (currentModalImage) {
            currentModalImage.focus();
        }
    }
}
window.closeImageModal = closeImageModal;

// smooth scroll functionality
function initializeSmoothScroll() {
    document.documentElement.style.scrollBehavior = 'smooth';
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    }
    
    // Scroll to top functionality
    createScrollToTopButton();
}

/** Create and manage scroll to top button */
function createScrollToTopButton() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.setAttribute('aria-label', 'Scroll to top');
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: linear-gradient(135deg, #3498db, #2980b9);
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        font-size: 20px;
        cursor: pointer;
        display: none;
        z-index: 1000;
        box-shadow: 0 5px 15px rgba(52, 152, 219, 0.4);
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(scrollBtn);

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollBtn.style.display = 'block';
            scrollBtn.style.animation = 'fadeIn 0.3s ease';
        } else {
            scrollBtn.style.display = 'none';
        }
    });
    
    // Scroll to top on click
    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Hover effect
    scrollBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1) translateY(-5px)';
        this.style.boxShadow = '0 10px 25px rgba(52, 152, 219, 0.6)';
    });
    
    scrollBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) translateY(0)';
        this.style.boxShadow = '0 5px 15px rgba(52, 152, 219, 0.4)';
    });
}

// scroll animations
function initializeAnimations() {
    // Use Intersection Observer for efficient scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe sections for animation
    const sections = document.querySelectorAll('.advisor-section, .org-table-section, .membership-cta');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });
}
// table search functionality 
function addTableSearch() {
    const tables = document.querySelectorAll('.styled-table');
    
    tables.forEach(table => {
        const searchContainer = document.createElement('div');
        searchContainer.className = 'table-search';
        searchContainer.style.cssText = `
            margin: 20px;
            text-align: center;
        `;
        
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = 'Search by name or position...';
        searchInput.className = 'search-input';
        searchInput.style.cssText = `
            padding: 12px 20px;
            width: 100%;
            max-width: 500px;
            border: 2px solid #3498db;
            border-radius: 25px;
            font-size: 1rem;
            outline: none;
        `;
        
        searchContainer.appendChild(searchInput);
        table.parentElement.insertBefore(searchContainer, table);
        
        // Filter table on input
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const rows = table.querySelectorAll('tbody tr');
            
            rows.forEach(row => {
                const text = row.textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    });
}

// print optimization
window.addEventListener('beforeprint', function() {
    // Hide navigation and footer when printing
    const navbar = document.querySelector('.navbar');
    const footer = document.querySelector('.footer');
    const cta = document.querySelector('.membership-cta');
    
    if (navbar) navbar.style.display = 'none';
    if (footer) footer.style.display = 'none';
    if (cta) cta.style.display = 'none';
});

window.addEventListener('afterprint', function() {
    // Restore elements after printing
    const navbar = document.querySelector('.navbar');
    const footer = document.querySelector('.footer');
    const cta = document.querySelector('.membership-cta');
    
    if (navbar) navbar.style.display = 'flex';
    if (footer) footer.style.display = 'block';
    if (cta) cta.style.display = 'block';
});

// error handling
window.addEventListener('error', function(e) {
    console.error('Error occurred:', e.message);
});

// performance monitoring
window.addEventListener('load', function() {
    if (window.performance) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`%c⚡ Page loaded in ${pageLoadTime}ms`, 'color: #2ecc71; font-size: 12px;');
    }
});
