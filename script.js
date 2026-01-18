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
let isRecording = false;
let recordSeconds = 0;
let timerInterval = null;
let mediaRecorder;
let audioChunks = [];

/* ELEMENTS */
const micBtn = document.getElementById("micBtn");
const recordBar = document.getElementById("recordBar");
const recordTime = document.getElementById("recordTime");
const chat = document.getElementById("chat");

/* EVENTS */
micBtn.addEventListener("touchstart", startRecording, { passive: false });
micBtn.addEventListener("touchend", stopRecording);
micBtn.addEventListener("mousedown", startRecording);
micBtn.addEventListener("mouseup", stopRecording);
micBtn.addEventListener("mouseleave", stopRecording);

/* START */
async function startRecording(e) {
  e.preventDefault();
  if (isRecording) return;

  isRecording = true;
  recordSeconds = 0;
  recordTime.textContent = "0:00";
  recordBar.classList.add("show");
  micBtn.classList.add("active");

  /* TIMER */
  timerInterval = setInterval(() => {
    recordSeconds++;
    const min = Math.floor(recordSeconds / 60);
    const sec = recordSeconds % 60;
    recordTime.textContent = `${min}:${sec < 10 ? "0" + sec : sec}`;
  }, 1000);

  /* AUDIO RECORD */
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  mediaRecorder = new MediaRecorder(stream);
  audioChunks = [];

  mediaRecorder.ondataavailable = e => audioChunks.push(e.data);
  mediaRecorder.start();

  startSpeech(); // 🧠 textga aylantirish
}

/* STOP */
function stopRecording() {
  if (!isRecording) return;

  isRecording = false;
  clearInterval(timerInterval);
  timerInterval = null;

  recordBar.classList.remove("show");
  recordTime.textContent = "0:00";
  micBtn.classList.remove("active");

  mediaRecorder.stop();

  mediaRecorder.onstop = () => {
    const audioBlob = new Blob(audioChunks, { type: "audio/webm" });
    const audioUrl = URL.createObjectURL(audioBlob);

    showVoiceMessage(audioUrl, lastSpeechText);
  };
}

/* CHAT MESSAGE */
function showVoiceMessage(audioUrl, text) {
  const msg = document.createElement("div");
  msg.className = "voice-message";

  msg.innerHTML = `
    <audio controls src="${audioUrl}"></audio>
    <div class="voice-text">${text || "🎤 Ovozli xabar"}</div>
  `;

  chat.appendChild(msg);
  chat.scrollTop = chat.scrollHeight;
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
