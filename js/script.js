document.addEventListener("DOMContentLoaded", () => {
    // --- 初期状態で全ての詳細を非表示 ---
    const allTargets = new Set();
    [...document.querySelectorAll(".toggle-btn, .feature-btn, .feature-block, .yaku-btn")].forEach(btn => {
        const targetId = btn.getAttribute("data-target");
        if (targetId) {
            const el = document.getElementById(targetId);
            if (el) allTargets.add(el);
        }
    });

    allTargets.forEach(el => {
        el.style.display = "none";
        const vid = el.querySelector("video");
        if (vid) {
            vid.pause();
            vid.currentTime = 0;
        }
    });

    document.querySelectorAll(".detail").forEach(d => {
        d.style.display = "none";
        const vid = d.querySelector("video");
        if (vid) {
            vid.pause();
            vid.currentTime = 0;
        }
    });

    const toggleBtns    = document.querySelectorAll(".toggle-btn");
    const featureBtns   = document.querySelectorAll(".feature-btn");
    const featureBlocks = document.querySelectorAll(".feature-block");
    const yakuBtns      = document.querySelectorAll(".yaku-btn");

    const detailButtons = [
        ...toggleBtns,
        ...featureBtns,
        ...featureBlocks,
        ...yakuBtns
    ];

    detailButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const targetId = btn.getAttribute("data-target");
            const detail   = document.getElementById(targetId);

            document.querySelectorAll(".detail").forEach(d => {
                if (d !== detail) {
                    d.style.display = "none";
                    const otherVid = d.querySelector("video");
                    if (otherVid) {
                        otherVid.pause();
                        otherVid.currentTime = 0;
                    }
                }
            });

            if (detail.style.display === "block") {
                detail.style.display = "none";
                const thisVid = detail.querySelector("video");
                if (thisVid) thisVid.pause();
            } else {
                detail.style.display = "block";
                const thisVid = detail.querySelector("video");
                if (thisVid) {
                    thisVid.currentTime = 0;
                    thisVid.play();
                }
            }
        });
    });

    // --- フェードイン ---
    const faders = document.querySelectorAll(".fade-in");
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add("visible");
            else entry.target.classList.remove("visible");
        });
    }, { threshold: 0.2 });
    faders.forEach(el => observer.observe(el));

    // --- intro演出＆BGM＆ヘッダー表示 ---
    const intro = document.getElementById("intro");
    const enterButton = document.getElementById("enterButton");
    const bgm = document.getElementById("bgm");
    const header = document.querySelector("header");

    if (intro && enterButton) {
        enterButton.addEventListener("click", () => {
            bgm.play();
            document.getElementById("top").scrollIntoView({ behavior: "smooth" });
            intro.classList.add("fade-out");

            if (window.innerWidth <= 768 && header) {
                header.classList.add("active");
            }

            setTimeout(() => {
                intro.style.display = "none";
            }, 5000);
        });
    }

    // --- パーティクル背景 ---
    const canvas = document.getElementById("particles-canvas");
    if (canvas) {
        const ctx = canvas.getContext("2d");
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles = [];
        for (let i = 0; i < 100; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 2 + 1,
                dx: (Math.random() - 0.5) * 0.5,
                dy: Math.random() * 0.5 + 0.5,
            });
        }

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
                ctx.fill();
                p.x += p.dx;
                p.y += p.dy;

                if (p.y > canvas.height) {
                    p.y = -p.radius;
                    p.x = Math.random() * canvas.width;
                }
            });
            requestAnimationFrame(draw);
        }
        draw();
    }

    // --- プロ紹介カルーセル ---
    let currentIndex = 1;
    const track   = document.querySelector(".carousel-track");
    const cards   = document.querySelectorAll(".card");
    const prevBtn = document.getElementById("prev");
    const nextBtn = document.getElementById("next");

    const firstClone = cards[0].cloneNode(true);
    const lastClone  = cards[cards.length - 1].cloneNode(true);
    track.appendChild(firstClone);
    track.insertBefore(lastClone, cards[0]);
    const allCards = document.querySelectorAll(".card");

    function updateCarousel() {
        const isMobile = window.innerWidth <= 768;

        if (isMobile) {
            const cardWidth = allCards[0].offsetWidth;
            track.style.transform = `translateX(-${(currentIndex - 1) * cardWidth}px)`;
        } else {
            track.style.transform = `translateX(-${(currentIndex - 1) * 33.333}%)`;
        }

        allCards.forEach(card => card.classList.remove("active"));
        allCards[currentIndex].classList.add("active");
    }

    function nextSlide() {
        currentIndex++;
        if (currentIndex >= allCards.length - 1) {
            setTimeout(() => {
                track.style.transition = "none";
                currentIndex = 1;
                updateCarousel();
                setTimeout(() => { track.style.transition = "transform 0.5s ease"; }, 50);
            }, 500);
        }
        updateCarousel();
    }

    function prevSlide() {
        currentIndex--;
        if (currentIndex <= 0) {
            setTimeout(() => {
                track.style.transition = "none";
                currentIndex = allCards.length - 2;
                updateCarousel();
                setTimeout(() => { track.style.transition = "transform 0.5s ease"; }, 50);
            }, 500);
        }
        updateCarousel();
    }

    let autoSlide = setInterval(nextSlide, 4000);
    prevBtn.addEventListener("click", () => { prevSlide(); clearInterval(autoSlide); });
    nextBtn.addEventListener("click", () => { nextSlide(); clearInterval(autoSlide); });
    track.addEventListener("click", () => clearInterval(autoSlide));
    updateCarousel();

    // --- タイトルフェードアップ ---
    const title = document.querySelector(".main-title");
    if (title) {
        const text = title.textContent.trim();
        title.textContent = "";
        text.split("").forEach((char, index) => {
            const span = document.createElement("span");
            span.textContent = char;
            span.style.animationDelay = `${index * 0.1}s`;
            title.appendChild(span);
        });
        const totalTime = text.length * 0.1 + 1.5;
        setTimeout(() => { document.body.style.overflow = "auto"; }, totalTime * 1000);
    }

    // --- ミュートボタン ---
    const muteBtn = document.getElementById("muteButton");
    if (muteBtn && bgm) {
        muteBtn.addEventListener("click", () => {
            bgm.muted = !bgm.muted;
            muteBtn.textContent = bgm.muted ? "🔇" : "🔊";
        });
    }
});
