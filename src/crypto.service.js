const crypto = require("crypto");
const env = require("./env.json");
function encryptAsym(message, publicKey) {
  const _publicKey = publicKey ?? env["public_key"];
  const publicKey_pem =
    "-----BEGIN PUBLIC KEY-----\n" +
    _publicKey +
    "\n" +
    "-----END PUBLIC KEY-----";
  
  if (!publicKey_pem) {
    return "public_key header is missing parameter.";
  }
  const encryptedData = crypto.publicEncrypt(
    {
      key: publicKey_pem,
      padding: crypto.constants.RSA_PKCS1_PADDING,
      oaepHash: "sha256",
    },
    // We convert the data string to a buffer using `Buffer.from`
    Buffer.from(message, "utf-8")
  );
  return encryptedData.toString("base64");
}

module.exports = { encryptAsym };
