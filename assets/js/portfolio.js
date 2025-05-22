document.addEventListener("DOMContentLoaded", function() {
  // Initialize AOS animation library
  AOS.init();
  
  // Portfolio Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      filterBtns.forEach(btn => {
        btn.classList.remove('active');
      });
      
      // Add active class to clicked button
      btn.classList.add('active');
      
      // Get filter value
      const filterValue = btn.getAttribute('data-filter');
      
      // Filter portfolio items
      portfolioItems.forEach(item => {
        if (filterValue === 'all' || item.classList.contains(filterValue)) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.8)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });
  
  // Modal Functionality
  const viewBtns = document.querySelectorAll('.view-btn');
  const projectModal = document.getElementById('projectModal');
  const modalOverlay = document.querySelector('.modal-overlay');
  const modalCloseBtn = document.querySelector('.modal-close-btn');
  
  // Open modal
viewBtns.forEach((btn, index) => {
  btn.addEventListener('click', () => {
    const portfolioItem = btn.closest('.portfolio-item');
    const title = portfolioItem.querySelector('.portfolio-title').textContent;

    // Show the second modal only for the second card (you can use index or title or any other unique marker)
    if (title === "Fitness Tracking App") {
      document.getElementById('projectModal2').classList.add('active');
    } else {
      const category = portfolioItem.querySelector('.category-badge').textContent;
      const imgSrc = portfolioItem.querySelector('.portfolio-img').src;

      // Update modal content
      document.querySelector('.modal-title').textContent = title;
      document.querySelector('.modal-category').textContent = category;
      document.getElementById('modalImage').src = imgSrc;

      document.getElementById('projectModal').classList.add('active');
    }

    document.body.style.overflow = 'hidden';
  });
});
  
  // Close modal
function closeModal() {
  document.getElementById('projectModal').classList.remove('active');
  document.getElementById('projectModal2').classList.remove('active');
  document.body.style.overflow = 'auto';
}

// Same close logic
document.querySelectorAll('.modal-close-btn').forEach(btn => btn.addEventListener('click', closeModal));
document.querySelectorAll('.modal-overlay').forEach(overlay => overlay.addEventListener('click', closeModal));
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeModal();
});
  
  // Load more button functionality (for demo purposes)
  const loadMoreBtn = document.querySelector('.load-more-btn');
  let clickCount = 0;
  
  loadMoreBtn.addEventListener('click', () => {
    clickCount++;
    
    if (clickCount === 1) {
      loadMoreBtn.classList.add('loading');
      loadMoreBtn.querySelector('.btn-text').textContent = 'Loading...';
      
      // Simulate loading delay
      setTimeout(() => {
        loadMoreBtn.classList.remove('loading');
        loadMoreBtn.querySelector('.btn-text').textContent = 'No More Projects';
        loadMoreBtn.querySelector('.btn-icon i').className = 'fa-solid fa-check';
        loadMoreBtn.disabled = true;
      }, 1500);
    }
  });
});




