const { addHours } = require("date-fns");
const { UniqueViolationError } = require("objection");

const { logger, getCurrentYear } = require("./lib");
const { Measure, Device } = require("./models");

const createEmptyMeasures = async () => {
  const devices = await Device.query();

  for (let device of devices) {
    const { device_name, start_date, last_date } = device;
    logger.info(
      `Creating empty measures for ${device_name} from ${start_date}...`
    );
    let currentDate = last_date || start_date;
    const endDate = new Date(getCurrentYear() + 1, 0, 0);
    while (currentDate <= endDate) {
      try {
        await Measure.query().insert({
          device_name,
          measured_at: currentDate,
        });
      } catch (e) {
        if (e instanceof UniqueViolationError) {
          logger.info(`Measure ${device_name} ${currentDate} already exists`);
        } else {
          throw e;
        }
      }
      currentDate = addHours(currentDate, 1);
    }
    await Device.query()
      .update({ last_date: currentDate })
      .where({ device_name });
  }
};

module.exports = { createEmptyMeasures };
