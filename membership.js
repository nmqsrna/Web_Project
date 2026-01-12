const form = document.getElementById('joinForm');
const fullNameInput = document.getElementById('fullName');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const programSelect = document.getElementById('program');
const motivationTextarea = document.getElementById('motivation');
const charCountSpan = document.getElementById('charCount');
const successMessage = document.getElementById('successMessage');
const termsCheckbox = document.getElementById('terms');

// initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeDropdown();
    initializeFormValidation();
    initializeCharacterCounter();
    setupFormSubmission();
    addRadioEnhancements();
    console.log('%c✅ Join Page Loaded Successfully!', 'color: #3498db; font-size: 16px; font-weight: bold;');
});

// dropdown menu functionality
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

// form validation functionality
function initializeFormValidation() {
    // Validate on input blur (when user leaves field)
    fullNameInput.addEventListener('blur', () => validateFullName());
    emailInput.addEventListener('blur', () => validateEmail());
    phoneInput.addEventListener('blur', () => validatePhone());
    programSelect.addEventListener('change', () => validateProgram());
    motivationTextarea.addEventListener('blur', () => validateMotivation());
    
    // Real-time validation while typing
    fullNameInput.addEventListener('input', () => {
        if (fullNameInput.value.length > 0) validateFullName();
    });
    
    emailInput.addEventListener('input', () => {
        if (emailInput.value.length > 0) validateEmail();
    });
    
    phoneInput.addEventListener('input', () => {
        if (phoneInput.value.length > 0) validatePhone();
    });
    
    motivationTextarea.addEventListener('input', () => {
        if (motivationTextarea.value.length > 0) validateMotivation();
    });
}

// full name validation
function validateFullName() {
    const nameValue = fullNameInput.value.trim();
    const nameError = document.getElementById('nameError');
    const formGroup = fullNameInput.closest('.form-group');
    
    // Check if empty
    if (nameValue === '') {
        setError(formGroup, nameError, 'Full name is required');
        return false;
    }
}
    // Check if empty
    if (nameValue === '') {
        setError(formGroup, nameError, 'Full name is required');
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

/*Validate email field, True if valid, false otherwise*/
function validateEmail() {
    const emailValue = emailInput.value.trim();
    const emailError = document.getElementById('emailError');
    const formGroup = emailInput.closest('.form-group');
    
    // Check if empty
    if (emailValue === '') {
        setError(formGroup, emailError, 'Email address is required');
        return false;
    }
    
    // Check email format
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(emailValue)) {
        setError(formGroup, emailError, 'Please enter a valid email address');
        return false;
    }
    
    // Check if UMT email 
    if (!emailValue.toLowerCase().includes('umt.edu.my')) {
        setError(formGroup, emailError, 'Please use your UMT email address');
        return false;
    }
    
    // Valid
    setSuccess(formGroup, emailError);
    return true;
}

/*Validate phone number field, True if valid, false otherwise*/
function validatePhone() {
    const phoneValue = phoneInput.value.trim();
    const phoneError = document.getElementById('phoneError');
    const formGroup = phoneInput.closest('.form-group');
    
    // Check if empty
    if (phoneValue === '') {
        setError(formGroup, phoneError, 'Phone number is required');
        return false;
    }
    
    // Check phone format (Malaysian format)
    const phoneRegex = /^01[0-9]{8,9}$/;
    if (!phoneRegex.test(phoneValue)) {
        setError(formGroup, phoneError, 'Please enter a valid Malaysian phone number (e.g., 0123456789)');
        return false;
    }
    
    // Valid
    setSuccess(formGroup, phoneError);
    return true;
}

/*Validate program selection, True if valid, false otherwise*/
function validateProgram() {
    const programValue = programSelect.value;
    const programError = document.getElementById('programError');
    const formGroup = programSelect.closest('.form-group');
    
    // Check if selected
    if (programValue === '') {
        setError(formGroup, programError, 'Please select your study program');
        return false;
    }
    
    // Valid
    setSuccess(formGroup, programError);
    return true;
}

/**
 * Validate year of study radio buttons
 * @returns {boolean} True if valid, false otherwise
 */
