gsap.registerPlugin(ScrollToPlugin);



// 2. LOADING SCREEN
const tlLoad = gsap.timeline({
    onComplete: () => {
        gsap.to("#loading-screen", { opacity: 0, scale: 1.2, duration: 0.8, onComplete: () => {
            document.getElementById('loading-screen').style.display = 'none';
            document.getElementById('main-content').style.visibility = 'visible';
            initNavIndicator(); 
        }});
        gsap.to("#main-content", { opacity: 1, duration: 0.8 });
    }
});

tlLoad.to("#bar", { width: "25%", duration: 0.8, ease: "power2.out" })
      .to("#bar", { width: "40%", duration: 0.5, ease: "none" })
      .to("#bar", { width: "75%", duration: 0.8, ease: "power1.inOut" })
      .to("#bar", { width: "100%", duration: 0.6, ease: "power4.out" });

gsap.fromTo(".welcome-text", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "back.out(1.5)", delay: 0.2 });
gsap.fromTo(".mysites-text", { y: 30, opacity: 0, scale: 0.8 }, { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.5)", delay: 0.5 });
gsap.fromTo(".loader-icon", { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: "power2.out" });

// 3. NAVBAR MAGIC LINE & SCROLL PROGRESS
const indicator = document.querySelector('.nav-indicator');
const navLinks = document.querySelectorAll('.nav-links a');

function moveIndicator(target) {
    if(!target || !indicator) return;
    gsap.to(indicator, { left: target.offsetLeft, width: target.offsetWidth, duration: 0.25, ease: "power2.out" });
}

function initNavIndicator() {
    const activeLink = document.querySelector('.nav-links a.active');
    if(activeLink) moveIndicator(activeLink);
}

window.addEventListener('scroll', () => {
    let current = "";
    document.querySelectorAll('section').forEach(s => {
        if (window.pageYOffset >= (s.offsetTop - 150)) current = s.getAttribute('id');
    });
    navLinks.forEach(a => {
        if (a.getAttribute('href').includes(current)) {
            navLinks.forEach(el => el.classList.remove('active'));
            a.classList.add('active');
            moveIndicator(a);
        }
    });
});

// BUG DELAY FIXED: Durasi Scroll dari 1.2s -> 0.3s (Sangat Instan)
document.querySelectorAll('.scroll-link').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if(document.querySelector(targetId)){
            gsap.to(window, { duration: 0.3, scrollTo: { y: targetId, offsetY: 80 }, ease: "power3.inOut" });
        }
    });
});

// 4. TYPING EFFECT
const textElement = document.getElementById("typing-text");
const words = ["Web Developer", "Mahasiswa PNUP", "Full-Stack Developer"];
let wordIndex = 0, charIndex = 0, isDeleting = false;

function type() {
    if(!textElement) return;
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        textElement.innerText = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        textElement.innerText = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 40 : 80;
    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true; typeSpeed = 1200; 
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false; wordIndex = (wordIndex + 1) % words.length; typeSpeed = 400;
    }
    setTimeout(type, typeSpeed);
}
setTimeout(type, 5000);

// 5. ANIMASI TAB BERGESER (Tanpa Delay)
let isTabAnimating = false; 
function switchTab(e, tabId) {
    if(isTabAnimating) return;
    
    const currentTab = document.querySelector('.tab-content.active');
    const targetTab = document.getElementById(tabId);
    
    if(!currentTab || currentTab.id === tabId) return;

    isTabAnimating = true;

    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    e.currentTarget.classList.add('active');

    gsap.to(currentTab, { opacity: 0, y: 10, duration: 0.1, onComplete: () => {
        currentTab.classList.remove('active');
        currentTab.style.display = 'none'; 
        
        targetTab.style.display = 'block'; 
        targetTab.classList.add('active');
        
        gsap.fromTo(targetTab, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.15, onComplete: () => {
            isTabAnimating = false;
        }});
    }});
}

