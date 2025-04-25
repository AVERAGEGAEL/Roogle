const input = document.getElementById("url-input");
const iframe = document.getElementById("proxy-frame");

input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    let url = input.value.trim();
    if (!url.startsWith("http")) {
      url = "http://" + url;
    }

    // Encode URL and pass through Cloudflare Worker
    const proxiedURL = `https://fallen-america.uraverageopdoge.workers.dev/?url=${encodeURIComponent(url)}`;
    iframe.src = proxiedURL;
  }
});
