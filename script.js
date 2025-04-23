let cloakTitle = null;

function setCloakOption(option) {
  if (option === null) {
    cloakTitle = null;
    document.title = "Google"; // default
  } else {
    cloakTitle = option;
    document.title = option;
  }
}

document.getElementById("search-form").addEventListener("submit", function(event) {
  event.preventDefault();
  let url = document.getElementById("url-input").value;

  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    url = "https://" + url;
  }

  const spinner = document.getElementById("loading-spinner");
  spinner.style.display = "block";

  const iframe = document.getElementById("proxy-iframe");
  iframe.style.display = "none";
  iframe.src = url;

  iframe.onload = function () {
    spinner.style.display = "none";
    iframe.style.display = "block";
  };

  if (cloakTitle) {
    const newWindow = window.open("about:blank", "_blank");
    const cloakHTML = `
      <html>
        <head>
          <title>${cloakTitle}</title>
          <link rel="icon" href="Google.png" type="image/png" />
        </head>
        <body style="margin:0;padding:0;overflow:hidden;">
          <iframe src="${url}" style="border:0;width:100vw;height:100vh;"></iframe>
        </body>
      </html>`;
    newWindow.document.write(cloakHTML);
    newWindow.document.close();
  }
});
