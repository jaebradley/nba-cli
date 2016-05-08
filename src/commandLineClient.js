#!/usr/bin/env node

const program = require("commander");
const CommandLineOutputClient = require("./commandLineOutputClient.js");
const moment = require("moment-timezone");
const jstz = require("jstimezonedetect");

const USER_TIMEZONE = jstz.determine().name();

program
  .version("0.0.1");

program
  .command("games [time]")
  .description("get nba games")
  .action(function(time) {
    if (time == "today" || time == null) {
      var startDate = moment().tz(USER_TIMEZONE).startOf("day");
      var endDate = moment().tz(USER_TIMEZONE).endOf("day");
      CommandLineOutputClient.outputCustomDateRangeGames(startDate, endDate);
    } else if (time == "yesterday") {
      var startDate = moment().substract(1, "days").tz(USER_TIMEZONE).startOf("day");
      var endDate = moment().substract(1, "days").tz(USER_TIMEZONE).endOf("day");
      CommandLineOutputClient.outputCustomDateRangeGames(startDate, endDate);
    } else if (time == "tomorrow") {
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
