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
      CommandLineOutputClient.outputTodayGames();
    } else if (time == "yesterday") {
      CommandLineOutputClient.outputYesterdayGames();
    } else if (time == "tomorrow") {
      CommandLineOutputClient.outputTomorrowGames();
    } else if (moment(time).isValid()) {
      const date = moment(time).tz(USER_TIMEZONE);
      CommandLineOutputClient.outputCustomDateGames(date);
    } else {
      console.log("hmmm that doesn't look right");
    }
  });

program
  .parse(process.argv);
