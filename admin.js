// --- admin.js ---

document.addEventListener('DOMContentLoaded', () => {

    const authSection = document.getElementById('auth-section');
    const dashboardSection = document.getElementById('dashboard-section');
    const loginBtn = document.getElementById('login-btn');
    const passwordInput = document.getElementById('password-input');
    const errorMsg = document.getElementById('error-msg');
    const logoutBtn = document.getElementById('logout-btn');

    // Default Data
    const defaultEvents = [
        { id: 1, date: '2026-03-22', title: 'Sunday Morning Worship', details: '10:00 AM • Main Sanctuary' },
        { id: 2, date: '2026-03-25', title: 'Mid-week Prayer & Fasting', details: '6:30 PM • Chapel' },
        { id: 3, date: '2026-03-28', title: 'Youth Retreat 2026', details: 'All Day • Camp Galilee' }
    ];

    const defaultGallery = [
        { id: 1, url: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=500&q=80' },
        { id: 2, url: 'https://images.unsplash.com/photo-1548625361-ec853112bd26?w=500&q=80' },
        { id: 3, url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&q=80' }
    ];

    // Initialize LocalStorage if empty
    if (!localStorage.getItem('yn_events')) {
        localStorage.setItem('yn_events', JSON.stringify(defaultEvents));
    }
    if (!localStorage.getItem('yn_gallery')) {
        localStorage.setItem('yn_gallery', JSON.stringify(defaultGallery));
    }

    // Check Login State
    if (sessionStorage.getItem('admin_auth') === 'true') {
        showDashboard();
    }

    // Auth Logic
    loginBtn.addEventListener('click', () => {
        if (passwordInput.value === 'Nissy@123') {
            sessionStorage.setItem('admin_auth', 'true');
            showDashboard();
            errorMsg.style.display = 'none';
        } else {
            errorMsg.style.display = 'block';
        }
    });

    logoutBtn.addEventListener('click', () => {
        sessionStorage.removeItem('admin_auth');
        dashboardSection.style.display = 'none';
        authSection.style.display = 'block';
        passwordInput.value = '';
    });

    function showDashboard() {
        authSection.style.display = 'none';
        dashboardSection.style.display = 'block';
        renderAdminEvents();
        renderAdminGallery();
    }

    // Render Events in Admin
    const eventsListAdmin = document.getElementById('events-list-admin');
    
    function renderAdminEvents() {
        eventsListAdmin.innerHTML = '';
        const events = JSON.parse(localStorage.getItem('yn_events'));
        events.forEach(ev => {
            const li = document.createElement('li');
            li.innerHTML = `
                <div>
                    <strong>${ev.title}</strong> - ${ev.date}
                    <br><span style="font-size: 0.85rem; color: #666;">${ev.details}</span>
                </div>
                <button class="btn-danger" data-id="${ev.id}">Delete</button>
            `;
            eventsListAdmin.appendChild(li);
        });

        // Delete Event Listeners
        eventsListAdmin.querySelectorAll('.btn-danger').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.target.getAttribute('data-id'));
                const filtered = events.filter(ev => ev.id !== id);
                localStorage.setItem('yn_events', JSON.stringify(filtered));
                renderAdminEvents();
            });
        });
    }

    // Add Event
    document.getElementById('add-event-btn').addEventListener('click', () => {
        const dateVal = document.getElementById('event-date').value;
        const titleVal = document.getElementById('event-title').value;
        const detailsVal = document.getElementById('event-time').value;

        if (dateVal && titleVal && detailsVal) {
            const events = JSON.parse(localStorage.getItem('yn_events'));
            const newId = events.length ? Math.max(...events.map(e => e.id)) + 1 : 1;
            
            events.push({ id: newId, date: dateVal, title: titleVal, details: detailsVal });
            localStorage.setItem('yn_events', JSON.stringify(events));
            
            // clearing forms
            document.getElementById('event-date').value = '';
            document.getElementById('event-title').value = '';
            document.getElementById('event-time').value = '';
            
            renderAdminEvents();
        } else {
            alert('Please fill out all event fields.');
        }
    });

    // Render Gallery in Admin
    const galleryListAdmin = document.getElementById('gallery-list-admin');

    function renderAdminGallery() {
        galleryListAdmin.innerHTML = '';
        const gallery = JSON.parse(localStorage.getItem('yn_gallery'));
        gallery.forEach(img => {
            const li = document.createElement('li');
            li.innerHTML = `
                <div class="flex-row">
                    <img src="${img.url}" alt="Preview" class="gallery-preview">
                    <span style="font-size: 0.85rem; color: #666; max-width: 300px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${img.url}</span>
                </div>
                <button class="btn-danger" data-id="${img.id}">Delete</button>
            `;
            galleryListAdmin.appendChild(li);
        });

        // Delete Gallery Listeners
        galleryListAdmin.querySelectorAll('.btn-danger').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.target.getAttribute('data-id'));
                const filtered = gallery.filter(img => img.id !== id);
                localStorage.setItem('yn_gallery', JSON.stringify(filtered));
                renderAdminGallery();
            });
        });
    }

    // Add Gallery Image
    document.getElementById('add-gallery-btn').addEventListener('click', () => {
        const urlVal = document.getElementById('gallery-url').value;

        if (urlVal) {
            const gallery = JSON.parse(localStorage.getItem('yn_gallery'));
            const newId = gallery.length ? Math.max(...gallery.map(i => i.id)) + 1 : 1;
            
            gallery.push({ id: newId, url: urlVal });
            localStorage.setItem('yn_gallery', JSON.stringify(gallery));
            
            document.getElementById('gallery-url').value = '';
            renderAdminGallery();
        } else {
            alert('Please enter an image URL.');
        }
    });

});
