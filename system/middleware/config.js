const originWhitelist = [
  "http://localhost:3000",
  "https://dev-gfqsg7evljprh7zr.us.auth0.com",
  "http://localhost:3000/callback",
  "http://localhost:3000/profile",
];

function checkCorsOrigin(origin, callback) {
  console.log("origin==>>>", origin);
  if (originWhitelist.indexOf(origin) !== -1 || !origin) {
    callback(null, true);
  } else {
    callback(new Error("Not allowed by CORS"));
  }
}

const cors = {
  origin: checkCorsOrigin,
  allowedHeaders: "Origin,X-Requested-With,Content-Type,Accept,Authorization",
  methods: "GET,HEAD,PUT,POST,DELETE,OPTIONS",
  credentials: true,
  optionsSuccessStatus: 204,
};

const morganRequestFormat = function (tokens, req, res) {
  return (
    "[" +
    [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens["response-time"](req, res),
    ].join("][") +
    "]"
  );
};

module.exports = {
  morganRequestFormat,
  cors: cors,
};
