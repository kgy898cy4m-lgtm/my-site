let cart = 0;

function add() {
  cart++;
  document.getElementById("count").innerText = cart;
}
function getLocation() {
  if (!navigator.geolocation) {
    document.getElementById("location").innerText =
      "Brauzer lokatsiyani qo‘llab-quvvatlamaydi";
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      document.getElementById("location").innerText =
        📍 Latitude: ${lat}, Longitude: ${lon};
    },
    () => {
      document.getElementById("location").innerText =
        "❌ Lokatsiyaga ruxsat berilmadi";
    }
  );
}
function openMenu() {
  document.getElementById("menu").classList.toggle("open");
}

function closeMenu() {
  document.getElementById('menu').classList.remove('open');
}
