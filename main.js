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

// 🔁 Fetch section content with loading/empty/fail states
function fetchSection(endpoint, containerId, itemLabel, emoji, formatterFn) {
  const box = document.getElementById(containerId);
  const loading = box.querySelector(".loading");
  const empty = box.querySelector(".empty");

  fetch(`https://forexintel-api.onrender.com/api/${endpoint}`)
    .then(res => res.json())
    .then(data => {
      loading.style.display = "none";
      if (!data || data.length === 0) {
        empty.style.display = "block";
        return;
      }

      data.forEach(item => {
        box.innerHTML += formatterFn(item, emoji, itemLabel);
      });
    })
    .catch(() => {
      loading.style.display = "none";
      empty.textContent = `❌ Failed to load ${itemLabel.toLowerCase()}s.`;
      empty.style.display = "block";
    });
}

// Custom render functions
const renderSignalOrChart = (item, emoji, label) => `
  <div class="card">
    <h3>${emoji} ${label} - ${item.time}</h3>
    <p>${item.content}</p>
  </div>
`;

const renderResource = (item) => `
  <div class="card">
    <h3>${item.icon} ${item.title}</h3>
    <p>${item.desc}</p>
    <p><a href="${item.link}" target="_blank" style="color: #00ffae;">Access</a></p>
  </div>
`;

// Load each section
fetchSection("signals", "signals", "Signal", "📢", renderSignalOrChart);
fetchSection("charts", "charts", "Chart", "📊", renderSignalOrChart);
fetchSection("resources", "resources", "Resource", "", renderResource);
