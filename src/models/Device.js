const { Model } = require("objection");
const knexConnection = require("./knex");

Model.knex(knexConnection);

class Device extends Model {
  static get tableName() {
    return "device";
  }

  static get idColumn() {
    return "device_name";
  }
}

module.exports = { Device };
