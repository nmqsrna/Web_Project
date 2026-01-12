function showImage(imageSrc) {
    document.getElementById("myModal").style.display = "block";
    document.getElementById("modalImage").src = imageSrc;
}

function closeModal() {
    document.getElementById("myModal").style.display = "none";
}


// Close modal if user clicks outside the image
window.onclick = function(event) {
    const modal = document.getElementById("myModal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
};

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