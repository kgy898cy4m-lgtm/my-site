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
 * MICROPHONE
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
let speechText = "";

/* EVENTS */
micBtn.addEventListener("mousedown", startRecording);
micBtn.addEventListener("mouseup", stopRecording);
micBtn.addEventListener("mouseleave", stopRecording);

micBtn.addEventListener("touchstart", startRecording, { passive: false });
micBtn.addEventListener("touchend", stopRecording);

/*****************
 * START
 *****************/
async function startRecording(e) {
  e.preventDefault();
  if (isRecording) return;

  isRecording = true;
  seconds = 0;
  recordTime.innerText = "0:00";
  recTimer.classList.add("active");
  micBtn.classList.add("recording");

  timer = setInterval(() => {
    seconds++;
    recordTime.innerText = 0:${seconds < 10 ? "0" + seconds : seconds};
  }, 1000);

  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  mediaRecorder = new MediaRecorder(stream);
  audioChunks = [];

  mediaRecorder.ondataavailable = e => audioChunks.push(e.data);
  mediaRecorder.start();

  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (SR) {
    const rec = new SR();
    rec.lang = "uz-UZ";
    rec.onresult = e => {
      speechText = e.results[0][0].transcript.toLowerCase();
    };
    rec.start();
  }
}

/*****************
 * STOP
 *****************/
function stopRecording() {
  if (!isRecording) return;

  isRecording = false;
  clearInterval(timer);

  recTimer.classList.remove("active");
  micBtn.classList.remove("recording");
  recordTime.innerText = "0:00";

  if (!mediaRecorder) return;

  mediaRecorder.stop();
  mediaRecorder.onstop = () => {
    const blob = new Blob(audioChunks, { type: "audio/webm" });
    const url = URL.createObjectURL(blob);

    showVoiceMessage(url, speechText);

    if (speechText.includes("fairy")) add();
    speechText = "";
  };
}

/*****************
 * CHAT
 *****************/
function showVoiceMessage(audioUrl, text) {
  if (!chat) return;

  const msg = document.createElement("div");
  msg.className = "voice-message";
  msg.innerHTML = `
    <audio controls src="${audioUrl}"></audio>
    <div>${text || "🎤 Ovozli xabar"}</div>
  `;
  chat.appendChild(msg);
}
