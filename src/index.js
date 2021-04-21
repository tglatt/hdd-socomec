const dotenv = require("dotenv");
const { logger } = require("./lib");
const { createEmptyMeasures } = require("./createEmptyMeasures");
const { importMeasures } = require("./importMeasures");

dotenv.config();

const DIR_PATH = process.env.DIR_PATH;

const start = async () => {
  // create empty measures for all devices
  await createEmptyMeasures();

  // import measures from CSV
  await importMeasures(DIR_PATH);

  process.exit(0);
};

try {
  start();
} catch (err) {
  logger.error(err);
  process.exit(1);
}
