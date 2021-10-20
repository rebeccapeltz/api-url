function sendToFrame(event) {
  var iframe = document.getElementById("website")
  if (iframe && iframe.contentWindow) {
    iframe.contentWindow.postMessage(event.target.value, "*")
  }
}

window.addEventListener(
  "message",
  function (event) {
    if (event.origin === window.location.origin) {
      $("#my-message").text(event.data)
    }
  },
  false
)