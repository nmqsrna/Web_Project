let slideIndex = 1;
showSlides();

function showSlides() {
    let slides = document.getElementsByClassName("slide");
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }

    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}
    slides[slideIndex-1].style.display = "block";  
    setTimeout(showSlides, 3000); //change image every 3 seconds
}


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

//slide show
// let slideIndex = 1;
let autoSlide;

showSlides(slideIndex);
startAutoSlide();

function changeSlide(n) {
    showSlides(slideIndex += n);
    resetAutoSlide();
}

function currentSlide(n) {
    showSlides(slideIndex = n);
    resetAutoSlide();
}

function showSlides(n) {
    let slides = document.getElementsByClassName("slide");
    let dots = document.getElementsByClassName("dot");

    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove("active");
    }

    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].classList.add("active");
}

function startAutoSlide() {
    autoSlide = setInterval(() => {
        slideIndex++;
        showSlides(slideIndex);
    }, 4000); // 4 seconds
}

function resetAutoSlide() {
    clearInterval(autoSlide);
    startAutoSlide();
}