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

// Carousel Logic
const track = document.getElementById('cert-track');
const slides = Array.from(document.querySelectorAll('.carousel-slide'));
if (track && slides.length > 0) {
    let currentSlide = 0;
    slides[0].classList.add('active-slide');

    setInterval(() => {
        slides[currentSlide].classList.remove('active-slide');
        
        setTimeout(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            const slideWidth = slides[0].getBoundingClientRect().width;
            track.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
            
            setTimeout(() => {
                slides[currentSlide].classList.add('active-slide');
            }, 800);
        }, 1200);
    }, 6000); // Switch every 6s
}

// Lightbox Logic
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.lightbox-close');
const certImages = document.querySelectorAll('.image-card img');
const prevBtn = document.getElementById('lightbox-prev');
const nextBtn = document.getElementById('lightbox-next');

let currentLightboxIndex = 0;
const imageSources = Array.from(certImages).map(img => img.src);

certImages.forEach((img, index) => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => {
        currentLightboxIndex = index;
        lightboxImg.src = imageSources[currentLightboxIndex];
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; 
    });
});

closeBtn.addEventListener('click', () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
});

lightbox.addEventListener('click', (e) => {
    if (e.target !== lightboxImg && e.target !== prevBtn && e.target !== nextBtn) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
});

if(prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
        currentLightboxIndex = (currentLightboxIndex - 1 + imageSources.length) % imageSources.length;
        lightboxImg.src = imageSources[currentLightboxIndex];
    });

    nextBtn.addEventListener('click', () => {
        currentLightboxIndex = (currentLightboxIndex + 1) % imageSources.length;
        lightboxImg.src = imageSources[currentLightboxIndex];
    });
}
