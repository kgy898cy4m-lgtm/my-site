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
let recognition;
let isRecording = false;

function startVoice() {
  if (!('webkitSpeechRecognition' in window)) {
    alert("Brauzer ovoz qidirishni qo‘llab-quvvatlamaydi");
    return;
  }

  if (!recognition) {
    recognition = new webkitSpeechRecognition();
    recognition.lang = 'uz-UZ';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      document.getElementById('searchInput').value = text;
      filterProducts(text);
    };

    recognition.onend = () => {
      stopRecording();
    };
  }

  if (!isRecording) {
    recognition.start();
    startRecording();
  }
}

function startRecording() {
  isRecording = true;
  document.querySelector('.mic-btn').classList.add('recording');
}

function stopRecording() {
  isRecording = false;
  document.querySelector('.mic-btn').classList.remove('recording');
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
