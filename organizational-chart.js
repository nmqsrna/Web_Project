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
