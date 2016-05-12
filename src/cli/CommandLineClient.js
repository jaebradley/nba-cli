#!/usr/bin/env node

const program = require("commander");

const GamesCommand = require("./commands/Games.js");
const NbaGamesCommandHelp = require("../constants/NbaGamesCommandHelp.js");

program
  .version("0.0.1");

program
  .command("games [time]")
  .description("get nba games")
  .action(GamesCommand.getGamesForTime);

program.on('help', function(){ console.log(NbaGamesCommandHelp.TEXT); });

program
  .parse(process.argv);

if (program.args.length === 0) {
  console.log(NbaGamesCommandHelp.TEXT);
}
