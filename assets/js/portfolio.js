// Portfolio Section JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize portfolio items with animation delay
    const portfolioItems = document.querySelectorAll('.evo-portfolio__item');
    
    // Initial animation for items
    setTimeout(() => {
      portfolioItems.forEach((item, index) => {
        setTimeout(() => {
          item.classList.add('show');
        }, 100 * index);
      });
    }, 300);
  
    // Filter functionality
    const filterButtons = document.querySelectorAll('.evo-portfolio__filter-btn');
    
    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Remove active class from all buttons
        filterButtons.forEach(btn => {
          btn.classList.remove('active');
        });
        
        // Add active class to clicked button
        this.classList.add('active');
        
        // Get filter value
        const filterValue = this.getAttribute('data-filter');
        
        // Filter items
        filterPortfolioItems(filterValue);
      });
    });
    
    // Filter items function
    function filterPortfolioItems(category) {
      portfolioItems.forEach(item => {
        // First hide all items and remove show class for re-animation
        item.classList.remove('show');
        item.style.display = 'none';
        
        // Get item category
        const itemCategory = item.getAttribute('data-category');
        
        // Show items based on category
        if (category === 'all' || category === itemCategory) {
          setTimeout(() => {
            item.style.display = 'block';
            
            // Re-trigger animation after a tiny delay
            setTimeout(() => {
              item.classList.add('show');
            }, 50);
          }, 300); // Small delay for smooth transition
        }
      });
    }
  
    // Load more button functionality (simulation)
    const loadMoreBtn = document.querySelector('.evo-portfolio__load-more');
    
    if (loadMoreBtn) {
      loadMoreBtn.addEventListener('click', function() {
        // Change button text to loading
        this.innerHTML = '<span class="evo-portfolio__btn-text">Loading...</span><span class="evo-portfolio__btn-icon"><i class="bi bi-arrow-repeat spin"></i></span>';
        
        // Simulate loading new content
        setTimeout(() => {
          // Reset button text
          this.innerHTML = '<span class="evo-portfolio__btn-text">Load More Projects</span><span class="evo-portfolio__btn-icon"><i class="bi bi-arrow-down-circle"></i></span>';
          
          // Here you would normally fetch more items
          // For demo purposes, just show an alert
          alert('In a real application, this would load more portfolio items from your database.');
        }, 1500);
      });
    }
  
    // Add scroll animation for portfolio cards
    window.addEventListener('scroll', revealOnScroll);
    
    function revealOnScroll() {
      const windowHeight = window.innerHeight;
      const revealPoint = 150;
      
      portfolioItems.forEach(item => {
        const itemTop = item.getBoundingClientRect().top;
        
        if (itemTop < windowHeight - revealPoint) {
          item.classList.add('show');
        }
      });
    }
  
    // Parallax effect for floating elements
    const floatingElements = document.querySelectorAll('.evo-portfolio__float-item');
    
    window.addEventListener('mousemove', (e) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      
      floatingElements.forEach((el, index) => {
        // Different movement factors for each element
        const moveFactor = 20 + (index * 5);
        
        el.style.transform = `translate(${x * moveFactor}px, ${y * moveFactor}px) rotate(${x * 10}deg)`;
      });
    });
  
    // Initialize hover effect for cards
    const portfolioCards = document.querySelectorAll('.evo-portfolio__card');
    
    portfolioCards.forEach(card => {
      card.addEventListener('mouseenter', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        this.style.setProperty('--mouse-x', `${x}px`);
        this.style.setProperty('--mouse-y', `${y}px`);
      });
    });
  });