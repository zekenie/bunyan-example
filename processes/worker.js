require("dotenv").config();
const log = require("../log");

const { Pages, Scrapes } = require("../data");
const makeScraper = require("../scrape");

async function main() {
  const scraper = await makeScraper();
  const pages = await Pages.list();
  for (const page of pages) {
    const pageAPI = await scraper(page.uri);
    const { html, hash } = await pageAPI.html();
    const screenshot = await pageAPI.screenshot();
    log.debug({ url: page.url, hash, binarySize: screenshot.length }, "scrape");
    // console.log(
    //   "html",
    //   html.slice(0, 40),
    //   " {...} ",
    //   html.slice(html.length - 40)
    // );
    // console.log("hash", hash);
    // console.log("screenshot", screenshot);
    await Scrapes.create({
      page_id: page.id,
      html,
      screenshot,
      hash
    });
    await pageAPI.close();
  }
  return pages.length;
}

main()
  .then(numPages => {
    log.info({ numPages }, "done with scraping");
    process.exit(0);
  })
  .catch(err => {
    log.error({ err }, "scraper error");
    process.exit(1);
  });
