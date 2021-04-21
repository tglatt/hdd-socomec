exports.up = function (knex) {
  return Promise.all([
    knex.schema.createTable("device", (table) => {
      table.string("device_name").primary();
      table.datetime("start_date", { useTz: false }).notNullable();
      table.datetime("last_date", { useTz: false });
    }),
  ]);
};
exports.down = function (knex) {};
