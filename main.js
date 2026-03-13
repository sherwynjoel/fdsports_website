// Initialize Lucide icons
lucide.createIcons();

const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

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

// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.setAttribute('data-lucide', 'x');
        } else {
            icon.setAttribute('data-lucide', 'menu');
        }
        lucide.createIcons();
    });
}

// Close mobile menu on link click
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = mobileMenuBtn.querySelector('i');
        icon.setAttribute('data-lucide', 'menu');
        lucide.createIcons();
    });
});

// Interactive Background Particles (Only on Desktop for performance)
if (!isTouchDevice) {
    const canvas = document.createElement('canvas');
    canvas.id = 'bg-particles';
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    let particles = [];
    const particleCount = 60;

    function initParticles() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 2 + 1,
                speedX: Math.random() * 1 - 0.5,
                speedY: Math.random() * 1 - 0.5,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.x += p.speedX;
            p.y += p.speedY;

            if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
            if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(34, 197, 94, ${p.opacity})`;
            ctx.fill();
        });
        requestAnimationFrame(animateParticles);
    }

    initParticles();
    animateParticles();
    window.addEventListener('resize', initParticles);

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

        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });

    // Interactive Image Spotlight tracking
    document.querySelectorAll('.gallery-item, .service-detail img').forEach(item => {
        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            item.style.setProperty('--mouse-x', `${x}px`);
            item.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // Cursor Scale & Magnetic Interaction
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
    const magneticElements = document.querySelectorAll('.btn-primary, .btn-secondary, .nav-cta, .logo, .nav-links li a');
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

            card.style.setProperty('--x', `${(x / rect.width) * 100}%`);
            card.style.setProperty('--y', `${(y / rect.height) * 100}%`);

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
}

// Button Ripple Effect
document.querySelectorAll('.btn-primary, .btn-secondary, .nav-cta').forEach(button => {
    button.addEventListener('pointerdown', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
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

// Button Click Feedbacks (Haptics for Mobile)
document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('click', () => {
        if (navigator.vibrate && isTouchDevice) {
            navigator.vibrate(20); // Subtle 20ms pulse
        }
    });
});

// Close mobile menu on scroll
let lastScrollY = window.scrollY;
window.addEventListener('scroll', () => {
    if (Math.abs(window.scrollY - lastScrollY) > 50 && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        const icon = mobileMenuBtn.querySelector('i');
        icon.setAttribute('data-lucide', 'menu');
        lucide.createIcons();
    }
    lastScrollY = window.scrollY;
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
            
            // Add slight haptic when section reveals (optional, maybe too much)
            // if (isTouchDevice && navigator.vibrate) navigator.vibrate(5);

            if (entry.target.classList.contains('stat-number')) {
                animateCounter(entry.target);
            }
            
            revealObserver.unobserve(entry.target);
        }
    });
}, obsOptions);

const revealElements = document.querySelectorAll('.service-card, .feature-card, .gallery-item, .testimonial-card, .section-header, .about-content, .about-image, .stat-card, footer, h1, h2, .service-detail');
revealElements.forEach((el, index) => {
    el.classList.add('reveal');
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
