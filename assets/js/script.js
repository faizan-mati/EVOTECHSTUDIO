
// =============================== HERO SECTION =======================================

document.addEventListener("DOMContentLoaded", () => {
  const observerOptions = {
    threshold: 0.2
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("hero-reveal");
        observer.unobserve(entry.target);
      }
    });
  });

  document.querySelectorAll('.heroSection h1, .heroSection p, .responsive-img')
    .forEach(el => observer.observe(el));
});
// =============================== SERVICE CARD SECTION =======================================

document.addEventListener('DOMContentLoaded', function() {
  const cards = document.querySelectorAll('.digi-card');
  
  // Add animate class initially for cards in viewport
  cards.forEach(card => {
    card.classList.add('animate');
  });
  
  // Intersection Observer for scroll animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  // Observe all cards
  cards.forEach(card => observer.observe(card));
  
  // Floating effect for icons
  const icons = document.querySelectorAll('.digi-icon');
  icons.forEach((icon, index) => {
    icon.style.animation = `float 3s ease-in-out ${index * 0.2}s infinite`;
  });
});

// Custom animation for floating effect
document.head.insertAdjacentHTML('beforeend', `
  <style>
    @keyframes float {
      0%, 100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-10px);
      }
    }
  </style>
`);

// Parallax effect for cards on mouse move
const cards = document.querySelectorAll('.digi-card-inner');
document.addEventListener('mousemove', function(e) {
  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;
  
  cards.forEach(card => {
    const rect = card.getBoundingClientRect();
    const cardX = (rect.left + rect.width/2) / window.innerWidth;
    const cardY = (rect.top + rect.height/2) / window.innerHeight;
    
    const distX = x - cardX;
    const distY = y - cardY;
    
    // Only apply parallax if mouse is near the card
    const distance = Math.sqrt(distX * distX + distY * distY);
    if (distance < 0.4) {
      const tiltX = distY * 5;
      const tiltY = -distX * 5;
      card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-5px)`;
    } else {
      card.style.transform = '';
    }
  });
});

// Reset transform when mouse leaves
document.addEventListener('mouseleave', function() {
  cards.forEach(card => {
    card.style.transform = '';
  });
});

// =============================== BRAND CARD SECTION =======================================

document.addEventListener('DOMContentLoaded', function() {
  const cards = document.querySelectorAll('.wcu-card');
  
  setTimeout(() => {
    cards.forEach(card => {
      const delay = parseInt(card.dataset.delay || 0);
      setTimeout(() => {
        card.classList.add('reveal');
      }, delay);
    });
  }, 300);
  
  // Add interaction effect (particle animation on hover)
  cards.forEach(card => {
    card.addEventListener('mouseenter', function(e) {
      createParticles(e, this);
    });
  });
  
  function createParticles(e, element) {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    for (let i = 0; i < 5; i++) {
      const particle = document.createElement('div');
      particle.className = 'wcu-particle';
      
      const size = Math.random() * 10 + 5;
      const animDuration = Math.random() * 1 + 0.5;
      
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      particle.style.animation = `wcu-particle-animation ${animDuration}s ease-out forwards`;
      
      element.appendChild(particle);
      
      setTimeout(() => {
        particle.remove();
      }, animDuration * 1000);
    }
  }
  
  // Intersection Observer for scroll animation
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.dataset.delay || 0);
        setTimeout(() => {
          entry.target.classList.add('reveal');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  cards.forEach(card => {
    observer.observe(card);
  });
});

// =============================== PROJECT SECTION =======================================

document.addEventListener('DOMContentLoaded', function() {
  // Initialize AOS animation library if available
  if (typeof AOS !== 'undefined') {
      AOS.init({
          duration: 800,
          easing: 'ease-in-out',
          once: true
      });
  }
  
  // Add pulse animation to portfolio button after a delay
  setTimeout(function() {
      const portfolioBtn = document.getElementById('portfolioBtn');
      if (portfolioBtn) {
          portfolioBtn.classList.add('pulse');
      }
  }, 2000);
  
  // Project filtering functionality
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectItems = document.querySelectorAll('.project-item');
  
  filterBtns.forEach(btn => {
      btn.addEventListener('click', function() {
          // Remove active class from all buttons
          filterBtns.forEach(btn => btn.classList.remove('active'));
          
          // Add active class to clicked button
          this.classList.add('active');
          
          // Get filter value
          const filterValue = this.getAttribute('data-filter');
          
          // Filter projects
          projectItems.forEach(item => {
              if (filterValue === 'all') {
                  item.style.opacity = '1';
                  item.style.transform = 'scale(1)';
                  item.style.display = 'block';
                  
                  // Add staggered animation
                  setTimeout(() => {
                      item.style.transform = 'scale(1)';
                      item.style.opacity = '1';
                  }, 100);
              } else {
                  if (item.getAttribute('data-category').includes(filterValue)) {
                      item.style.display = 'block';
                      setTimeout(() => {
                          item.style.transform = 'scale(1)';
                          item.style.opacity = '1';
                      }, 100);
                  } else {
                      item.style.opacity = '0';
                      item.style.transform = 'scale(0.8)';
                      setTimeout(() => {
                          item.style.display = 'none';
                      }, 300);
                  }
              }
          });
      });
  });
  
  // Interactive hover effects for project cards
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
      card.addEventListener('mouseenter', function() {
          this.querySelectorAll('.tech-badge').forEach((badge, index) => {
              badge.style.transition = `transform 0.3s ease ${index * 0.05}s, background 0.3s ease`;
              badge.style.transform = 'translateY(-3px)';
          });
      });
      
      card.addEventListener('mouseleave', function() {
          this.querySelectorAll('.tech-badge').forEach(badge => {
              badge.style.transform = 'translateY(0)';
          });
      });
  });
});


// =============================== FOOTER SECTION =======================================

document.addEventListener('DOMContentLoaded', function () {
  const yearElement = document.querySelector('.footer-bottom span');
  const currentYear = new Date().getFullYear();
  yearElement.innerHTML = yearElement.innerHTML.replace('Current Year', currentYear);

  document.getElementById('consultationBtn').addEventListener('click', function () {
    alert('Thank you for your interest! We will contact you shortly to schedule your free consultation.');
  });
});


// =========================== TESTIMONIAL SECTION =================================

document.addEventListener('DOMContentLoaded', function () {
  // Initialize the carousel with custom options
  const carousel = new bootstrap.Carousel(document.getElementById('testimonialsCarousel'), {
    interval: 5000, // Time between automatic slides (5 seconds)
    wrap: true,     // Continuous cycling
    touch: true     // Enable touch swiping on mobile
  });

  // Add smooth transitions
  const carouselElement = document.getElementById('testimonialsCarousel');
  carouselElement.addEventListener('slide.bs.carousel', function (event) {
    const activeItem = carouselElement.querySelector('.active');
    activeItem.style.transition = 'transform 0.6s ease-in-out';
  });
});


