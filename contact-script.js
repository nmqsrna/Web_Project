const form = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const subjectSelect = document.getElementById('subject');
const messageTextarea = document.getElementById('message');
const charCountSpan = document.getElementById('charCount');
const successMessage = document.getElementById('successMessage');

// initialization
/**
 * Initialize all functionality when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', function() {
    initializeDropdown();
    initializeFormValidation();
    initializeCharacterCounter();
    setupFormSubmission();
    addInputAnimations();
    console.log('%c✅ Contact Page Loaded Successfully!', 'color: #e74c3c; font-size: 16px; font-weight: bold;');
});

// dropdown functionality
/**
 * Initialize dropdown menu for navigation
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

// form validation
/**
 * Initialize real-time form validation
 */
function initializeFormValidation() {
    // Validate on input blur (when user leaves field)
    nameInput.addEventListener('blur', () => validateName());
    emailInput.addEventListener('blur', () => validateEmail());
    subjectSelect.addEventListener('change', () => validateSubject());
    messageTextarea.addEventListener('blur', () => validateMessage());
    
    // Real-time validation while typing
    nameInput.addEventListener('input', () => {
        if (nameInput.value.length > 0) validateName();
    });
    
    emailInput.addEventListener('input', () => {
        if (emailInput.value.length > 0) validateEmail();
    });
    
    messageTextarea.addEventListener('input', () => {
        if (messageTextarea.value.length > 0) validateMessage();
    });
}

/**
 * Validate name field
 * True if valid, false otherwise
 */
function validateName() {
    const nameValue = nameInput.value.trim();
    const nameError = document.getElementById('nameError');
    const formGroup = nameInput.closest('.form-group');
    
    // Check if empty
    if (nameValue === '') {
        setError(formGroup, nameError, 'Name is required');
        return false;
    }
    
    // Check minimum length
    if (nameValue.length < 3) {
        setError(formGroup, nameError, 'Name must be at least 3 characters');
        return false;
    }
    
    // Check if contains only letters and spaces
    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!nameRegex.test(nameValue)) {
        setError(formGroup, nameError, 'Name can only contain letters and spaces');
        return false;
    }
    
    // Valid
    setSuccess(formGroup, nameError);
    return true;
}

/**
 * Validate email field
 * True if valid, false otherwise
 */
function validateEmail() {
    const emailValue = emailInput.value.trim();
    const emailError = document.getElementById('emailError');
    const formGroup = emailInput.closest('.form-group');
    
    // Check if empty
    if (emailValue === '') {
        setError(formGroup, emailError, 'Email is required');
        return false;
    }
    
    // Check email format
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(emailValue)) {
        setError(formGroup, emailError, 'Please enter a valid email address');
        return false;
    }
    
    // Check if UMT email (optional but recommended)
    if (!emailValue.toLowerCase().includes('umt.edu.my')) {
        setError(formGroup, emailError, 'Please use your UMT student email (no.matrik@ocean.umt.edu.my)');
        return false;
    }
    
    // Valid
    setSuccess(formGroup, emailError);
    return true;
}

/**
 * Validate subject selection
 * True if valid, false otherwise
 */
function validateSubject() {
    const subjectValue = subjectSelect.value;
    const subjectError = document.getElementById('subjectError');
    const formGroup = subjectSelect.closest('.form-group');
    
    // Check if selected
    if (subjectValue === '') {
        setError(formGroup, subjectError, 'Please select a subject');
        return false;
    }
    
    // Valid
    setSuccess(formGroup, subjectError);
    return true;
}

/**
 * Validate message field
 * True if valid, false otherwise
 */
function validateMessage() {
    const messageValue = messageTextarea.value.trim();
    const messageError = document.getElementById('messageError');
    const formGroup = messageTextarea.closest('.form-group');
    
    // Check if empty
    if (messageValue === '') {
        setError(formGroup, messageError, 'Message is required');
        return false;
    }
    
    // Check minimum length
    if (messageValue.length < 10) {
        setError(formGroup, messageError, 'Message must be at least 10 characters');
        return false;
    }
    
    // Check maximum length
    if (messageValue.length > 500) {
        setError(formGroup, messageError, 'Message must not exceed 500 characters');
        return false;
    }
    
    // Valid
    setSuccess(formGroup, messageError);
    return true;
}

