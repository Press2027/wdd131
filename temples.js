// Hamburger Menu
const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('nav');

hamButton.addEventListener('click', () => {
    navigation.classList.toggle('open');
    hamButton.textContent = navigation.classList.contains('open') ? 'X' : '☰';
});

// Set initial hamburger icon
hamButton.textContent = '☰';

// Footer Dynamic Year and Last Modified
document.getElementById('currentyear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = `Last Modified: ${document.lastModified}`;
