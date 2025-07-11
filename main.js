const tg = window.Telegram.WebApp;
tg.expand();

function showTab(id) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  event.target.classList.add('active');
}

// Fetch Signals
fetch("http://localhost:5000/api/signals")
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
fetch("http://localhost:5000/api/charts")
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
