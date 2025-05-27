document.getElementById('proxyForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let urlInput = document.getElementById('url').value.trim();
    const iframe = document.getElementById('proxyIframe');
    const iframeContainer = document.getElementById('iframe-container');
    const loadingSpinner = document.getElementById('loadingSpinner');

    if (!urlInput) {
        alert('Please enter a URL.');
        return;
    }

    if (!urlInput.startsWith('http://') && !urlInput.startsWith('https://')) {
        urlInput = 'https://' + urlInput;
    }

    const proxyUrl = `https://fallen-america.uraverageopdoge.workers.dev/?url=${encodeURIComponent(urlInput)}`;
    iframe.src = proxyUrl;

    loadingSpinner.style.display = 'block';

    iframe.onload = () => {
        loadingSpinner.style.display = 'none';
    };

    iframeContainer.style.display = 'block';
});

// Fullscreen toggle for iframe
document.getElementById('fullscreen-btn').addEventListener('click', () => {
  const iframe = document.getElementById('proxyIframe');
  if (!iframe) return alert('No iframe found.');

  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    iframe.requestFullscreen().catch(err => {
      alert('Fullscreen failed: ' + err.message);
    });
  }
});
