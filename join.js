document.querySelectorAll('input[type="radio"]').forEach(radio => {
  radio.addEventListener('change', () => {
    // remove highlight from all labels in the same group
    document.querySelectorAll(`input[name="${radio.name}"]`).forEach(r => {
      r.nextElementSibling.style.fontWeight = "normal";
      r.nextElementSibling.style.color = "#333";
    });
    // highlight selected
    radio.nextElementSibling.style.fontWeight = "bold";
    radio.nextElementSibling.style.color = "#0077cc";
  });
});
