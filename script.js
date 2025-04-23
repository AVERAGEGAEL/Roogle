document.addEventListener("DOMContentLoaded", function() {
    const iframe = document.getElementById('proxyIframe');
    const loadingScreen = document.getElementById('loadingScreen');
    const mainContent = document.getElementById('mainContent');
    const predictedTime = document.getElementById('time');

    let startTime = Date.now();

    iframe.onload = function() {
        const loadTime = (Date.now() - startTime) / 1000;
        predictedTime.innerText = `${loadTime.toFixed(2)} seconds`;
        loadingScreen.style.display = 'none';
        mainContent.style.display = 'block';
    };

    // Simulate loading time for display purposes
    setTimeout(function() {
        const loadTime = (Date.now() - startTime) / 1000;
        predictedTime.innerText = `${loadTime.toFixed(2)} seconds`;
    }, 3000); // Assuming loading time (adjust as necessary)

    // Function to change iframe URL if needed
    function changeIframeUrl(url) {
        iframe.src = url;
        loadingScreen.style.display = 'flex';
        mainContent.style.display = 'none';
        startTime = Date.now();
    }

    // Example usage:
    // changeIframeUrl("https://www.youtube.com");
});
