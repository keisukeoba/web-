document.addEventListener("DOMContentLoaded", () => {
    // -------------------------
    // 1. 詳細を切り替える（.feature-block / .toggle-btn 両方対応）
    // -------------------------
    const buttons = document.querySelectorAll(
        ".toggle-btn, .feature-btn, .feature-block"
    );

    buttons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const targetId = btn.getAttribute("data-target");
            const detail = document.getElementById(targetId);

            document.querySelectorAll(".detail").forEach((d) => {
                if (d !== detail) d.style.display = "none";
            });

            detail.style.display =
                detail.style.display === "block" ? "none" : "block";
        });
    });

    // -------------------------
    // 2. フェードイン表示（.fade-in要素）
    // -------------------------
    const faders = document.querySelectorAll(".fade-in");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                } else {
                    entry.target.classList.remove("visible");
                }
            });
        },
        {
            threshold: 0.2,
        }
    );

    faders.forEach((el) => observer.observe(el));

    // -------------------------
    // 3. introセクションからトップへ移動＆bgm
    // -------------------------
    const intro = document.getElementById("intro");
    const enterButton = document.getElementById("enterButton");
    const bgm = document.getElementById("bgm");

    if (intro && enterButton) {
        enterButton.addEventListener("click", () => {
            bgm.play();
            document
                .getElementById("top")
                .scrollIntoView({ behavior: "smooth" });
            intro.classList.add("fade-out");
            setTimeout(() => {
                intro.style.display = "none";
            }, 5000);
        });
    }

    // -------------------------
    // 4. 背景のパーティクルアニメーション
    // -------------------------
    const canvas = document.getElementById("particles-canvas");
    if (canvas) {
        const ctx = canvas.getContext("2d");
        canvas.width = window.innerWidth;
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
            particles.forEach((p) => {
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
});
