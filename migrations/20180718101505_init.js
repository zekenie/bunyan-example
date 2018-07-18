exports.up = async function(knex) {
  await knex.schema.withSchema("public").createTable("page", table => {
    table.increments();
    table.timestamps();
    table.text("uri");
    table.boolean("enabled");
    table.unique("uri");
  });

  await knex.schema.withSchema("public").createTable("scrape", table => {
    table.increments();
    table.timestamps();
    table.integer("page_id");
    table.foreign("page_id").references("page_id_in_scrape");
    table.text("html");
    table.binary("screenshot");
    table.string("hash");
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTable("scrape");
  await knex.schema.dropTable("page");
};