function validateYear() {
    const yearRadios = document.querySelectorAll('input[name="year"]');
    const yearError = document.getElementById('yearError');
    const formGroup = yearRadios[0].closest('.form-group');
    
    let isChecked = false;
    yearRadios.forEach(radio => {
        if (radio.checked) isChecked = true;
    });
    
    if (!isChecked) {
        setError(formGroup, yearError, 'Please select your year of study');
        return false;
    }
    
    setSuccess(formGroup, yearError);
    return true;
}

/* Validate EXCO choice 1, True if valid, false otherwise
 */
function validateExco1() {
    const exco1Radios = document.querySelectorAll('input[name="exco1"]');
    const exco1Error = document.getElementById('exco1Error');
    const formGroup = exco1Radios[0].closest('.form-group');
    
    let isChecked = false;
    exco1Radios.forEach(radio => {
        if (radio.checked) isChecked = true;
    });
    
    if (!isChecked) {
        setError(formGroup, exco1Error, 'Please select your 1st EXCO choice');
        return false;
    }
    
    setSuccess(formGroup, exco1Error);
    return true;
}

/* Validate EXCO choice 2, True if valid, false otherwise */
function validateExco2() {
    const exco2Radios = document.querySelectorAll('input[name="exco2"]');
    const exco2Error = document.getElementById('exco2Error');
    const formGroup = exco2Radios[0].closest('.form-group');
    
    let isChecked = false;
    let exco2Value = '';
    exco2Radios.forEach(radio => {
        if (radio.checked) {
            isChecked = true;
            exco2Value = radio.value;
        }
    });
    
    if (!isChecked) {
        setError(formGroup, exco2Error, 'Please select your 2nd EXCO choice');
        return false;
    }
    
    // Check if same as EXCO 1
    const exco1Radios = document.querySelectorAll('input[name="exco1"]');
    let exco1Value = '';
    exco1Radios.forEach(radio => {
        if (radio.checked) exco1Value = radio.value;
    });
    
    if (exco1Value === exco2Value) {
        setError(formGroup, exco2Error, '2nd choice must be different from 1st choice');
        return false;
    }
    
    setSuccess(formGroup, exco2Error);
    return true;
}

/* Validate motivation textarea, True if valid, false otherwise */
function validateMotivation() {
    const motivationValue = motivationTextarea.value.trim();
    const motivationError = document.getElementById('motivationError');
    const formGroup = motivationTextarea.closest('.form-group');
    
    // Check if empty
    if (motivationValue === '') {
        setError(formGroup, motivationError, 'Please share your motivation');
        return false;
    }
    
    // Check minimum length
    if (motivationValue.length < 50) {
        setError(formGroup, motivationError, 'Please write at least 50 characters (currently ' + motivationValue.length + ')');
        return false;
    }
    
    // Check maximum length
    if (motivationValue.length > 1000) {
        setError(formGroup, motivationError, 'Maximum 1000 characters exceeded');
        return false;
    }
    
    // Valid
    setSuccess(formGroup, motivationError);
    return true;
}

/* Validate terms checkbox, True if valid, false otherwise */
function validateTerms() {
    const termsError = document.getElementById('termsError');
    const formGroup = termsCheckbox.closest('.form-group');
    
    if (!termsCheckbox.checked) {
        setError(formGroup, termsError, 'You must agree to the terms and conditions');
        return false;
    }
    
    setSuccess(formGroup, termsError);
    return true;
}

