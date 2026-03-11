/**
 * Ram Chandra Aryal - Portfolio site script.
 * Handles: mobile nav, smooth scroll, sticky header, scroll animations, project detail modal (reads data-* from .portfolio-item).
 */
document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('toggle');
    });

    // Close mobile menu when clicking a link
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('toggle');
        });
    });

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Sticky Header
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.9)';
            header.style.boxShadow = 'none';
        }
    });

    // Scroll Animation (Intersection Observer)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Select elements to animate
    const animatedElements = document.querySelectorAll('.service-card, .portfolio-item, .about-content, .contact-container .contact-info, .contact-cta');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });

    // Project detail modal
    const modal = document.getElementById('project-modal');
    const modalBackdrop = modal.querySelector('.project-modal-backdrop');
    const modalClose = modal.querySelector('.project-modal-close');
    const modalTitle = modal.querySelector('.project-modal-title');
    const modalSubtitle = modal.querySelector('.project-modal-subtitle');
    const modalDetail = modal.querySelector('.project-modal-detail');
    const modalImage = modal.querySelector('.project-modal-image');

    function openProjectModal(item) {
        const title = item.getAttribute('data-title') || '';
        const subtitle = item.getAttribute('data-subtitle') || '';
        const detail = item.getAttribute('data-detail') || '';
        const imgSrc = item.getAttribute('data-image') || '';
        modalTitle.textContent = title;
        modalSubtitle.textContent = subtitle;
        modalDetail.textContent = detail;
        modalImage.src = imgSrc;
        modalImage.alt = title;
        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeProjectModal() {
        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    document.querySelectorAll('.portfolio-item').forEach(item => {
        item.addEventListener('click', () => openProjectModal(item));
        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openProjectModal(item);
            }
        });
    });

    if (modalClose) modalClose.addEventListener('click', closeProjectModal);
    if (modalBackdrop) modalBackdrop.addEventListener('click', closeProjectModal);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('is-open')) closeProjectModal();
    });
});