// 6. DATABASE PROJECT DINAMIS
const projectsData = {
    'balmon': {
        title: 'Balmon Makassar',
        breadTitle: 'Balmon Makassar',
        desc: 'Sistem layanan publik berbasis Laravel yang efisien.',
        img: 'image/balmon.png',
        techCount: 4,
        featureCount: 3,
        techs: ['Laravel', 'PHP', 'MySQL', 'Bootstrap'],
        features: ['Layanan publik efisien', 'Manajemen data terpusat', 'UI yang responsif'],
        github: 'https://github.com/salmandera/linktree-balmonmks',
        demo: '#'
    },
    'kasir': {
        title: 'S-Kasir',
        breadTitle: 'S-Kasir',
        desc: 'Platform manajemen transaksi yang modern dan cepat.',
        img: 'image/kasir.png',
        techCount: 3,
        featureCount: 3,
        techs: ['React', 'Node.js', 'Tailwind CSS'],
        features: ['Manajemen transaksi cepat', 'Laporan keuangan', 'Desain modern'],
        github: 'https://github.com/salmandera/kasir-telkom',
        demo: '#'
    },
    'elearning': {
        title: 'E-learning',
        breadTitle: 'E-learning',
        desc: 'Platform kursus belajar dan memudahkan anda dalam belajar.',
        img: 'image/elearning.png',
        techCount: 3,
        featureCount: 3,
        techs: ['Vue.js', 'Laravel', 'MySQL'],
        features: ['Manajemen kursus', 'Akses materi mudah', 'Sistem penilaian'],
        github: 'https://github.com/Silverbullet093/kelompok4-e-learning',
        demo: '#'
    },
    'mooncafe': {
        title: 'The Moon Cafe',
        breadTitle: 'The Moon Cafe',
        desc: 'E-Menu interaktif dengan estetika malam yang menawan.',
        img: 'image/cafe.png',
        techCount: 3,
        featureCount: 3,
        techs: ['HTML', 'CSS', 'JavaScript'],
        features: ['E-Menu interaktif', 'Desain estetika malam', 'Pemesanan digital'],
        github: 'https://github.com/salmandera/themooncafe.github.io',
        demo: 'https://salmandera.github.io/themooncafe.github.io/'
    },
    'gesture': {
        title: 'Gesture Tangan',
        breadTitle: 'Gesture Tangan',
        desc: 'Deteksi tangan MediaPipe dengan grafis Three.js secara real-time.',
        img: 'image/gesture.png',
        techCount: 3,
        featureCount: 3,
        techs: ['MediaPipe', 'Three.js', 'JavaScript'],
        features: ['Deteksi tangan real-time', 'Integrasi grafis 3D', 'Interaktif'],
        github: 'https://github.com/Silverbullet093/gesture-tangan',
        demo: 'linktree-salman-main/porto/gesture/gesture.html'
    },
    'porto': {
        title: 'Portofolio',
        breadTitle: 'Portofolio',
        desc: 'Perjalanan karya, inovasi desain, dan keahlian teknis saya dalam satu ruang interaktif.',
        img: 'image/porto.png',
        techCount: 4,
        featureCount: 3,
        techs: ['HTML', 'CSS', 'JavaScript', 'Bootstrap'],
        features: ['Desain interaktif', 'Animasi dinamis', 'Responsif'],
        github: 'https://github.com/Silverbullet093/linktree-salman.git',
        demo: 'linktree-salman-main/index.html'
    }
};

function openProjectDetail(id) {
    const data = projectsData[id];
    if(data) {
        document.querySelector('.detail-title').innerHTML = data.title;
        document.getElementById('bread-title').innerHTML = data.breadTitle;
        document.querySelector('.detail-desc').innerHTML = data.desc;
        document.querySelector('.detail-hero-img').src = data.img;
        document.getElementById('stat-tech').innerText = data.techCount;
        document.getElementById('stat-feat').innerText = data.featureCount;

        const techContainer = document.querySelector('.pills');
        techContainer.innerHTML = data.techs.map(t => `<span><i class="fas fa-check-circle"></i> ${t}</span>`).join('');

        const featureContainer = document.querySelector('.features-box ul');
        featureContainer.innerHTML = data.features.map(f => `<li>${f}</li>`).join('');
        
        document.querySelector('.git-btn').href = data.github || '#';
        document.querySelector('.live-btn').href = data.demo || '#';
    }

    document.getElementById('project-detail-page').classList.add('active');
    document.body.style.overflow = 'hidden'; 
}

