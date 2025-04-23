const cloakOptions = ["No Cloak", "Google Docs", "Classroom", "Clever"];
let currentCloakIndex = 0;

function slideCloak(direction) {
  currentCloakIndex = (currentCloakIndex + direction + cloakOptions.length) % cloakOptions.length;
  document.getElementById("cloak-label").innerText = cloakOptions[currentCloakIndex];
}

document.getElementById("search-form").addEventListener("submit", function(event) {
  event.preventDefault();

  let url = document.getElementById("url-input").value;
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    url = "https://" + url;
  }

  const iframeContainer = document.getElementById("iframe-container");
  iframeContainer.innerHTML = "";
  const iframe = document.createElement("iframe");
  iframe.src = url;

  iframe.onload = function () {
    document.getElementById("loading-spinner").style.display = "none";
    iframe.style.display = "block";
  };

  iframeContainer.appendChild(iframe);

  // Spinner
  const spinner = document.getElementById("loading-spinner");
  spinner.style.display = "block";
  const loadEstimate = document.getElementById("load-estimate");
  loadEstimate.innerText = "Estimating load time...";
  setTimeout(() => {
    loadEstimate.innerText = "Should load in 5-10 seconds...";
  }, 1000);

  // Cloak
  const cloakChoice = cloakOptions[currentCloakIndex];
  if (cloakChoice !== "No Cloak") {
    const newWindow = window.open("about:blank", "_blank");
    if (newWindow) {
      const cloakHTML = `
        <html>
          <head><title>${cloakChoice}</title><link rel="icon" href="${location.origin}/Google.png" /></head>
          <body style="margin:0;overflow:hidden;">
            <iframe src="${url}" style="border:none;width:100vw;height:100vh;"></iframe>
          </body>
        </html>`;
      newWindow.document.write(cloakHTML);
      newWindow.document.close();
    }
  }
});
