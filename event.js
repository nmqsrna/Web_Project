function showDescription(id, btn) {
  const desc = document.getElementById(id);
  const card = btn.closest('.event-card');
  const allCards = document.querySelectorAll('.event-card');

  //Sembunyikan semua kad lain
  allCards.forEach(c => {
    if (c !== card) {
      c.classList.add('hidden-card');
    }
  });

  //Besarkan kad yang ditekan
  card.classList.add('active-card');
  
  //Paparkan description dan sembunyikan butang "See More"
  desc.style.display = "block";
  btn.style.display = "none";
}

function hideDescription(id, btn) {
  const desc = document.getElementById(id);
  const card = btn.closest('.event-card');
  const allCards = document.querySelectorAll('.event-card');

  //Tunjukkan semula semua kad
  allCards.forEach(c => {
    c.classList.remove('hidden-card');
  });

  //Kembalikan saiz kad asal
  card.classList.remove('active-card');

  //Sembunyikan description
  desc.style.display = "none";

  //Cari butang "See More" dan tunjukkan semula
  const seeMoreBtn = card.querySelector('.toggle-btn:not(.less-btn)');
  seeMoreBtn.style.display = "inline-block";
  
  // Skrol balik ke atas kad tersebut supaya user tak sesat
  card.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

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