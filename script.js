function loadSite() {
    let url = document.getElementById('urlInput').value;

    // Check if the user entered "example.com" without "https://"
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url;  // Add https:// if not included
    }

    // Update iframe src with the URL entered
    const iframe = document.getElementById('proxyFrame');
    iframe.src = url;

    // Update the title of the page to "Google"
    document.title = "Google";

    // Replace the text title of the website to "Roogle"
    iframe.onload = () => {
        let iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
        if (iframeDocument) {
            let title = iframeDocument.querySelector('title');
            if (title) {
                title.textContent = title.textContent.replace('G', 'R');  // Change title to "Roogle"
            }
        }
    };
}
