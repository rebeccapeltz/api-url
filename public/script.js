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
        const existing = docucument.querySelector("#website");
        if (existing) {
          document.querySelector("#data").removeChild(iframe);
        }

        // create new
        const iframe = document.createElement("iframe");
        iframe.setAttribute("width", "800");
        iframe.setAttribute("height", "400");
        iframe.setAttribute("id", "website");
        document.querySelector("#site-iframe").appendChild(iframe);
        iframe.contentWindow.document.open();
        iframe.contentWindow.document.write(data);
        iframe.contentWindow.document.close();
        // iframe.src = 'data:text/html;charset=utf-8,' + encodeURI(data);
        // document.body.appendChild(iframe);
      })
      .catch(error => console.log(error));
  };

  const form = document.querySelector("#url-submit");
  form.addEventListener("submit", handleSubmit);
});
