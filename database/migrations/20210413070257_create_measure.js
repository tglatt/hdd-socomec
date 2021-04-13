exports.up = function (knex) {
  return Promise.all([
    knex.schema.createTable("measure", (table) => {
      table.increments("id").primary();
      table.string("device_name").notNullable();
      table.datetime("measured_at", { useTz: false });
      table.string("load_name").notNullable();
      table.string("usage").notNullable();
      table.string("nature").notNullable();
      table.string("measured_value").notNullable();
      table.string("unit").notNullable();
      table.float("scale").notNullable();
      table.float("value").notNullable();
    }),
  ]);
};
exports.down = function (knex) {};
