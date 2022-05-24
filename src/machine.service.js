const expess = require("express");
const address = require("address");
const { encryptAsym } = require('./crypto.service');

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

machineRouter.get("/enc", (_, res, next) => {
  addressPromise.then((data) => res.status(200).send(encryptAsym(JSON.stringify(data)))).catch(next);
});

module.exports = { machineRouter };
