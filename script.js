// Navbar Scroll Effect
const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Scroll Reveal Animation (Intersection Observer)
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target); // Stop observing once it's shown
        }
    });
}, observerOptions);

// Select all elements with the 'hidden' class
const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

// Reveal hero section immediately on load
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const hero = document.querySelector('.hero-content.hidden');
        if(hero) {
            hero.classList.add('show');
            hero.classList.remove('hidden');
        }
    }, 100);
});

// Theme Toggle Logic
const themeToggleBtn = document.getElementById('theme-toggle');
const htmlEl = document.documentElement;
const themeIcon = themeToggleBtn.querySelector('.icon');

// Check local storage for theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    htmlEl.setAttribute('data-theme', savedTheme);
    themeIcon.textContent = savedTheme === 'light' ? '🌙' : '☀️';
}

themeToggleBtn.addEventListener('click', () => {
    const currentTheme = htmlEl.getAttribute('data-theme');
    let newTheme = 'light';
    let newIcon = '🌙';

    if (currentTheme === 'light') {
        newTheme = 'dark';
        newIcon = '☀️';
        htmlEl.removeAttribute('data-theme'); // default is dark
    } else {
        htmlEl.setAttribute('data-theme', newTheme);
    }
    
    themeIcon.textContent = newIcon;
    localStorage.setItem('theme', newTheme);
});
