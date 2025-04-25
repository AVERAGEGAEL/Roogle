document.getElementById('proxyForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const url = document.getElementById('url').value;
    const recaptchaResponse = grecaptcha.getResponse(); // Get reCAPTCHA response token
    const iframe = document.getElementById('proxyIframe');
    const iframeContainer = document.getElementById('iframe-container');
    
    if (!recaptchaResponse) {
        alert("Please complete the reCAPTCHA.");
        return;
    }

    if (url) {
        const proxyUrl = `https://fallen-america.uraverageopdoge.workers.dev/?url=${encodeURIComponent(url)}&recaptchaResponse=${recaptchaResponse}`;
        iframe.src = proxyUrl;
        iframeContainer.style.display = 'block';
    }
});
