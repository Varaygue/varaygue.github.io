// scripts.js
function setLanguage(language) {
    const englishElements = document.querySelectorAll('.en');
    const frenchElements = document.querySelectorAll('.fr');

    if (language === 'en') {
        englishElements.forEach(el => el.style.display = 'block');
        frenchElements.forEach(el => el.style.display = 'none');
    } else if (language === 'fr') {
        englishElements.forEach(el => el.style.display = 'none');
        frenchElements.forEach(el => el.style.display = 'block');
    }
}
