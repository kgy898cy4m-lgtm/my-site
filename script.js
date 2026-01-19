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
  const menu = document.getElementById("menu");
  const overlay = document.getElementById("overlay");
  if (menu) menu.classList.add("open");
  if (overlay) overlay.classList.add("show");
}

function closeMenu() {
  const menu = document.getElementById("menu");
  const overlay = document.getElementById("overlay");
  if (menu) menu.classList.remove("open");
  if (overlay) overlay.classList.remove("show");
}

/*****************
 * SERVER ACTIVE
 *****************/
const servers = document.querySelectorAll(".service");
servers.forEach(s => {
  s.addEventListener("click", () => {
    servers.forEach(x => x.classList.remove("active"));
    s.classList.add("active");
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

if (micBtn) {
  micBtn.addEventListener("mousedown", startRecording);
  micBtn.addEventListener("mouseup", stopRecording);
  micBtn.addEventListener("mouseleave", stopRecording);

  micBtn.addEventListener("touchstart", startRecording, { passive: false });
  micBtn.addEventListener("touchend", stopRecording);
}

function startRecording(e) {
  e.preventDefault();
  if (isRecording) return;

  isRecording = true;
  seconds = 0;

  if (recordTime) recordTime.innerText = "0:00";
  if (recTimer) recTimer.classList.add("active");
  micBtn.classList.add("recording");

  timer = setInterval(() => {
    seconds++;
    if (recordTime) {
      recordTime.innerText = '0:${seconds < 10 ? "0" + seconds : seconds}';
    }
  }, 1000);
}
function stopRecording() {
  if (!isRecording) return;

  isRecording = false;
  clearInterval(timer);

  if (recTimer) recTimer.classList.remove("active");
  micBtn.classList.remove("recording");
  if (recordTime) recordTime.innerText = "0:00";
}
