let cloakTitle = "";

document.getElementById("cloak-select").addEventListener("change", (e) => {
  cloakTitle = e.target.value;
  if (!cloakTitle) document.title = "Roogle";
});

document.getElementById("search-form").addEventListener("submit", function (e) {
  e.preventDefault();

  let url = document.getElementById("url-input").value.trim();
  if (!url.startsWith("http")) {
    url = "https://" + url;
  }

  const iframe = document.getElementById("proxy-frame");
  const spinner = document.getElementById("loading-spinner");

  spinner.style.display = "block";
  iframe.style.display = "none";

  iframe.onload = function () {
    spinner.style.display = "none";
    iframe.style.display = "block";
  };

  iframe.src = url;

  if (cloakTitle) {
    const newWindow = window.open("about:blank", "_blank");
    const cloakHTML = `
      <html>
        <head><title>${cloakTitle}</title><link rel="icon" href="${location.origin}/Google.png" /></head>
        <body style="margin:0;overflow:hidden;">
          <iframe src="${url}" style="width:100vw;height:100vh;border:none;"></iframe>
        </body>
      </html>`;
    newWindow.document.write(cloakHTML);
    newWindow.document.close();
  }
});
