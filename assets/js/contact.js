// Initialize AOS
AOS.init({
  duration: 800,
  easing: 'ease-in-out',
  once: true
});

document.addEventListener('DOMContentLoaded', function () {
  // Form validation and handling
  const contactForm = document.getElementById('nxContactForm');
  const toast = document.getElementById('nxToast');

  // Add 'has-value' class when input has value
  const formControls = document.querySelectorAll('.nx-form-control');
  formControls.forEach(input => {
    // Check for initial values (if any)
    if (input.value !== '') {
      input.classList.add('has-value');
    }

    // Add event listeners for input changes
    input.addEventListener('input', function () {
      if (this.value !== '') {
        this.classList.add('has-value');
      } else {
        this.classList.remove('has-value');
      }
    });
  });

  // Form submission
  if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
      event.preventDefault();

      let isValid = true;

      // Basic validation
      const requiredFields = contactForm.querySelectorAll('[required]');
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          field.classList.add('is-invalid');
          isValid = false;
        } else {
          field.classList.remove('is-invalid');

          // Special validation for email
          if (field.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
              field.classList.add('is-invalid');
              isValid = false;
            }
          }
        }
      });

      if (isValid) {
        // Show success message with animation
        toast.classList.add('show');

        // Reset form after submission
        contactForm.reset();
        formControls.forEach(input => {
          input.classList.remove('has-value');
        });

        // Hide toast after 5 seconds
        setTimeout(() => {
          toast.classList.remove('show');
        }, 5000);
      }
    });
  }

  // For Newsletter form
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (event) {
      event.preventDefault();
      // Here you would typically handle the newsletter subscription
      // For demo purposes, show the toast
      toast.classList.add('show');

      // Reset form
      newsletterForm.reset();

      // Hide toast after 5 seconds
      setTimeout(() => {
        toast.classList.remove('show');
      }, 5000);
    });
  }

  // Add parallax effect to blobs
  document.addEventListener('mousemove', function (e) {
    const moveX = (e.clientX - window.innerWidth / 2) / 25;
    const moveY = (e.clientY - window.innerHeight / 2) / 25;

    const blobs = document.querySelectorAll('.animated-blob');
    blobs.forEach((blob, index) => {
      const factor = index + 1;
      blob.style.transform = `translate(${moveX / factor}px, ${moveY / factor}px) scale(${1 + (index * 0.1)})`;
    });
  });

  // Add additional interactive effects
  const infoCards = document.querySelectorAll('.nx-info-card');
  infoCards.forEach(card => {
    card.addEventListener('mouseenter', function () {
      const icon = this.querySelector('.nx-animated-icon');
      if (icon) {
        // Randomize animation on hover
        const animations = ['nx-icon-bounce', 'nx-icon-pulse', 'nx-icon-shake'];
        const currentClass = [...icon.classList].find(cls => cls.startsWith('nx-icon-'));

        // Remove current animation class
        if (currentClass) {
          icon.classList.remove(currentClass);
        }

        // Add random new animation class
        const newAnimation = animations[Math.floor(Math.random() * animations.length)];
        icon.classList.add(newAnimation);
      }
    });
  });
});

// Enhanced visual feedback when interacting with elements
document.addEventListener('click', function (e) {
  if (e.target.classList.contains('nx-btn-gradient')) {
    // Create ripple effect
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple 0.6s linear';
    ripple.style.pointerEvents = 'none';

    const rect = e.target.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    e.target.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  }
});

// Add to your CSS for the ripple effect
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
    
    /* Additional hover effects for social buttons */
    .btn.rounded-circle:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 20px rgba(5, 12, 156, 0.2);
      transition: all 0.3s ease;
    }
  `;
document.head.appendChild(style);

// Newsletter form submission handling
document.getElementById('newsletterForm').addEventListener('submit', async function (e) {
  e.preventDefault();  // Prevent form from submitting normally

  const form = e.target;
  const formData = new FormData(form);
  const messageBox = document.getElementById('newsletterMessage');

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      form.reset();
      messageBox.innerHTML = `
          <div style="color: green; font-weight: bold;">
            ✅ Thank you for subscribing!
          </div>
        `;
    } else {
      const data = await response.json();
      messageBox.innerHTML = `
          <div style="color: red; font-weight: bold;">
            ❌ ${data.errors ? data.errors[0].message : 'Something went wrong.'}
          </div>
        `;
    }
  } catch (error) {
    messageBox.innerHTML = `
        <div style="color: red; font-weight: bold;">
          ❌ Submission failed. Please try again.
        </div>
      `;
  }
});







document.getElementById('nxContactForm').addEventListener('submit', async function (e) {
  e.preventDefault(); // stop default form submission

  const form = e.target;
  const messageBox = document.getElementById('nxContactMessage');
  const submitBtn = document.getElementById('nxSubmitBtn');

  // Simple front-end validation (optional, you already have required fields)
  if (!form.checkValidity()) {
    form.classList.add('was-validated'); // Bootstrap style for validation
    return;
  }

  // Disable submit button to prevent multiple clicks
  submitBtn.disabled = true;
  submitBtn.querySelector('span').textContent = 'Sending...';

  const formData = new FormData(form);

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      form.reset();
      form.classList.remove('was-validated');
      messageBox.innerHTML = `
          <div style="color: green; font-weight: bold;">
            ✅ Your message has been sent successfully! We'll get back to you soon.
          </div>
        `;
    } else {
      const data = await response.json();
      messageBox.innerHTML = `
          <div style="color: red; font-weight: bold;">
            ❌ ${data.errors ? data.errors[0].message : 'Oops! Something went wrong. Please try again.'}
          </div>
        `;
    }
  } catch (error) {
    messageBox.innerHTML = `
        <div style="color: red; font-weight: bold;">
          ❌ Submission failed. Please check your connection and try again.
        </div>
      `;
  } finally {
    submitBtn.disabled = false;
    submitBtn.querySelector('span').textContent = 'Send Message';
  }
});