/**
 * Set error state for form field
 * @param {HTMLElement} formGroup - The form group element
 * @param {HTMLElement} errorElement - The error message element
 * @param {string} message - The error message to display
 */
function setError(formGroup, errorElement, message) {
    formGroup.classList.remove('success');
    formGroup.classList.add('error');
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

/**
 * Set success state for form field
 * @param {HTMLElement} formGroup - The form group element
 * @param {HTMLElement} errorElement - The error message element
 */
function setSuccess(formGroup, errorElement) {
    formGroup.classList.remove('error');
    formGroup.classList.add('success');
    errorElement.textContent = '';
    errorElement.style.display = 'none';
}

// character counter
/**
 * Initialize character counter for message textarea
 */
function initializeCharacterCounter() {
    messageTextarea.addEventListener('input', function() {
        const currentLength = this.value.length;
        const maxLength = 500;
        
        // Update counter
        charCountSpan.textContent = currentLength;
        
        // Change color if approaching or exceeding limit
        const charCounter = document.querySelector('.char-counter');
        if (currentLength > maxLength) {
            charCounter.style.color = '#e74c3c';
        } else if (currentLength > maxLength * 0.8) {
            charCounter.style.color = '#f39c12';
        } else {
            charCounter.style.color = '#95a5a6';
        }
        
        // Prevent exceeding max length
        if (currentLength > maxLength) {
            this.value = this.value.substring(0, maxLength);
            charCountSpan.textContent = maxLength;
        }
    });
}

// form submission
/**
 * Setup form submission with validation
 */
function setupFormSubmission() {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate all fields
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isSubjectValid = validateSubject();
        const isMessageValid = validateMessage();
        
        // Check if all fields are valid
        if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
            // Show loading state
            showLoadingState();
            
            // Simulate form submission (replace with actual submission later)
            setTimeout(() => {
                handleSuccessfulSubmission();
            }, 1500);
        } else {
            // Scroll to first error
            const firstError = document.querySelector('.form-group.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });
}

/**
 * Show loading state on submit button
 */
function showLoadingState() {
    const submitBtn = document.querySelector('.submit-btn');
    const originalContent = submitBtn.innerHTML;
    
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.style.opacity = '0.7';
    
    // Store original content for restoration
    submitBtn.dataset.originalContent = originalContent;
}

/**
 * Handle successful form submission
 */
function handleSuccessfulSubmission() {
    // Hide form
    form.style.display = 'none';
    
    // Show success message
    successMessage.classList.add('show');
    
    // Reset form
    form.reset();
    
    // Remove validation classes
    document.querySelectorAll('.form-group').forEach(group => {
        group.classList.remove('error', 'success');
    });
    
    // Reset character counter
    charCountSpan.textContent = '0';
    
    // Scroll to success message
    successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Redirect to home page after 3 seconds
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 3000);
}

// input animations
/**
 * Add floating label effect and animations
 */
function addInputAnimations() {
    const inputs = document.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        // Add focus effect
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        // Remove focus effect
        input.addEventListener('blur', function() {
            if (this.value === '') {
                this.parentElement.classList.remove('focused');
            }
        });
    });
}



// accessibility enhancements
/**
 * Improve keyboard navigation
 */
document.addEventListener('keydown', function(e) {
    // Allow Escape key to clear focused field
    if (e.key === 'Escape') {
        document.activeElement.blur();
    }
});

// smooth scroll
/**
 * Enable smooth scrolling for the page
 */
document.documentElement.style.scrollBehavior = 'smooth';



// error handling
/**
 * Global error handler for debugging
 */
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.message);
});

// console messages
console.log('%c💬 Contact Form Features:', 'color: #2ecc71; font-size: 14px; font-weight: bold;');
console.log('%c   ✓ Real-time validation', 'color: #95a5a6; font-size: 12px;');
console.log('%c   ✓ Character counter', 'color: #95a5a6; font-size: 12px;');
console.log('%c   ✓ Email format validation', 'color: #95a5a6; font-size: 12px;');
console.log('%c   ✓ UMT email verification', 'color: #95a5a6; font-size: 12px;');
console.log('%c   ✓ Smooth animations', 'color: #95a5a6; font-size: 12px;');
