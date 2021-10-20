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

const fetchURL = async 

const handleSubmit = (event){
  fetch("/fetchURL")
.then(function(response) {
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
})
.then(function(response) {
  let objectURL = URL.createObjectURL(response);
  myImage.src = objectURL;
});
}

const form = document.getElementById('form');
form.addEventListener('submit', handleSubmit);