#!/usr/bin/env node

const program = require("commander");
const CommandLineOutputClient = require("./commandLineOutputClient.js");

program
  .version("0.0.1")
  .option("-t, --today", "get today's nba games")
  .parse(process.argv);

if (program.today) {
  CommandLineOutputClient.outputTodayGames();
}
