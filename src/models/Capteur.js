const { Model } = require("objection");
const knexConnection = require("./knex");

Model.knex(knexConnection);

class Capteur extends Model {
  static get tableName() {
    return "capteur";
  }
}

const CapteurQuery = {
  all: () => Capteur.query(),
};

module.exports = { CapteurQuery };
