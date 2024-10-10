const toggleButton = document.getElementById('dark-mode-toggle');
const toggleViewButton = document.getElementById('toggle-view');
const membersContainer = document.getElementById('members-container');

toggleButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

toggleViewButton.addEventListener('click', () => {
    membersContainer.classList.toggle('list-view');
});

async function fetchMembers() {
    const response = await fetch('scripts/members.json');
    const members = await response.json();
    displayMembers(members);
}

function displayMembers(members) {
    membersContainer.innerHTML = ''; 
    members.forEach(member => {
        const memberCard = document.createElement('div');
        memberCard.classList.add('member-card');
        
        memberCard.innerHTML = `
            <img src="${member.image}" alt="${member.name} Logo">
            <h3>${member.name}</h3>
            <p><strong>Address:</strong> ${member.address}</p>
            <p><strong>Phone:</strong> ${member.phone}</p>
            <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
        `;
        
        membersContainer.appendChild(memberCard);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    fetchMembers();
    document.getElementById('current-year').textContent = new Date().getFullYear();
    document.getElementById('last-modified').textContent = document.lastModified;
});



