window.addEventListener("DOMContentLoaded", evt => {
  const getURL = async url => {
    const response = await axios.get("/fetchURL", { params: { url: url } });
    return response.data;
  };

  const postURL = async url => {
    const response = await axios.post("/fetchURL", {
      url: url
    });
    return response.data;
  };

  const parseCldUrl = cldurl => {
    let re = new RegExp("CLOUDINARY_URL=cloudinary://(\\S+):(\\S+)@(\\S+)");
    return re.exec(cldurl);
  };

  const updateDOM = data => {
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

    document.querySelector("#data").appendChild(document.createElement("br"));

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
  };

  const handleSubmit1 = event => {
    event.preventDefault();
    const url = event.target.elements.url.value;
    getURL(url)
      .then(function(resp) {
        const data =
          typeof resp === "object" ? JSON.stringify(resp, 0, 2) : resp;
        updateDOM(data);
      })
      .catch(error => console.log(error));
  };

  const handleSubmit2 = event => {
    event.preventDefault();
    // get url
    const url = event.target.elements.url.value;
    // get cloudinary url
    const cldurl = event.target.elements.cldurl.value;

    //get cld url from form
    // let cldUrl = "CLOUDINARY_URL=cloudinary://apikeyapisecret@cloudname";
    const credentials = parseCldUrl(cldurl);
    //replace credentials in api url
    const fullURL = url
      .replace("API_KEY", credentials[1])
      .replace("API_SECRET", credentials[2])
      .replace("CLOUD_NAME", credentials[3]);

    // console.log("fullURL", fullURL);

    postURL(fullURL)
      .then(function(resp) {
        const data =
          typeof resp === "object" ? JSON.stringify(resp, 0, 2) : resp;
        updateDOM(data);
        document.querySelector("#cldurl").value = "";
      })
      .catch(error => console.log(error));
  };

  const form1 = document.querySelector("#url-submit");
  if (form1) {
    form1.addEventListener("submit", handleSubmit1);
  }
  const form2 = document.querySelector("#cld-url");
  if (form2) {
    form2.addEventListener("submit", handleSubmit2);
  }
});
