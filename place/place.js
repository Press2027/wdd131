document.addEventListener('DOMContentLoaded', () => {

    // ---------------------------
    // STATIC DATA FIX
    // ---------------------------
    document.getElementById('population-data').innerHTML =
        `<strong>Population:</strong> Approx. 56.4 Million (2024 est.)`;

    document.getElementById('tld-data').innerHTML =
        `<strong>Internet TLD:</strong> .ke`;

    // ---------------------------
    // FOOTER DATE
    // ---------------------------
    document.getElementById('last-modified').textContent =
        new Date().toLocaleString();

    // ---------------------------
    // WEATHER API
    // ---------------------------
    const API_KEY = "b1b15e88fa797225412429c1c50c122a1";
    const CITY = "Nairobi,ke";
    const UNITS = "metric";

    const API_URL =
        `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=${UNITS}`;

    const tempEl = document.getElementById('current-temp');
    const condEl = document.getElementById('weather-condition');
    const windEl = document.getElementById('wind-speed');
    const humidityEl = document.getElementById('humidity');

    // Create a new display location for wind chill
    let wcRow = document.createElement('div');
    wcRow.classList.add('weather-row');
    wcRow.innerHTML = `<strong>Wind Chill:</strong> <span id="wind-chill">--</span>`;
    document.querySelector('.weather-box').appendChild(wcRow);

    const windChillEl = document.getElementById('wind-chill');

    // --------------------------------
    // WIND CHILL CALCULATION FUNCTION
    // --------------------------------
    function calculateWindChill(tempC, windKmh) {
        // Conditions for wind chill (Metric)
        if (tempC > 10 || windKmh <= 4.8) {
            return "N/A";
        }

        // Wind Chill Formula (Celsius & km/h)
        const wc = 13.12 +
                   0.6215 * tempC -
                   11.37 * Math.pow(windKmh, 0.16) +
                   0.3965 * tempC * Math.pow(windKmh, 0.16);

        return Math.round(wc) + "°C";
    }

    // ---------------------------
    // FETCH WEATHER
    // ---------------------------
    async function fetchWeather() {
        try {
            const res = await fetch(API_URL);

            if (!res.ok) throw new Error("Weather request failed.");

            const data = await res.json();

            const tempC = Math.round(data.main.temp);
            const windKmh = Math.round(data.wind.speed * 3.6);

            tempEl.textContent = tempC + "°C";

            condEl.textContent = data.weather[0].description
                .replace(/\b\w/g, c => c.toUpperCase());

            windEl.textContent = windKmh + " km/h";
            humidityEl.textContent = data.main.humidity + "%";

            // Compute wind chill
            const chill = calculateWindChill(tempC, windKmh);
            windChillEl.textContent = chill;

        } catch (err) {
            condEl.textContent = "Weather unavailable";
        }
    }

    fetchWeather();

});
