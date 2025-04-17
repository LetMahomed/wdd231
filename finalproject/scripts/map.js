import L from "https://unpkg.com/leaflet@1.9.4/dist/leaflet-src.esm.js";

// Create and set up the map
const map = L.map('map').setView([37.7749, -122.4194], 6); // San Francisco area

// Load tile layer for the map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data © OpenStreetMap contributors'
}).addTo(map);

// Modal setup
const modal = document.createElement('div');
modal.id = 'spotModal';
modal.style.display = 'none';
modal.innerHTML = `
  <div class="modal-content">
    <span class="close-button">&times;</span>
    <h3 id="modalName"></h3>
    <p><strong>Skill Level:</strong> <span id="modalSkill"></span></p>
    <p><strong>Wave Height:</strong> <span id="modalWaves"></span></p>
    <p><strong>Notes:</strong> <span id="modalNotes"></span></p>
  </div>
`;
document.body.appendChild(modal);

// Close modal
document.querySelector('.close-button').addEventListener('click', () => {
  modal.style.display = 'none';
});

// Fetch spots and render
async function loadSpots() {
  try {
    const res = await fetch('scripts/spots.json'); // Correct path to spots.json
    const spots = await res.json();

    // Save to localStorage
    localStorage.setItem('surfSpots', JSON.stringify(spots));

    // Render markers
    spots.forEach(spot => {
      const marker = L.marker([spot.lat, spot.lng]).addTo(map);
      marker.bindPopup(`<strong>${spot.name}</strong><br><button data-id="${spot.id}" class="view-btn">View Details</button>`);

      marker.on('popupopen', () => {
        setTimeout(() => {
          const btn = document.querySelector('.view-btn');
          if (btn) {
            btn.addEventListener('click', () => showDetails(spot));
          }
        }, 0);
      });
    });
  } catch (err) {
    console.error('Failed to load spots:', err);
  }
}

// Show details in modal
function showDetails(spot) {
  document.getElementById('modalName').textContent = spot.name;
  document.getElementById('modalSkill').textContent = spot.skill;
  document.getElementById('modalWaves').textContent = spot.waves;
  document.getElementById('modalNotes').textContent = spot.notes;
  document.getElementById('spotModal').style.display = 'block';
}

loadSpots();
