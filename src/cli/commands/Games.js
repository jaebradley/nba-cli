const moment = require("moment-timezone");
const jstz = require("jstimezonedetect");
const emoji = require("node-emoji");

const CommandLineOutputClient = require("../output/CommandLineOutputClient.js");
const Constants = require("../../constants/Constants.js");

const USER_TIMEZONE = jstz.determine().name();

module.exports = {
  getGamesForTime: function(time) {
    var startDate = moment().tz(USER_TIMEZONE).startOf("day");
    var endDate = moment().tz(USER_TIMEZONE).endOf("day");
    if (typeof time === "undefined") {
      CommandLineOutputClient.outputCustomDateRangeGames(startDate, endDate);
      return;
    }

    const upperCaseTimeValue = time.toUpperCase();
    switch (upperCaseTimeValue) {
      case Constants.GAMES_OPTIONS.TODAY:
        break;

      case Constants.GAMES_OPTIONS.YESTERDAY:
        startDate = moment().subtract(1, "days").tz(USER_TIMEZONE).startOf("day");
        endDate = moment().subtract(1, "days").tz(USER_TIMEZONE).endOf("day");
        break;

      case Constants.GAMES_OPTIONS.TOMORROW:
        startDate = moment().add(1, "days").tz(USER_TIMEZONE).startOf("day");
        endDate = moment().add(1, "days").tz(USER_TIMEZONE).endOf("day");
        break;

      default:
        const customTime = new Date(time);
        if (moment(customTime).isValid()) {
          startDate = moment(customTime).tz(USER_TIMEZONE).startOf("day");
          endDate = moment(customTime).tz(USER_TIMEZONE).endOf("day");
          break;
        }
        console.log(emoji.get("disappointed").concat("  hmm I don't know what the fuck day ", time, " is supposed to be, but here's today's games"));
        break;
    }

    CommandLineOutputClient.outputCustomDateRangeGames(startDate, endDate);
  }
};
