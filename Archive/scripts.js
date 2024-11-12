// scripts.js

function setLanguage(language) {
    // Save preferred language to localStorage
    localStorage.setItem('preferredLanguage', language);

    // Get all elements with classes 'en' and 'fr'
    const englishElements = document.querySelectorAll('.en');
    const frenchElements = document.querySelectorAll('.fr');

    // Show or hide content based on selected language
    if (language === 'en') {
        englishElements.forEach(el => el.style.display = 'block');
        frenchElements.forEach(el => el.style.display = 'none');
    } else if (language === 'fr') {
        englishElements.forEach(el => el.style.display = 'none');
        frenchElements.forEach(el => el.style.display = 'block');
    }
}

// Load saved language preference on page load
document.addEventListener('DOMContentLoaded', () => {
    const preferredLanguage = localStorage.getItem('preferredLanguage') || 'en';
    setLanguage(preferredLanguage);
});
