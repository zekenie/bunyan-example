require("dotenv").config();

const { Pages, Scrapes } = require("../data");
const makeScraper = require("../scrape");

async function main() {
  const scraper = await makeScraper();
  const pages = await Pages.list();
  for (const page of pages) {
    const pageAPI = await scraper(page.uri);
    const { html, hash } = await pageAPI.html();
    const screenshot = await pageAPI.screenshot();
    console.log(
      "html",
      html.slice(0, 40),
      " {...} ",
      html.slice(html.length - 40)
    );
    console.log("hash", hash);
    console.log("screenshot", screenshot);
    await Scrapes.create({
      page_id: page.id,
      html,
      screenshot,
      hash
    });
    await pageAPI.close();
  }
}

main()
  .then(() => {
    console.log("done");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
