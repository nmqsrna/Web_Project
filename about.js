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

//button up 
const backToTopBtn = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTopBtn.style.opacity = "1";
    backToTopBtn.style.pointerEvents = "auto";
  } else {
    backToTopBtn.style.opacity = "0";
    backToTopBtn.style.pointerEvents = "none";
  }
});

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});