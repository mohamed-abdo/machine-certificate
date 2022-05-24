const { publicEncrypt} = require("crypto");
const env = require("./env.json");
function encryptAsym(message) {
  const publicKey = env["public_key"];
  return publicEncrypt(publicKey, Buffer.from(message)).toString("hex");
}

module.exports = { encryptAsym };
