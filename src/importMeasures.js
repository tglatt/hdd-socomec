const fs = require("fs");

const { logger } = require("./lib");
const { Measure, MEASURE_STATES, Device } = require("./models");
const { parseCSV } = require("./parser");

const importMeasures = async (dirPath) => {
  const files = [];
  walkSync(dirPath, files);
  const csvFiles = files.filter((file) => file.endsWith(".csv"));

  for (let file of csvFiles) {
    logger.info(`start processing ${file}`);
    await processCSV(file);
    logger.info(`end processing ${file}`);
  }
};

module.exports = { importMeasures };

async function processCSV(filepath) {
  const measures = await parseCSV(filepath);
  if (!(await isDeviceExists(measures))) {
    logger.info(
      `file ${filepath} will not be processed. Device does not exists`
    );
    return;
  }

  for (let measure of measures) {
    const { device_name, measured_at } = measure;
    const measureAtSameTime = await Measure.query().findOne({
      device_name,
      measured_at,
    });
    if (!measureAtSameTime) {
      await Measure.query().insert({ ...measure, expected: false });
    } else if (measureAtSameTime.state === MEASURE_STATES.MISSING) {
      await Measure.query().update(measure).where({ device_name, measured_at });
    }
  }

  fs.unlinkSync(filepath);
  logger.info(`file deleted ${filepath}`);
}

async function isDeviceExists(measures) {
  if (measures.length === 0) {
    return;
  }
  const { device_name } = measures[0];
  const device = await Device.query().findOne({ device_name });
  return device ? true : false;
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
