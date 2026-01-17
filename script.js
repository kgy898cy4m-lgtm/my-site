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
