/* General Styling */
body {
    font-family: 'Roboto', sans-serif;
    margin: 0;
    padding: 20px;
    background-color: #f0f0f0; /* Light background for the whole page */
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
}

/* Card Container */
.card-container {
    width: 90%;
    max-width: 800px;
    border: 1px solid #ccc;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    background-color: white;
    overflow: hidden; /* To contain the image background */
}

/* Header */
.card-header {
    background-color: #a30000; /* Dark Red */
    color: white;
    text-align: center;
    padding: 15px 0;
    font-size: 2em;
    font-weight: 700;
}

/* Main Content Area */
.card-content {
    position: relative;
    padding: 20px;
    min-height: 450px; /* Adjust height based on desired image area */
}

/* Image Placeholder/Background - Now a wildlife image */
.image-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /* Replace with your actual wildlife image URL or a local path */
    background-image: url('https://pbs.twimg.com/media/D9a7rIzW4AEmKX4.jpg'); /* Placeholder wildlife image */
    background-size: cover;
    background-position: center;
    z-index: 1; /* Place behind info boxes */
}

/* Info Boxes Styling */
.data-box {
    position: absolute; /* Position over the image */
    background-color: rgba(255, 255, 255, 0.85); /* White with some transparency */
    padding: 0;
    z-index: 2; /* Place above the image */
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(2px); /* Optional: to make the background slightly blurred */
}

.data-header, .weather-header {
    background-color: #38761d; /* Dark Green */
    color: white;
    padding: 10px;
    font-size: 1.2em;
    font-weight: 700;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.data-list, .weather-details {
    padding: 10px 15px;
    color: #333;
}

.data-list p, .weather-details p {
    margin: 5px 0;
    line-height: 1.4;
    font-size: 0.9em;
}

/* Data Box (Left Side Positioning) */
.data-left {
    top: 20px;
    left: 20px;
    width: 45%; /* Adjust width as needed */
}

/* Weather Box (Right Side Positioning) */
.weather-right {
    top: 40px;
    right: 20px;
    width: 35%; /* Adjust width as needed */
    /* Weather header color for contrast/differentiation */
    background-color: rgba(255, 255, 255, 0.95);
    transition: all 0.3s ease-in-out; /* Smooth transition for collapse */
}

.weather-right .weather-header {
    background-color: #6aa84f; /* Lighter Green for Weather */
    cursor: pointer; /* Indicate it's clickable */
}

/* Footer */
.card-footer {
    background-color: #a30000; /* Dark Red */
    color: white;
    text-align: center;
    padding: 10px 0;
    font-size: 0.8em;
    line-height: 1.5;
}

/* --- JS Dynamic Styles --- */
/* Hide the weather details when the 'hidden' class is applied by JS */
.weather-details.hidden {
    display: none;
}

/* Collapse the box when content is hidden */
.weather-right.collapsed {
    /* Set a minimum height to just fit the header, plus some padding */
    height: 45px; 
    overflow: hidden;
}