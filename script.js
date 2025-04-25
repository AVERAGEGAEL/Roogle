document.getElementById("proxy-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const urlInput = document.getElementById("url-input").value.trim();
  const recaptchaResponse = grecaptcha.getResponse();

  if (!recaptchaResponse) {
    alert("Please complete the reCAPTCHA.");
    return;
  }

  let url = urlInput.startsWith("http") ? urlInput : `https://${urlInput}`;

  const res = await fetch("https://fallen-america.uraverageopdoge.workers.dev/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ url, token: recaptchaResponse })
  });

  const data = await res.json();

  if (data.success) {
    const iframe = document.getElementById("proxy-frame");
    iframe.src = data.url;
    iframe.style.display = "block";
  } else {
    alert("reCAPTCHA failed or bad URL.");
  }
});
