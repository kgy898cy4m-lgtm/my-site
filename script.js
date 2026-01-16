let cart = 0;

function add() {
  cart++;
  document.getElementById("count").innerText = cart;
}

function openMenu() {
  document.getElementById("menu").classList.toggle("open");
}
