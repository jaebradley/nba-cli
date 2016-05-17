'use es6';

import program from "commander";

import GamesCommand from "./commands/GamesCommand";
import {HELP} from "../constants/NbaGamesCommandHelp";

export default class CommandLineClient {
  constructor() {
    this.gamesCommand = new GamesCommand();
    }

  run() {
    program.version("0.0.1");

    program.on('help', function() { 
        console.log(HELP);
        process.exit(1); 
    });

    program.command("games [time]")
            .description("get nba games")
            .action(time => this.gamesCommand.run(time));

    program.parse(process.argv);

    if (program.args.length === 0) {
      console.log(HELP);
    }
  }
}
