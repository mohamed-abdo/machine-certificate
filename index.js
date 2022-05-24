const express = require("express");
const { machineRouter } = require("./src/machine.service");
const { ipRouter } = require("./src/ip.service");
const app = express();
const PORT = process.env.PORT || 6731;

app.use(express.json());
app.use((req, _, next) => {
  console.log(`receive a request: ${req.url} from at: ${new Date()}`);
  next();
});

app.use("/internal", machineRouter);
app.use("/external", ipRouter);

app.listen(PORT, () => {
  console.log(`machine-info server starts on ${PORT}`);
});

module.exports = { app };
