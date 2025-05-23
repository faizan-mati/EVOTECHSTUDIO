
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
  viewBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const portfolioItem = btn.closest('.portfolio-item');
      const title = portfolioItem.querySelector('.portfolio-title').textContent;
      const category = portfolioItem.querySelector('.category-badge').textContent;
      const imgSrc = portfolioItem.querySelector('.portfolio-img').src;
      
      // Update modal content
      document.querySelector('.modal-title').textContent = title;
      document.querySelector('.modal-category').textContent = category;
      document.getElementById('modalImage').src = imgSrc;
      
      // Show modal with animation
      projectModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });
  
  // Close modal
  modalCloseBtn.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', closeModal);
  
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

document.addEventListener("DOMContentLoaded", function () {
  // Initialize AOS animation library if available
  if (typeof AOS !== 'undefined' && AOS) {
    AOS.init({
      duration: 800,
      once: false,
      mirror: true,
      offset: 50
    });
  }

  // Portfolio data
  const portfolioData = [
    {
      id: 1,
      title: "Image Generation APP",
      description: "",
      category: "UI/UX",
      image: "./assets/images/project/UIUX/Image Generation APP.png",
      client: "Mobile-responsive interface",
      duration: "AI image generation capabilities",
      completedDate: "Purple-themed modern UI design",
      technologies: ["FIGMA"],
      overview: "An AI-powered mobile application that enables users to generate, customize, and edit stunning digital artwork through an intuitive interface. The app leverages advanced artificial intelligence algorithms to transform user inputs into professional-quality illustrations, making art creation accessible to both beginners and experienced artists."
    },
    {
      id: 2,
      title: "Youtube Dashboard",
      description: "",
       category: "UI/UX",
      image: "./assets/images/project/UIUX/Youtube Dashboard.png",
      client: "Dark-themed dashboard interface",
      duration: "Engagement metrics visualization",
      completedDate: "Video performance tracking",
      technologies: ["FIGMA"],
      overview: " A comprehensive analytics dashboard designed for YouTube content creators to monitor, analyze, and optimize their channel performance in real-time. The platform provides detailed insights into video metrics, audience engagement, growth trends, and content performance, empowering creators to make data-driven decisions to enhance their content strategy and maximize their reach."
    },
     {
      id: 3,
      title: "Recipe App",
      description: "",
      category: "UI/UX",
      image: "./assets/images/project/UIUX/Recipe App.png",
      client: "Recipe browsing and search functionality",
      duration: "Ingredient lists and cooking instructions",
      completedDate: "Meal planning tools",
      technologies: ["FIGMA"],
      overview: " A clean and modern mobile recipe discovery platform that helps users find, save, and organize cooking recipes through an intuitive interface. The app features comprehensive recipe collections, detailed ingredient lists, step-by-step cooking instructions, and meal planning tools, making it easy for home cooks and food enthusiasts to discover new dishes and streamline their culinary journey."
    },
     {
      id: 4,
      title: "E-commerce Website",
      description: "",
      category: "Web Development",
      image: "./assets/images/project/web/e-commerce.png",
      client: "Fully responsive design for all devices",
      duration: "Product catalog with search and filtering",
      completedDate: "Shopping cart and wishlist functionality",
      technologies: ["HTML","CSS","JS"],
      overview: "A fully responsive e-commerce platform designed to provide a seamless online shopping experience for customers. The website features comprehensive product browsing capabilities, secure shopping cart functionality, and streamlined checkout processes, enabling businesses to effectively showcase their products and facilitate smooth transactions while ensuring optimal user experience across all devices."
    }

    // Add more items as needed
  ];

  // Modal and buttons
  const projectModal = document.getElementById("projectModal");
  const modalOverlay = document.querySelector(".modal-overlay");
  const modalCloseBtn = document.querySelector(".modal-close-btn");

  // Open modal
  document.querySelectorAll(".view-btn").forEach((btn, index) => {
    btn.addEventListener("click", () => {
      const itemData = portfolioData[index];

      // Set modal data
      document.querySelector(".modal-title").textContent = itemData.title;
      document.querySelector(".modal-category").textContent = itemData.category;
      document.getElementById("modalImage").src = itemData.image;
      document.getElementById("modalClient").textContent = itemData.client;
      document.getElementById("modalDuration").textContent = itemData.duration;
      document.getElementById("modalDate").textContent = itemData.completedDate;

      const techStack = document.querySelector(".tech-stack");
      techStack.innerHTML = "";
      itemData.technologies.forEach(tech => {
        const span = document.createElement("span");
        span.className = "tech-badge";
        span.textContent = tech;
        techStack.appendChild(span);
      });

      document.querySelector(".modal-details p").textContent = itemData.overview;

      // Show modal
      projectModal.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  });

  // Close modal function
  function closeModal() {
    projectModal.classList.remove("active");
    document.body.style.overflow = "auto";
  }

  modalCloseBtn.addEventListener("click", closeModal);
  modalOverlay.addEventListener("click", closeModal);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeModal();
  });

  // Filter functionality
  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.getAttribute("data-filter");
      document.querySelectorAll(".portfolio-item").forEach(item => {
        if (filter === "all" || item.classList.contains(filter)) {
          item.style.display = "block";
          setTimeout(() => {
            item.style.opacity = "1";
            item.style.transform = "scale(1)";
          }, 50);
        } else {
          item.style.opacity = "0";
          item.style.transform = "scale(0.8)";
          setTimeout(() => {
            item.style.display = "none";
          }, 300);
        }
      });
    });
  });

  // Load more functionality
  const loadMoreBtn = document.querySelector(".load-more-btn");
  if (loadMoreBtn) {
    let clickCount = 0;
    loadMoreBtn.addEventListener("click", () => {
      clickCount++;
      if (clickCount === 1) {
        loadMoreBtn.classList.add("loading");
        loadMoreBtn.querySelector(".btn-text").textContent = "Loading...";
        loadMoreBtn.querySelector(".btn-icon i").className = "fa-solid fa-spinner";
        setTimeout(() => {
          loadMoreBtn.classList.remove("loading");
          loadMoreBtn.querySelector(".btn-text").textContent = "No More Projects";
          loadMoreBtn.querySelector(".btn-icon i").className = "fa-solid fa-check";
          loadMoreBtn.disabled = true;
        }, 1500);
      }
    });
  }

  // Hover effect for touch
  if ('ontouchstart' in window) {
    document.querySelectorAll('.portfolio-card').forEach(card => {
      card.addEventListener('touchstart', function () {
        document.querySelectorAll('.portfolio-card').forEach(c => c.classList.remove('touch-active'));
        this.classList.add('touch-active');
      });
    });
  }
});

