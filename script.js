document.getElementById("proxyForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const input = document.getElementById("urlInput").value.trim();
  const token = grecaptcha.getResponse();

  if (!token) {
    alert("Please complete the reCAPTCHA.");
    return;
  }

  try {
    const response = await fetch("https://fallen-america.uraverageopdoge.workers.dev/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ token }),
    });

    const result = await response.json();

    if (result.success) {
      let finalUrl = input.startsWith("http") ? input : `https://${input}`;
      const frame = document.getElementById("proxyFrame");
      frame.src = `https://fallen-america.uraverageopdoge.workers.dev/?url=${encodeURIComponent(finalUrl)}`;
    } else {
      alert("reCAPTCHA failed. Please try again.");
    }
  } catch (err) {
    alert("Something went wrong. Please try again later.");
  }
});
