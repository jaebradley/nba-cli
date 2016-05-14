#!/usr/bin/env node

'use es6';

const program = require("commander");

import GamesCommand from "./commands/GamesCommand";
import {HELP} from "../constants/NbaGamesCommandHelp";

let gamesCommand = new GamesCommand();

program
  .version("0.0.1");

program.on('help', function() { 
  console.log(HELP);
  process.exit(1);
});

program
  .command("games [time]")
  .description("get nba games")
  .action(function(time) {
    gamesCommand.run(time);
  });

program
  .parse(process.argv);

if (program.args.length === 0) {
  console.log(HELP);
}
