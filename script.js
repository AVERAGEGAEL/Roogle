document.getElementById('proxyForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const url = document.getElementById('url').value;
    const iframe = document.getElementById('proxyIframe');
    const iframeContainer = document.getElementById('iframe-container');
    
    if (url) {
        const proxyUrl = `https://fallen-america.uraverageopdoge.workers.dev/?url=${encodeURIComponent(url)}`;
        iframe.src = proxyUrl;
        iframeContainer.style.display = 'block';
    }
});
