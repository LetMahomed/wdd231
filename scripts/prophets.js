const url = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json';
const cards = document.querySelector('#cards');
let results = null;

async function getProphetData(){
    const response = await fetch(url);
    if (response.ok){
        const data = await response.json();
        //console.table(data.prophets);
        displayProphets(data.prophets);
    }
}

getProphetData();
const displayProphets = (prophets) => {
    prophets.forEach(prophet => {
        let card = document.createElement('section');
        let fullName = document.createElement('h2');
        let portrait = document.createElement('img');
        let dateOfBirth = document.createElement('h4');
        let placeOfbirth = document.createElement('h4')

        fullName.textContent = `${prophet.name} ${prophet.lastname}`;
        dateOfBirth.textContent = `Date of Birth: ${prophet.birthdate}`;
        placeOfbirth.textContent = `Place of Birth: ${prophet.birthplace}`

        portrait.setAttribute('src', prophet.imageurl);
        portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname}`);
        portrait.setAttribute('loading', 'lazy');
        portrait.setAttribute('width', '340');
        portrait.setAttribute('height', '440');

        card.appendChild(fullName);
        card.appendChild(dateOfBirth);
        card.appendChild(placeOfbirth);
        card.appendChild(portrait);

        cards.appendChild(card);
    });
  }