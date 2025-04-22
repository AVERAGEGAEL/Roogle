// Add your JavaScript logic here if you prefer to externalize the script

let cloakTitle = null;

function setCloakOption(option) {
  cloakTitle = option;
}

document.getElementById("search-form").addEventListener("submit", function(event) {
  event.preventDefault();
  let url = document.getElementById("url-input").value;

  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    url = "https://" + url;
  }

  // Show loading spinner
  const spinner = document.getElementById("loading-spinner");
  spinner.style.display = "block";

  const predictedTime = document.getElementById("predicted-time");
  let secondsLeft = Math.floor(Math.random() * 4 + 
