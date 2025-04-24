document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".toggle-btn");

    buttons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const targetId = btn.getAttribute("data-target");
            const detail = document.getElementById(targetId);
            if (detail.style.display === "block") {
                detail.style.display = "none";
            } else {
                detail.style.display = "block";
            }
        });
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const faders = document.querySelectorAll(".fade-in");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                }
            });
        },
        { threshold: 0.1 }
    );

    faders.forEach((el) => observer.observe(el));
});
document.addEventListener("DOMContentLoaded", () => {
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
});

document.addEventListener("DOMContentLoaded", () => {
    const intro = document.getElementById("intro");
    const button = document.getElementById("enterButton");
    const bgm = document.getElementById("bgm");

    button.addEventListener("click", () => {
        bgm.play();

        // トップへスムーススクロール
        document.getElementById("top").scrollIntoView({ behavior: "smooth" });

        // フェードアウト開始
        intro.classList.add("fade-out");

        // 完全に消すのは2秒後
        setTimeout(() => {
            intro.style.display = "none";
        }, 5000);
    });
});

const canvas = document.getElementById("particles-canvas");
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

        // 下に抜けたら上から再スタート
        if (p.y > canvas.height) {
            p.y = -p.radius;
            p.x = Math.random() * canvas.width;
        }
    });
    requestAnimationFrame(draw);
}
draw();
