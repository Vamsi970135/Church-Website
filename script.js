// --- script.js ---

document.addEventListener('DOMContentLoaded', () => {

    // 1. Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = mobileMenu.querySelectorAll('a');

    hamburger.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        // Animate hamburger to X (Optional simple animation by toggling a class)
        hamburger.classList.toggle('open');
    });

    // Close mobile menu when a link is clicked
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            hamburger.classList.remove('open');
        });
    });

    // 3. Scroll Reveal Animations (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

    const revealOptions = {
        threshold: 0.15, // Trigger when 15% of the element is visible
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Stop observing once revealed
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // 4. Trigger hero animations on load
    setTimeout(() => {
        const heroReveals = document.querySelectorAll('#home .reveal');
        heroReveals.forEach(el => el.classList.add('active'));
    }, 100);

    // 5. Render Dynamic Content from LocalStorage
    // Initialize default data if missing (also done in admin.js, but good to have here too)
    const defaultEvents = [
        { id: 1, date: '2026-03-22', title: 'Sunday Morning Worship', details: '10:00 AM • Main Sanctuary' },
        { id: 2, date: '2026-03-25', title: 'Mid-week Prayer & Fasting', details: '6:30 PM • Chapel' },
        { id: 3, date: '2026-03-28', title: 'Youth Retreat 2026', details: 'All Day • Camp Galilee' }
    ];

    const defaultGallery = [
        { id: 1, url: 'Images/Gallery1.jpeg' },
        { id: 2, url: 'Images/Gallery2.jpeg' },
        { id: 3, url: 'Images/Gallery3.jpeg' },
        { id: 4, url: 'Images/Gallery4.jpeg' },
        { id: 5, url: 'Images/Gallery5.jpeg' },
        { id: 6, url: 'Images/Gallery6.jpeg' },
        { id: 7, url: 'Images/Gallery7.jpeg' },
        { id: 8, url: 'Images/Gallery8.jpeg' },
        { id: 9, url: 'Images/Gallery9.jpeg' }
    ];

    if (!localStorage.getItem('yn_events')) localStorage.setItem('yn_events', JSON.stringify(defaultEvents));
    if (!localStorage.getItem('yn_gallery')) localStorage.setItem('yn_gallery', JSON.stringify(defaultGallery));

    // Render Events
    const eventsContainer = document.getElementById('events-container');
    if (eventsContainer) {
        const events = JSON.parse(localStorage.getItem('yn_events'));
        eventsContainer.innerHTML = '';
        
        // Sort events by date
        events.sort((a,b) => new Date(a.date) - new Date(b.date));
        
        events.forEach(ev => {
            const dateObj = new Date(ev.date + "T00:00:00");
            const day = String(dateObj.getDate()).padStart(2, '0');
            const month = dateObj.toLocaleString('default', { month: 'short' }).toUpperCase();
            
            const eventHtml = `
                <div class="event-item">
                    <div class="event-date">
                        <span class="day">${day}</span>
                        <span class="month">${month}</span>
                    </div>
                    <div class="event-details">
                        <h4>${ev.title}</h4>
                        <p>${ev.details}</p>
                    </div>
                </div>
            `;
            eventsContainer.insertAdjacentHTML('beforeend', eventHtml);
        });
    }

    // Render Gallery
    const galleryContainer = document.getElementById('gallery-container');
    if (galleryContainer) {
        const gallery = JSON.parse(localStorage.getItem('yn_gallery'));
        galleryContainer.innerHTML = '';
        gallery.reverse().forEach(img => {
            const itemHtml = `
                <div class="gallery-item">
                    <img src="${img.url}" alt="Church Activity">
                </div>
            `;
            galleryContainer.insertAdjacentHTML('beforeend', itemHtml);
        });
    }

});
