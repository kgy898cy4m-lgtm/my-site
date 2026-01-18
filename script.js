let cart = 0;

function add() {
  cart++;
  document.getElementById("count").innerText = cart;
}

function openMenu() {
  document.getElementById("menu").classList.add("open");
  document.getElementById("overlay").classList.add("show");
}

function closeMenu() {
  document.getElementById("menu").classList.remove("open");
  document.getElementById("overlay").classList.remove("show");
}
const servers = document.querySelectorAll(".service");

servers.forEach(server => {
  server.addEventListener("click", () => {
    // oldingi active ni olib tashlaymiz
    servers.forEach(s => s.classList.remove("active"));

    // bosilganiga active qo‘shamiz
    server.classList.add("active");
  });
});
const micBtn = document.getElementById("micBtn");

let isRecording = false;

/* TELEFON (touch) */
micBtn.addEventListener("touchstart", startRecording);
micBtn.addEventListener("touchend", stopRecording);

/* BRAUZER (mouse) */
micBtn.addEventListener("mousedown", startRecording);
micBtn.addEventListener("mouseup", stopRecording);
micBtn.addEventListener("mouseleave", stopRecording);

function startRecording(e) {
  e.preventDefault();
  if (isRecording) return;

  isRecording = true;
  micBtn.classList.add("active");

  console.log("🎤 Yozish boshlandi");
}

function stopRecording() {
  if (!isRecording) return;

  isRecording = false;
  micBtn.classList.remove("active");

  console.log("🛑 Yozish to‘xtadi");
}
const micBtn = document.getElementById("micBtn");

let isRecording = false;

/* TELEFON (touch) */
micBtn.addEventListener("touchstart", startRecording);
micBtn.addEventListener("touchend", stopRecording);

/* BRAUZER (mouse) */
micBtn.addEventListener("mousedown", startRecording);
micBtn.addEventListener("mouseup", stopRecording);
micBtn.addEventListener("mouseleave", stopRecording);

function startRecording(e) {
  e.preventDefault();
  if (isRecording) return;

  isRecording = true;
  micBtn.classList.add("active");

  console.log("🎤 Yozish boshlandi");
}

function stopRecording() {
  if (!isRecording) return;

  isRecording = false;
  micBtn.classList.remove("active");

  console.log("🛑 Yozish to‘xtadi");
}

function haptic() {
  if (window.Telegram?.WebApp?.HapticFeedback) {
    Telegram.WebApp.HapticFeedback.impactOccurred('medium');
  }
}
function haptic() {
  if (window.Telegram?.WebApp?.HapticFeedback) {
    Telegram.WebApp.HapticFeedback.impactOccurred('medium');
  }
}
