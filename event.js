function showDescription(id, btn) {
  const desc = document.getElementById(id);
  const card = btn.closest('.event-card');
  const allCards = document.querySelectorAll('.event-card');

  // 1. Sembunyikan semua kad lain
  allCards.forEach(c => {
    if (c !== card) {
      c.classList.add('hidden-card');
    }
  });

  // 2. Besarkan kad yang ditekan
  card.classList.add('active-card');
  
  // 3. Paparkan description dan sembunyikan butang "See More"
  desc.style.display = "block";
  btn.style.display = "none";
}

function hideDescription(id, btn) {
  const desc = document.getElementById(id);
  const card = btn.closest('.event-card');
  const allCards = document.querySelectorAll('.event-card');

  // 1. Tunjukkan semula semua kad
  allCards.forEach(c => {
    c.classList.remove('hidden-card');
  });

  // 2. Kembalikan saiz kad asal
  card.classList.remove('active-card');

  // 3. Sembunyikan description
  desc.style.display = "none";

  // 4. Cari butang "See More" dan tunjukkan semula
  const seeMoreBtn = card.querySelector('.toggle-btn:not(.less-btn)');
  seeMoreBtn.style.display = "inline-block";
  
  // Skrol balik ke atas kad tersebut supaya user tak sesat
  card.scrollIntoView({ behavior: 'smooth', block: 'center' });
}
