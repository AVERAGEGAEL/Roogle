let cloakTitle = null;

function setCloakOption(option) {
  cloakTitle = option;
  if (option) {
    document.title = option;
  } else {
    document.title = "Google";
  }
}

document.getElementById("search-form").addEventListener("submit", function (event) {
  event.preventDefault();

  let url = document.getElementById("url-input").value.trim();
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    url = "https://" + url;
  }

  // Show loading screen
  const spinner = document.getElementById("loading-spinner");
  const loadText = document.getElementById("load-time");
  spinner.style.display = "block";

  let estimate = Math.floor(Math.random() * 4 + 2); // Random 2-5 sec
  loadText.textContent = `Estimated load time: ${estimate} seconds...`;

  const iframe = document.createElement("iframe");
  iframe.src = url;

  iframe.onload = function () {
    spinner.style.display = "none";
    iframe.style.display = "block";
  };

  const iframeContainer = document.getElementById("iframe-container");
  iframeContainer.innerHTML = "";
  iframeContainer.appendChild(iframe);

  // Open in cloaked tab
  if (cloakTitle) {
    const newWindow = window.open("about:blank", "_blank");
    if (newWindow) {
      const cloakHTML = `
        <html>
          <head>
            <title>${cloakTitle}</title>
            <link rel="icon" href="${location.origin}/Google.png" />
          </head>
          <body style="margin:0;padding:0;overflow:hidden;">
            <iframe src="${url}" style="border:0;width:100vw;height:100vh;"></iframe>
          </body>
        </html>`;
      newWindow.document.write(cloakHTML);
      newWindow.document.close();
    }
  }
});
