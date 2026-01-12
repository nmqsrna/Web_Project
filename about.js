// Dropdown toggle on click
const dropdownToggle = document.querySelector('.dropdown-toggle');
const dropdownContent = document.querySelector('.dropdown-content');
const dropdown = document.querySelector('.dropdown');

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