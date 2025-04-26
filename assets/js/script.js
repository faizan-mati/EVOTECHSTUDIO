
document.addEventListener('DOMContentLoaded', function() {
  // Variables
  const navbar = document.querySelector('.evo-navbar');
  const navToggle = document.querySelector('.evo-navbar__toggle');
  const mobileMenu = document.querySelector('.evo-mobile-menu');
  const mobileMenuClose = document.querySelector('.evo-mobile-menu__close');
  const body = document.body;
  
  // Create overlay element
  const overlay = document.createElement('div');
  overlay.classList.add('evo-menu-overlay');
  body.appendChild(overlay);
  
  // Toggle mobile menu
  navToggle.addEventListener('click', function() {
    navToggle.classList.toggle('active');
    mobileMenu.classList.toggle('open');
    overlay.classList.toggle('active');
    body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });
  
  // Close mobile menu
  mobileMenuClose.addEventListener('click', function() {
    navToggle.classList.remove('active');
    mobileMenu.classList.remove('open');
    overlay.classList.remove('active');
    body.style.overflow = '';
  });
  
  // Close menu when clicking overlay
  overlay.addEventListener('click', function() {
    navToggle.classList.remove('active');
    mobileMenu.classList.remove('open');
    overlay.classList.remove('active');
    body.style.overflow = '';
  });
  
  // Navbar scroll effect
  function toggleScrollClass() {
    if (window.scrollY > 10) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  
  // Initialize on load
  toggleScrollClass();
  
  // Listen for scroll
  window.addEventListener('scroll', toggleScrollClass);
  
  // Add active class to current page link
  const currentPage = window.location.pathname.split('/').pop();
  const navLinks = document.querySelectorAll('.evo-navbar__link');
  const mobileLinks = document.querySelectorAll('.evo-mobile-menu__link');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href').split('/').pop();
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('evo-navbar__link--active');
    } else {
      link.classList.remove('evo-navbar__link--active');
    }
  });
  
  mobileLinks.forEach(link => {
    const href = link.getAttribute('href').split('/').pop();
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('evo-mobile-menu__link--active');
    } else {
      link.classList.remove('evo-mobile-menu__link--active');
    }
  });
  
  // Hover animation for desktop nav links
  navLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
      if (!this.classList.contains('evo-navbar__link--active')) {
        const indicator = this.querySelector('.evo-navbar__link-indicator');
        indicator.style.width = '65%';
      }
    });
    
    link.addEventListener('mouseleave', function() {
      if (!this.classList.contains('evo-navbar__link--active')) {
        const indicator = this.querySelector('.evo-navbar__link-indicator');
        indicator.style.width = '0';
      }
    });
  });
});


// =============================== HERO SECTION =======================================

document.addEventListener("DOMContentLoaded", function() {
  // 3D Card Effect
  const card = document.querySelector('.evo-hero__card-content');
  const container = document.querySelector('.evo-hero__card');
  
  container.addEventListener('mousemove', function(e) {
    const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
    const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
    
    card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
  });
  
  container.addEventListener('mouseenter', function() {
    card.style.transition = 'none';
  });
  
  container.addEventListener('mouseleave', function() {
    card.style.transition = 'transform 0.5s ease';
    card.style.transform = 'rotateY(0deg) rotateX(0deg)';
  });
  
  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (entry.target.classList.contains('evo-hero__content')) {
          entry.target.style.animation = 'fadeSlideUp 1s forwards';
        }
        else if (entry.target.classList.contains('evo-hero__visual')) {
          entry.target.style.animation = 'fadeIn 1s forwards';
        }
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  document.querySelectorAll('.evo-hero__content, .evo-hero__visual').forEach(el => {
    observer.observe(el);
  });
  
  // Social Icons Hover Animation
  const socialLinks = document.querySelectorAll('.evo-social__link');
  socialLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
      this.querySelector('.evo-social__icon').style.transform = 'scale(1.1)';
    });
    
    link.addEventListener('mouseleave', function() {
      this.querySelector('.evo-social__icon').style.transform = 'scale(1)';
    });
  });
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


