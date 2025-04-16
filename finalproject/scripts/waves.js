// scripts/map.js
const map = L.map('map').setView([37.7749, -122.4194], 6); // starting at SF

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data © OpenStreetMap contributors'
}).addTo(map);

// Load spots.json
fetch('data/spots.json')
  .then(res => res.json())
  .then(data => {
    data.forEach(spot => {
      L.marker([spot.lat, spot.lng])
        .addTo(map)
        .bindPopup(`
          <strong>${spot.name}</strong><br>
          Skill: ${spot.skill}<br>
          Waves: ${spot.waves}<br>
          Notes: ${spot.notes}
        `);
    });
  })
  .catch(err => console.error('Error loading spots:', err));
