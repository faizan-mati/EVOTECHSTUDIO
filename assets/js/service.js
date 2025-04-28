document.addEventListener('DOMContentLoaded', function() {
    // Select all elements with animation attributes
    const animatedElements = document.querySelectorAll('[data-animation]');
    const features = document.querySelectorAll('.feature');
    
    // Intersection Observer options
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15
    };
    
    // Create observer for sections and cards
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add animated class with delay based on dataset
          setTimeout(() => {
            entry.target.classList.add('animated');
            
            // If this is a service card, animate its features
            if (entry.target.classList.contains('service-card')) {
              animateFeatures(entry.target);
            }
          }, entry.target.dataset.delay || 0);
          
          // Stop observing after animation
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    // Create observer specifically for feature items
    const featureObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add animated class with delay
          setTimeout(() => {
            entry.target.classList.add('animated');
          }, entry.target.dataset.delay || 0);
          
          // Stop observing after animation
          featureObserver.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: '0px',
      threshold: 0.2
    });
    
    // Animate features within a specific service card
    const animateFeatures = (card) => {
      const cardFeatures = card.querySelectorAll('.feature');
      
      cardFeatures.forEach((feature, index) => {
        setTimeout(() => {
          feature.classList.add('animated');
        }, 150 * (index + 1));
      });
    };
    
    // Apply sequential animation delays
    const applySequentialDelays = () => {
      // For service cards
      document.querySelectorAll('.service-card').forEach((card, index) => {
        card.dataset.delay = 200 * index;
      });
      
      // For features within each card
      document.querySelectorAll('.service-card').forEach(card => {
        card.querySelectorAll('.feature').forEach((feature, index) => {
          feature.dataset.delay = 100 * (index + 1);
        });
      });
    };
    
    // Setup enhanced hover effects
    const setupHoverEffects = () => {
      document.querySelectorAll('.service-card').forEach(card => {
        // Mouse enter effects
        card.addEventListener('mouseenter', () => {
          // Animate features sequentially
          const features = card.querySelectorAll('.feature');
          features.forEach((feature, index) => {
            setTimeout(() => {
              feature.classList.add('hover-highlight');
            }, 50 * index);
          });
          
          // Add special effect to card elements
          card.querySelector('.card-divider').classList.add('active-pulse');
          card.querySelector('.service-icon-wrapper').classList.add('active-glow');
        });
        
        // Mouse leave effects
        card.addEventListener('mouseleave', () => {
          // Remove highlight from features
          card.querySelectorAll('.feature').forEach(feature => {
            feature.classList.remove('hover-highlight');
          });
          
          // Remove special effects
          card.querySelector('.card-divider').classList.remove('active-pulse');
          card.querySelector('.service-icon-wrapper').classList.remove('active-glow');
        });
      });
    };
    
    // Initialize parallax effects for floating elements
    const initParallax = () => {
      document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        document.querySelectorAll('.floating-element').forEach(element => {
          const offsetX = (mouseX - 0.5) * 20;
          const offsetY = (mouseY - 0.5) * 20;
          const position = element.getAttribute('data-floating');
          
          // Different movement based on position
          if (position === 'top-left' || position === 'bottom-right') {
            element.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
          } else {
            element.style.transform = `translate(${-offsetX}px, ${-offsetY}px)`;
          }
        });
      });
    };
    
    // Initialize button animations
    const initButtonEffects = () => {
      document.querySelectorAll('.action-button').forEach(button => {
        button.addEventListener('mouseenter', () => {
          button.querySelector('.button-glow').style.opacity = '0.3';
        });
        
        button.addEventListener('mouseleave', () => {
          button.querySelector('.button-glow').style.opacity = '0';
        });
      });
    };
    
    // Run initializations
    applySequentialDelays();
    setupHoverEffects();
    initParallax();
    initButtonEffects();
    
    // Start observing all animated elements
    animatedElements.forEach(element => {
      observer.observe(element);
    });
    
    // Start observing features individually
    features.forEach(feature => {
      featureObserver.observe(feature);
    });
    
    // Add a small delay before initial animations
    setTimeout(() => {
      document.querySelector('.showcase-header').classList.add('animated');
    }, 300);
  });