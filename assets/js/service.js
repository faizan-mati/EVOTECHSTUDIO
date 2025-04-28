document.addEventListener('DOMContentLoaded', function() {
    // Select all service cards
    const serviceCards = document.querySelectorAll('.tm-service-card');
    
    // Function to check if element is in viewport
    function isInViewport(element) {
      const rect = element.getBoundingClientRect();
      return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
        rect.bottom >= 0
      );
    }
    
    // Function to handle scroll animation
    function handleScroll() {
      // Animate header if it's in viewport
      const header = document.querySelector('.tm-services__header');
      if (header && isInViewport(header) && !header.classList.contains('animated')) {
        header.classList.add('animated');
      }
      
      // Animate each service card with a staggered delay
      serviceCards.forEach((card, index) => {
        if (isInViewport(card) && !card.classList.contains('animate-in')) {
          // Add a staggered delay for each card
          setTimeout(() => {
            card.classList.add('animate-in');
            
            // Add floating animation to image
            const imageWrapper = card.querySelector('.tm-service-card__image-wrapper');
            if (imageWrapper) {
              imageWrapper.style.animation = 'floatUp 6s ease-in-out infinite';
            }
            
            // Add subtle rotating animation to icon
            const iconWrapper = card.querySelector('.tm-service-card__icon');
            if (iconWrapper) {
              iconWrapper.style.animation = 'rotate 8s ease-in-out infinite';
            }
            
            // Add shimmering effect to features when they become visible
            const features = card.querySelectorAll('.tm-service-card__feature');
            features.forEach((feature, featureIndex) => {
              setTimeout(() => {
                feature.style.opacity = '0';
                feature.style.transform = 'translateX(-20px)';
                
                // Force reflow
                void feature.offsetWidth;
                
                feature.style.transition = 'all 0.5s ease';
                feature.style.opacity = '1';
                feature.style.transform = 'translateX(0)';
              }, featureIndex * 100);
            });
            
          }, index * 200); // 200ms delay between each card animation
        }
      });
    }
    
    // Handle hover effects for interactive elements
    serviceCards.forEach(card => {
      // Add parallax effect to the image on mousemove
      card.addEventListener('mousemove', function(e) {
        const imageWrapper = this.querySelector('.tm-service-card__image-wrapper');
        const bounds = this.getBoundingClientRect();
        const mouseX = e.clientX - bounds.left;
        const mouseY = e.clientY - bounds.top;
        
        const centerX = bounds.width / 2;
        const centerY = bounds.height / 2;
        
        const deltaX = (mouseX - centerX) / 30;
        const deltaY = (mouseY - centerY) / 30;
        
        if (imageWrapper) {
          imageWrapper.style.transform = `translate(${deltaX}px, ${deltaY}px) rotate(${deltaX > 0 ? 2 : -2}deg)`;
        }
      });
      
      // Reset transform on mouseleave
      card.addEventListener('mouseleave', function() {
        const imageWrapper = this.querySelector('.tm-service-card__image-wrapper');
        if (imageWrapper) {
          imageWrapper.style.transform = '';
          // Restore the floating animation
          setTimeout(() => {
            imageWrapper.style.animation = 'floatUp 6s ease-in-out infinite';
          }, 100);
        }
      });
      
      // Add ripple effect to CTA button
      const ctaButton = card.querySelector('.tm-service-card__cta');
      if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
          const ripple = document.createElement('span');
          ripple.classList.add('tm-ripple');
          this.appendChild(ripple);
          
          const rect = this.getBoundingClientRect();
          const size = Math.max(rect.width, rect.height);
          
          ripple.style.width = ripple.style.height = `${size}px`;
          ripple.style.left = `${e.clientX - rect.left - size/2}px`;
          ripple.style.top = `${e.clientY - rect.top - size/2}px`;
          
          ripple.classList.add('tm-ripple--active');
          
          setTimeout(() => {
            ripple.remove();
          }, 600);
        });
      }
    });
    
    // Initial check
    handleScroll();
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Add additional CSS for ripple effect
    const style = document.createElement('style');
    style.innerHTML = `
      .tm-ripple {
        position: absolute;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.4);
        transform: scale(0);
        animation: tm-ripple-animation 0.6s linear;
        pointer-events: none;
      }
      
      @keyframes tm-ripple-animation {
        to {
          transform: scale(4);
          opacity: 0;
        }
      }
      
      .tm-service-card__cta {
        position: relative;
        overflow: hidden;
      }
    `;
    document.head.appendChild(style);
  });