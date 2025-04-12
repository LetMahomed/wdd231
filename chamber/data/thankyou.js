document.addEventListener('DOMContentLoaded', () => {
    const data = JSON.parse(localStorage.getItem('formData'));

    if (data) {
        document.getElementById('first-name').textContent = data['first-name'] || '';
        document.getElementById('last-name').textContent = data['last-name'] || '';
        document.getElementById('email').textContent = data['email'] || '';
        document.getElementById('phone').textContent = data['phone'] || '';
        document.getElementById('org-name').textContent = data['org-name'] || '';
        document.getElementById('timestamp').textContent = data['timestamp']
            ? new Date(data['timestamp']).toLocaleString()
            : '';
    }

    // Set footer year
    document.getElementById('year').textContent = new Date().getFullYear();
});