function closeProjectDetail() {
    document.getElementById('project-detail-page').classList.remove('active');
    document.body.style.overflow = 'auto'; 
}

// 7. LIGHTBOX
function openLightbox(imgSrc) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    
    lightboxImg.src = imgSrc;
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden'; 
    
    gsap.killTweensOf([lightbox, lightboxImg]);
    gsap.fromTo(lightbox, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" });
    gsap.fromTo(lightboxImg, 
        { opacity: 0, scale: 0.6, y: 30 }, 
        { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: "back.out(1.3)" }
    );
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    
    gsap.killTweensOf([lightbox, lightboxImg]);
    gsap.to(lightbox, { opacity: 0, duration: 0.3, ease: "power2.in" });
    gsap.to(lightboxImg, { 
        opacity: 0, 
        scale: 0.6, 
        y: 30,
        duration: 0.3, 
        ease: "power2.in",
        onComplete: () => {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto'; 
        }
    });
}

// 8. EXPERIENCE MODAL
function openExperienceModal(expType) {
    const template = document.getElementById(`exp-detail-${expType}`);
    const modalContent = document.querySelector('.exp-modal-content');
    const modal = document.getElementById('experience-modal');
    const backdrop = document.querySelector('.exp-modal-backdrop');
    const container = document.querySelector('.exp-modal-container');
    
    if (!template || !modalContent || !modal) return;
    
    // Clear previous content and clone the template
    modalContent.innerHTML = '';
    const clone = template.cloneNode(true);
    clone.style.display = 'block';
    modalContent.appendChild(clone);
    
    // Show modal container
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // GSAP Pop-up Animation (scales up and fades in)
    gsap.killTweensOf([backdrop, container]);
    gsap.fromTo(backdrop, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" });
    gsap.fromTo(container, 
        { opacity: 0, scale: 0.7 }, 
        { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.2)" }
    );
}

function closeExperienceModal() {
    const modal = document.getElementById('experience-modal');
    const backdrop = document.querySelector('.exp-modal-backdrop');
    const container = document.querySelector('.exp-modal-container');
    
    if (!modal || modal.style.display === 'none') return;
    
    // GSAP Close Animation (scales down and fades out)
    gsap.killTweensOf([backdrop, container]);
    gsap.to(backdrop, { opacity: 0, duration: 0.3, ease: "power2.in" });
    gsap.to(container, { 
        opacity: 0, 
        scale: 0.7, 
        duration: 0.3, 
        ease: "power2.in",
        onComplete: () => {
            modal.style.display = 'none';
            document.querySelector('.exp-modal-content').innerHTML = '';
            document.body.style.overflow = 'auto';
        }
    });
}

// =========================================================
// 9. FITUR FORMSUBMIT AJAX & SWEETALERT2 (ANTI-REDIRECT)
// =========================================================
const contactForm = document.getElementById('contact-form');
if(contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Mencegah reload halaman
        
        // 1. Munculkan Popup Loading
        console.log('Mengirim Pesan...');

        // 2. Ambil data form
        const formData = new FormData(this);

        // 3. Kirim pakai AJAX Fetch API (tambahkan '/ajax/' pada url)
        fetch('https://formsubmit.co/ajax/salmanabdurrahman263@gmail.com', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            // 4. Munculkan Popup Berhasil jika sukses
            alert('Berhasil! Pesan Anda telah berhasil terkirim!');
            contactForm.reset(); // Kosongkan form setelah sukses
        })
        .catch(error => {
            // 5. Munculkan Popup Error jika gagal
            alert('Oops... Terjadi kesalahan jaringan. Silakan coba lagi.');
        });
    });
}
// Event Listeners for Elements (Migrated from inline onclicks)
document.addEventListener('DOMContentLoaded', () => {
    // 0.1 Theme Toggle
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            initNavIndicator();
        });
    }

    // 0. Mobile Navigation Menu Toggle
    const navToggleBtn = document.getElementById('nav-toggle-btn');
    const navLinksMenu = document.getElementById('nav-links-menu');
    
    if (navToggleBtn && navLinksMenu) {
        navToggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            navToggleBtn.classList.toggle('active');
            navLinksMenu.classList.toggle('active');
        });
        
        // Close menu when a link is clicked
        const menuLinks = navLinksMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggleBtn.classList.remove('active');
                navLinksMenu.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navLinksMenu.classList.contains('active')) {
                if (!navLinksMenu.contains(e.target) && !navToggleBtn.contains(e.target)) {
                    navToggleBtn.classList.remove('active');
                    navLinksMenu.classList.remove('active');
                }
            }
        });
    }

    // 1. Lightbox
    const closeLightboxBtn = document.getElementById('close-lightbox-btn');
    if (closeLightboxBtn) {
        closeLightboxBtn.addEventListener('click', closeLightbox);
    }

    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }
    
    document.querySelectorAll('.cert-card').forEach(card => {
        card.addEventListener('click', function() {
            const imgSrc = this.getAttribute('data-cert-img');
            if (imgSrc) openLightbox(imgSrc);
        });
    });

    // 2. Tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const tabId = this.getAttribute('data-tab');
            if (tabId) switchTab(e, tabId);
        });
    });

    // 3. Project Details
    document.querySelectorAll('.btn-details').forEach(btn => {
        btn.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            if (projectId) openProjectDetail(projectId);
        });
    });

    const closeProjectBtn = document.getElementById('close-project-btn');
    if (closeProjectBtn) {
        closeProjectBtn.addEventListener('click', closeProjectDetail);
    }

    // 4. Experience Cards Click
    document.querySelectorAll('.exp-grid-card').forEach(card => {
        card.addEventListener('click', function() {
            const expType = this.getAttribute('data-exp');
            if (expType) openExperienceModal(expType);
        });
    });

    const closeExpBtn = document.getElementById('close-exp-modal-btn');
    if (closeExpBtn) {
        closeExpBtn.addEventListener('click', closeExperienceModal);
    }

    const expBackdrop = document.querySelector('.exp-modal-backdrop');
    if (expBackdrop) {
        expBackdrop.addEventListener('click', closeExperienceModal);
    }

    // 5. Global Escape Key Modals Close
    window.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeExperienceModal();
            closeProjectDetail();
            closeLightbox();
        }
    });

    // 10. SCROLL ANIMATION (FADE UP)
    // Tambahkan class fade-up secara dinamis ke elemen yang diinginkan
    const fadeElements = document.querySelectorAll('.section-header, .home-text, .home-img-wrapper, .about-text, .about-img-wrapper, .stat-card, .project-card, .cert-card, .tech-box, .contact-header, .contact-desc, #contact-form, .social-section, .experience-header, .exp-grid-card');
    fadeElements.forEach((el) => {
        el.classList.add('fade-up');
    });

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show-up');
                // Optional: stop observing once shown to animate only once
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => {
        scrollObserver.observe(el);
    });

    // 6. Stat Cards Click to Scroll & Switch Tab
    document.querySelectorAll('.stat-card').forEach(card => {
        card.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-target-tab');
            if (!targetTab) return;

            const portfolioSec = document.getElementById('portfolio');
            if (portfolioSec) {
                gsap.to(window, { duration: 0.3, scrollTo: { y: '#portfolio', offsetY: 80 }, ease: "power3.inOut" });
            }

            const tabBtn = document.querySelector(`.tab-btn[data-tab="${targetTab}"]`);
            if (tabBtn) {
                tabBtn.click();
            }
        });
    });

    initTechStackPopups();
});

