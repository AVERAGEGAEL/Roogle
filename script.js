const input = document.getElementById("urlInput")
const frame = document.getElementById("proxyFrame")

function go() {
  let url = input.value.trim()
  if (!url) return

  if (!url.startsWith("http")) {
    url = "https://" + url
  }

  const proxiedURL = "https://fallen-america.uraverageopdoge.workers.dev/?url=" + encodeURIComponent(url)

  frame.src = proxiedURL
  document.title = "Connected · Google Docs"
}
