document.getElementById('proxyForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const urlInput = document.getElementById('url').value;
    const iframe = document.getElementById('proxyIframe');
    const iframeContainer = document.getElementById('iframe-container');

    if (urlInput) {
        const proxyUrl = `https://fallen-america.uraverageopdoge.workers.dev/?url=${encodeURIComponent(urlInput)}`;
        iframe.src = proxyUrl;
        iframeContainer.style.display = 'block';
    }
});