// =========================================================
// 11. TECH STACK POPUPS (SWEETALERT2)
// =========================================================
const techDetailsData = {
    'HTML': {
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg',
        desc: 'HTML (HyperText Markup Language) adalah bahasa markup standar yang digunakan untuk membuat struktur halaman web.',
        history: 'Diciptakan oleh Tim Berners-Lee pada tahun 1991 untuk memfasilitasi pembagian dokumen ilmiah di CERN.',
        uses: 'Mendefinisikan elemen-elemen struktur seperti paragraf, judul, gambar, tabel, dan formulir pada halaman web.'
    },
    'CSS': {
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg',
        desc: 'CSS (Cascading Style Sheets) adalah bahasa stylesheet yang digunakan untuk mengatur tampilan visual dan tata letak halaman web.',
        history: 'Dibuat oleh Håkon Wium Lie pada tahun 1994 untuk memisahkan konten (HTML) dari presentasi visual dokumen web.',
        uses: 'Mengatur warna, tata letak, font, animasi, serta membuat halaman web menjadi responsif di berbagai perangkat.'
    },
    'JavaScript': {
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
        desc: 'JavaScript adalah bahasa pemrograman dinamis tingkat tinggi yang digunakan untuk membuat halaman web interaktif.',
        history: 'Diciptakan oleh Brendan Eich di Netscape dalam waktu hanya 10 hari pada tahun 1995 dengan nama awal Mocha.',
        uses: 'Membuat animasi interaktif, memproses data formulir secara asinkron (AJAX), membangun game web, serta menjalankan logika di sisi client maupun server.'
    },
    'Tailwind CSS': {
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg',
        desc: 'Tailwind CSS adalah framework CSS berbasis utility-first untuk membangun desain antarmuka kustom secara cepat.',
        history: 'Diciptakan oleh Adam Wathan dan dirilis perdana pada tahun 2017 untuk mempermudah styling tanpa menulis CSS kustom yang berulang.',
        uses: 'Mempercepat proses desain antarmuka pengguna (UI) langsung di dalam file HTML menggunakan kelas-kelas utilitas siap pakai.'
    },
    'ReactJS': {
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
        desc: 'React adalah library JavaScript open-source yang digunakan untuk membangun antarmuka pengguna berbasis komponen (component-based).',
        history: 'Dibuat oleh Jordan Walke, seorang software engineer di Facebook, dan dirilis pertama kali pada tahun 2013.',
        uses: 'Membangun aplikasi web satu halaman (Single Page Applications) yang dinamis, cepat, dan reaktif dengan manajemen state yang efisien.'
    },
    'Vite': {
        icon: 'https://vitejs.dev/logo.svg',
        desc: 'Vite adalah alat build (build tool) modern yang sangat cepat untuk proyek pengembangan web frontend.',
        history: 'Dibuat oleh Evan You (pencipta Vue.js) pada tahun 2020 untuk menggantikan bundling konvensional yang lambat seperti Webpack.',
        uses: 'Menyediakan server pengembangan lokal yang super cepat menggunakan Native ESM dan melakukan bundling produksi yang optimal.'
    },
    'Node JS': {
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg',
        desc: 'Node.js adalah runtime environment JavaScript open-source yang berjalan di atas engine V8 milik Google Chrome.',
        history: 'Diciptakan oleh Ryan Dahl pada tahun 2009 untuk memungkinkan eksekusi kode JavaScript di luar browser web (sisi server).',
        uses: 'Membangun aplikasi backend, RESTful API yang scalable, aplikasi real-time chat, serta mengelola package menggunakan NPM.'
    },
    'Bootstrap': {
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg',
        desc: 'Bootstrap adalah framework CSS frontend open-source paling populer untuk membangun situs web responsif dan mobile-first.',
        history: 'Dibuat oleh Mark Otto dan Jacob Thornton di Twitter, dirilis sebagai proyek open-source pada tahun 2011.',
        uses: 'Menyediakan komponen UI siap pakai seperti grid, tombol, form, navbar, dan modal guna mempercepat pengembangan frontend.'
    },
    'Laravel': {
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg',
        desc: 'Laravel adalah framework aplikasi web PHP berbasis arsitektur MVC (Model-View-Controller) yang elegan.',
        history: 'Diciptakan oleh Taylor Otwell pada tahun 2011 sebagai alternatif yang lebih modern dan kaya fitur dibandingkan CodeIgniter.',
        uses: 'Mempermudah pembuatan backend aplikasi web yang kompleks, mencakup sistem autentikasi, ORM (Eloquent), antrean, routing, dan keamanan data.'
    },
    'Dart': {
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dart/dart-original.svg',
        desc: 'Dart adalah bahasa pemrograman client-optimized yang dirancang untuk membangun aplikasi cepat di berbagai platform.',
        history: 'Dikembangkan oleh Google dan diperkenalkan pertama kali pada tahun 2011 sebagai alternatif dari JavaScript.',
        uses: 'Digunakan bersama framework Flutter untuk membangun aplikasi mobile (Android/iOS), desktop, dan web dengan basis kode tunggal.'
    },
    'Python': {
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg',
        desc: 'Python adalah bahasa pemrograman tingkat tinggi yang menekankan pada keterbacaan kode dan produktivitas pengembang.',
        history: 'Dibuat oleh Guido van Rossum dan dirilis pertama kali pada tahun 1991 dengan filosofi desain yang sederhana dan intuitif.',
        uses: 'Pengembangan web (Django/Flask), analisis data, kecerdasan buatan (Machine Learning/AI), otomatisasi scripting, dan komputasi ilmiah.'
    },
    'C++': {
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg',
        desc: 'C++ adalah bahasa pemrograman berorientasi objek yang tangguh dan memberikan kontrol tingkat tinggi atas memori sistem.',
        history: 'Dikembangkan oleh Bjarne Stroustrup di Bell Labs pada tahun 1979 sebagai perluasan dari bahasa pemrograman C.',
        uses: 'Pembuatan sistem operasi, game engine 3D, aplikasi desktop performa tinggi, perangkat lunak sistem, dan sistem tertanam (embedded systems).'
    }
};

