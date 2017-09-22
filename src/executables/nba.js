#!/usr/bin/env node

/* eslint no-console: 0 */

import program from 'commander';

import { HELP } from '../constants/NbaGamesCommandHelp';

program.version('0.0.1');

program.on('help', () => {
  console.log(HELP);
  process.exit(1);
});

program.command('games', 'get nba games')
  .parse(process.argv);

if (program.args.length === 0) {
  console.log(HELP);
}
