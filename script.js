// Smooth scroll
document.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", e => {
    if (link.getAttribute("href").startsWith("#")) {
      e.preventDefault();
      document.querySelector(link.getAttribute("href"))
        .scrollIntoView({ behavior: "smooth" });
    }
  });
});

// Theme toggle
function toggleTheme() {
  document.body.classList.toggle("light");
  document.body.classList.toggle("dark");
}

// Scroll animations with Intersection Observer
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Add scroll animations to elements
document.addEventListener('DOMContentLoaded', () => {
  // Add animations to skill cards
  document.querySelectorAll('.skill-card').forEach((card, index) => {
    card.classList.add('scroll-scale');
    card.style.animationDelay = `${index * 0.1}s`;
  });

  // Add animations to work cards
  document.querySelectorAll('.work-card').forEach((card) => {
    card.classList.add('scroll-scale');
  });

  // Add animations to section titles
  document.querySelectorAll('.section-title').forEach((title) => {
    title.classList.add('scroll-fade-in');
  });

  // Add animations to about text
  document.querySelectorAll('.about-text p').forEach((p, index) => {
    if (index === 0) p.classList.add('scroll-fade-left');
    else p.classList.add('scroll-fade-right');
  });

  // Add animations to contact items
  document.querySelectorAll('.contact-item').forEach((item) => {
    item.classList.add('scroll-fade-left');
  });

  // Observe all animated elements
  document.querySelectorAll('.scroll-fade-in, .scroll-fade-left, .scroll-fade-right, .scroll-scale').forEach(el => {
    observer.observe(el);
  });

  // Add button click ripple effect
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.classList.add('ripple');
      
      this.appendChild(ripple);
      
      setTimeout(() => ripple.remove(), 600);
    });
  });
});

// Add ripple CSS dynamically
const style = document.createElement('style');
style.textContent = `
  .btn {
    position: relative;
    overflow: hidden;
  }
  
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.7);
    transform: scale(0);
    animation: ripple-animation 0.6s ease-out;
    pointer-events: none;
  }
  
  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);
