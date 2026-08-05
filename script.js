const PASSWORD = "070826";

// =======================
// Canvas
// =======================

const canvas = document.getElementById("galaxy");
const ctx = canvas.getContext("2d");

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resize();
window.onresize = resize;


// =======================
// Tạo sao
// =======================

const stars = [];

for (let i = 0; i < 900; i++) {

    stars.push({

        x: Math.random() * canvas.width,

        y: Math.random() * canvas.height,

        r: Math.random() * 1.8 + 0.2,

        alpha: Math.random(),

        speed: Math.random() * 0.02 + 0.003,

        direction: Math.random() > 0.5 ? 1 : -1

    });

}


// =======================
// Sao băng
// =======================

const meteors = [];

setInterval(() => {

    meteors.push({

        x: Math.random() * canvas.width * 0.8,

        y: Math.random() * canvas.height * 0.3,

        speed: 12,

        length: 180,

        alpha: 1

    });

}, 3000);


// =======================
// Animation
// =======================

function animate() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);


    // Dải ngân hà

    const galaxy = ctx.createLinearGradient(

        0,
        canvas.height * 0.2,

        canvas.width,
        canvas.height * 0.8

    );

    galaxy.addColorStop(0, "rgba(80,120,255,0.03)");
    galaxy.addColorStop(0.5, "rgba(180,180,255,0.08)");
    galaxy.addColorStop(1, "rgba(80,120,255,0.03)");

    ctx.strokeStyle = galaxy;
    ctx.lineWidth = 180;

    ctx.beginPath();

    ctx.moveTo(-100, canvas.height * 0.3);

    ctx.lineTo(canvas.width + 100, canvas.height * 0.7);

    ctx.stroke();


    // Vẽ sao

    for (const star of stars) {

        star.alpha += star.speed * star.direction;

        if (star.alpha >= 1)
            star.direction = -1;

        if (star.alpha <= 0.15)
            star.direction = 1;

        ctx.beginPath();

        ctx.arc(
            star.x,
            star.y,
            star.r,
            0,
            Math.PI * 2
        );

        ctx.fillStyle = `rgba(255,255,255,${star.alpha})`;

        ctx.shadowBlur = 10;
        ctx.shadowColor = "#9fd6ff";

        ctx.fill();

    }


    // Vẽ sao băng

    for (let i = meteors.length - 1; i >= 0; i--) {

        const m = meteors[i];

        const gradient = ctx.createLinearGradient(

            m.x,
            m.y,

            m.x - m.length,
            m.y - m.length * 0.5

        );

        gradient.addColorStop(
            0,
            `rgba(255,255,255,${m.alpha})`
        );

        gradient.addColorStop(
            1,
            "rgba(255,255,255,0)"
        );

        ctx.strokeStyle = gradient;

        ctx.lineWidth = 2;

        ctx.beginPath();

        ctx.moveTo(m.x, m.y);

        ctx.lineTo(
            m.x - m.length,
            m.y - m.length * 0.5
        );

        ctx.stroke();

        m.x += m.speed;
        m.y += m.speed * 0.5;

        m.alpha -= 0.01;

        if (m.alpha <= 0)
            meteors.splice(i, 1);

    }

    requestAnimationFrame(animate);

}

animate();


// =======================
// Hiện / Ẩn mật khẩu
// =======================

const toggle = document.getElementById("toggle");
const password = document.getElementById("password");

toggle.onclick = () => {

    if (password.type == "password") {

        password.type = "text";
        toggle.textContent = "🙈";

    }

    else {

        password.type = "password";
        toggle.textContent = "👁";

    }

};


// =======================
// Unlock
// =======================

document
.getElementById("unlockBtn")
.onclick = () => {

    if (password.value == PASSWORD) {

        document
        .getElementById("success")
        .classList
        .add("show");

        setTimeout(() => {

            document.body.style.opacity = 0;

        }, 1500);

        setTimeout(() => {

            location.href = "happybirthday.html";

        }, 2500);

    }

    else {

        document
        .getElementById("message")
        .innerHTML = "❌ Sai mật khẩu.";

    }

};
