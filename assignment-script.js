// Carousel functionality
let currentSlideIndex = 0;
const slides = document.querySelectorAll('.testimonial-card');
const dots = document.querySelectorAll('.dot');
const totalSlides = Math.max(slides.length - 2, 1); // Show 2 full cards and 1 partial card, so max positions is slides - 1
let autoSlideInterval;

// Initialize carousel
function initCarousel() {
    showSlide(currentSlideIndex);
    startAutoSlide();
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });
}

// Show specific slide (now shows 3 cards, moves by 1 card)
function showSlide(index) {
    const track = document.getElementById('carouselTrack');
    const cardWidth = slides[0] ? slides[0].offsetWidth + 20 : 0; // Include gap
    const translateX = -index * cardWidth;
    track.style.transform = `translateX(${translateX}px)`;
    
    // Update active states for dots
    dots.forEach((dot, i) => {
        const isActive = i === index;
        dot.classList.toggle('active', isActive);
        dot.setAttribute('aria-selected', isActive);
        dot.setAttribute('tabindex', isActive ? '0' : '-1');
    });
    
    // Update active card (middle visible card)
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index + 1); // Middle card of the 3 visible
    });
}

// Next slide
function nextSlide() {
    currentSlideIndex = (currentSlideIndex + 1) % totalSlides;
    showSlide(currentSlideIndex);
    resetAutoSlide();
}

// Previous slide
function prevSlide() {
    currentSlideIndex = (currentSlideIndex - 1 + totalSlides) % totalSlides;
    showSlide(currentSlideIndex);
    resetAutoSlide();
}

// Go to specific slide
function currentSlide(index) {
    currentSlideIndex = index - 1;
    showSlide(currentSlideIndex);
    resetAutoSlide();
}

// Auto slide functionality
function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        nextSlide();
    }, 5000); // 5 seconds as specified
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

function resetAutoSlide() {
    stopAutoSlide();
    startAutoSlide();
}

// Pause auto-slide on hover
document.querySelector('.carousel-container').addEventListener('mouseenter', stopAutoSlide);
document.querySelector('.carousel-container').addEventListener('mouseleave', startAutoSlide);

// Modal functionality
function openModal() {
    document.getElementById('hireModal').style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeModal() {
    document.getElementById('hireModal').style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling
}

function goToContact() {
    closeModal();
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
}

// Modal event listeners moved to initModalEvents() function

// Navigation event listeners moved to initNavigationEvents() function

// Form submission handling
document.querySelector('.contact-form form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    
    // Basic validation
    if (!name || !email) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    // Success message (in real app, this would send to server)
    alert('Thank you for your message! I will get back to you within 24 hours.');
    this.reset();
});

// Scroll spy for navigation
function updateActiveNavOnScroll() {
    const sections = ['home', 'projects', 'recommendations', 'contact'];
    const scrollPosition = window.scrollY + 150;
    
    sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (section && navLink) {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                navLink.classList.add('active');
            }
        }
    });
}

// Throttled scroll listener for performance
let scrollTimer;
window.addEventListener('scroll', function() {
    if (scrollTimer) {
        clearTimeout(scrollTimer);
    }
    scrollTimer = setTimeout(updateActiveNavOnScroll, 100);
});

// Project card hover effects (optional enhancement)
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initCarousel();
    initCarouselEvents();
    initModalEvents();
    initNavigationEvents();
    
    console.log('Assignment page loaded successfully!');
});

// Initialize carousel and related event listeners
function initCarouselEvents() {
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dots = document.querySelectorAll('.dot');
    
    // Carousel navigation buttons
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }
    
    // Carousel dots
    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            const slideNumber = parseInt(this.dataset.slide);
            currentSlide(slideNumber);
        });
    });
}

// Initialize modal event listeners
function initModalEvents() {
    const hireBtn = document.querySelector('.hire-btn');
    const closeBtn = document.querySelector('.close');
    const contactFormBtn = document.querySelector('.contact-form-btn');
    const modal = document.getElementById('hireModal');
    
    // Open modal
    if (hireBtn) {
        hireBtn.addEventListener('click', openModal);
    }
    
    // Close modal
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    // Go to contact form
    if (contactFormBtn) {
        contactFormBtn.addEventListener('click', goToContact);
    }
    
    // Close modal when clicking outside
    if (modal) {
        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                closeModal();
            }
        });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeModal();
        }
    });
}

// Initialize navigation event listeners
function initNavigationEvents() {
    // Set initial active nav link
    const homeLink = document.querySelector('.nav-link[href="#home"]');
    if (homeLink) {
        homeLink.classList.add('active');
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
                
                // Update active nav link
                document.querySelectorAll('.nav-link').forEach(navLink => {
                    navLink.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });
}

// Note: removing preloadImages() function as it was redundant
// Images in HTML <img> tags are already downloaded during HTML parsing and anyway images are local
// and I have invoked JS script after all images are loaded so no need to preload images

// // Performance optimization: Preload images
// function preloadImages() {
//     const imageUrls = [
//         'https://placehold.co/360x200/E5E7EB/374151?text=Project+1',
//         'https://placehold.co/360x200/E5E7EB/374151?text=Project+2',
//         'https://placehold.co/360x200/E5E7EB/374151?text=Project+3',
//         'https://placehold.co/360x200/E5E7EB/374151?text=Project+4',
//         'https://placehold.co/360x200/E5E7EB/374151?text=Project+5',
//         'https://placehold.co/360x200/E5E7EB/374151?text=Project+6'
//     ];
    
//     imageUrls.forEach(url => {
//         const img = new Image();
//         img.src = url;
//     });
// }

