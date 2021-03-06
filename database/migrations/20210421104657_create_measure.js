exports.up = function (knex) {
  return Promise.all([
    knex.schema.createTable("measure", (table) => {
      table.string("device_name").notNullable();
      table.datetime("measured_at", { useTz: false }).notNullable();

      table.primary(["device_name", "measured_at"]);
      table.foreign("device_name").references("device.device_name");

      table.string("state").notNullable().defaultTo("missing");
      table.boolean("expected").notNullable().defaultTo(true);

      table.string("load_name1");
      table.string("usage1");
      table.string("nature1");
      table.string("measured_value1");
      table.string("unit1");
      table.float("scale1");
      table.float("value1");

      table.string("load_name2");
      table.string("usage2");
      table.string("nature2");
      table.string("measured_value2");
      table.string("unit2");
      table.float("scale2");
      table.float("value2");

      table.string("load_name3");
      table.string("usage3");
      table.string("nature3");
      table.string("measured_value3");
      table.string("unit3");
      table.float("scale3");
      table.float("value3");

      table.string("load_name4");
      table.string("usage4");
      table.string("nature4");
      table.string("measured_value4");
      table.string("unit4");
      table.float("scale4");
      table.float("value4");

      table.string("load_name5");
      table.string("usage5");
      table.string("nature5");
      table.string("measured_value5");
      table.string("unit5");
      table.float("scale5");
      table.float("value5");
    }),
  ]);
};
exports.down = function (knex) {};
