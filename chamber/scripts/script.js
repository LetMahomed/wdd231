const toggleButton = document.getElementById('dark-mode-toggle');
const toggleViewButton = document.getElementById('toggle-view');
const membersContainer = document.getElementById('members-container');

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
            <h4>${member.name}</h4>
            <p><strong>Address:</strong> ${member.address}</p>
            <p><strong>Phone:</strong> ${member.phone}</p>
            <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
        `;
        
        membersContainer.appendChild(memberCard);
    });
}

async function fetchWeather() {
    const apiKey = '99d51f732bb1bfb3d0731d658c4f83c8'; // Replace with your OpenWeatherMap API key
    const city = 'Cabo Frio,BR'; // Chamber location
    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(weatherApiUrl);
        const data = await response.json();
        displayCurrentWeather(data);
        fetchForecast(); // Call forecast function
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function displayCurrentWeather(data) {
    const currentTemp = data.main.temp;
    const weatherDescription = data.weather[0].description;
    const weatherContainer = document.querySelector('.current-weather .weather-details');

    weatherContainer.innerHTML = `
        <p><strong>Temperature:</strong> ${currentTemp}°C</p>
        <p><strong>Condition:</strong> ${weatherDescription}</p>
    `;
}

async function fetchForecast() {
    const apiKey = '99d51f732bb1bfb3d0731d658c4f83c8'; // Replace with your OpenWeatherMap API key
    const city = 'Cabo Frio,BR'; // Chamber location
    const forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(forecastApiUrl);
        const data = await response.json();
        displayForecast(data);
    } catch (error) {
        console.error('Error fetching forecast data:', error);
    }
}

function displayForecast(data) {
    const forecastContainer = document.querySelector('.weather-forecast');
    let forecastHtml = '<h3>3-Day Forecast</h3>';
    
    const days = {};
    data.list.forEach(item => {
        const date = item.dt_txt.split(' ')[0];
        if (!days[date]) {
            days[date] = [];
        }
        days[date].push(item);
    });

    const forecastDays = Object.keys(days).slice(0, 3);
    forecastDays.forEach(day => {
        const dailyTemps = days[day].map(item => item.main.temp);
        const avgTemp = (dailyTemps.reduce((a, b) => a + b, 0) / dailyTemps.length).toFixed(1);
        forecastHtml += `<p>${day}: ${avgTemp}°C</p>`;
    });

    forecastContainer.innerHTML = forecastHtml;
}

function displaySpotlightMembers(members) {
    const qualifiedMembers = members.filter(member => member.membership_level === 1 || member.membership_level === 2);
    const randomMembers = qualifiedMembers.sort(() => 0.5 - Math.random()).slice(0, 3);
    
    const spotlightContainer = document.getElementById('member-spotlights');
    spotlightContainer.innerHTML = '<h2>Member Spotlights</h2>';
    
    randomMembers.forEach(member => {
        spotlightContainer.innerHTML += `
            <div class="member-spotlight">
                <img src="${member.image}" alt="${member.name} Logo" />
                <h3>${member.name}</h3>
                <p>Phone: ${member.phone}</p>
                <p>Address: ${member.address}</p>
                <a href="${member.website}" target="_blank">Visit Website</a>
                <p>Membership Level: ${member.membership_level === 1 ? 'Gold' : 'Silver'}</p>
            </div>
        `;
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    const members = await fetchMembers();
    displaySpotlightMembers(members);

    fetchWeather(); // Fetch weather data

    document.getElementById('current-year').textContent = new Date().getFullYear();
    document.getElementById('last-modified').textContent = document.lastModified;

    // Event listeners for toggles
    toggleButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const header = document.querySelector('header');
        const footer = document.querySelector('footer');
        header.classList.toggle('dark-mode');
        footer.classList.toggle('dark-mode');
    });

    toggleViewButton.addEventListener('click', () => {
        membersContainer.classList.toggle('list-view');
    });
});
