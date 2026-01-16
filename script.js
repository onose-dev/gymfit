javascript
/* ========================================
   IFT 203 PROJECT - GYM FIT WEBSITE
   JavaScript Functionality
   ======================================== */

// Wait for DOM to load before running scripts
document.addEventListener('DOMContentLoaded', function() {
    
    // ===================================
    // 1. MOBILE MENU TOGGLE
    // ===================================
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navLinks = document.getElementById('navLinks');

    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideMenu = navLinks.contains(event.target);
            const isClickOnToggle = mobileMenuToggle.contains(event.target);
            
            if (!isClickInsideMenu && !isClickOnToggle && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
        });
    }

    // ===================================
    // 2. TESTIMONIAL SLIDER
    // ===================================
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentTestimonial = 0;

    function showTestimonial(index) {
        // Hide all testimonials
        testimonialCards.forEach(card => {
            card.classList.remove('active');
        });

        // Show the current testimonial
        if (testimonialCards[index]) {
            testimonialCards[index].classList.add('active');
        }
    }

    if (prevBtn && nextBtn && testimonialCards.length > 0) {
        // Previous button
        prevBtn.addEventListener('click', function() {
            currentTestimonial--;
            if (currentTestimonial < 0) {
                currentTestimonial = testimonialCards.length - 1;
            }
            showTestimonial(currentTestimonial);
        });

        // Next button
        nextBtn.addEventListener('click', function() {
            currentTestimonial++;
            if (currentTestimonial >= testimonialCards.length) {
                currentTestimonial = 0;
            }
            showTestimonial(currentTestimonial);
        });

        // Auto-rotate testimonials every 5 seconds
        setInterval(function() {
            currentTestimonial++;
            if (currentTestimonial >= testimonialCards.length) {
                currentTestimonial = 0;
            }
            showTestimonial(currentTestimonial);
        }, 5000);
    }

    // ===================================
    // 3. SMOOTH SCROLLING FOR ANCHOR LINKS
    // ===================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only prevent default if href is not just "#"
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // ===================================
// 4. FORM VALIDATION & SUBMISSION (FORMSPREE)
// ===================================
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            // Get the submit button
            const submitButton = contactForm.querySelector('.claim-button');
            const originalButtonText = submitButton.textContent;
            
            // Show loading state
            submitButton.textContent = 'SENDING...';
            submitButton.disabled = true;

            // Get form data
            const formData = new FormData(contactForm);

            try {
                // Send to Formspree
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    // Show success message
                    const successMessage = document.getElementById('successMessage');
                    successMessage.classList.add('show');
                    
                    // Reset form
                    contactForm.reset();

                    // Hide success message after 5 seconds
                    setTimeout(() => {
                        successMessage.classList.remove('show');
                    }, 5000);
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                alert('Oops! There was a problem submitting your form. Please try again or contact us directly.');
                console.error('Form submission error:', error);
            } finally {
                // Reset button
                submitButton.textContent = originalButtonText;
                submitButton.disabled = false;
            }
        });
    }

    // ===================================
    // 5. NAVBAR SCROLL EFFECT (Optional Enhancement)
    // ===================================
    const navbar = document.querySelector('nav');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        // Add shadow when scrolled
        if (currentScroll > 100) {
            navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.boxShadow = 'none';
        }

        lastScroll = currentScroll;
    });

    // ===================================
    // 6. ANIMATE ELEMENTS ON SCROLL (Optional Enhancement)
    // ===================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe feature cards, pricing cards, etc.
    const animateElements = document.querySelectorAll('.feature-card, .pricing-card, .program-card, .testimonial-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // ===================================
    // 7. CONSOLE LOG FOR DEBUGGING
    // ===================================
    console.log('GYM FIT Website Loaded Successfully!');
    console.log('IFT 203 Project - JavaScript Active');
});
```

-