const log = require("../log");
const bodyParser = require("body-parser");

module.exports = ({ app }) => {
  app.use(bodyParser.json());

  app.use((req, res, next) => {
    log.info({ req }, "Request");
    res.on("finish", () => {
      log.info({ res }, "response");
    });
    next();
  });
};