/* Set error state for form field */
function setError(formGroup, errorElement, message) {
    formGroup.classList.remove('success');
    formGroup.classList.add('error');
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

/* Set success state for form field */
function setSuccess(formGroup, errorElement) {
    formGroup.classList.remove('error');
    formGroup.classList.add('success');
    errorElement.textContent = '';
    errorElement.style.display = 'none';
}

/* Initialize character counter for motivation textarea */
function initializeCharacterCounter() {
    motivationTextarea.addEventListener('input', function() {
        const currentLength = this.value.length;
        charCountSpan.textContent = currentLength;
        
        // Change color based on length
        if (currentLength < 50) {
            charCountSpan.style.color = '#e74c3c'; // Red
        } else if (currentLength < 800) {
            charCountSpan.style.color = '#2ecc71'; // Green
        } else if (currentLength < 1000) {
            charCountSpan.style.color = '#f39c12'; // Orange
        } else {
            charCountSpan.style.color = '#e74c3c'; // Red (over limit)
        }
    });
}

/* Setup form submission with validation */
function setupFormSubmission() {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate all fields
        const isNameValid = validateFullName();
        const isEmailValid = validateEmail();
        const isPhoneValid = validatePhone();
        const isProgramValid = validateProgram();
        const isYearValid = validateYear();
        const isExco1Valid = validateExco1();
        const isExco2Valid = validateExco2();
        const isMotivationValid = validateMotivation();
        const isTermsValid = validateTerms();
        
        // Check if all validations passed
        if (isNameValid && isEmailValid && isPhoneValid && isProgramValid && 
            isYearValid && isExco1Valid && isExco2Valid && isMotivationValid && isTermsValid) {
            
            // Show loading state
            showLoadingState();
            
            // Simulate form submission (replace with actual API call)
            setTimeout(function() {
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

/* Show loading state on submit button */
function showLoadingState() {
    const submitBtn = document.querySelector('.submit-btn');
    const originalContent = submitBtn.innerHTML;
    
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting Application...';
    submitBtn.style.opacity = '0.7';
    
    // Store original content for restoration
    submitBtn.dataset.originalContent = originalContent;
}

/* Handle successful form submission */
function handleSuccessfulSubmission() {
    // Hide form
    form.style.display = 'none';
    
    // Show success message
    successMessage.classList.add('show');
    
    // Scroll to success message
    successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Optional: Log form data (for debugging)
    const formData = new FormData(form);
    console.log('%c📋 Form Data:', 'color: #2ecc71; font-size: 14px; font-weight: bold;');
    for (let [key, value] of formData.entries()) {
        console.log(`   ${key}: ${value}`);
    }
    
    // Redirect to home page after 5 seconds
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 5000);
}

// ==================== RADIO ENHANCEMENTS ====================
/* Add visual enhancements to radio button selections */
function addRadioEnhancements() {
    const radioOptions = document.querySelectorAll('.radio-option');
    
    radioOptions.forEach(option => {
        option.addEventListener('click', function() {
            const radio = this.querySelector('input[type="radio"]');
            if (radio) {
                radio.checked = true;
                
                // Trigger validation for EXCO choices
                if (radio.name === 'exco1') {
                    validateExco1();
                } else if (radio.name === 'exco2') {
                    validateExco2();
                } else if (radio.name === 'year') {
                    validateYear();
                }
            }
        });
    });
}

/* Show terms and conditions (you can customize this) */
function showTerms() {
    alert('Terms and Conditions:\n\n' +
          '1. All information provided must be accurate and truthful.\n' +
          '2. Applicants must be currently enrolled at UMT.\n' +
          '3. Selected candidates will be notified via email.\n' +
          '4. COMTECH reserves the right to reject any application.\n' +
          '5. Personal information will be kept confidential.\n\n' +
          'By submitting this form, you agree to these terms.');
}

/* Enable smooth scrolling for the page */
document.documentElement.style.scrollBehavior = 'smooth';

/* Improve keyboard navigation */
document.addEventListener('keydown', function(e) {
    // Allow Escape key to clear focused field
    if (e.key === 'Escape') {
        document.activeElement.blur();
    }
});

 /* Global error handler for debugging */
window.addEventListener('error', function(e) {
    console.error('Error occurred:', e.message);
});

// console log features
console.log('%c🎯 Join COMTECH Features:', 'color: #3498db; font-size: 14px; font-weight: bold;');
console.log('%c   ✓ Real-time validation', 'color: #95a5a6; font-size: 12px;');
console.log('%c   ✓ Character counter', 'color: #95a5a6; font-size: 12px;');
console.log('%c   ✓ Email & phone validation', 'color: #95a5a6; font-size: 12px;');
console.log('%c   ✓ EXCO choice validation', 'color: #95a5a6; font-size: 12px;');
console.log('%c   ✓ Custom radio/checkbox styling', 'color: #95a5a6; font-size: 12px;');
console.log('%c   ✓ Smooth animations', 'color: #95a5a6; font-size: 12px;');
