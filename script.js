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
<svg width="40" height="40" viewBox="0 0 64 64">
    <!-- Petals -->
    <ellipse cx="32" cy="16" rx="8" ry="14" fill="#fb7185"/>
    <ellipse cx="32" cy="48" rx="8" ry="14" fill="#fb7185"/>
    <ellipse cx="16" cy="32" rx="14" ry="8" fill="#f43f5e"/>
    <ellipse cx="48" cy="32" rx="14" ry="8" fill="#f43f5e"/>
    <ellipse cx="20" cy="20" rx="8" ry="12" fill="#e11d48" transform="rotate(-45 20 20)"/>
    <ellipse cx="44" cy="20" rx="8" ry="12" fill="#e11d48" transform="rotate(45 44 20)"/>
    <ellipse cx="20" cy="44" rx="8" ry="12" fill="#e11d48" transform="rotate(45 20 44)"/>
    <ellipse cx="44" cy="44" rx="8" ry="12" fill="#e11d48" transform="rotate(-45 44 44)"/>

    <!-- Center -->
    <circle cx="32" cy="32" r="6" fill="#7f1d1d"/>
</svg>
`;
  flowersEl.appendChild(f);
}
