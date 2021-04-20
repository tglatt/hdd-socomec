const fs = require("fs");
const dotenv = require("dotenv");
const { logger } = require("./lib");
const { Measure } = require("./models/Measure");
const { parseCSV } = require("./parser");

dotenv.config();

const DIR_PATH = process.env.DIR_PATH;

const start = async () => {
  const files = [];
  walkSync(DIR_PATH, files);
  const csvFiles = files.filter((file) => file.endsWith(".csv"));

  for (let file of csvFiles) {
    logger.info(`start processing ${file}`);
    await processCSV(file);
    logger.info(`end processing ${file}`);
  }

  process.exit(0);
};

try {
  start();
} catch (err) {
  logger.error(err);
}

async function processCSV(filepath) {
  const measures = await parseCSV(filepath);

  for (let measure of measures) {
    const sameMeasure = await Measure.query().findOne({
      device_name: measure.device_name,
      measured_at: measure.measured_at,
    });
    if (!sameMeasure) {
      await Measure.query().insert(measure);
    }
  }

  fs.unlinkSync(filepath);
  logger.info(`file deleted ${filepath}`);
}

function walkSync(dir, filelist) {
  if (dir[dir.length - 1] != "/") dir = dir.concat("/");

  files = fs.readdirSync(dir);
  filelist = filelist || [];
  files.forEach(function (file) {
    if (fs.statSync(dir + file).isDirectory()) {
      filelist = walkSync(dir + file + "/", filelist);
    } else {
      filelist.push(dir + file);
    }
  });
  return filelist;
}
