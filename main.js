// Initialize Lucide icons
lucide.createIcons();

// Luxury Loader Injection
const loader = document.createElement('div');
loader.id = 'loader';
loader.innerHTML = `
    <div class="loader-content">
        <div class="loader-logo">FD SPORTS</div>
        <div class="loader-bar"></div>
    </div>
`;
document.body.appendChild(loader);

window.addEventListener('load', () => {
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 800);
    }, 1000);
});

// Custom Cursor
const cursorDot = document.createElement('div');
const cursorOutline = document.createElement('div');
cursorDot.className = 'cursor-dot';
cursorOutline.className = 'cursor-outline';
document.body.appendChild(cursorDot);
document.body.appendChild(cursorOutline);

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    // Outline with slight lag
    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
});

// Cursor Scale on Links
const interactiveElements = document.querySelectorAll('a, button, .service-card, .gallery-item, .stat-card');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorOutline.style.width = '60px';
        cursorOutline.style.height = '60px';
        cursorOutline.style.backgroundColor = 'rgba(34, 197, 94, 0.1)';
        cursorDot.style.transform = 'translate(-50%, -50%) scale(1.5)';
    });
    el.addEventListener('mouseleave', () => {
        cursorOutline.style.width = '40px';
        cursorOutline.style.height = '40px';
        cursorOutline.style.backgroundColor = 'transparent';
        cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
    });
});

// Magnetic Buttons & 3D Tilt for Cards
const magneticElements = document.querySelectorAll('.btn-primary, .btn-secondary, .nav-cta, .logo');
magneticElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });
    el.addEventListener('mouseleave', () => {
        el.style.transform = `translate(0px, 0px)`;
    });
});

// 3D Tilt and Mouse Glow for Glass Cards
const glassCards = document.querySelectorAll('.glass, .glass-premium');
glassCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Radial glow position
        card.style.setProperty('--x', `${(x / rect.width) * 100}%`);
        card.style.setProperty('--y', `${(y / rect.height) * 100}%`);

        // 3D Tilt logic
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 15;
        const rotateY = (centerX - x) / 15;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
    });
});

// Header Text Split Animation
const headers = document.querySelectorAll('h1, h2');
headers.forEach(header => {
    const text = header.textContent;
    header.innerHTML = '';
    const words = text.split(' ');
    words.forEach(word => {
        const span = document.createElement('span');
        span.className = 'split-text';
        span.innerHTML = `<span style="display:inline-block">${word}</span>&nbsp;`;
        header.appendChild(span);
    });
});

// Scroll Progress Bar
const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const windowScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (windowScroll / height) * 100;
    progressBar.style.width = scrolled + "%";
});

// Sticky Navbar
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Enhanced Intersection Observer for Reveals
const obsOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            
            // If it's a stat number, start counter
            if (entry.target.classList.contains('stat-number')) {
                animateCounter(entry.target);
            }
            
            revealObserver.unobserve(entry.target);
        }
    });
}, obsOptions);

// Select all elements to reveal
const revealElements = document.querySelectorAll('.service-card, .feature-card, .gallery-item, .testimonial-card, .section-header, .about-content, .about-image, .stat-card, footer, h1, h2');
revealElements.forEach((el, index) => {
    el.classList.add('reveal');
    // Stagger effect
    el.style.transitionDelay = `${(index % 3) * 0.1}s`;
    revealObserver.observe(el);
});

// Stat Counters Logic
function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'));
    if (isNaN(target)) return;
    let count = 0;
    const duration = 2000;
    const increment = target / (duration / 16);

    const updateCount = () => {
        if (count < target) {
            count += increment;
            el.innerText = Math.ceil(count);
            requestAnimationFrame(updateCount);
        } else {
            el.innerText = target + '+';
        }
    };
    updateCount();
}

// Parallax Effect for Hero
window.addEventListener('scroll', () => {
    const scrollValue = window.scrollY;
    const heroTitle = document.querySelector('.hero-title');
    const heroVideo = document.querySelector('.hero-video');
    
    if (heroTitle) {
        heroTitle.style.transform = `translateY(${scrollValue * 0.3}px)`;
    }
    if (heroVideo) {
        heroVideo.style.filter = `blur(${scrollValue * 0.01}px)`;
    }
});
