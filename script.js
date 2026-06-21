// Main JavaScript file
document.addEventListener('DOMContentLoaded', function() {
    console.log('CompeStore website loaded successfully!');
    
    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu) navMenu.classList.remove('active');
            if (navToggle) navToggle.classList.remove('active');
        });
    });
    
    // Smooth scrolling for navigation links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active navigation highlighting
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Scroll animations
    function animateOnScroll() {
        const elements = document.querySelectorAll('.product-card, .about-feature, .stat-item, .contact-item');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('fade-in');
            }
        });
    }
    
    // Navbar background on scroll
    function updateNavbarBackground() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.style.background = 'linear-gradient(135deg, rgba(30, 64, 175, 0.95), rgba(59, 130, 246, 0.95))';
                navbar.style.backdropFilter = 'blur(10px)';
            } else {
                navbar.style.background = 'linear-gradient(135deg, #1e40af, #3b82f6)';
                navbar.style.backdropFilter = 'none';
            }
        }
    }
    
    // Event listeners for scroll events
    window.addEventListener('scroll', function() {
        updateActiveNavLink();
        animateOnScroll();
        updateNavbarBackground();
    });
    
    // Initial calls
    updateActiveNavLink();
    animateOnScroll();
    
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const gameType = document.getElementById('gameType').value;
            const message = document.getElementById('message').value;
            
            if (name && email && gameType && message) {
                sendToWhatsApp(name, email, gameType, message);
            } else {
                alert('Mohon lengkapi semua field yang diperlukan!');
            }
        });
    }
    
    // Product cards hover effect
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Statistics counter animation
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        const speed = 200;
        
        counters.forEach(counter => {
            const target = parseInt(counter.textContent.replace(/\D/g, ''));
            const increment = target / speed;
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.textContent = counter.textContent.replace(/\d+/, target);
                    clearInterval(timer);
                } else {
                    counter.textContent = counter.textContent.replace(/\d+/, Math.ceil(current));
                }
            }, 1);
        });
    }
    
    // Trigger counter animation when stats section is visible
    const statsSection = document.querySelector('.about-stats');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(statsSection);
    }
});

// WhatsApp integration functions
window.buyProduct = function(productName, price) {
    const phoneNumber = '6282214549889'; 
    const message = `Halo! Saya tertarik untuk membeli akun ${productName} dengan harga Rp ${formatPrice(price)}. 

Mohon informasi lebih lanjut mengenai:
- Detail akun
- Proses pembayaran
- Garansi yang diberikan

Terima kasih!`;
    
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

window.sendToWhatsApp = function(name, email, gameType, message) {
    const phoneNumber = '6282214549889'; 
    const whatsappMessage = `*Pesan Baru dari Website CompeStore*

*Nama:* ${name}
*Email:* ${email}
*Game yang Diminati:* ${gameType}

*Pesan:*
${message}

---
Dikirim melalui form kontak website CompeStore`;
    
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');
    
    document.getElementById('contactForm').reset();
    alert('Pesan Anda akan dikirim ke WhatsApp. Terima kasih!');
}

// Utility functions
function formatPrice(price) {
    return new Intl.NumberFormat('id-ID').format(price);
}

// Smooth reveal animation for elements
function revealOnScroll() {
    const reveals = document.querySelectorAll('.product-card, .about-feature, .contact-item');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Initialize reveal animation
document.addEventListener('DOMContentLoaded', function() {
    const reveals = document.querySelectorAll('.product-card, .about-feature, .contact-item');
    reveals.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
    });
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); 
});

// Add loading state to buy buttons
function addLoadingState(button) {
    const originalText = button.textContent;
    button.textContent = 'Mengarahkan...';
    button.disabled = true;
    
    setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
    }, 2000);
}

// Enhanced buy product function with loading state
window.buyProductWithLoading = function(productName, price, buttonElement) {
    addLoadingState(buttonElement);
    setTimeout(() => {
        buyProduct(productName, price);
    }, 800);
}
