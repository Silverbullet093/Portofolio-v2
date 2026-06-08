 // 1. Partikel
 particlesJS("particles-js", {
    "particles": {
        "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
        "color": { "value": "#ffffff" },
        "opacity": { "value": 0.3, "random": true },
        "size": { "value": 2, "random": true },
        "line_linked": { "enable": true, "distance": 150, "color": "#7b2ff7", "opacity": 0.2, "width": 1 },
        "move": { "enable": true, "speed": 1 }
    }
});

// 2. Scroll Reveal
const sr = ScrollReveal({ origin: 'bottom', distance: '60px', duration: 1200, reset: true });
sr.reveal('.profile-card', { delay: 100 });
sr.reveal('.about-container', { delay: 200 });
sr.reveal('.education-card', { interval: 200 });
sr.reveal('.fantasy-card', { interval: 200 });
sr.reveal('.tech-icons i', { interval: 100 });

// 3. Popup
function showPopup(src) {
    document.getElementById('popup').style.display = 'flex';
    document.getElementById('popup-img').src = src;
}
function closePopup() {
    document.getElementById('popup').style.display = 'none';
}

// 4. Magic Trail
document.addEventListener('mousemove', function(e) {
    let spark = document.createElement('div');
    spark.style.position = 'fixed';
    spark.style.left = e.clientX + 'px';
    spark.style.top = e.clientY + 'px';
    spark.style.width = '4px';
    spark.style.height = '4px';
    spark.style.backgroundColor = '#2bd2ff';
    spark.style.borderRadius = '50%';
    spark.style.pointerEvents = 'none';
    spark.style.zIndex = '9999';
    document.body.appendChild(spark);
    setTimeout(() => {
        spark.style.transition = '0.5s';
        spark.style.opacity = '0';
        spark.style.transform = 'scale(2)';
        setTimeout(() => spark.remove(), 500);
    }, 20);
});