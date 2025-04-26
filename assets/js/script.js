
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

const cards = document.querySelectorAll('.serviceCard');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('reveal');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

cards.forEach(card => observer.observe(card));


// =============================== BRAND CARD SECTION =======================================

const brandCards = document.querySelectorAll('.brandCard');

const brandObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('reveal');
      brandObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

brandCards.forEach(card => brandObserver.observe(card));

// =============================== PROJECT SECTION =======================================

document.addEventListener('DOMContentLoaded', function () {
  setTimeout(function () {
    document.getElementById('portfolioBtn').classList.add('pulse');
  }, 2000);

  const projectCards = document.querySelectorAll('.project-card');

  projectCards.forEach(card => {
    card.addEventListener('mouseenter', function () {
      this.style.backgroundColor = '#fafafa';
    });

    card.addEventListener('mouseleave', function () {
      this.style.backgroundColor = 'white';
    });

    card.addEventListener('click', function () {
      console.log('Project clicked:', this.querySelector('.project-title').textContent);
    });
  });
});


document.querySelectorAll('.project-card').forEach((card, i) => {
  card.style.animationDelay = `${Math.random() * 2}s`;
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


