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

// Solitaire Skills Deck Logic
const deckContainer = document.getElementById('skills-deck');
const skillCards = document.querySelectorAll('.skill-card');

function calculateStackTransforms() {
    if (!deckContainer) return;
    
    skillCards.forEach((card, index) => {
        // Find natural grid position relative to container
        const cardWidth = card.offsetWidth;
        const cardHeight = card.offsetHeight;
        
        // Target center of the container
        const stackX = (deckContainer.offsetWidth / 2) - (cardWidth / 2);
        const stackY = (deckContainer.offsetHeight / 2) - (cardHeight / 2);
        
        const dx = stackX - card.offsetLeft;
        const dy = stackY - card.offsetTop;
        
        // Fan out rotation: cards in middle are straight, edges are rotated
        const rot = (index - (skillCards.length - 1) / 2) * 4; // Spread from negative to positive degrees
        
        card.style.setProperty('--dx', `${dx}px`);
        card.style.setProperty('--dy', `${dy}px`);
        card.style.setProperty('--rot', `${rot}deg`);
        card.style.setProperty('--z', index);
    });
}

// Recalculate on resize in case grid changes
window.addEventListener('resize', calculateStackTransforms);

if (deckContainer) {
    // Initial calculation (slight delay to let font load and layout settle)
    setTimeout(calculateStackTransforms, 100);

    // Deal cards on click
    deckContainer.addEventListener('click', () => {
        if (deckContainer.classList.contains('stacked')) {
            deckContainer.classList.remove('stacked');
        }
    });
    
    // 3D Parallax Hover Effect
    deckContainer.addEventListener('mousemove', (e) => {
        if (!deckContainer.classList.contains('stacked')) return;
        
        const rect = deckContainer.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Normalize coordinates to -1 (left/top) to +1 (right/bottom)
        const xNorm = (x / rect.width - 0.5) * 2;
        const yNorm = (y / rect.height - 0.5) * 2;
        
        deckContainer.style.setProperty('--mouse-x', xNorm);
        deckContainer.style.setProperty('--mouse-y', yNorm);
    });

    deckContainer.addEventListener('mouseleave', () => {
        deckContainer.style.setProperty('--mouse-x', 0);
        deckContainer.style.setProperty('--mouse-y', 0);
    });

    // Restack when completely scrolled out of view
    const deckObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                deckContainer.classList.add('stacked');
                calculateStackTransforms(); // recalculate just in case
            }
        });
    }, { threshold: 0, rootMargin: '100px' });
    
    deckObserver.observe(deckContainer);
}
const track = document.getElementById('cert-track');
let slides = Array.from(document.querySelectorAll('.carousel-slide'));
if (track && slides.length > 0) {
    // 3-item carousel architecture: Move last slide to front so index 1 is in center
    track.insertBefore(slides[slides.length - 1], slides[0]);
    slides = Array.from(document.querySelectorAll('.carousel-slide'));
    
    // Center index 1. Slide is 450px wide.
    // 450 * 1.5 = 675px offset from 50%
    track.style.marginLeft = 'calc(50% - 675px)';

    slides[1].classList.add('active-slide');

    setInterval(() => {
        slides[1].classList.remove('active-slide');
        
        setTimeout(() => {
            track.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
            track.style.transform = 'translateX(-450px)';
            
            setTimeout(() => {
                slides[2].classList.add('active-slide');
                
                setTimeout(() => {
                    track.style.transition = 'none';
                    track.appendChild(slides[0]);
                    track.style.transform = 'translateX(0)';
                    
                    // Update slides array to match new DOM
                    slides = Array.from(document.querySelectorAll('.carousel-slide'));
                }, 800); // Wait for zoom-in
            }, 600); // Wait for slide
        }, 800); // Wait for zoom-out
    }, 3500); // Switch every 3.5s
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
