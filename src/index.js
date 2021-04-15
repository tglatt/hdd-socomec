const { logger } = require("./lib");
const { Measure } = require("./models/Measure");
const { parseCSV } = require("./parser");

const start = async () => {
  const measures = await parseCSV("./data/sample.csv");

  for (let measure of measures) {
    const sameMeasure = await Measure.query().findOne({
      device_name: measure.device_name,
      measured_at: measure.measured_at,
    });
    if (!sameMeasure) {
      await Measure.query().insert(measure);
    }
  }

  process.exit(0);
};

try {
  start();
} catch (err) {
  logger.error(err);
}
