#!/usr/bin/env node

const program = require("commander");
const CommandLineOutputClient = require("./commandLineOutputClient.js");

program
  .version("0.0.1");

program
  .command("games [time]")
  .description("get nba games")
  .action(function(time) {
    if (time == "today") {
      CommandLineOutputClient.outputTodayGames();
    } else if (time == "yesterday") {
      CommandLineOutputClient.outputYesterdayGames();
    }
  });

program
  .parse(process.argv);
