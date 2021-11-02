# API-URL

This app is to provide an interactive experience that will help to visualize the difference between URLs and APIs, namely the content in their response.

There is also a page to see a Cloudinary URL in action.

## APIs and URLs

You can look at the difference between what is returned by a request for a URL and a request
for an API.  You'll see the information rendered as it would be in your browser on the top and rendered as it would be as text on the bottom.

No credentials are needed for these URLs or APIs.




## Cloudinary API

On the Cloudinary API page you can test calling an API.  You must provide your credentials because the API is looking up assets in your Cloud Account.  

To test this out:

1. Go to your Cloudinary Console and click on the link to copy your CLOUDINARY_URL into your clipboard.  

2. Paste the contents of the buffer into the "Paste CLOUDINARY_URL" in the labeled input.

3. Submit the form

You should see the contents as it would appear in the browser with no formatting.  You'll see the formatted JSON output in the Text area.