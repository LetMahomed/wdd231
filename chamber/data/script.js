document.addEventListener("DOMContentLoaded", async function() {
    const API_KEY = '99d51f732bb1bfb3d0731d658c4f83c8';
    const city = 'Cabo Frio,BR';
    
    async function fetchWeather() {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
            const data = await response.json();
            document.getElementById("current-temp").textContent = `${data.main.temp}°C`;
            document.getElementById("weather-condition").textContent = data.weather[0].description;
            document.getElementById("weather-icon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
            document.getElementById("weather-icon").style.display = "block";
        } catch (error) {
            console.error("Weather fetch error:", error);
        }
    }
    
    async function fetchForecast() {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`);
            const data = await response.json();
            const forecastElement = document.getElementById("forecast");
            forecastElement.innerHTML = "";
            const dailyForecasts = {};
            data.list.forEach(item => {
                const date = item.dt_txt.split(" ")[0];
                if (!dailyForecasts[date]) {
                    dailyForecasts[date] = [];
                }
                dailyForecasts[date].push(item.main.temp);
            });
            Object.keys(dailyForecasts).slice(0, 3).forEach(day => {
                const avgTemp = (dailyForecasts[day].reduce((a, b) => a + b, 0) / dailyForecasts[day].length).toFixed(1);
                forecastElement.innerHTML += `<li>${new Date(day).toLocaleDateString('en-US', { weekday: 'long' })}: ${avgTemp}°C</li>`;
            });
        } catch (error) {
            console.error("Forecast fetch error:", error);
        }
    }
    
    async function fetchSpotlights() {
        try {
            const response = await fetch("data.json");
            const members = await response.json();
            const goldSilverMembers = members.filter(m => m.membership_level === "Gold" || m.membership_level === "Silver");
            const shuffled = goldSilverMembers.sort(() => 0.5 - Math.random()).slice(0, 3);
            const spotlightContainer = document.getElementById("spotlight-container");
            spotlightContainer.innerHTML = "";
            shuffled.forEach(member => {
                spotlightContainer.innerHTML += `
                    <div class="spotlight">
                        <img src="${member.image}" alt="${member.name}">
                        <h3>${member.name}</h3>
                        <p><strong>Phone:</strong> ${member.phone}</p>
                        <p><strong>Address:</strong> ${member.address}</p>
                        <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
                        <p><strong>Membership Level:</strong> ${member.membership_level}</p>
                    </div>`;
            });
        } catch (error) {
            console.error("Spotlight fetch error:", error);
        }
    }
    
    fetchWeather();
    fetchForecast();
    fetchSpotlights();
    document.getElementById("current-year").textContent = new Date().getFullYear();
});
