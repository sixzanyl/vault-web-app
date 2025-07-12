const tg = window.Telegram?.WebApp;
let currentUser = null;

if (tg) {
  tg.expand();
  currentUser = tg.initDataUnsafe?.user;
}

// 🔐 Gatekeeper logic
if (currentUser?.username) {
  fetch(`https://forexintel-api.onrender.com/api/verify/${currentUser.username}`)
    .then(res => res.json())
    .then(data => {
      if (data.status === "approved") {
        initVault(); // user allowed in
      } else {
        denyAccess();
      }
    })
    .catch(() => denyAccess());
} else {
  denyAccess();
}

// ⛔ Deny entry if not allowed
function denyAccess() {
  document.body.innerHTML = `
    <div style="padding: 30px; text-align: center; font-size: 18px; color: #f55;">
      ⛔ You are not authorized to access this vault.<br><br>
      Please <a href="https://t.me/Sixzanil" style="color: #00ffae;">contact admin</a> for access.
    </div>
  `;
}

// ✅ Unlock full vault
function initVault() {
  if (currentUser && document.getElementById("username")) {
    document.getElementById("username").textContent = currentUser.first_name;
  }

  // Safe tab switching
  window.showTab = function (id) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    event.currentTarget.classList.add('active');
  };

  // 🔁 Load vault data
  loadVaultContent();
}

// ♻️ Main vault loader
function loadVaultContent() {
  fetchSection("signals", "signals", "Signal", "📢", renderSignalOrChart);
  fetchSection("charts", "charts", "Chart", "📊", renderSignalOrChart);
  fetchSection("resources", "resources", "Resource", "", renderResource);
}

// 🔁 Section loader
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

// 🎨 Renderers
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
