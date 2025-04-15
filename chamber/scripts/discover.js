const container = document.getElementById('card-container');
const message = document.getElementById('visit-message');

async function loadCards() {
  const response = await fetch('data/places.json');
  const places = await response.json();

  places.forEach(place => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <h2>${place.name}</h2>
      <figure><img src="${place.image}" alt="${place.name}"></figure>
      <address>${place.address}</address>
      <p>${place.description}</p>
      <button>Learn more</button>
    `;
    container.appendChild(card);
  });
}

function checkVisit() {
  const now = Date.now();
  const lastVisit = localStorage.getItem('lastVisit');

  if (!lastVisit) {
    message.textContent = 'Welcome! Let us know if you have any questions.';
  } else {
    const diff = Math.floor((now - Number(lastVisit)) / (1000 * 60 * 60 * 24));
    if (diff < 1) {
      message.textContent = 'Back so soon! Awesome!';
    } else {
      message.textContent = `You last visited ${diff} day${diff === 1 ? '' : 's'} ago.`;
    }
  }

  localStorage.setItem('lastVisit', now);
}

loadCards();
checkVisit();
