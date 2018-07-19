const log = require("../log");
module.exports = () => (err, req, res, next) => {
  if (err.status) {
    res.status(err.status);
  } else {
    res.status(500);
  }
  log.error({ err }, "server error");
  res.json({ message: err.message || "Server error" });
};
