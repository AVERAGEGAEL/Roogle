const form = document.getElementById("proxy-form");
const input = document.getElementById("url-input");
const iframe = document.getElementById("proxy-frame");
const loadingScreen = document.getElementById("loading-screen");
const countdownEl = document.getElementById("countdown");

const cloaks = ["Google Docs", "Classroom", "Clever"];
let cloakIndex = 0;

function changeCloak(next) {
  cloakIndex = (cloakIndex + (next === "Classroom" ? 1 : -1) + cloaks.length) % cloaks.length;
  document.getElementById("cloak-display").textContent = cloaks[cloakIndex];
  document.title = "Google"; // Keeps tab title consistent
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const url = input.value.trim();

  if (!url) return;

  let targetUrl = url.startsWith("http") ? url : "https://" + url;
  let proxyUrl = `https://fallen-america.uraverageopdoge.workers.dev/?url=${encodeURIComponent(targetUrl)}`;

  // Show loading screen
  loadingScreen.classList.remove("hidden");
  iframe.classList.add("hidden");

  let time = 3;
  countdownEl.textContent = time;

  let countdown = setInterval(() => {
    time--;
    countdownEl.textContent = time;
    if (time <= 0) {
      clearInterval(countdown);
      loadingScreen.classList.add("hidden");
      iframe.src = proxyUrl;
      iframe.classList.remove("hidden");
    }
  }, 1000);
});
