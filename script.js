// Navbar Scroll Effect
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(0,0,0,0.85)';
        nav.style.backdropFilter = 'blur(10px)';
        nav.style.borderBottom = '1px solid rgba(255,255,255,0.1)';
    } else {
        nav.style.background = 'transparent';
        nav.style.backdropFilter = 'none';
        nav.style.borderBottom = 'none';
    }
});

// Scroll Reveal Animation (Intersection Observer)
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            // Remove the class when out of view so the animation repeats
            entry.target.classList.remove('show');
        }
    });
}, observerOptions);

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

// Reveal hero section immediately on load
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const hero = document.querySelector('.hero.hidden');
        if(hero) {
            hero.classList.add('show');
            hero.classList.remove('hidden');
        }
    }, 100);
});

// Lightbox Logic
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.lightbox-close');
const certImages = document.querySelectorAll('.image-card img');

certImages.forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => {
        lightboxImg.src = img.src;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling while open
    });
});

closeBtn.addEventListener('click', () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
});

lightbox.addEventListener('click', (e) => {
    if (e.target !== lightboxImg) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
});
