const { Model } = require("objection");
const knexConnection = require("./knex");

Model.knex(knexConnection);

class Measure extends Model {
  static get tableName() {
    return "measure";
  }
}

module.exports = { Measure };
