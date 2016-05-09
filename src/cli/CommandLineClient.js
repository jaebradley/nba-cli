#!/usr/bin/env node

const program = require("commander");
const moment = require("moment-timezone");
const jstz = require("jstimezonedetect");

const CommandLineOutputClient = require("./output/CommandLineOutputClient.js");

const GAMES_OPTIONS = {
  TODAY: "TODAY",
  YESTERDAY: "YESTERDAY",
  TOMORROW: "TOMORROW"
};

const USER_TIMEZONE = jstz.determine().name();

program
  .version("0.0.1");

program
  .command("games [time]")
  .description("get nba games")
  .action(function(time) {
    const upperCaseTimeValue = time.toUpperCase();
    if (upperCaseTimeValue == GAMES_OPTIONS[upperCaseTimeValue] || time == null) {
      var startDate = moment().tz(USER_TIMEZONE).startOf("day");
      var endDate = moment().tz(USER_TIMEZONE).endOf("day");
      CommandLineOutputClient.outputCustomDateRangeGames(startDate, endDate);

    } else if (upperCaseTimeValue == GAMES_OPTIONS[upperCaseTimeValue]) {
      var startDate = moment().subtract(1, "days").tz(USER_TIMEZONE).startOf("day");
      var endDate = moment().subtract(1, "days").tz(USER_TIMEZONE).endOf("day");
      CommandLineOutputClient.outputCustomDateRangeGames(startDate, endDate);

    } else if (upperCaseTimeValue == GAMES_OPTIONS[upperCaseTimeValue]) {
      var startDate = moment().add(1, "days").tz(USER_TIMEZONE).startOf("day");
      var endDate = moment().add(1, "days").tz(USER_TIMEZONE).endOf("day");
      CommandLineOutputClient.outputCustomDateRangeGames(startDate, endDate);

    } else if (moment(time).isValid()) {
      var startDate = moment(time).tz(USER_TIMEZONE).startOf("day");
      var endDate = moment(time).tz(USER_TIMEZONE).endOf("day");
      CommandLineOutputClient.outputCustomDateRangeGames(startDate, endDate);

    } else {
      console.log("hmmm that doesn't look right");
    }
  });

program
  .parse(process.argv);
