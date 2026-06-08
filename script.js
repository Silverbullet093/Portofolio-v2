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
        demo: 'gesture/gesture.html'
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
        demo: '#'
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
    document.getElementById('lightbox-img').src = imgSrc;
    document.getElementById('lightbox').style.display = 'flex';
}
function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
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
    // 1. Lightbox
    const closeLightboxBtn = document.getElementById('close-lightbox-btn');
    if (closeLightboxBtn) {
        closeLightboxBtn.addEventListener('click', closeLightbox);
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
});
