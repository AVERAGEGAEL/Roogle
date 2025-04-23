let cloakTab = null;

function setCloak(option) {
  cloakTab = option;
  document.title = option ? option : "Google";
}

document.getElementById("search-form").addEventListener("submit", function(e) {
  e.preventDefault();
  let url = document.getElementById("url-input").value.trim();

  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    url = "https://" + url;
  }

  const spinner = document.getElementById("loading-spinner");
  const iframe = document.getElementById("proxy-iframe");

  spinner.style.display = "block";
  iframe.style.display = "none";
  iframe.src = url;

  iframe.onload = function () {
    spinner.style.display = "none";
    iframe.style.display = "block";
  };

  if (cloakTab) {
    const newWindow = window.open("about:blank", "_blank");
    const cloakHTML = `
      <html>
        <head>
          <title>${cloakTab}</title>
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
