const input = document.getElementById("url-input");
const iframe = document.getElementById("proxy-frame");

input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    let url = input.value.trim();
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      url = "https://" + url; // Force HTTPS
    }

    const proxiedURL = `https://fallen-america.uraverageopdoge.workers.dev/?url=${encodeURIComponent(url)}`;
    iframe.src = proxiedURL;
  }
});
