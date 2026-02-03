import { fetchPortfolioData, submitMessage } from './api.js';
import { renderAll } from './ui.js';

// Main Frontend Logic
const loader = document.getElementById('site-loader');
const yearSpan = document.getElementById('year');
if (yearSpan) yearSpan.innerText = new Date().getFullYear();

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const data = await fetchPortfolioData();
        renderAll(data);

        // Hide Loader
        if (loader) {
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => loader.remove(), 500);
            }, 500); // Slight delay for smooth transition
        }

    } catch (err) {
        console.error("Error loading content:", err);
        if (loader) loader.innerHTML = "<div class='container' style='text-align:center'><p style='color:white'>Failed to load content.</p><button onclick='location.reload()' class='btn btn-primary' style='margin-top:1rem'>Retry</button></div>";
    }
});

// Event Listeners

// 1. Modal Close on Outside Click
const modal = document.getElementById('details-modal');
if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target.id === 'details-modal') {
            if (window.closeDetails) window.closeDetails();
        }
    });
}

// 2. Nav Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// 3. Contact Form Submission
const contactForm = document.getElementById('contact-form');
const contactStatus = document.getElementById('contact-status');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerText;

        // Reset status
        contactStatus.innerText = 'Sending...';
        contactStatus.className = '';
        submitBtn.disabled = true;
        submitBtn.innerText = 'Sending...';

        try {
            const formData = new FormData(contactForm);
            const payload = {
                name: formData.get('name'),
                email: formData.get('email'),
                message: formData.get('message')
            };

            await submitMessage(payload);

            contactStatus.innerText = 'Message sent successfully! I will get back to you soon.';
            contactStatus.className = 'success';
            contactForm.reset();
        } catch (err) {
            console.error("Form error:", err);
            contactStatus.innerText = 'Failed to send message. Please try again or email me directly.';
            contactStatus.className = 'error';
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerText = originalBtnText;
        }
    });
}

// 4. Back to Top
const backToTopBtn = document.getElementById('back-to-top');
if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
