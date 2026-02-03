const MESSAGE =
  "Will you be my Valentine? I really like spending time with you.";
const SPEED = 55;

const messageEl = document.getElementById("message");
const yesBtn = document.getElementById("yes-btn");
const noBtn = document.getElementById("no-btn");
const success = document.getElementById("success");
const content = document.getElementById("content");
const audio = document.getElementById("bg-music");
const clapsAudio = document.getElementById("claps");
const flowersEl = document.getElementById("flowers");
const tapOverlay = document.getElementById("tap-overlay");

let index = 0;
let typewriterStarted = false;

// Typewriter
function type() {
  if (index < MESSAGE.length) {
    messageEl.textContent += MESSAGE[index++];
    setTimeout(type, SPEED);
  }
}

// Start music and content on first tap (browsers require user gesture for audio)
function startExperience() {
  if (typewriterStarted) return;
  typewriterStarted = true;
  audio.play().catch(() => {});
  tapOverlay.classList.add("hidden");
  setTimeout(() => tapOverlay.remove(), 500);
  type();
}

tapOverlay.addEventListener("click", startExperience);
tapOverlay.addEventListener("touchstart", startExperience, { passive: true });

// No button runs away (only to edges, never on the text)
function moveNo() {
  noBtn.classList.add("runaway");
  const { left, top } = randomOutsideCenter();
  noBtn.style.left = left + "%";
  noBtn.style.top = top + "%";
}
noBtn.addEventListener("mouseenter", moveNo);
noBtn.addEventListener("touchstart", moveNo);

// Yes button: loading screen with flowers in a circle for 2s, then acceptance screen
const LOADING_DURATION = 2000;
const loadingOverlay = document.getElementById("loading-overlay");
const centerX = 50;
const centerY = 50;
const circleRadius = 32;

yesBtn.addEventListener("click", () => {
  clapsAudio.play();
  noBtn.hidden = true;
  yesBtn.hidden = true;
  content.hidden = true;
  loadingOverlay.hidden = false;
  content.parentElement.classList.add("loading");

  const flowers = Array.from(flowersEl.querySelectorAll(".flower"));
  const n = flowers.length;

  flowers.forEach((flower, i) => {
    flower.classList.add("forming-circle");
    const angle = (i / n) * 2 * Math.PI - Math.PI / 2;
    flower.style.left = centerX + circleRadius * Math.cos(angle) + "%";
    flower.style.top = centerY + circleRadius * Math.sin(angle) + "%";
  });

  setTimeout(() => {
    loadingOverlay.hidden = true;
    content.parentElement.classList.remove("loading");
    success.hidden = false;
  }, LOADING_DURATION);
});

// Flowers - place only outside center so they don't cover the text
function randomOutsideCenter() {
  const centerMin = 25;
  const centerMax = 65;
  let left, top;
  do {
    left = Math.random() * 90 + 5;
    top = Math.random() * 90 + 5;
    // Keep flowers in the "frame": outside the center box
    const inCenterX = left >= centerMin && left <= centerMax;
    const inCenterY = top >= centerMin && top <= centerMax;
    if (!inCenterX || !inCenterY) break;
  } while (true);
  return { left, top };
}

for (let i = 0; i < 12; i++) {
  const { left, top } = randomOutsideCenter();
  const f = document.createElement("div");
  f.className = "flower";
  f.style.left = left + "%";
  f.style.top = top + "%";
  f.style.animationDuration = 14 + Math.random() * 6 + "s";
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
