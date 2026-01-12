//faculty
  const programmes = {
    "FSKA": [
      "Ijazah Sarjana Muda Sains Gunaan (Perikanan) dengan Kepujian",
      "Ijazah Sarjana Muda Sains Akuakultur dengan Kepujian"
    ],
    "FSMP": [
      "Ijazah Sarjana Muda Sains Makanan (Teknologi Makanan) dengan Kepujian",
      "Ijazah Sarjana Muda Sains Makanan (Perkhidmatan Makanan dan Pemakanan) dengan Kepujian",
      "Ijazah Sarjana Muda Sains Agroteknologi (Sains Tanaman) dengan Kepujian"
    ],
    "FSME": [
      "Ijazah Sarjana Muda Sains (Biologi) dengan Kepujian",
      "Ijazah Sarjana Muda Sains (Kimia) dengan Kepujian",
      "Ijazah Sarjana Muda Sains (Biologi Marin) dengan Kepujian",
      "Ijazah Sarjana Muda Sains (Kimia Analisis dan Alam Sekitar) dengan Kepujian",
      "Ijazah Sarjana Muda Sains (Sains Marin) dengan Kepujian",
      "Ijazah Sarjana Muda Sains Gunaan (Pemuliharaan Biodiversiti dan Pengurusan) dengan Kepujian",
      "Ijazah Sarjana Muda Sains (Geosains Marin) dengan Kepujian",
      "Ijazah Sarjana Muda Sains Gunaan (Nanofizik) dengan Kepujian"
    ],
    "FSKM": [
      "Ijazah Sarjana Muda Sains (Analitik Data) dengan Kepujian",
      "Ijazah Sarjana Muda Sains (Matematik Kewangan) dengan Kepujian",
      "Ijazah Sarjana Muda Sains (Matematik Gunaan) dengan Kepujian",
      "Ijazah Sarjana Muda Sains Komputer (Kejuruteraan Perisian) dengan Kepujian",
      "Ijazah Sarjana Muda Sains Komputer (Informatik Maritim) dengan Kepujian",
      "Ijazah Sarjana Muda Sains Komputer (Pengkomputeran Mudah Alih) dengan Kepujian"
    ],
    "FTKKO": [
      "Ijazah Sarjana Muda Teknologi (Alam Sekitar) dengan Kepujian",
      "Ijazah Sarjana Muda Sains Gunaan (Elektronik dan Instrumentasi) dengan Kepujian",
      "Ijazah Sarjana Muda Sains Gunaan (Teknologi Maritim) dengan Kepujian",
      "Ijazah Sarjana Muda Teknologi Kejuruteraan Mekanikal (Senibina Naval) dengan Kepujian",
      "Ijazah Sarjana Muda Teknologi (Tenaga Boleh Baharu) dengan Kepujian",
      "Ijazah Sarjana Muda Teknologi Elektrik (Tenaga dan Kuasa) dengan Kepujian",
      "Ijazah Sarjana Muda Sains Gunaan (Teknologi Maritim) dengan Kepujian (Ijazah Berkembar)"
    ],
    "FPM": [
      "Ijazah Sarjana Muda Pengurusan (Maritim) dengan Kepujian",
      "Ijazah Sarjana Muda Pengurusan (Operasi Maritim) dengan Kepujian",
      "Ijazah Sarjana Muda Sains (Nautika dan Pengangkutan Maritim) dengan Kepujian"
    ],
    "FPEPS": [
      "Ijazah Sarjana Muda Ekonomi (Sumber Asli) dengan Kepujian",
      "Ijazah Sarjana Muda Kaunseling dengan Kepujian",
      "Ijazah Sarjana Muda Kewangan dengan Kepujian",
      "Ijazah Sarjana Muda Pengurusan (Pemasaran) dengan Kepujian",
      "Ijazah Sarjana Muda Pengurusan (Pengajian Polisi) dengan Kepujian",
      "Ijazah Sarjana Muda Pengurusan (Pelancongan) dengan Kepujian",
      "Ijazah Sarjana Muda Perakaunan dengan Kepujian"
    ]
  };

  const facultySelect = document.getElementById("faculty");
  const programmeSelect = document.getElementById("programme");

  facultySelect.addEventListener("change", function() {
    const selectedFaculty = this.value;
    programmeSelect.innerHTML = '<option value="">-- Pilih Program --</option>'; // reset

    if (selectedFaculty && programmes[selectedFaculty]) {
      programmes[selectedFaculty].forEach(prog => {
        const opt = document.createElement("option");
        opt.value = prog;
        opt.textContent = prog;
        programmeSelect.appendChild(opt);
      });
    }
  });


//payment
const form = document.getElementById("eventForm");
const paymentRadios = document.querySelectorAll('input[name="paymentMethod"]');
const qrSection = document.getElementById("qrSection");
const paymentDone = document.getElementById("paymentDone");

paymentRadios.forEach(radio => {
    radio.addEventListener("change", () => {
        if (radio.value === "qr") {
            qrSection.style.display = "block";
        } else {
            qrSection.style.display = "none";
            paymentDone.checked = false;
        }
    });
});

form.addEventListener("submit", function (e) {
    const selectedPayment = document.querySelector('input[name="paymentMethod"]:checked');

    if (selectedPayment && selectedPayment.value === "qr" && !paymentDone.checked) {
        alert("Please complete the payment before submitting the form.");
        e.preventDefault();
    }
});

//receipt
const receiptInput = document.getElementById("receipt");

paymentRadios.forEach(radio => {
    radio.addEventListener("change", () => {
        if (radio.value === "qr") {
            qrSection.style.display = "block";
        } else {
            qrSection.style.display = "none";
            paymentDone.checked = false;
            receiptInput.value = "";
        }
    });
});

form.addEventListener("submit", function (e) {
    const selectedPayment = document.querySelector('input[name="paymentMethod"]:checked');

    if (selectedPayment && selectedPayment.value === "qr") {
        if (!paymentDone.checked) {
            alert("Please confirm that you have completed the payment.");
            e.preventDefault();
            return;
        }

        if (!receiptInput.files.length) {
            alert("Please upload your payment receipt.");
            e.preventDefault();
        }
    }
});

