// ------------------- TOGGLE INTERNAL / EKSTERNAL -------------------
const container = document.getElementById('container');
const registerBtn = document.getElementById('register'); // Form Internal
const loginBtn = document.getElementById('login');       // Form Eksternal

(function() {
    "use strict";

      /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  const MIN_PRELOAD = 1000; // minimal 250 ms
  const startTime = Date.now();

  if (preloader) {
    window.addEventListener('load', () => {
      const elapsed   = Date.now() - startTime;
      const remaining = Math.max(0, MIN_PRELOAD - elapsed);

      setTimeout(() => {
        preloader.remove();
      }, remaining);
    });
  }
})();


if (registerBtn && container) {
    registerBtn.addEventListener('click', (e) => {
        e.preventDefault();
        container.classList.add('active'); // tampilkan INTERNAL
    });
}

if (loginBtn && container) {
    loginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        container.classList.remove('active'); // tampilkan EKSTERNAL
    });
}

// ------------------- FUNGSI INISIALISASI MULTI-STEP -------------------
function initMultiStepForm(form) {
    const steps = Array.from(form.querySelectorAll('.form-step'));
    if (!steps.length) return;

    let currentStep = steps.findIndex(step => step.classList.contains('active'));
    if (currentStep < 0) currentStep = 0;

    function showStep(index) {
        steps.forEach((step, i) => {
            step.classList.toggle('active', i === index);
        });
        currentStep = index;
    }

    // pastikan step awal benar
    showStep(currentStep);

    // helper: buat / ambil box pesan error pada step
    function getErrorBox(stepEl) {
        let box = stepEl.querySelector('.step-error');
        if (!box) {
            box = document.createElement('div');
            box.className = 'step-error';
            box.style.color = '#d32f2f';
            box.style.fontSize = '12px';
            box.style.marginBottom = '8px';
            // taruh setelah heading di step (kalau ada)
            const heading = stepEl.querySelector('h2, h3');
            if (heading && heading.nextSibling) {
                stepEl.insertBefore(box, heading.nextSibling);
            } else {
                stepEl.insertBefore(box, stepEl.firstChild);
            }
        }
        return box;
    }

    // navigasi next / prev
    form.addEventListener('click', (event) => {
        const target = event.target;

        // ------------ TOMBOL SELANJUTNYA ------------
        if (target.classList.contains('next-step')) {
            event.preventDefault();

            const stepEl = steps[currentStep];
            const errorBox = getErrorBox(stepEl);
            errorBox.textContent = ''; // reset pesan

            const fields = Array.from(
                stepEl.querySelectorAll('input, select, textarea')
            );

            let valid = true;
            let firstInvalid = null;

            fields.forEach((field) => {
                // reset state error
                field.classList.remove('input-error');

                // hanya cek field yang tidak disabled
                if (field.disabled) return;

                // gunakan validasi HTML5
                if (!field.checkValidity()) {
                    valid = false;
                    if (!firstInvalid) firstInvalid = field;
                    field.classList.add('input-error');
                }
            });

            if (!valid) {
                if (firstInvalid) {
                    firstInvalid.focus();
                    // ini akan memunculkan bubble pesan bawaan browser (opsional)
                    firstInvalid.reportValidity();
                }
                return; // JANGAN pindah step
            }

            // kalau semua valid → boleh lanjut
            if (currentStep < steps.length - 1) {
                showStep(currentStep + 1);
            }
        }

        // ------------ TOMBOL KEMBALI ------------
        if (target.classList.contains('prev-step')) {
            event.preventDefault();

            const stepEl = steps[currentStep];
            const errorBox = stepEl.querySelector('.step-error');
            if (errorBox) errorBox.textContent = ''; // bersihkan pesan kalau ada

            if (currentStep > 0) {
                showStep(currentStep - 1);
            }
        }
    });

    // ------------------- ENABLE SUBMIT SETELAH UPLOAD FILE -------------------
    const fileInputs = form.querySelectorAll('input[type="file"]');
    const submitBtn = form.querySelector('.submit-btn');

    function updateSubmitState() {
        if (!submitBtn) return;
        const hasFile = Array.from(fileInputs).some(
            (input) => input.files && input.files.length > 0
        );
        submitBtn.disabled = !hasFile;
    }

    fileInputs.forEach((input) => {
        input.addEventListener('change', updateSubmitState);
    });

    if (submitBtn) {
        submitBtn.disabled = true; // awalnya non-aktif
    }
}

// Inisialisasi semua form di halaman (Internal & Eksternal)
document.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('.form-container form');
    forms.forEach((form) => initMultiStepForm(form));
});

/**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);