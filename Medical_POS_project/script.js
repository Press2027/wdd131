// =====================
// FEATURES DATA
// =====================
const POSFeatures = [
    { name: "Patient Billing", description: "Automates invoicing...", category: "Financial", priority: "High" },
    { name: "Co-pay & Deductible Processing", description: "Calculates co-pays...", category: "Financial", priority: "High" },
    { name: "Insurance Integration", description: "Coverage verification...", category: "Administrative", priority: "High" },
    { name: "Inventory Tracking", description: "Manages stock...", category: "Logistics", priority: "Medium" },
    { name: "Appointment Payments", description: "Handles pre-payments...", category: "Financial", priority: "Medium" }
];


// =====================
// LOAD FEATURE CARDS
// =====================
function loadFeatureHighlights() {
    const container = document.getElementById('feature-list-container');
    if (!container) return;

    container.innerHTML = POSFeatures.map(f => `
        <div class="feature-card fade-in">
            <h3>${sanitize(f.name)} (${sanitize(f.category)})</h3>
            <p>${sanitize(f.description)}</p>
            <p class="priority"><strong>Priority:</strong> ${sanitize(f.priority)}</p>
        </div>
    `).join('');
}


// =====================
// HANDLE DEMO FORM
// =====================
function handleFormSubmit(event) {
    event.preventDefault();

    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const practiceType = document.getElementById('practiceType').value;

    const paymentRadio = document.querySelector('input[name="paymentInterest"]:checked');
    const responseDiv = document.getElementById('form-response-message');

    // Validate payment selection
    if (!paymentRadio) {
        responseDiv.innerHTML = `<p class="error-message">⚠️ Please select your card payment integration preference.</p>`;
        return;
    }

    const paymentInterest = paymentRadio.value;

    // Validate required inputs
    if (!fullName || !email || !practiceType) {
        responseDiv.innerHTML = `<p class="error-message">⚠️ Please fill in all required fields.</p>`;
        return;
    }

    // Success message
    const message = `
        <p class="success-message fade-in">
            ✅ Success! Thank you, ${sanitize(fullName)}.  
            Your <strong>${sanitize(practiceType)}</strong> demo request is confirmed.<br>
            A confirmation email has been sent to <strong>${sanitize(email)}</strong>.
        </p>
    `;

    // Save basic user info for the welcome message
    if (fullName) localStorage.setItem('userName', fullName);
    if (email) localStorage.setItem('lastEmail', email);

    responseDiv.innerHTML = message;

    // Reset form
    document.getElementById('demo-request-form').reset();
}


// =====================
// PERSONALIZED HOME MESSAGE
// =====================
function checkLocalStorage() {
    const name = localStorage.getItem('userName');
    const welcome = document.getElementById('welcome-message');

    if (name && welcome) {
        welcome.textContent = `Welcome back, ${name}!`;
        welcome.classList.add('fade-in');
    }
}


// =====================
// FOOTER LAST MODIFIED DATE
// =====================
function setLastModified() {
    const element = document.getElementById('last-modified');
    if (!element) return;

    const lastMod = new Date(document.lastModified);
    element.textContent = `Last Updated: ${lastMod.toLocaleString()}`;
}


// =====================
// SANITIZE USER INPUT
// =====================
function sanitize(str) {
    return str.replace(/[&<>"']/g, match => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    }[match]));
}


// =====================
// INITIALIZERS
// =====================
document.addEventListener('DOMContentLoaded', () => {

    // Load feature cards (functions page)
    if (document.getElementById('feature-list-container')) {
        loadFeatureHighlights();
    }

    // Handle demo form (contact page)
    if (document.getElementById('demo-request-form')) {
        document.getElementById('demo-request-form')
            .addEventListener('submit', handleFormSubmit);
    }

    // Personalized welcome (home page)
    if (document.getElementById('welcome-message')) {
        checkLocalStorage();
    }

    // Footer last updated timestamp (all pages)
    setLastModified();
});
