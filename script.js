document.getElementById('proxy-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  let url = document.getElementById('url').value.trim();
  const token = grecaptcha.getResponse();

  if (!token) return alert("Please complete the CAPTCHA");

  // Add https:// if missing
  if (!/^https?:\/\//i.test(url)) {
    url = 'https://' + url;
  }

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

  grecaptcha.reset(); // reset CAPTCHA
});
