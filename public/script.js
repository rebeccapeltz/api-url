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
    const response = await axios.get("/fetchURL", { params: { url: url } });
    return response.data;
  };

  const handleSubmit = event => {
    event.preventDefault();
    const url = event.target.elements.url.value;
    fetchURL(url)
      .then(function(data) {
        console.log(data);

        // var iframe = document.getElementById("website");
        // if (iframe && iframe.contentWindow) {
        //   iframe.contentWindow.postMessage(event.target.value, "*");
        // }

        // clean up if exists
        const existing = document.querySelector("#website");
        if (existing) {
          document.querySelector("#data").removeChild(existing);
        }

        const existingText = document.querySelector("#text");
        if (existingText) {
          document.querySelector("#data").removeChild(existingText);
        }

        // create new iframe
        const iframe = document.createElement("iframe");
        iframe.setAttribute("width", "800");
        iframe.setAttribute("height", "400");
        iframe.setAttribute("id", "website");
        document.querySelector("#data").appendChild(iframe);
        iframe.contentWindow.document.open();
        iframe.contentWindow.document.write(data);
        iframe.contentWindow.document.close();

        // create new text area
        const textArea = document.createElement("textarea");
        textArea.setAttribute("id", "text");
        textArea.setAttribute("rows", 20);
        textArea.setAttribute("cols", 80);
        textArea.value = data;
        document.querySelector("#data").appendChild(textArea);
      })
      .catch(error => console.log(error));
  };

  const form = document.querySelector("#url-submit");
  form.addEventListener("submit", handleSubmit);
});
