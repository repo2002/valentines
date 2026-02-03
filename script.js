const MESSAGE = "Will you be my Valentine? Every day with you feels special 💕";
const SPEED = 55;

const messageEl = document.getElementById("message");
const yesBtn = document.getElementById("yes-btn");
const noBtn = document.getElementById("no-btn");
const success = document.getElementById("success");
const content = document.getElementById("content");
const musicBtn = document.getElementById("music-btn");
const audio = document.getElementById("bg-music");
const flowersEl = document.getElementById("flowers");

let index = 0;

// Typewriter
function type() {
    if (index < MESSAGE.length) {
        messageEl.textContent += MESSAGE[index++];
        setTimeout(type, SPEED);
    }
}
type();

// No button runs away
function moveNo() {
    noBtn.style.left = Math.random() * 80 + 10 + "%";
    noBtn.style.top = Math.random() * 80 + 10 + "%";
}
noBtn.addEventListener("mouseenter", moveNo);
noBtn.addEventListener("touchstart", moveNo);

// Yes button
yesBtn.addEventListener("click", () => {
    content.hidden = true;
    noBtn.hidden = true;
    success.hidden = false;
});

// Music
musicBtn.addEventListener("click", () => {
    audio.play();
    musicBtn.remove();
});

// Flowers
for (let i = 0; i < 12; i++) {
    const f = document.createElement("div");
    f.className = "flower";
    f.style.left = Math.random() * 90 + "%";
    f.style.top = Math.random() * 90 + "%";
    f.style.animationDuration = 6 + Math.random() * 4 + "s";
    f.innerHTML = `
        <svg width="36" height="36" viewBox="0 0 64 64">
            <ellipse cx="32" cy="28" rx="12" ry="14" fill="#e11d48"/>
            <circle cx="32" cy="32" r="4" fill="#7f1d1d"/>
        </svg>
    `;
    flowersEl.appendChild(f);
}
