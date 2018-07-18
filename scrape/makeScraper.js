module.exports = ({ browser, hash }) => {
  return async function scraper(url) {
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "domcontentloaded" });
    api = {
      async html() {
        const html = await page.content();
        return { html, hash: hash(html) };
      },
      screenshot() {
        return page.screenshot({ fullPage: true });
      },
      close() {
        return page.close();
      }
    };

    return api;
  };
};
