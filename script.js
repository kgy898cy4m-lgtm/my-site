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
 * SERVER ACTIVE
 *****************/
document.querySelectorAll(".service").forEach(server => {
  server.addEventListener("click", () => {
    document
      .querySelectorAll(".service")
      .forEach(s => s.classList.remove("active"));
    server.classList.add("active");
  });
});

/*****************
 * MICROPHONE + TIMER + AUDIO + SPEECH
 *****************/
const micBtn = document.getElementById("micBtn");
const recTimer = document.getElementById("recTimer");
const recordTime = document.getElementById("recordTime");
const chat = document.getElementById("chat");

let isRecording = false;
let seconds = 0;
let timer = null;

let mediaRecorder = null;
let audioChunks = [];

let recognition = null;
let speechText = "";

/* INIT SPEECH */
(function initSpeech() {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) return;

  recognition = new SR();
  recognition.lang = "uz-UZ";
  recognition.continuous = false;

  recognition.onresult = e => {
    speechText = e.results[0][0].transcript.toLowerCase();
    handleVoiceCommand(speechText);
  };
})();

/* EVENTS */
if (micBtn) {
  micBtn.addEventListener("mousedown", startRecording);
  micBtn.addEventListener("mouseup", stopRecording);
  micBtn.addEventListener("mouseleave", stopRecording);

  micBtn.addEventListener("touchstart", startRecording, { passive: false });
  micBtn.addEventListener("touchend", stopRecording);
}

/*****************
 * START RECORDING
 *****************/
async function startRecording(e) {
  e.preventDefault();
  if (isRecording) return;

  isRecording = true;
  seconds = 0;
  speechText = "";

  recordTime.innerText = "0:00";
  recTimer.classList.add("active");
  micBtn.classList.add("recording");

  // TIMER
  timer = setInterval(() => {
    seconds++;
    recordTime.innerText =
      "0:" + (seconds < 10 ? "0" + seconds : seconds);
  }, 1000);

  // AUDIO
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  mediaRecorder = new MediaRecorder(stream);
  audioChunks = [];

  mediaRecorder.ondataavailable = e => audioChunks.push(e.data);
  mediaRecorder.onstop = onRecordStop;
  mediaRecorder.start();
}

/*****************
 * STOP RECORDING
 *****************/
function stopRecording() {
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
 * AFTER RECORD
 *****************/
function onRecordStop() {
  const blob = new Blob(audioChunks, { type: "audio/webm" });
  const url = URL.createObjectURL(blob);

  if (chat) {
    const msg = document.createElement("div");
    msg.className = "voice-message";
    msg.innerHTML = `
      <audio controls src="${url}"></audio>
      <div class="voice-text">${speechText || "🎤 Ovozli xabar"}</div>
    `;
    chat.appendChild(msg);
    chat.scrollTop = chat.scrollHeight;
  }

  speechText = "";
}

/*****************
 * VOICE COMMANDS
 *****************/
function handleVoiceCommand(text) {
  console.log("🎤 Ovoz:", text);

  if (text.includes("fairy")) {
    add();
  }

  filterProducts(text);
}

/*****************
 * PRODUCT FILTER
 *****************/
function filterProducts(word) {
  document.querySelectorAll(".card").forEach(card => {
    const name = card.dataset.name || "";
    card.style.display = name.
includes(word) ? "block" : "none";
  });
}
