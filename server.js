const path = require("path");
const axios = require("axios").default;

// Require the fastify framework and instantiate it
const fastify = require("fastify")({
  // set this to true for detailed logging:
  logger: false
});



// Setup our static files
fastify.register(require("fastify-static"), {
  root: path.join(__dirname, "public"),
  prefix: "/" // optional: default '/'
});

// fastify-formbody lets us parse incoming forms
fastify.register(require("fastify-formbody"));

// point-of-view is a templating manager for fastify
fastify.register(require("point-of-view"), {
  engine: {
    handlebars: require("handlebars")
  }
});

// Our main GET home page route, pulls from src/pages/index.hbs
fastify.get("/", function(request, reply) {
  // params is an object we'll pass to our handlebars template
  let params = {
    greeting: "API's vs URL's"
  };
  // request.query.paramName <-- a querystring example
  reply.view("/src/pages/index.hbs", params);
});

fastify.get("/cldapi", function(request, reply) {
  // params is an object we'll pass to our handlebars template
  let params = {
    greeting: "Cloudinary API"
  };
  // request.query.paramName <-- a querystring example
  reply.view("/src/pages/cldapi.hbs", params);
});

fastify.get("/fetchURL", function(request, reply) {
  // params is an object we'll pass to our handlebars template
  // console.log(request);
  console.log("qs", request.query.url);

  if (!request.query.url) {
    console.log("need a url");
  }

  // use https
  let url = request.query.url.replace(/(^\w+:|^)\/\//, "");
  console.log("url", url);

  if (!url.startsWith("www")) {
    console.log("need a www");
  }
  axios({
    method: "get",
    url: request.query.url
  })
    .then(response => {
      console.log(response.data);
       reply.send(response.data)
    })
    .catch(error => {
      console.log(error);
    });
});


// Run the server and report out to the logs
fastify.listen(process.env.PORT, function(err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`Your app is listening on ${address}`);
  fastify.log.info(`server listening on ${address}`);
});
