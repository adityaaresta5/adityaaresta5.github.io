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
