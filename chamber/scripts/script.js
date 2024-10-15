// Weather Information Elements
const currentTemp = document.querySelector('.current-weather .weather-details p:nth-child(1)');
const weatherCondition = document.querySelector('.current-weather .weather-details p:nth-child(2)');
const forecastContainer = document.querySelector('.weather-forecast');

// API Key and City
const API_KEY = '99d51f732bb1bfb3d0731d658c4f83c8'; // Replace with your OpenWeatherMap API key
const city = 'Cabo Frio,BR'; // Chamber location

async function fetchWeather() {
    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    try {
        const response = await fetch(weatherApiUrl);
        if (!response.ok) throw new Error('Error fetching weather data');
        const data = await response.json();
        displayCurrentWeather(data);
        fetchForecast(); // Fetch the forecast after getting current weather
    } catch (error) {
        console.error(error);
    }
}

function displayCurrentWeather(data) {
    const currentTemperature = data.main.temp;
    const weatherDescription = data.weather[0].description;
    const highTemp = data.main.temp_max;
    const lowTemp = data.main.temp_min;
    const humidity = data.main.humidity;
    const sunriseTime = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
    const sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString();

    currentTemp.innerHTML = `<strong>Temperature:</strong> ${currentTemperature}°C`;
    weatherCondition.innerHTML = `<strong>Condition:</strong> ${weatherDescription}`;
    document.querySelector('.current-weather .weather-details .high').innerHTML = `<strong>High:</strong> ${highTemp}°C`;
    document.querySelector('.current-weather .weather-details .low').innerHTML = `<strong>Low:</strong> ${lowTemp}°C`;
    document.querySelector('.current-weather .weather-details .humidity').innerHTML = `<strong>Humidity:</strong> ${humidity}%`;
    document.querySelector('.current-weather .weather-details .sunrise').innerHTML = `<strong>Sunrise:</strong> ${sunriseTime}`;
    document.querySelector('.current-weather .weather-details .sunset').innerHTML = `<strong>Sunset:</strong> ${sunsetTime}`;
}


async function fetchForecast() {
    const forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;

    try {
        const response = await fetch(forecastApiUrl);
        if (!response.ok) throw new Error('Error fetching forecast data');
        const data = await response.json();
        displayForecast(data);
    } catch (error) {
        console.error(error);
    }
}

function displayForecast(data) {
    let forecastHtml = '<h3>Weather Forecast</h3>';
    
    // Group forecast data by date
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
        
        // Convert date to day of the week
        const dayOfWeek = new Date(day).toLocaleString('en-US', { weekday: 'long' });
        forecastHtml += `<p>${dayOfWeek}: ${avgTemp}°C</p>`;
    });

    forecastContainer.innerHTML = forecastHtml;
}


document.addEventListener('DOMContentLoaded', () => {
    fetchWeather();

    document.getElementById('current-year').textContent = new Date().getFullYear();
    document.getElementById('last-modified').textContent = document.lastModified;
});

const darkModeToggle = document.getElementById('dark-mode-toggle');

darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    const header = document.querySelector('header');
    const navContainer = document.querySelector('.nav-container');
    const footerContent = document.querySelector('.footer-content');

    header.classList.toggle('dark-mode');
    navContainer.classList.toggle('dark-mode');
    footerContent.classList.toggle('dark-mode');
});
