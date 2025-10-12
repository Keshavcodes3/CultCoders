// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Close mobile menu when clicking on a link
const mobileMenuLinks = mobileMenu.querySelectorAll('a');
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

// Sticky Navigation Background on Scroll
const nav = document.querySelector('.sticky-nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Scroll to Top Button
const scrollTopBtn = document.getElementById('scrollTopBtn');
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollTopBtn.style.opacity = '1';
        scrollTopBtn.style.pointerEvents = 'auto';
    } else {
        scrollTopBtn.style.opacity = '0';
        scrollTopBtn.style.pointerEvents = 'none';
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Form Submission
const joinForm = document.getElementById('joinForm');
const successMessage = document.getElementById('successMessage');

joinForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(joinForm);
    const data = Object.fromEntries(formData);
    console.log('Form submitted:', data);
    successMessage.classList.remove('hidden');
    joinForm.reset();
    setTimeout(() => successMessage.classList.add('hidden'), 5000);
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        }
    });
});

// Intersection Observer for Scroll Animations
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -100px 0px' };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.tutorial-card, .project-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Stats Counter Animation
const animateCounter = (element, target, duration = 2000) => {
    let current = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
};

// Observe stats section
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statItems = document.querySelectorAll('.stat-item div:first-child');
            statItems.forEach((item, index) => {
                const values = [500, 1000, 50, 24];
                setTimeout(() => animateCounter(item, values[index], 2000), index * 200);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stat-item')?.parentElement;
if (statsSection) statsObserver.observe(statsSection);

// Hover Sound (optional)
const buttons = document.querySelectorAll('button, a');
buttons.forEach(btn => btn.addEventListener('mouseenter', () => {
    // new Audio('hover.mp3').play();
}));

// Parallax Effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.wave');
    if (parallax) {
        parallax.style.transform = `translate(-50%, -50%) rotate(${scrolled * 0.05}deg)`;
    }
});

// Prevent Form Resubmission
if (window.history.replaceState) window.history.replaceState(null, null, window.location.href);

// Loading Animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Dynamic Year
const currentYear = new Date().getFullYear();
const yearElement = document.querySelector('footer p');
if (yearElement) {
    yearElement.innerHTML = yearElement.innerHTML.replace('2024', currentYear);
}

// Tutorial Card Interactions
document.querySelectorAll('.tutorial-card button').forEach(button => {
    button.addEventListener('click', (e) => {
        const cardTitle = e.target.closest('.tutorial-card').querySelector('h3').textContent;
        alert(`Loading ${cardTitle} tutorial...`);
    });
});

// Project Card Buttons
document.querySelectorAll('.project-card').forEach(card => {
    const viewBtn = card.querySelector('.project-overlay button:first-child');
    const forkBtn = card.querySelector('.project-overlay button:last-child');
    if (viewBtn) viewBtn.addEventListener('click', e => {
        e.stopPropagation();
        alert(`Opening ${card.querySelector('h3').textContent}...`);
    });
    if (forkBtn) forkBtn.addEventListener('click', e => {
        e.stopPropagation();
        alert(`Forking ${card.querySelector('h3').textContent}...`);
    });
});

// Newsletter Subscription
const newsletterForm = document.querySelector('footer .flex');
if (newsletterForm) {
    const newsletterBtn = newsletterForm.querySelector('button');
    const newsletterInput = newsletterForm.querySelector('input');
    newsletterBtn.addEventListener('click', e => {
        e.preventDefault();
        const email = newsletterInput.value;
        if (email && email.includes('@')) {
            alert(`Thanks for subscribing! Check ${email} for confirmation.`);
            newsletterInput.value = '';
        } else alert('Please enter a valid email address.');
    });
}

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) mobileMenu.classList.add('hidden');
    if (e.key === 'Home') window.scrollTo({ top: 0, behavior: 'smooth' });
    if (e.key === 'End') window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
});

// Typing Effect
const taglines = ["Code. Create. Conquer.", "Learn. Build. Innovate.", "Collaborate. Grow. Succeed."];
let taglineIndex = 0;
const taglineElement = document.querySelector('.fade-in');
if (taglineElement) {
    setInterval(() => {
        taglineElement.style.opacity = '0';
        setTimeout(() => {
            taglineIndex = (taglineIndex + 1) % taglines.length;
            taglineElement.textContent = taglines[taglineIndex];
            taglineElement.style.opacity = '1';
        }, 500);
    }, 5000);
}

