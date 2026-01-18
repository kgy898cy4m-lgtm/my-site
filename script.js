/* ================= CART ================= */
let cart = 0;
function add() {
  cart++;
  document.getElementById("count").innerText = cart;
}

/* ================= ELEMENTS ================= */
const micBtn = document.getElementById("micBtn");
const recordBar = document.getElementById("recTimer"); // CSS/HTML bilan mos
const recordTime = document.getElementById("recordTime");
const chat = document.getElementById("chat");

/* ================= STATE ================= */
let isRecording = false;
let seconds = 0;
let timer = null;

let mediaRecorder = null;
let audioChunks = [];

let speechRec = null;
let speechText = "";

/* ================= START RECORD ================= */
async function startRecording(e) {
  e.preventDefault();
  if (isRecording) return;

  isRecording = true;
  seconds = 0;
  recordTime.textContent = "0:00";

  micBtn.classList.add("recording");
  recordBar.classList.add("active");

  /* TIMER */
  timer = setInterval(() => {
    seconds++;
    recordTime.textContent = 0:${seconds < 10 ? "0" + seconds : seconds};
  }, 1000);

  /* AUDIO RECORD */
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  mediaRecorder = new MediaRecorder(stream);
  audioChunks = [];

  mediaRecorder.ondataavailable = e => audioChunks.push(e.data);
  mediaRecorder.start();

  /* SPEECH TO TEXT */
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (SR) {
    speechRec = new SR();
    speechRec.lang = "uz-UZ";
    speechRec.onresult = e => {
      speechText = e.results[0][0].transcript.toLowerCase();
    };
    speechRec.start();
  }
}

/* ================= STOP RECORD ================= */
function stopRecording() {
  if (!isRecording) return;

  isRecording = false;
  clearInterval(timer);
  timer = null;

  micBtn.classList.remove("recording");
  recordBar.classList.remove("active");
  recordTime.textContent = "0:00";

  if (speechRec) {
    speechRec.stop();
    speechRec = null;
  }

  mediaRecorder.stop();

  mediaRecorder.onstop = () => {
    const blob = new Blob(audioChunks, { type: "audio/webm" });
    const url = URL.createObjectURL(blob);

    const msg = document.createElement("div");
    msg.className = "voice-message";
    msg.innerHTML = `
      <audio controls src="${url}"></audio>
      <div class="voice-text">${speechText || "Ovozli xabar"}</div>
    `;

    chat.appendChild(msg);
    chat.scrollTop = chat.scrollHeight;

    if (speechText.includes("fairy")) {
      add();
    }

    speechText = "";
  };
}

/* ================= EVENTS ================= */
/* Mobile */
micBtn.addEventListener("touchstart", startRecording, { passive: false });
micBtn.addEventListener("touchend", stopRecording);

/* Desktop */
micBtn.addEventListener("mousedown", startRecording);
micBtn.addEventListener("mouseup", stopRecording);
micBtn.addEventListener("mouseleave", stopRecording);
