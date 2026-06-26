document.addEventListener('DOMContentLoaded', () => {

    // 1. NAVBAR SCROLL EFFECT
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. SCROLLSPY (ACTIVE NAV LINKS)
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links a:not(.btn)');

    const updateScrollSpy = () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', updateScrollSpy);
    updateScrollSpy(); // highlight on load

    // 3. INTERSECTION OBSERVER FOR REVEAL ANIMATIONS
    const revealOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(el => revealObserver.observe(el));

    // 4. MOUSE-FOLLOW GLOW EFFECT FOR GLASS CARDS
    const glassCards = document.querySelectorAll('.glass-card');

    glassCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--x', `${x}px`);
            card.style.setProperty('--y', `${y}px`);
        });

        card.addEventListener('mouseleave', () => {
            card.style.setProperty('--x', `-100px`);
            card.style.setProperty('--y', `-100px`);
        });
    });

    // 5. PROCESS TIMELINE STICKY SCROLL ACTIVATION
    const processSteps = document.querySelectorAll('.step-item');

    const stepOptions = {
        root: null,
        rootMargin: '-50% 0px -50% 0px', // Trigger when step is in middle of screen
        threshold: 0
    };

    const stepObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove active from all
                processSteps.forEach(step => step.classList.remove('active'));
                // Add to current
                entry.target.classList.add('active');
            }
        });
    }, stepOptions);

    processSteps.forEach(step => stepObserver.observe(step));

    // 6. FORM SUBMISSION (Mock)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('.submit-btn');
            const originalText = btn.textContent;

            btn.textContent = 'Message Sent Successfully!';
            btn.style.background = 'var(--highlight)';
            btn.style.color = 'var(--bg-color)';

            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = '';
                btn.style.color = '';
                contactForm.reset();
            }, 3000);
        });
    }

    // 7. THEME TOGGLE
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isLight = document.body.classList.toggle('light-theme');
            // Change SVG icon based on theme
            if (isLight) {
                themeToggle.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 20px; height: 20px;"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';
            } else {
                themeToggle.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 20px; height: 20px;"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>';
            }
        });
    }

    // 8. RTL TOGGLE
    const rtlToggle = document.getElementById('rtlToggle');
    if (rtlToggle) {
        rtlToggle.addEventListener('click', () => {
            const htmlEl = document.documentElement;
            if (htmlEl.getAttribute('dir') === 'rtl') {
                htmlEl.setAttribute('dir', 'ltr');
                rtlToggle.textContent = 'RTL';
            } else {
                htmlEl.setAttribute('dir', 'rtl');
                rtlToggle.textContent = 'LTR';
            }
        });
    }

    // 9. SCROLL TO TOP BUTTON
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                scrollTopBtn.style.opacity = '1';
                scrollTopBtn.style.visibility = 'visible';
                scrollTopBtn.style.transform = 'translateY(0)';
            } else {
                scrollTopBtn.style.opacity = '0';
                scrollTopBtn.style.visibility = 'hidden';
                scrollTopBtn.style.transform = 'translateY(20px)';
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 10. HAMBURGER MENU & MOBILE NAV ACTIONS
    const hamburgerBtn = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');
    const navActions = document.querySelector('.nav-actions');
    const navContainer = document.querySelector('.nav-container');

    if (hamburgerBtn && navLinks) {
        hamburgerBtn.addEventListener('click', (e) => {
            e.preventDefault();
            navLinks.classList.toggle('active');
            if (navLinks.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // Close menu when a link is clicked
        const menuLinks = navLinks.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 1024) {
                    navLinks.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        });
    }

    const moveNavElements = () => {
        if (window.innerWidth <= 1024) {
            if (navLinks && navActions && !navLinks.contains(navActions)) {
                navLinks.appendChild(navActions);
            }
        } else {
            if (navContainer && navActions && !navContainer.contains(navActions)) {
                navContainer.appendChild(navActions);
            }
        }
    };

    window.addEventListener('resize', moveNavElements);
    moveNavElements();
});