// Particle Effect
let particles = [];
const canvas = document.createElement('canvas');
canvas.style = `
    position: fixed; top: 0; left: 0;
    width: 100%; height: 100%;
    pointer-events: none; z-index: 1; opacity: 0.3;
`;
const homeSection = document.getElementById('home');
if (homeSection) {
    homeSection.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class Particle {
        constructor(x, y) {
            this.x = x; this.y = y;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 3 - 1.5;
            this.speedY = Math.random() * 3 - 1.5;
            this.color = `rgba(0, ${Math.random() * 255}, ${Math.random() * 255}, 0.8)`;
        }
        update() { this.x += this.speedX; this.y += this.speedY; if (this.size > 0.2) this.size -= 0.05; }
        draw() { ctx.fillStyle = this.color; ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill(); }
    }

    homeSection.addEventListener('mousemove', e => {
        for (let i = 0; i < 3; i++) particles.push(new Particle(e.clientX, e.clientY));
    });

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particles.length; i++) {
            particles[i].update(); particles[i].draw();
            if (particles[i].size <= 0.2) { particles.splice(i, 1); i--; }
        }
        requestAnimationFrame(animateParticles);
    }

    animateParticles();
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth; canvas.height = window.innerHeight;
    });
}

// Form Validation
const formInputs = document.querySelectorAll('#joinForm input, #joinForm select, #joinForm textarea');
formInputs.forEach(input => {
    input.addEventListener('blur', () => {
        input.style.borderColor = input.value.trim() === '' && input.hasAttribute('required')
            ? '#ff4444' : 'rgba(0, 255, 157, 0.3)';
    });
    input.addEventListener('focus', () => input.style.borderColor = '#00ff9d');
});

// Lazy Loading
const lazyImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
        }
    });
});
lazyImages.forEach(img => imageObserver.observe(img));

// Local Storage for Form Data
const saveFormData = () => {
    const formData = {
        name: document.getElementById('name')?.value || '',
        email: document.getElementById('email')?.value || '',
        skillLevel: document.getElementById('skillLevel')?.value || '',
        interests: document.getElementById('interests')?.value || ''
    };
    localStorage.setItem('cultCodersFormDraft', JSON.stringify(formData));
};
const loadFormData = () => {
    const savedData = localStorage.getItem('cultCodersFormDraft');
    if (savedData) {
        const data = JSON.parse(savedData);
        if (document.getElementById('name')) document.getElementById('name').value = data.name;
        if (document.getElementById('email')) document.getElementById('email').value = data.email;
        if (document.getElementById('skillLevel')) document.getElementById('skillLevel').value = data.skillLevel;
        if (document.getElementById('interests')) document.getElementById('interests').value = data.interests;
    }
};
loadFormData();
formInputs.forEach(input => input.addEventListener('input', saveFormData));
joinForm.addEventListener('submit', () => localStorage.removeItem('cultCodersFormDraft'));

// Tooltip Functionality
const createTooltip = (element, text) => {
    const tooltip = document.createElement('div');
    tooltip.className = 'absolute bg-gray-900 text-white text-xs px-2 py-1 rounded shadow-lg -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap opacity-0 transition-opacity duration-300';
    tooltip.textContent = text;
    element.style.position = 'relative';
    element.appendChild(tooltip);
    element.addEventListener('mouseenter', () => tooltip.style.opacity = '1');
    element.addEventListener('mouseleave', () => tooltip.style.opacity = '0');
};

const socialIcons = document.querySelectorAll('footer .flex.space-x-4 a');
const socialNames = ['Facebook', 'Twitter', 'GitHub', 'LinkedIn'];
socialIcons.forEach((icon, index) => socialNames[index] && createTooltip(icon, socialNames[index]));

// Console Easter Egg
console.log('%c👨‍💻 Cult Coders Community 👩‍💻', 'color: #00ff9d; font-size: 24px; font-weight: bold;');
console.log('%cLooking for talented developers! Check out our careers page.', 'color: #00b7ff; font-size: 14px;');
console.log('%cInterested in contributing? Visit: https://github.com/cultcoders', 'color: #8a2be2; font-size: 12px;');

// Performance Monitoring
window.addEventListener('load', () => {
    const loadTime = performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart;
    console.log(`Page loaded in ${loadTime}ms`);
});

// Dark Mode Toggle
const darkModeToggle = document.createElement('button');
darkModeToggle.innerHTML = '🌙';
darkModeToggle.className = 'fixed top-20 right-8 bg-gray-800 p-3 rounded-full z-50 hover:bg-gray-700 transition-all duration-300';
document.body.appendChild(darkModeToggle);
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    darkModeToggle.innerHTML = document.body.classList.contains('light-mode') ? '☀️' : '🌙';
});

// Initialize All
console.log('Cult Coders website loaded successfully! 🚀');
