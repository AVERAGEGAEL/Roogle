document.getElementById('proxy-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const url = document.getElementById('url').value;
  const token = grecaptcha.getResponse();
  if (!token) return alert("Please complete the CAPTCHA");

  const res = await fetch('https://fallen-america.uraverageopdoge.workers.dev/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url, token })
  });

  const data = await res.json();
  if (data.success && data.proxyUrl) {
    document.getElementById('proxy-frame').src = data.proxyUrl;
    document.getElementById('frame-container').style.display = 'block';
  } else {
    alert('Verification failed or bad URL.');
  }

  grecaptcha.reset(); // reset CAPTCHA for next try
});
