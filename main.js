// Initialize Lucide icons
lucide.createIcons();

// Sticky Navbar effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Animated Counters
const stats = document.querySelectorAll('.stat-number');
const obsOptions = {
  threshold: 1,
  rootMargin: '0px',
};

const statsObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = parseInt(entry.target.getAttribute('data-target'));
      let count = 0;
      const speed = target / 50; // speed of animation
      
      const updateCount = () => {
        if (count < target) {
          count += speed;
          entry.target.innerText = Math.ceil(count) + '+';
          setTimeout(updateCount, 20);
        } else {
          entry.target.innerText = target + '+';
        }
      };
      updateCount();
      observer.unobserve(entry.target);
    }
  });
}, obsOptions);

stats.forEach(stat => statsObserver.observe(stat));

// Reveal animations on scroll
const revealElements = document.querySelectorAll('.service-card, .feature-card, .gallery-item, .testimonial-card');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

revealElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'all 0.6s ease-out';
  revealObserver.observe(el);
});
