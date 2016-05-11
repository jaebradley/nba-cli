#!/usr/bin/env node

const program = require("commander");

const GamesCommand = require("./commands/Games.js");

program
  .version("0.0.1");

program
  .command("games [time]")
  .description("get nba games")
  .action(GamesCommand.getGamesForTime);

program
  .parse(process.argv);
