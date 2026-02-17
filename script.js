// ========================================
// DOM Elements
// ========================================
const navbar = document.querySelector('.navbar');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links a');
const skillProgressBars = document.querySelectorAll('.skill-progress');
const statNumbers = document.querySelectorAll('.stat-number');
const scrollRevealElements = document.querySelectorAll('.scroll-reveal');
const contactForm = document.querySelector('.contact-form form');

// ========================================
// Mobile Menu Toggle
// ========================================
menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// ========================================
// Navbar Background on Scroll
// ========================================
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(15, 23, 42, 0.98)';
        navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
    }
});

// ========================================
// Smooth Scrolling for Navigation Links
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// Scroll Reveal Animation
// ========================================
function revealOnScroll() {
    const windowHeight = window.innerHeight;
    const elementVisible = 100;

    scrollRevealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('revealed');
        }
    });
}

// Initial check
revealOnScroll();

// Check on scroll
window.addEventListener('scroll', revealOnScroll);

// ========================================
// Skill Bars Animation
// ========================================
function animateSkillBars() {
    const windowHeight = window.innerHeight;
    const skillsSection = document.querySelector('.skills');
    
    if (!skillsSection) return;
    
    const skillsSectionTop = skillsSection.getBoundingClientRect().top;
    
    if (skillsSectionTop < windowHeight - 100) {
        skillProgressBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            if (width) {
                bar.style.width = width + '%';
            }
        });
        
        // Remove event listener after animation
        window.removeEventListener('scroll', animateSkillBars);
    }
}

window.addEventListener('scroll', animateSkillBars);

// ========================================
// Stats Counter Animation
// ========================================
function animateStats() {
    const windowHeight = window.innerHeight;
    const aboutSection = document.querySelector('.about');
    
    if (!aboutSection) return;
    
    const aboutSectionTop = aboutSection.getBoundingClientRect().top;
    
    if (aboutSectionTop < windowHeight - 100) {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            let current = 0;
            
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    stat.textContent = Math.floor(current) + '+';
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.textContent = target + '+';
                }
            };
            
            updateCounter();
        });
        
        // Remove event listener after animation
        window.removeEventListener('scroll', animateStats);
    }
}

window.addEventListener('scroll', animateStats);

// ========================================
// Form Submission Handler
// ========================================
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const formData = new FormData(contactForm);
        const name = formData.get('0');
        const email = formData.get('1');
        const subject = formData.get('2');
        const message = formData.get('3');
        
        // Here you would typically send the data to a server
        // For now, we'll show a success message
        const btn = contactForm.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;
        
        btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        btn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
        
        // Reset form
        contactForm.reset();
        
        // Reset button after 3 seconds
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
        }, 3000);
        
        // Show alert (in production, this would be handled differently)
        alert(`Thank you for your message, ${name}! I'll get back to you soon.`);
    });
}

// ========================================
// Active Navigation Link Highlighting
// ========================================
function highlightActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 150;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinksItems.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + sectionId) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightActiveNavLink);

// ========================================
// Intersection Observer for Animations
// ========================================
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, observerOptions);

// Observe all scroll-reveal elements
scrollRevealElements.forEach(element => {
    observer.observe(element);
});

// ========================================
// Parallax Effect for Hero Section
// ========================================
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrollPosition = window.pageYOffset;
    
    if (hero) {
        hero.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
    }
});

// ========================================
// Add hover effect to education cards
// ========================================
const educationCards = document.querySelectorAll('.education-card');
educationCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(-5px)';
    });
});

// ========================================
// Contact form input focus effects
// ========================================
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
formInputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });
    input.addEventListener('blur', () => {
        input.parentElement.classList.remove('focused');
    });
});

// ========================================
// Initialize
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    // Initial animations
    revealOnScroll();
    animateSkillBars();
    animateStats();
    highlightActiveNavLink();
});

// Smooth scroll polyfill for older browsers
if (!('scrollBehavior' in document.documentElement.style)) {
    const originalScrollTo = window.scrollTo;
    window.scrollTo = function(options) {
        if (typeof options === 'number') {
            options = { top: options };
        }
        options.behavior = 'smooth';
        return originalScrollTo(options);
    };
}