// Portfolio Section JavaScript
document.addEventListener("DOMContentLoaded", function() {
  // Initialize AOS animation library if not already initialized
  if (typeof AOS !== 'undefined' && AOS) {
    AOS.init({
      duration: 800,
      once: false,
      mirror: true,
      offset: 50
    });
  }
  
  // Portfolio items data (for demo purposes)
  const portfolioData = [
    {
      id: 1,
      title: "E-commerce Platform",
      description: "A full-featured online store with integrated payment solutions",
      category: "Web Development",
      image: "/api/placeholder/600/400",
      client: "Fashion Retailer",
      duration: "3 months",
      completedDate: "January 2025",
      technologies: ["HTML5", "CSS3", "JavaScript", "React", "Node.js"],
      overview: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    },
    {
      id: 2,
      title: "Fitness Tracking App",
      description: "iOS and Android app for tracking workouts and health metrics",
      category: "Mobile App",
      image: "/api/placeholder/600/400",
      client: "Health & Fitness Brand",
      duration: "4 months",
      completedDate: "December 2024",
      technologies: ["React Native", "Firebase", "Redux", "Node.js"],
      overview: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    },
    // Add more portfolio items as needed
  ];
  
  // Portfolio Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      filterBtns.forEach(btn => {
        btn.classList.remove('active');
      });
      
      // Add active class to clicked button
      btn.classList.add('active');
      
      // Get filter value
      const filterValue = btn.getAttribute('data-filter');
      
      // Filter portfolio items with animation
      portfolioItems.forEach(item => {
        if (filterValue === 'all' || item.classList.contains(filterValue)) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.8)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });
  
  // Modal Functionality
  const viewBtns = document.querySelectorAll('.view-btn');
  const projectModal = document.getElementById('projectModal');
  const modalOverlay = document.querySelector('.modal-overlay');
  const modalCloseBtn = document.querySelector('.modal-close-btn');
  
  // Open modal
  viewBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const portfolioItem = btn.closest('.portfolio-item');
      const portfolioTitle = portfolioItem.querySelector('.portfolio-title').textContent;
      const portfolioCategory = portfolioItem.querySelector('.category-badge').textContent;
      const portfolioImgSrc = portfolioItem.querySelector('.portfolio-img').src;
      
      // Find portfolio data (in a real application, you'd fetch this from a database)
      const itemData = portfolioData.find(item => item.title === portfolioTitle) || {
        client: "Client Name",
        duration: "3 months",
        completedDate: "January 2025",
        technologies: ["HTML5", "CSS3", "JavaScript", "React", "Node.js"],
        overview: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      };
      
      // Update modal content
      document.querySelector('.modal-title').textContent = portfolioTitle;
      document.querySelector('.modal-category').textContent = portfolioCategory;
      document.getElementById('modalImage').src = portfolioImgSrc;
      document.getElementById('modalClient').textContent = itemData.client;
      document.getElementById('modalDuration').textContent = itemData.duration;
      document.getElementById('modalDate').textContent = itemData.completedDate;
      
      // Update technologies
      const techStack = document.querySelector('.tech-stack');
      techStack.innerHTML = '';
      itemData.technologies.forEach(tech => {
        const techBadge = document.createElement('span');
        techBadge.classList.add('tech-badge');
        techBadge.textContent = tech;
        techStack.appendChild(techBadge);
      });
      
      // Show modal with animation
      projectModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });
  
  // Close modal
  modalCloseBtn.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', closeModal);
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeModal();
  });
  
  function closeModal() {
    projectModal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
  
  // Load more button functionality (for demo purposes)
  const loadMoreBtn = document.querySelector('.load-more-btn');
  let clickCount = 0;
  
  loadMoreBtn.addEventListener('click', () => {
    clickCount++;
    
    if (clickCount === 1) {
      loadMoreBtn.classList.add('loading');
      loadMoreBtn.querySelector('.btn-text').textContent = 'Loading...';
      loadMoreBtn.querySelector('.btn-icon i').className = 'fa-solid fa-spinner';
      
      // Simulate loading delay
      setTimeout(() => {
        loadMoreBtn.classList.remove('loading');
        loadMoreBtn.querySelector('.btn-text').textContent = 'No More Projects';
        loadMoreBtn.querySelector('.btn-icon i').className = 'fa-solid fa-check';
        loadMoreBtn.disabled = true;
      }, 1500);
    }
  });
  
  // Animate portfolio cards on scroll if AOS is not used
  if (typeof AOS === 'undefined') {
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    portfolioCards.forEach(card => {
      observer.observe(card);
    });
  }
  
  // Link buttons functionality
  const linkBtns = document.querySelectorAll('.link-btn');
  linkBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const portfolioTitle = btn.closest('.portfolio-item').querySelector('.portfolio-title').textContent;
      window.open('#', '_blank'); // Replace with actual project URL
    });
  });
  
  // Initialize hover effects for touch devices
  if ('ontouchstart' in window) {
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    portfolioCards.forEach(card => {
      card.addEventListener('touchstart', function() {
        // Remove active class from all cards
        portfolioCards.forEach(c => c.classList.remove('touch-active'));
        // Add active class to current card
        this.classList.add('touch-active');
      });
    });
  }
});



