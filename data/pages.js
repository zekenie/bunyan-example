module.exports = ({ connection }) => {
  return {
    list(query = {}) {
      return connection
        .select("*")
        .from("page")
        .where({ enabled: true, ...query });
    },
    create(data = {}) {
      return connection("page")
        .insert({
          enabled: true,
          ...data,
          created_at: new Date(),
          updated_at: new Date()
        })
        .returning("*");
    },
    delete(id) {
      if (!id) {
        throw new Error("Page not found");
      }
      return connection("page")
        .where({ id, updated_at: new Date() })
        .update({ enabled: false });
    }
  };
};
