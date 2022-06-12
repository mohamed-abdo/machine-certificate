const expess = require("express");
const address = require("address");
const { encryptAsym } = require("./crypto.service");

const machineRouter = expess.Router();
const addressPromise = new Promise((resolve, reject) => {
  address((err, data) => {
    if (err) reject(err);
    resolve(data);
  });
});

machineRouter.get("/", (_, res, next) => {
  addressPromise.then((data) => res.status(200).send(data)).catch(next);
});

machineRouter.get("/enc", (req, res, next) => {
  addressPromise
    .then((data) =>
      res
        .status(200)
        .send(encryptAsym(JSON.stringify(data), req.headers["public_key"]))
    )
    .catch(next);
});

module.exports = { machineRouter };
