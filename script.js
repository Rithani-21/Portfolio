document.addEventListener('DOMContentLoaded', () => {
    // ===== Custom Cursor & Mouse Follow Glow =====
    const cursor = document.querySelector('.custom-cursor');
    const glow = document.querySelector('.mouse-follow-glow');
    const interactiveElements = document.querySelectorAll('a, button, .btn');

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        glow.style.left = e.clientX + 'px';
        glow.style.top = e.clientY + 'px';
    });

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
        });
    });

    // ===== Navbar Scroll Effect =====
    const navbar = document.querySelector('.navbar');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        // Sticky navbar effect
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active nav link highlight
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // ===== Typewriter Animation =====
    const typingText = document.querySelector('.typing-text');
    const typewriterCursor = document.querySelector('.cursor');
    const roles = [
        'UI/UX Designer',
        'Frontend Developer',
        'Computer Science & Design Student'
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeWriter() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typingText.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 60 : 100;

        if (!isDeleting && charIndex === currentRole.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500; // Small pause before next word
        }

        setTimeout(typeWriter, typeSpeed);
    }
    typeWriter();

    // ===== Scroll Reveal Animation =====
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOnScroll = () => {
        revealElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            if (rect.top < windowHeight - 100) {
                el.classList.add('active');
            }
        });
    };
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    // ===== Smooth Scroll for Anchor Links =====
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 70,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ===== Skill Progress Bar Animation =====
    const skillCards = document.querySelectorAll('.skill-card');
    
    const animateSkillBars = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target.querySelector('.skill-progress');
                const finalWidth = progress.style.width;
                // Reset to 0 first for animation
                progress.style.width = '0';
                // Trigger animation
                setTimeout(() => {
                    progress.style.width = finalWidth;
                }, 100);
                // Stop observing once animated
                animateSkillBars.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    skillCards.forEach(card => {
        animateSkillBars.observe(card);
    });

    // ===== Project Slider =====
    let currentProjectIndex = 0;
    const projectTrack = document.querySelector('.projects-track');
    const projectDots = document.querySelectorAll('#projectDots .slider-dot');
    const projectPrev = document.getElementById('projectPrev');
    const projectNext = document.getElementById('projectNext');
    const projectsContainer = document.querySelector('.projects-container');
    const totalProjects = 3;
    let autoPlayInterval;

    function updateProjectSlider() {
        projectTrack.style.transform = `translateX(-${currentProjectIndex * 100}%)`;
        projectDots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentProjectIndex);
        });
    }

    function startAutoPlay() {
        autoPlayInterval = setInterval(() => {
            currentProjectIndex = (currentProjectIndex + 1) % totalProjects;
            updateProjectSlider();
        }, 4000); // Auto-play every 4 seconds
    }

    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }

    startAutoPlay();

    // Pause on hover
    projectsContainer.addEventListener('mouseenter', stopAutoPlay);
    projectsContainer.addEventListener('mouseleave', startAutoPlay);

    projectPrev.addEventListener('click', () => {
        currentProjectIndex = (currentProjectIndex - 1 + totalProjects) % totalProjects;
        updateProjectSlider();
    });

    projectNext.addEventListener('click', () => {
        currentProjectIndex = (currentProjectIndex + 1) % totalProjects;
        updateProjectSlider();
    });

    projectDots.forEach(dot => {
        dot.addEventListener('click', () => {
            currentProjectIndex = parseInt(dot.dataset.index);
            updateProjectSlider();
        });
    });

    // ===== Certifications Slider =====
    let currentCertIndex = 0;
    const certTrack = document.querySelector('.certifications-track');
    const certDots = document.querySelectorAll('#certDots .slider-dot');
    const totalCerts = 2;

    function updateCertSlider() {
        certTrack.style.transform = `translateX(-${currentCertIndex * 100}%)`;
        certDots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentCertIndex);
        });
    }

    certDots.forEach(dot => {
        dot.addEventListener('click', () => {
            currentCertIndex = parseInt(dot.dataset.index);
            updateCertSlider();
        });
    });

    // ===== Contact Form =====
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (data.success) {
                alert('Message sent successfully');
                contactForm.reset();
            } else {
                alert('Error: ' + data.message);
            }
        } catch (error) {
            console.error('Form submission error:', error);
            alert('Error submitting form. Please try again.');
        }
    });

    // ===== Magnetic Button Effect (Bonus Enhancement) =====
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });

    // ===== Hamburger Menu (Mobile) =====
    const hamburger = document.querySelector('.hamburger');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        // Add mobile menu functionality here if needed
        console.log('Hamburger clicked');
    });
});