document.getElementById("search-form").addEventListener("submit", function (event) {
  event.preventDefault();
  const urlInput = document.getElementById("url-input");
  const iframe = document.getElementById("proxy-iframe");
  const iframeContainer = document.getElementById("iframe-container");
  const spinner = document.getElementById("loading-spinner");
  let url = urlInput.value.trim();

  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    url = "https://" + url;
  }

  // Show loading spinner
  spinner.style.display = "block";
  iframe.style.display = "none";

  iframe.src = url;

  iframe.onload = () => {
    spinner.style.display = "none";
    iframe.style.display = "block";
  };

  const cloakOption = document.getElementById("cloak-slider").value;
  if (cloakOption) {
    const newWindow = window.open("about:blank", "_blank");
    const cloakHTML = `
      <html>
        <head>
          <title>${cloakOption}</title>
          <link rel="icon" href="${location.origin}/Google.png" />
        </head>
        <body style="margin:0;overflow:hidden">
          <iframe src="${url}" style="width:100vw;height:100vh;border:none;"></iframe>
        </body>
      </html>
    `;
    newWindow.document.write(cloakHTML);
    newWindow.document.close();
  }
});