function initTechStackPopups() {
    document.querySelectorAll('.tech-box').forEach(box => {
        box.addEventListener('click', function() {
            const techName = this.querySelector('span').innerText.trim();
            const data = techDetailsData[techName];
            if (!data) return;

            const htmlContent = `
                <div class="swal-tech-content" style="text-align: left; font-family: 'Poppins', sans-serif;">
                    <div style="text-align: center; margin-bottom: 20px;">
                        <img src="${data.icon}" style="width: 80px; height: 80px; object-fit: contain; filter: drop-shadow(0 0 10px rgba(0, 242, 255, 0.2));" alt="${techName}">
                    </div>
                    <div style="margin-bottom: 15px;">
                        <h5 style="color: var(--neon-blue); font-weight: 600; margin-bottom: 5px; font-size: 1.1rem; display: flex; align-items: center; gap: 8px;"><i class="fas fa-info-circle"></i> Penjelasan Singkat</h5>
                        <p style="margin: 0; font-size: 0.9rem; line-height: 1.6; color: #c9d1d9;">${data.desc}</p>
                    </div>
                    <div style="margin-bottom: 15px;">
                        <h5 style="color: var(--neon-purple); font-weight: 600; margin-bottom: 5px; font-size: 1.1rem; display: flex; align-items: center; gap: 8px;"><i class="fas fa-history"></i> Sejarah Singkat</h5>
                        <p style="margin: 0; font-size: 0.9rem; line-height: 1.6; color: #c9d1d9;">${data.history}</p>
                    </div>
                    <div>
                        <h5 style="color: #58a6ff; font-weight: 600; margin-bottom: 5px; font-size: 1.1rem; display: flex; align-items: center; gap: 8px;"><i class="fas fa-laptop-code"></i> Kegunaan</h5>
                        <p style="margin: 0; font-size: 0.9rem; line-height: 1.6; color: #c9d1d9;">${data.uses}</p>
                    </div>
                </div>
            `;

            Swal.fire({
                title: `<span style="font-family: 'Poppins', sans-serif; font-weight: 800; font-size: 1.5rem; letter-spacing: 1px; color: #fff;">${techName}</span>`,
                html: htmlContent,
                showConfirmButton: true,
                confirmButtonText: 'Tutup',
                confirmButtonColor: '#6a11cb',
                background: '#161b22',
                color: '#fff',
                customClass: {
                    popup: 'swal2-popup',
                    confirmButton: 'swal2-confirm-button-custom'
                }
            });
        });
    });
}
