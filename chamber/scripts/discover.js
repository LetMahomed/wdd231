document.addEventListener("DOMContentLoaded", () => {
    displayVisitMessage();
    loadCards();
    document.getElementById("current-year").textContent = new Date().getFullYear();
    document.getElementById("last-modified").textContent = document.lastModified;
  });
  
  function displayVisitMessage() {
    const messageEl = document.getElementById("visit-message");
    const lastVisit = localStorage.getItem("lastVisit");
    const now = Date.now();
  
    if (!lastVisit) {
      messageEl.textContent = "Welcome! Let us know if you have any questions.";
    } else {
      const days = Math.floor((now - Number(lastVisit)) / (1000 * 60 * 60 * 24));
      if (days < 1) {
        messageEl.textContent = "Back so soon! Awesome!";
      } else if (days === 1) {
        messageEl.textContent = "You last visited 1 day ago.";
      } else {
        messageEl.textContent = `You last visited ${days} days ago.`;
      }
    }
  
    localStorage.setItem("lastVisit", now.toString());
  }
  
  async function loadCards() {
    const res = await fetch("scripts/discover.json");
    const data = await res.json();
    const container = document.getElementById("card-container");
  
    data.items.forEach((item, index) => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.style.gridArea = `card${index + 1}`;
      card.innerHTML = `
        <h2>${item.name}</h2>
        <figure><img src="${item.image}" alt="${item.name}"></figure>
        <address>${item.address}</address>
        <p>${item.description}</p>
        <button>Learn More</button>
      `;
      container.appendChild(card);
    });
  }
  