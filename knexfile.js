require("dotenv").config();

module.exports = {
  client: "pg",
  connection: process.env.DATABASE_URL || {
    host: "localhost",
    user: "hdd",
    password: "hdd",
    port: "5436",
    database: "hdd_socomec"
  },
  migrations: {
    directory: "database/migrations",
    tableName: "knex_migrations"
  },
  seeds: {
    directory: "database/seeds"
  }
};
