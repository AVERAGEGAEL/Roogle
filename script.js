const input = document.getElementById("url-input");
const iframe = document.getElementById("proxy-frame");
const goBtn = document.getElementById("go-btn");

function loadSite() {
  let url = input.value.trim();
  if (!url) return;

  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    url = "https://" + url;
  }

  const proxiedURL = `https://fallen-america.uraverageopdoge.workers.dev/?url=${encodeURIComponent(url)}`;
  iframe.src = proxiedURL;
}

input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    loadSite();
  }
});

goBtn.addEventListener("click", loadSite);
