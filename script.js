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
 * SERVER TANLASH
 *****************/
document.querySelectorAll(".service").forEach(s => {
  s.addEventListener("click", () => {
    document.querySelectorAll(".service")
      .forEach(x => x.classList.remove("active"));
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

  recordTime.innerText = "0:00";
  recTimer.classList.add("active");
  micBtn.classList.add("recording");

  timer = setInterval(() => {
    seconds++;
    recordTime.innerText = 0:${seconds < 10 ? "0" + seconds : seconds};
  }, 1000);
}

function stopRecording() {
  if (!isRecording) return;

  isRecording = false;
  clearInterval(timer);

  recTimer.classList.remove("active");
  micBtn.classList.remove("recording");
  recordTime.innerText = "0:00";
}
