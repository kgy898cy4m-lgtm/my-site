const button = document.getElementById("btn");
const text = document.getElementById("text");

button.addEventListener("click", function () {
  text.textContent = "🎉 Tugma bosildi!";
});
button.addEventListener("click", function () {
  document.body.style.background = "#d1f7c4";
});
let count = 0;

button.addEventListener("click", function () {
  count++;
  document.getElementById("count").textContent = count;
});
