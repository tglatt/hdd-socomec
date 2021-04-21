const { Model } = require("objection");
const knexConnection = require("./knex");

Model.knex(knexConnection);

class Measure extends Model {
  static get tableName() {
    return "measure";
  }

  static get idColumn() {
    return ["device_name", "measured_at"];
  }
}

const MEASURE_STATES = {
  MISSING: "missing",
  PRESENT: "present",
};

module.exports = { Measure, MEASURE_STATES };
