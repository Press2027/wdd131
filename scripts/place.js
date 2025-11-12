document.addEventListener('DOMContentLoaded', () => {

    // -----------------------------------------------------------------------------------------------------
    // --- API Configuration ---
    // NOTE: This key is often public for examples, but YOU MUST REPLACE IT with your own for reliable use.
    // To get your own key, sign up for a free account at openweathermap.org.
    // -----------------------------------------------------------------------------------------------------
    const API_KEY = 'b1b15e88fa797225412429c1c50c122a1'; 
    const CITY = 'Nairobi,KE';
    const UNITS = 'metric'; // 'metric' for Celsius, 'imperial' for Fahrenheit
    const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=${UNITS}`;

    // ----------------------------------------------------
    // --- 1. Data Correction and Static Content Update ---
    // ----------------------------------------------------
    const correctData = {
        population: 'Approx. 56.4 Million (2024 est.)', 
        internetTld: '.ke', 
    };

    // Correct the population data
    const populationEl = document.getElementById('population-data');
    if (populationEl) {
        populationEl.innerHTML = `<strong>Population:</strong> ${correctData.population}`;
    }

    // Correct the Internet TLD data
    const tldEl = document.getElementById('tld-data');
    if (tldEl) {
        tldEl.innerHTML = `<strong>Internet TLD:</strong> ${correctData.internetTld}`;
    }
    
    // ----------------------------------------------------
    // --- 2. Dynamic Footer Update with Current Date ---
    // ----------------------------------------------------
    const lastModifiedEl = document.getElementById('last-modified');
    if (lastModifiedEl) {
        const now = new Date();
        const dateOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        };
        const formattedDate = now.toLocaleDateString('en-US', dateOptions);
        lastModifiedEl.textContent = formattedDate;
    }

    // ----------------------------------------------------
    // --- 3. Live Weather Fetching ---
    // ----------------------------------------------------
    const tempEl = document.getElementById('current-temp');
    const conditionEl = document.getElementById('weather-condition');
    const windEl = document.getElementById('wind-speed');
    const humidityEl = document.getElementById('humidity');
    const weatherIconEl = document.getElementById('weather-icon');
    const tempLabel = document.getElementById('temp-label');

    // Update the temperature label to indicate the units
    if (tempLabel) {
        tempLabel.textContent = `Temperature:`;
    }

    async function fetchWeather() {
        try {
            // Use the Fetch API to make the request
            const response = await fetch(API_URL);
            
            if (!response.ok) {
                throw new Error(`Weather data fetch failed. Status: ${response.status}. Check API Key.`);
            }

            const data = await response.json();
            
            // Extract and format data
            const temp = Math.round(data.main.temp);
            const condition = data.weather[0].description;
            // Convert wind speed from m/s (default metric) to km/h
            const wind = Math.round(data.wind.speed * (UNITS === 'metric' ? 3.6 : 1)); 
            const humidity = data.main.humidity;
            const unitSymbol = UNITS === 'metric' ? '°C' : '°F';
            const windUnit = UNITS === 'metric' ? ' km/h' : ' mph';
            
            // Update the DOM elements
            if (tempEl) tempEl.textContent = `${temp}${unitSymbol}`;
            // Capitalize the first letter of each word in the condition description
            if (conditionEl) conditionEl.textContent = condition.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '); 
            if (windEl) windEl.textContent = `${wind}${windUnit}`;
            if (humidityEl) humidityEl.textContent = `${humidity}%`;
            
            // Update the weather icon (simple example)
            if (weatherIconEl) {
                const iconCode = data.weather[0].icon;
                // Simple mapping for common weather states
                if (iconCode.includes('01')) weatherIconEl.innerHTML = '&#9728;'; // Sun/Clear
                else if (iconCode.includes('02') || iconCode.includes('03')) weatherIconEl.innerHTML = '&#9729;'; // Cloud/Partly Cloudy
                else if (iconCode.includes('09') || iconCode.includes('10')) weatherIconEl.innerHTML = '&#9730;'; // Rain
                else if (iconCode.includes('13')) weatherIconEl.innerHTML = '&#10052;'; // Snow
                else weatherIconEl.innerHTML = '&#9729;'; // Default
            }

        } catch (error) {
            console.error("Error fetching live weather:", error.message);
            if (conditionEl) conditionEl.textContent = "Data Error (Check Console)";
            if (tempEl) tempEl.textContent = '--';
            if (windEl) windEl.textContent = '--';
            if (humidityEl) humidityEl.textContent = '--';
        }
    }

    // Call the weather fetch function on load
    fetchWeather();


    // ----------------------------------------------------
    // --- 4. Weather Box Toggle Functionality ---
    // ----------------------------------------------------
    const weatherHeader = document.querySelector('.weather-right .weather-header');
    const weatherDetails = document.querySelector('.weather-details');
    const weatherBox = document.querySelector('.weather-right');

    // Add a click listener to the weather header to hide/show details
    if (weatherHeader) {
        weatherHeader.addEventListener('click', () => {
            weatherDetails.classList.toggle('hidden');
            weatherBox.classList.toggle('collapsed');
        });
    }
});