// JavaScript for the Quote page

document.addEventListener('DOMContentLoaded', function() {
  // Initialize AOS animation library
  AOS.init({
    duration: 800,
    easing: 'ease-out',
    once: true
  });
  
  // Handle form labels animation (for browsers that don't support :placeholder-shown)
  const formInputs = document.querySelectorAll('.quote-form__input, .quote-form__textarea, .quote-form__select');
  
  formInputs.forEach(input => {
    // Check initial state
    if (input.value !== '') {
      input.nextElementSibling.classList.add('active');
    }
    
    // Add event listeners
    input.addEventListener('focus', function() {
      this.nextElementSibling.classList.add('active');
    });
    
    input.addEventListener('blur', function() {
      if (this.value === '') {
        this.nextElementSibling.classList.remove('active');
      }
    });
  });
  
  // FAQ accordion functionality
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', function() {
      // Close other open FAQ items
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
        }
      });
      
      // Toggle current item
      item.classList.toggle('active');
    });
  });
  
  // Particles animation enhancement
  const particles = document.querySelectorAll('.particle');
  
  particles.forEach(particle => {
    // Random starting position within boundaries
    const randomX = Math.random() * 10 - 5; // -5 to 5
    const randomY = Math.random() * 10 - 5; // -5 to 5
    
    // Apply random transform
    particle.style.transform = `translate(${randomX}px, ${randomY}px)`;
  });
  
  // Form submission handling
  const quoteForm = document.querySelector('.quote-form');
  
  if (quoteForm) {
    quoteForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      
      // Display submission confirmation (in a real implementation, this would send data to a server)
      const formPanel = document.querySelector('.quote-card__form-panel');
      const confirmationMessage = document.createElement('div');
      confirmationMessage.className = 'quote-form__confirmation';
      confirmationMessage.innerHTML = `
        <div class="quote-form__success-icon">
          <i class="bi bi-check-circle-fill"></i>
        </div>
        <h3>Thank You, ${name}!</h3>
        <p>Your quote request has been submitted successfully. Our team will review your project details and get back to you at ${email} within 24-48 hours.</p>
        <p>In the meantime, feel free to explore our portfolio or services.</p>
      `;
      
      // Replace form with confirmation
      formPanel.innerHTML = '';
      formPanel.appendChild(confirmationMessage);
      
      // Scroll to top of form area
      formPanel.scrollIntoView({ behavior: 'smooth' });
      
      // Add CSS for confirmation message
      const style = document.createElement('style');
      style.textContent = `
        .quote-form__confirmation {
          text-align: center;
          padding: 30px 20px;
          animation: fadeIn 0.6s ease-out;
        }
        
        .quote-form__success-icon {
          font-size: 60px;
          color: #10B981;
          margin-bottom: 20px;
        }
        
        .quote-form__confirmation h3 {
          font-size: 24px;
          font-weight: 700;
          color: var(--navy);
          margin-bottom: 15px;
        }
        
        .quote-form__confirmation p {
          font-size: 16px;
          color: #64748B;
          margin-bottom: 15px;
          line-height: 1.6;
        }
      `;
      document.head.appendChild(style);
    });
  }
  
  // Connect "Get a Quote" button in navbar to the form
  const quoteButtons = document.querySelectorAll('.evo-btn');
  const consultationBtn = document.getElementById('consultationBtn');
  
  const scrollToQuoteForm = function() {
    const quoteSection = document.querySelector('.quote-cosmos');
    if (quoteSection) {
      quoteSection.scrollIntoView({ behavior: 'smooth' });
      
      // Focus on first form field after scrolling
      setTimeout(() => {
        const nameInput = document.getElementById('name');
        if (nameInput) nameInput.focus();
      }, 1000);
    }
  };
  
  quoteButtons.forEach(btn => {
    btn.addEventListener('click', scrollToQuoteForm);
  });
  
  if (consultationBtn) {
    consultationBtn.addEventListener('click', scrollToQuoteForm);
  }
});