const map = L.map('map').setView([37.7749, -122.4194], 10); // San Francisco default

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

L.marker([37.7599, -122.5102]) // Ocean Beach
  .addTo(map)
  .bindPopup('Ocean Beach - 4-6ft, Offshore Wind')
  .openPopup();
