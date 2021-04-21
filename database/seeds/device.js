const insertIfNotExists = async (knex, { device_name, start_date }) => {
  const res = await knex("device").where({ device_name });
  if (!res.length) {
    await knex("device").insert([{ device_name, start_date }]);
  } else {
    await knex("device").update({ start_date }).where({ device_name });
  }
};

exports.seed = async (knex) => {
  await insertIfNotExists(knex, {
    device_name: "ASP. HERDING",
    start_date: "2019-01-01",
  });
  await insertIfNotExists(knex, {
    device_name: "CONT. FROID 1",
    start_date: "2019-01-01",
  });
  await insertIfNotExists(knex, {
    device_name: "CONT. FROID 2",
    start_date: "2019-01-01",
  });
  await insertIfNotExists(knex, {
    device_name: "COUPE 1",
    start_date: "2019-01-01",
  });
  await insertIfNotExists(knex, {
    device_name: "COUPE 2",
    start_date: "2019-01-01",
  });
  await insertIfNotExists(knex, {
    device_name: "DEBAC",
    start_date: "2019-01-01",
  });
  await insertIfNotExists(knex, {
    device_name: "FROID STOCK 2",
    start_date: "2019-01-01",
  });
  await insertIfNotExists(knex, {
    device_name: "GENE TRANSFO",
    start_date: "2019-01-01",
  });
  await insertIfNotExists(knex, {
    device_name: "GRANULEUSE",
    start_date: "2019-01-01",
  });
  await insertIfNotExists(knex, {
    device_name: "P_3 AGBT",
    start_date: "2019-01-01",
  });
  await insertIfNotExists(knex, {
    device_name: "SECHEUR",
    start_date: "2019-01-01",
  });
  // sivicpanel
  await insertIfNotExists(knex, {
    device_name: "WESTRUP",
    start_date: "2019-01-01",
  });
};
