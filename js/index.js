document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Loader
    window.addEventListener('load', function() {
        document.querySelector('.loader').classList.add('loaded');
    });

    // Mobile menu toggle
    const menuToggle = document.getElementById('mobile-menu');
    const navList = document.querySelector('.nav-list');
    
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navList.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            navList.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Back to top button
    const backToTopBtn = document.querySelector('.back-to-top');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });

    backToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Smooth scrolling for all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Portfolio filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = [
        { category: 'wedding', img: 'wedding1.jpg', title: 'Sarah & James Wedding', desc: 'Summer Wedding' },
        { category: 'portrait', img: 'portrait1.jpg', title: 'Family Portrait', desc: 'Outdoor Session' },
        { category: 'event', img: 'event1.jpg', title: 'Corporate Event', desc: 'Annual Conference' },
        { category: 'commercial', img: 'commercial1.jpg', title: 'Product Shoot', desc: 'Fashion Brand' },
        { category: 'wedding', img: 'wedding2.jpg', title: 'Emily & Michael', desc: 'Beach Wedding' },
        { category: 'portrait', img: 'portrait2.jpg', title: 'Senior Portrait', desc: 'Class of 2023' },
        { category: 'event', img: 'event2.jpg', title: 'Charity Gala', desc: 'Fundraising Event' },
        { category: 'commercial', img: 'commercial2.jpg', title: 'Restaurant Menu', desc: 'Food Photography' }
    ];
    
    const portfolioGrid = document.querySelector('.portfolio-grid');
    
    function renderPortfolioItems(items) {
        portfolioGrid.innerHTML = '';
        items.forEach(item => {
            const portfolioItem = document.createElement('div');
            portfolioItem.className = `portfolio-item ${item.category}`;
            portfolioItem.innerHTML = `
                <img src="images/${item.img}" alt="${item.title}" class="portfolio-img">
                <div class="portfolio-overlay">
                    <h3>${item.title}</h3>
                    <p>${item.desc}</p>
                </div>
            `;
            portfolioGrid.appendChild(portfolioItem);
        });
    }
    
    // Initial render
    renderPortfolioItems(portfolioItems);
    
    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.dataset.filter;
            
            if (filter === 'all') {
                renderPortfolioItems(portfolioItems);
            } else {
                const filteredItems = portfolioItems.filter(item => item.category === filter);
                renderPortfolioItems(filteredItems);
            }
        });
    });
    
    // Load more functionality
    const loadMoreBtn = document.getElementById('load-more');
    let currentItems = 4;
    
    loadMoreBtn.addEventListener('click', function() {
        const portfolioItemsAll = document.querySelectorAll('.portfolio-item');
        
        for (let i = currentItems; i < currentItems + 4; i++) {
            if (portfolioItemsAll[i]) {
                portfolioItemsAll[i].style.display = 'block';
            }
        }
        
        currentItems += 4;
        
        if (currentItems >= portfolioItemsAll.length) {
            loadMoreBtn.style.display = 'none';
        }
    });

    // Testimonial slider
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    
    function showSlide(index) {
        testimonialSlides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        testimonialSlides[index].classList.add('active');
        dots[index].classList.add('active');
    }
    
    document.querySelector('.slider-next').addEventListener('click', function() {
        currentSlide = (currentSlide + 1) % testimonialSlides.length;
        showSlide(currentSlide);
    });
    
    document.querySelector('.slider-prev').addEventListener('click', function() {
        currentSlide = (currentSlide - 1 + testimonialSlides.length) % testimonialSlides.length;
        showSlide(currentSlide);
    });
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });
    
    // Auto slide change
    setInterval(() => {
        currentSlide = (currentSlide + 1) % testimonialSlides.length;
        showSlide(currentSlide);
    }, 5000);

    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send the form data to a server
            // For demo purposes, we'll just show an alert
            alert(`Thank you, ${name}! Your message has been sent. I'll get back to you soon.`);
            
            // Reset form
            contactForm.reset();
        });
    }

    // Newsletter form submission
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input').value;
            
            // Here you would typically send the email to a server
            // For demo purposes, we'll just show an alert
            alert(`Thank you for subscribing with ${email}!`);
            
            // Reset form
            this.reset();
        });
    }

    // Animate elements on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.about-image, .service-card, .portfolio-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animated elements
    document.querySelectorAll('.about-image, .service-card, .portfolio-item').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load
});