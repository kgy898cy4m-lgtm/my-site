.burger {
  font-size: 24px;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 2001;        /* MUHIM */
  position: relative;  /* MUHIM */
}
/* KURSOR BORGANDA */
.burger:hover {
  transform: scale(1.15) rotate(-5deg);
}
.burger:hover {
  transform: scale(1.15) translateY(-2px);
}
.burger:active {
  transform: scale(0.95);
}
let cart = 0;

/* Savatga qo‘shish */
function add() {
  cart++;
  document.getElementById("count").innerText = cart;
}

/* Lokatsiya olish */
function getLocation() {
  const el = document.getElementById("location");

  if (!navigator.geolocation) {
    el.innerText = "Brauzer lokatsiyani qo‘llab-quvvatlamaydi";
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude.toFixed(5);
      const lon = position.coords.longitude.toFixed(5);

      el.innerText = 📍 Latitude: ${lat}, Longitude: ${lon};
    },
    () => {
      el.innerText = "❌ Lokatsiyaga ruxsat berilmadi";
    }
  );
}

/* Burger menu */
function openMenu() {
  document.getElementById("menu").classList.toggle("open");
}

function closeMenu() {
  document.getElementById("menu").classList.remove("open");
}
