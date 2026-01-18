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
function startVoice() {
  if (!('webkitSpeechRecognition' in window)) {
    alert("Brauzer ovozli qidirishni qo‘llab-quvvatlamaydi");
    return;
  }

  const recognition = new webkitSpeechRecognition();
  recognition.lang = "uz-UZ"; // rus bo‘lsa: ru-RU
  recognition.start();

  recognition.onresult = function (event) {
    const text = event.results[0][0].transcript;
    document.getElementById("searchInput").value = text;
  };

  recognition.onerror = function () {
    alert("Ovoz aniqlanmadi");
  };
}

  recognition.onerror = function () {
    alert("Ovoz aniqlanmadi");
  };
}
