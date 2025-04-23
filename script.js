document.getElementById("search-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const input = document.getElementById("url-input");
  const cloakType = document.getElementById("cloak-type").value;
  const url = input.value.startsWith("http") ? input.value : "https://" + input.value;

  const loading = document.getElementById("loading-screen");
  const iframe = document.getElementById("proxy-frame");

  loading.style.display = "block";
  iframe.style.display = "none";

  setTimeout(() => {
    loading.style.display = "none";
    iframe.src = url;
    iframe.style.display = "block";
  }, 1500);

  if (cloakType) {
    const newWindow = window.open("about:blank", "_blank");
    if (newWindow) {
      const cloakHTML = `
        <html>
          <head><title>${cloakType}</title><link rel="icon" href="Google.png"></head>
          <body style="margin:0;padding:0;overflow:hidden;">
            <iframe src="${url}" style="width:100vw;height:100vh;border:0;"></iframe>
          </body>
        </html>`;
      newWindow.document.write(cloakHTML);
      newWindow.document.close();
    }
  }
});
