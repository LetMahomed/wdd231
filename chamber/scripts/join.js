document.addEventListener('DOMContentLoaded', () => {
    const modals = document.querySelectorAll('.modal');
    const modalLinks = document.querySelectorAll('.card-link');
    const closeBtns = document.querySelectorAll('.close-btn');

    // Timestamp setting
    const timestampField = document.getElementById('timestamp');
    if (timestampField) {
        timestampField.value = new Date().toISOString();
    }

    // Handle form submission
    const form = document.getElementById('join-form');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault(); // prevent default submission

            const formData = new FormData(this);
            const data = {};
            formData.forEach((value, key) => data[key] = value);

            localStorage.setItem('formData', JSON.stringify(data));

            // Redirect after a slight delay to ensure storage is done
            window.location.href = 'thankyou.html';
        });
    }

    // Open modal when link is clicked
    modalLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const modalId = link.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'flex';
            }
        });
    });

    // Close modal when close button is clicked
    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            modals.forEach(modal => {
                modal.style.display = 'none';
            });
        });
    });

    // Close modal when clicking outside
    window.addEventListener('click', (event) => {
        modals.forEach(modal => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    });
});
// Set current year in footer
document.addEventListener("DOMContentLoaded", () => {
    const yearSpan = document.getElementById("year");
    if (yearSpan) {
      yearSpan.textContent = new Date().getFullYear();
    }
  });
  