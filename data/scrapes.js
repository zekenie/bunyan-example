const columns = ["id", "created_at", "updated_at", "hash", "page_id"];

module.exports = ({ connection }) => {
  return {
    list(query = {}) {
      return connection
        .select(columns)
        .from("scrape")
        .where(query);
    },
    async screenshot(id) {
      const [doc] = await connection("scrape")
        .select("screenshot")
        .where({ id });
      return doc.screenshot;
    },
    async html(id) {
      const [doc] = await connection("scrape")
        .select("html")
        .where({ id });
      return doc.html;
    },
    create(data = {}) {
      return connection("scrape")
        .insert({ ...data, created_at: new Date(), updated_at: new Date() })
        .returning(columns);
    }
  };
};
