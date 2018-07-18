const express = require("express");
const asyncWrapper = require("./asyncWrapper");

const app = express();

module.exports = app;

const data = require("../data");

require("./middleware")({ app });
app.use(
  "/pages",
  require("./api")({
    asyncWrapper,
    ...data,
    express
  })
);
app.use(require("./errorHandler")());
