const tg = window.Telegram.WebApp;
tg.expand(); // Expand the app to full height

const user = tg.initDataUnsafe?.user;
if (user) {
  document.getElementById("username").textContent = user.first_name;
}

function showSignal() {
  document.getElementById("content").innerHTML = `
    <h3>📈 Live Signals</h3>
    <ul>
      <li>EUR/USD Buy @ 1.0950</li>
      <li>GBP/JPY Sell @ 162.80</li>
    </ul>
  `;
}

function showVault() {
  document.getElementById("content").innerHTML = `
    <h3>🔒 VIP Vault</h3>
    <p>Access premium insights, strategies, and signal archives.</p>
  `;
}

function showResources() {
  document.getElementById("content").innerHTML = `
    <h3>📚 Resources</h3>
    <ul>
      <li>📘 PDF Guides</li>
      <li>🎥 Strategy Videos</li>
      <li>🧠 FX GPT</li>
    </ul>
  `;
}
