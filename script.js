/*****************
 * SAVAT
 *****************/
let cart = 0;
function add() {
  cart++;
  const count = document.getElementById("count");
  if (count) count.innerText = cart;
}

/*****************
 * BURGER MENU
 *****************/
function openMenu() {
  document.getElementById("menu")?.classList.add("open");
  document.getElementById("overlay")?.classList.add("show");
}
function closeMenu() {
  document.getElementById("menu")?.classList.remove("open");
  document.getElementById("overlay")?.classList.remove("show");
}

/*****************
 * SERVER + PRODUCTS
 *****************/
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".card").forEach(c => c.style.display = "none");

  document.querySelectorAll(".service").forEach(s => {
    s.addEventListener("click", () => {
      document.querySelectorAll(".service").forEach(x => x.classList.remove("active"));
      s.classList.add("active");

      const id = s.querySelector("b").innerText;
      document.querySelectorAll(".card").forEach(card => {
        card.style.display = card.dataset.server === id ? "block" : "none";
      });
    });
  });
});

/*****************
 * CHAT ELEMENTS
 *****************/
const chat = document.getElementById("chat");
const micBtn = document.getElementById("micBtn");
const recTimer = document.getElementById("recTimer");
const recordTime = document.getElementById("recordTime");
const textInput = document.getElementById("textInput");
const sendBtn = document.getElementById("sendBtn");

/*****************
 * TIME
 *****************/
function getTime() {
  const d = new Date();
  return (
    String(d.getHours()).padStart(2, "0") +
    ":" +
    String(d.getMinutes()).padStart(2, "0")
  );
}

/*****************
 * TEXT CHAT
 *****************/
textInput?.addEventListener("input", () => {
  sendBtn.classList.toggle("hidden", textInput.value.trim() === "");
});

sendBtn?.addEventListener("click", sendText);

textInput?.addEventListener("keydown", e => {
  if (e.key === "Enter") sendText();
});

function sendText() {
  const text = textInput.value.trim();
  if (!text) return;

  const msg = document.createElement("div");
  msg.className = "text-message telegram";
  msg.innerHTML = `
    <div class="bubble">
      ${text}
      <div class="meta">
        <span>${getTime()}</span>
        <span class="checks">✔✔</span>
      </div>
    </div>
  `;

  chat.appendChild(msg);
  limitChat();
  chat.scrollTop = chat.scrollHeight;

  textInput.value = "";
  sendBtn.classList.add("hidden");
}

/*****************
 * AUDIO RECORD
 *****************/
let isRecording = false;
let seconds = 0;
let timer = null;
let mediaRecorder = null;
let audioChunks = [];

micBtn?.addEventListener("mousedown", startRec);
micBtn?.addEventListener("mouseup", stopRec);
micBtn?.addEventListener("mouseleave", stopRec);

micBtn?.addEventListener("touchstart", startRec, { passive: false });
micBtn?.addEventListener("touchend", stopRec);

async function startRec(e) {
  e.preventDefault();
  if (isRecording) return;

  isRecording = true;
  seconds = 0;
  recordTime.innerText = "0:00";
  recTimer.classList.add("active");
  micBtn.classList.add("recording");

  timer = setInterval(() => {
    seconds++;
    recordTime.innerText = "0:" + (seconds < 10 ? "0" + seconds : seconds);
  }, 1000);

  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  mediaRecorder = new MediaRecorder(stream);
  audioChunks = [];

  mediaRecorder.ondataavailable = e => audioChunks.push(e.data);
  mediaRecorder.onstop = onRecordStop;
  mediaRecorder.start();
}

function stopRec() {
  if (!isRecording) return;

  isRecording = false;
  clearInterval(timer);
  recTimer.classList.remove("active");
  micBtn.classList.remove("recording");
  recordTime.innerText = "0:00";

  if (mediaRecorder && mediaRecorder.state !== "inactive") {
    mediaRecorder.stop();
  }
}

/*****************
 * AFTER AUDIO
 *****************/
function onRecordStop() {
  const blob = new Blob(audioChunks, { type: "audio/webm" });
  const url = URL.createObjectURL(blob);
const msg = document.createElement("div");
  msg.className = "voice-message telegram";
  msg.innerHTML = `
    <audio controls src="${url}"></audio>
    <div class="voice-meta">
      <span>${getTime()}</span>
      <span class="ticks">✓✓</span>
    </div>
  `;

  chat.appendChild(msg);
  limitChat();
  chat.scrollTop = chat.scrollHeight;
}

/*****************
 * CHAT LIMIT
 *****************/
function limitChat() {
  while (chat.children.length > 4) {
    chat.removeChild(chat.firstChild);
  }
}
