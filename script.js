function enableProxy() {
  document.getElementById('captchaContainer').classList.add('hidden');
  document.getElementById('proxyContainer').classList.remove('hidden');
}

function loadSite() {
  let url = document.getElementById('urlInput').value.trim();

  // Automatically prepend https:// if missing
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = 'https://' + url;
  }

  // Route through Cloudflare Worker
  const proxyUrl = `https://fallen-america.uraverageopdoge.workers.dev/?url=${encodeURIComponent(url)}`;

  const iframe = document.getElementById('proxyFrame');
  iframe.src = proxyUrl;

  // Update tab title
  document.title = "Google";

  // Wait for iframe to load and try replacing title (note: won’t work cross-domain)
  iframe.onload = () => {
    try {
      let title = iframe.contentDocument.querySelector('title');
      if (title) title.textContent = title.textContent.replace('G', 'R');
    } catch (e) {
      // Cross-domain iframe access is restricted
    }
  };
}
