const puppeteer = require("puppeteer");
const makeScraper = require("./makeScraper");

const crypto = require("crypto");

function hash(str) {
  const shasum = crypto.createHash("sha1");
  shasum.update(str);
  return shasum.digest("hex");
}

module.exports = async () => {
  return makeScraper({ browser: await puppeteer.launch(), hash });
};
