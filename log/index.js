const bunyan = require("bunyan");

module.exports = bunyan.createLogger({
  name: "site-watcher",
  level: process.env.LOG_LEVEL,
  serializers: bunyan.stdSerializers
});
