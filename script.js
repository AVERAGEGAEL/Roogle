let cloakOptions = ["None", "Google Docs", "Classroom", "Clever"];
let currentCloakIndex = 0;

function updateCloakDisplay() {
  const cloakName = cloakOptions[currentCloakIndex];
  document.getElementById("cloak-name").innerText = cloakName;
}

document.getElementById("prev-cloak").addEventListener("click", () => {
  currentCloakIndex = (currentCloakIndex - 1 + cloakOptions.length) % cloakOptions.length;
  updateCloakDisplay();
});

document.getElementById("next-cloak").addEventListener("click", () => {
  currentCloakIndex = (currentCloakIndex + 1) % cloakOptions.length;
  updateCloakDisplay();
});

updateCloakDisplay();

document.getElementById("search-form").addEventListener("submit", function(event) {
  event.preventDefault();
  let url = document.getElementById("url-input").value;

  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    url = "https://" + url;
  }

  const spinner = document.getElementById("loading-spinner");
  spinner.style.display = "block";

  const iframe = document.createElement("iframe");
  iframe.src = url;
  iframe.onload = function() {
    spinner.style.display = "none";
    iframe.style.display = "block";
  };

  const iframeContainer = document.getElementById("iframe-container");
  iframeContainer.innerHTML = "";
  iframeContainer.appendChild(iframe);

  const selectedCloak = cloakOptions[currentCloakIndex];
  if (selectedCloak !== "None") {
    const newWindow = window.open("about:blank", "_blank");
    if (newWindow) {
      const cloakHTML = `
        <html>
          <head>
            <title>${selectedCloak}</title>
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
