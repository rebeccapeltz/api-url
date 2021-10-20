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

const  fetchURL =  async (url)=>{
  try {
  const response = await fetch(url, {
    method: 'GET', 
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({"url":url});
  });
  return response.json(); 
}
} catch (error) {
  console.log("error fetching")
}
}

const handleSubmit = (event){
  event.preventDefault();
  const url = event.target.elements.url.value
  fetchURL(url)

.then(function(response) {
  console.log( response)
});
}

const form = document.getElementById('form');
form.addEventListener('submit', handleSubmit);