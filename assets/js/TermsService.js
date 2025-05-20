  // Initialize AOS animations for terms sections
  document.addEventListener('DOMContentLoaded', function() {
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
      });
    }
    
    // Contact button functionality
    const contactBtn = document.querySelector('.ets-contact-btn');
    if (contactBtn) {
      contactBtn.addEventListener('click', function() {
        window.location.href = './contact.html';
      });
    }
    
    // Add hover effect for terms sections
    const termsSections = document.querySelectorAll('.ets-terms-section');
    termsSections.forEach(section => {
      section.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
      });
      
      section.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
      });
    });
  });