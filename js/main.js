import { fetchPortfolioData } from './api.js';
import { renderAll } from './ui.js';

// Main Frontend Logic
const yearSpan = document.getElementById('year');
if (yearSpan) yearSpan.innerText = new Date().getFullYear();

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const data = await fetchPortfolioData();
        renderAll(data);
    } catch (err) {
        console.error("Error loading content:", err);
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

// 3. Back to Top
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
