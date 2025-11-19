document.addEventListener('DOMContentLoaded', () => {

    /* ============================================
       CONSTANTS & ELEMENT REFERENCES
    ============================================ */
    const WEATHER_KEY = "bd5e378503939ddaee76f12ad7a97608"; // <-- PUT REAL KEY HERE
    const CITY = "Nairobi,KE";
    const UNITS = "metric";

    const tempEl = document.getElementById('current-temp');
    const condEl = document.getElementById('weather-condition');
    const windEl = document.getElementById('wind-speed');
    const humidityEl = document.getElementById('humidity');
    const windChillEl = document.createElement('span');

    /* ============================================
       SET STATIC VALUES & FOOTER DATE
    ============================================ */
    document.getElementById('tld-data').innerHTML =
        `<strong>Internet TLD:</strong> .ke`;

    document.getElementById('last-modified').textContent =
        new Date().toLocaleString();

    /* ============================================
       CREATE WIND CHILL ROW
    ============================================ */
    const wcRow = document.createElement('div');
    wcRow.classList.add('weather-row');
    wcRow.innerHTML = `<strong>Wind Chill:</strong> `;
    windChillEl.id = "wind-chill";
    windChillEl.textContent = "--";
    wcRow.appendChild(windChillEl);
    document.querySelector('.weather-box').appendChild(wcRow);


    /* ============================================
       MORE ACCURATE WIND CHILL FORMULA (Metric)
       Source: Environment Canada
    ============================================ */
    function calculateWindChill(tempC, windKmh) {
        if (tempC > 10 || windKmh < 5) return "N/A";

        const v = windKmh;
        const t = tempC;
        const wc = 13.12 + (0.6215 * t) - (11.37 * Math.pow(v, 0.16)) + (0.3965 * t * Math.pow(v, 0.16));
        return Math.round(wc) + "°C";
    }


    /* ============================================
       REAL POPULATION API (REST Countries V3.1)
    ============================================ */
    async function loadPopulation() {
        const popEl = document.getElementById("population-data");
        popEl.innerHTML = `<strong>Population:</strong> Loading...`;

        try {
            const res = await fetch("https://restcountries.com/v3.1/name/kenya?fullText=true");
            if (!res.ok) throw new Error("Population API error");

            const data = await res.json();
            const population = data[0].population.toLocaleString();

            popEl.innerHTML = `<strong>Population:</strong> ${population}`;

        } catch (err) {
            popEl.innerHTML = `<strong>Population:</strong> Unavailable`;
        }
    }


    /* ============================================
       FETCH WEATHER WITH LOADING & FAILOVER
    ============================================ */
    async function fetchWeather() {
        const API_URL =
    `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&units=${UNITS}&appid=${WEATHER_KEY}`;

        // Loading state
        condEl.textContent = "Loading...";
        tempEl.textContent = "--";
        windEl.textContent = "--";
        humidityEl.textContent = "--";
        windChillEl.textContent = "--";

        try {
            const res = await fetch(API_URL);

            if (!res.ok) throw new Error("Weather request failed");

            const data = await res.json();

            const tempC = Math.round(data.main.temp);
            const windKmh = Math.round(data.wind.speed * 3.6);

            tempEl.textContent = `${tempC}°C`;
            condEl.textContent = data.weather[0].description
                .replace(/\b\w/g, c => c.toUpperCase());
            windEl.textContent = `${windKmh} km/h`;
            humidityEl.textContent = `${data.main.humidity}%`;

            // Calculate Wind Chill
            windChillEl.textContent = calculateWindChill(tempC, windKmh);

        } catch (err) {
            condEl.textContent = "Weather unavailable";
        }
    }

    /* ============================================
       INIT
    ============================================ */
    loadPopulation();
    fetchWeather();

});
