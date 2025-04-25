const form = document.getElementById("proxy-form");
const iframe = document.getElementById("proxy-frame");
const urlInput = document.getElementById("url-input");

// Add a status message element
const statusMessage = document.createElement("p");
statusMessage.style.color = "red";
form.appendChild(statusMessage);

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  statusMessage.textContent = "Checking reCAPTCHA...";

  const recaptchaResponse = grecaptcha.getResponse();

  if (!recaptchaResponse) {
    statusMessage.textContent = "⚠️ Please complete the reCAPTCHA.";
    return;
  }

  let rawUrl = urlInput.value.trim();
  if (!rawUrl) {
    statusMessage.textContent = "⚠️ Enter a website first.";
    return;
  }

  let url = rawUrl.startsWith("http") ? rawUrl : `https://${rawUrl}`;
  statusMessage.textContent = "Sending to proxy...";

  try {
    const res = await fetch("https://fallen-america.uraverageopdoge.workers.dev/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ url, token: recaptchaResponse })
    });

    const data = await res.json();

    if (data.success && data.url) {
      iframe.src = data.url;
      iframe.style.display = "block";
      statusMessage.textContent = "✅ Loaded!";
    } else {
      statusMessage.textContent = "❌ reCAPTCHA failed or bad response.";
    }
  } catch (err) {
    console.error("Error with fetch request:", err);
    statusMessage.textContent = "❌ Error contacting the proxy server.";
  }
});
