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
 * SERVER TUGMALARI
 *****************/
const servers = document.querySelectorAll(".service");
servers.forEach(btn => {
  btn.addEventListener("click", () => {
    servers.forEach(x => x.classList.remove("active"));
    btn.classList.add("active");
  });
});

/*****************
 * MICROPHONE + TIMER
 *****************/
const micBtn = document.getElementById("micBtn");
const recTimer = document.getElementById("recTimer");
const recordTime = document.getElementById("recordTime");

let isRecording = false;
let seconds = 0;
let timer = null;
let mediaRecorder = null;
let audioChunks = [];
let speechText = "";

/* EVENTS */
micBtn?.addEventListener("mousedown", startRecording);
micBtn?.addEventListener("mouseup", stopRecording);
micBtn?.addEventListener("mouseleave", stopRecording);

micBtn?.addEventListener("touchstart", startRecording, { passive: false });
micBtn?.addEventListener("touchend", stopRecording);

/*****************
 * START RECORD
 *****************/
async function startRecording(e) {
  e.preventDefault();
  if (isRecording) return;

  isRecording = true;
  seconds = 0;
  recordTime.innerText = "0:00";

  recTimer.classList.add("active");
  micBtn.classList.add("recording");

  // TIMER
  timer = setInterval(() => {
    seconds++;
    recordTime.innerText = 0:${seconds < 10 ? "0" + seconds : seconds};
  }, 1000);

  // AUDIO RECORD
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  mediaRecorder = new MediaRecorder(stream);
  audioChunks = [];

  mediaRecorder.ondataavailable = e => audioChunks.push(e.data);
  mediaRecorder.start();

  // SPEECH → TEXT
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (SR) {
    const recog = new SR();
    recog.lang = "uz-UZ";
    recog.onresult = e => {
      speechText = e.results[0][0].transcript.toLowerCase();
    };
    recog.start();
  }
}

/*****************
 * STOP RECORD
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
    // OVOZ BUYRUQLARI
    if (speechText.includes("fairy")) add();

    speechText = "";
  };
}
