const connection = require("./connection");
const pages = require("./pages");
const scrapes = require("./scrapes");

module.exports = {
  Pages: pages({ connection }),
  Scrapes: scrapes({ connection })
};
