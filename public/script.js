// function sendToFrame(event) {
//   var iframe = document.getElementById("website")
//   if (iframe && iframe.contentWindow) {
//     iframe.contentWindow.postMessage(event.target.value, "*")
//   }
// }

// window.addEventListener(
//   "message",
//   function (event) {
//     if (event.origin === window.location.origin) {
//       $("#my-message").text(event.data)
//     }
//   },
//   false
// )

window.addEventListener("DOMContentLoaded", evt => {
  const fetchURL = async url => {
    const response = await fetch("/fetchURL", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ url: url })
    });
    return response.json();
  };

  const handleSubmit = event => {
    event.preventDefault();
    const url = event.target.elements.url.value;
    fetchURL(url)
      .then(function(response) {
        console.log(response);
      })
      .catch(error => console.log(error));
  };

  const form = document.querySelector("#url-submit");
  form.addEventListener("submit", handleSubmit);
});
