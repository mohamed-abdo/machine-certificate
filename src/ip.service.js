const expess = require("express");
const request = require("request");
const { encryptAsym } = require("./crypto.service");

const ipRouter = expess.Router();
const ipPromise = new Promise((resolve, reject) => {
  request.get(
    "https://api.db-ip.com/v2/free/self",
    { json: true },
    (err, _, body) => {
      if (err) reject(err);
      resolve(body);
    }
  );
});
ipRouter.get("/", (_, res, next) => {
  ipPromise.then((data) => res.status(200).send(data)).catch(next);
});

ipRouter.get("/enc", (req, res, next) => {
  ipPromise
    .then((data) =>
      res
        .status(200)
        .send(encryptAsym(JSON.stringify(data), req.headers["public_key"]))
    )
    .catch(next);
});

module.exports = { ipRouter };
