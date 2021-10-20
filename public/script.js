window.addEventListener("DOMContentLoaded", evt => {
  const fetchURL = async url => {
    const response = await axios.get("/fetchURL", { params: { url: url } });
    return response.data;
  };

  const handleSubmit = event => {
    event.preventDefault();
    const url = event.target.elements.url.value;
    fetchURL(url)
      .then(function(resp) {
        const data =
          typeof resp === "object" ? JSON.stringify(resp, 0, 2) : resp;

        // clean up if exists
        const existing = document.querySelector("#website");
        if (existing) {
          document.querySelector("#data").removeChild(existing);
          document
            .querySelector("#data")
            .removeChild(document.querySelector("#h2website"));
        }

        const existingText = document.querySelector("#text");
        if (existingText) {
          document.querySelector("#data").removeChild(existingText);
          document
            .querySelector("#data")
            .removeChild(document.querySelector("#h2text"));
        }

        // create new iframe with header
        const h2website = document.createElement("h2");
        h2website.setAttribute("id", "h2website");
        h2website.innerHTML = "Browser";
        document.querySelector("#data").appendChild(h2website);

        const iframe = document.createElement("iframe");
        iframe.setAttribute("width", "800");
        iframe.setAttribute("height", "400");
        iframe.setAttribute("id", "website");
        document.querySelector("#data").appendChild(iframe);
        iframe.contentWindow.document.open();
        iframe.contentWindow.document.write(data);
        iframe.contentWindow.document.close();

        document
          .querySelector("#data")
          .appendChild(document.createElement("br"));

        // create new text area with header
        const h2text = document.createElement("h2");
        h2text.setAttribute("id", "h2text");
        h2text.innerHTML = "Text";
        document.querySelector("#data").appendChild(h2text);

        const textArea = document.createElement("textarea");
        textArea.setAttribute("id", "text");
        textArea.setAttribute("rows", 20);
        textArea.setAttribute("cols", 100);
        textArea.value = data;
        document.querySelector("#data").appendChild(textArea);
      })
      .catch(error => console.log(error));
  };

  const form = document.querySelector("#url-submit");
  form.addEventListener("submit", handleSubmit);
});
