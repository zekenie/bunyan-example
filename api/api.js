module.exports = ({ Pages, Scrapes, asyncWrapper, express }) => {
  const router = express.Router();
  const list = asyncWrapper(async (req, res) => {
    const pages = await Pages.list(req.query);
    res.status(200).json(pages);
  });

  const create = asyncWrapper(async (req, res) => {
    const page = await Pages.create(req.body);
    res.status(201).json(page);
  });

  const destroy = asyncWrapper(async (req, res) => {
    await Pages.delete(req.params.id);
    res.status(204).json({});
  });

  const listScrapes = asyncWrapper(async (req, res) => {
    const scrapes = await Scrapes.list({
      ...req.query,
      page_id: req.params.id
    });
    res.status(200).json(scrapes);
  });

  const screenshot = asyncWrapper(async (req, res) => {
    const screenshotBuffer = await Scrapes.screenshot(req.params.scrapeId);
    res
      .type("image/png")
      .status(200)
      .send(screenshotBuffer);
  });

  const html = asyncWrapper(async (req, res) => {
    const html = await Scrapes.html(req.params.scrapeId);
    res.status(200).send(html);
  });

  router
    .get("/", list)
    .post("/", create)
    .delete("/:id", destroy)
    .get("/:id/scrapes", listScrapes)
    .get("/:id/scrapes/:scrapeId.png", screenshot)
    .get("/:id/scrapes/:scrapeId.html", html);
  return router;
};
