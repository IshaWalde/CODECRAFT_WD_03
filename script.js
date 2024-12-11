const apiKey = "e4143959be1c6f9654132b90855b0386";
// Replace with your OpenWeatherMap API key
const searchBtn = document.getElementById("search-btn");
const cityInput = document.getElementById("city-input");
const weatherDetails = document.getElementById("weather-details");
const errorMessage = document.getElementById("error-message");

searchBtn.addEventListener("click", fetchWeather);
cityInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        fetchWeather();
    }
});

function fetchWeather() {
    const cityName = cityInput.value.trim();
    if (!cityName) {
        displayError("Please enter a city name.");
        return;
    }

    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

    fetch(apiURL)
        .then(response => {
            if (!response.ok) {
                throw new Error("City not found. Please try again.");
            }
            return response.json();
        })
        .then(data => displayWeather(data))
        .catch(err => displayError(err.message));
}

function displayWeather(data) {
    errorMessage.classList.add("hidden");
    weatherDetails.classList.remove("hidden");

    document.getElementById("city-name").textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById("temperature").textContent = `${Math.round(data.main.temp)}°C`;
    document.getElementById("description").textContent = `Weather: ${data.weather[0].description}`;
    document.getElementById("humidity").textContent = `Humidity: ${data.main.humidity}%`;
    document.getElementById("wind-speed").textContent = `Wind Speed: ${data.wind.speed} m/s`;
    document.getElementById("weather-icon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
}

function displayError(message) {
    weatherDetails.classList.add("hidden");
    errorMessage.textContent = message;
    errorMessage.classList.remove("hidden");
}
