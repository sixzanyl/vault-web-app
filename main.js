const tg = window.Telegram?.WebApp;
if (tg) {
  tg.expand();
  const user = tg.initDataUnsafe?.user;
  if (user && document.getElementById("username")) {
    document.getElementById("username").textContent = user.first_name;
  }
}

// Safe tab switching
function showTab(id) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  event.currentTarget.classList.add('active');
}

// Fetch Signals
fetch("https://forexintel-api.onrender.com/api/signals")
  .then(res => res.json())
  .then(data => {
    const box = document.getElementById("signals");
    data.forEach(item => {
      box.innerHTML += `
        <div class="card">
          <h3>📢 Signal - ${item.time}</h3>
          <p>${item.content}</p>
        </div>`;
    });
  });

// Fetch Charts
fetch("https://forexintel-api.onrender.com/api/charts")
  .then(res => res.json())
  .then(data => {
    const box = document.getElementById("charts");
    data.forEach(item => {
      box.innerHTML += `
        <div class="card">
          <h3>📊 Chart - ${item.time}</h3>
          <p>${item.content}</p>
        </div>`;
    });
  });

// 🔥 Fetch Resources (New)
fetch("https://forexintel-api.onrender.com/api/resources")
  .then(res => res.json())
  .then(data => {
    const box = document.getElementById("resources");
    data.forEach(item => {
      box.innerHTML += `
        <div class="card">
          <h3>${item.icon} ${item.title}</h3>
          <p>${item.desc}</p>
          <p><a href="${item.link}" target="_blank" style="color: #00ffae;">Access</a></p>
        </div>`;
    });
  });
