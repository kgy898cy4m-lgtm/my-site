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
const micBtn = document.getElementById("micBtn");
const timerBox = document.getElementById("recTimer");
const timeText = document.getElementById("time");

let isRecording = false;
let seconds = 0;
let timerInterval = null;

/* START */
function startRecording(e) {
  e.preventDefault();
  if (isRecording) return;

  isRecording = true;
  seconds = 0;
  timeText.textContent = "0:00";
  timerBox.classList.add("active");

  timerInterval = setInterval(() => {
    seconds++;
    timeText.textContent = 0:${seconds < 10 ? "0" + seconds : seconds};
  }, 1000);

  console.log("🎤 Recording started");
}

/* STOP */
function stopRecording() {
  if (!isRecording) return;

  isRecording = false;
  clearInterval(timerInterval);
  timerInterval = null;

  timerBox.classList.remove("active");
  timeText.textContent = "0:00";

  console.log("🛑 Recording stopped");
}

/* TOUCH (mobile) */
micBtn.addEventListener("touchstart", startRecording);
micBtn.addEventListener("touchend", stopRecording);

/* MOUSE (desktop) */
micBtn.addEventListener("mousedown", startRecording);
micBtn.addEventListener("mouseup", stopRecording);
micBtn.addEventListener("mouseleave", stopRecording);


let cart=0;
function add(){cart++;document.getElementById("count").innerText=cart;}

const micBtn=document.getElementById("micBtn");
const recordBar=document.getElementById("recordBar");
const recordTime=document.getElementById("recordTime");
const chat=document.getElementById("chat");

let isRecording=false,seconds=0,timer,mediaRecorder,audioChunks=[],speechText="";

micBtn.addEventListener("mousedown",start);
micBtn.addEventListener("mouseup",stop);
micBtn.addEventListener("touchstart",start,{passive:false});
micBtn.addEventListener("touchend",stop);

async function start(e){
 e.preventDefault();
 if(isRecording)return;
 isRecording=true;seconds=0;recordTime.textContent="0:00";
 recordBar.classList.add("show");micBtn.classList.add("recording");
 timer=setInterval(()=>{seconds++;recordTime.textContent=`0:${seconds<10?"0"+seconds:seconds}`},1000);

 const stream=await navigator.mediaDevices.getUserMedia({audio:true});
 mediaRecorder=new MediaRecorder(stream);
 audioChunks=[];
 mediaRecorder.ondataavailable=e=>audioChunks.push(e.data);
 mediaRecorder.start();

 const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
 if(SR){
  const rec=new SR();
  rec.lang="uz-UZ";
  rec.onresult=e=>speechText=e.results[0][0].transcript.toLowerCase();
  rec.start();
 }
}

function stop(){
 if(!isRecording)return;
 isRecording=false;clearInterval(timer);
 recordBar.classList.remove("show");micBtn.classList.remove("recording");
 recordTime.textContent="0:00";
 mediaRecorder.stop();
 mediaRecorder.onstop=()=>{
  const blob=new Blob(audioChunks,{type:"audio/webm"});
  const url=URL.createObjectURL(blob);
  const msg=document.createElement("div");
  msg.className="voice-message";
  msg.innerHTML=`<audio controls src="${url}"></audio><div>${speechText||"Ovozli xabar"}</div>`;
  chat.appendChild(msg);
  if(speechText.includes("fairy")) add();
  speechText="";
 }
}

