#!/usr/bin/env node

/* eslint no-console: 0 */

import program from 'commander';

import pkg from '../../package.json';

import { HELP } from '../constants/NbaGamesCommandHelp';

program
  .version(pkg.version)
  .description('NBA game data')
  .on('help', () => {
    console.log(HELP);
    process.exit(1);
  })
  .command('games', 'get nba games')
  .parse(process.argv);

if (program.args.length === 0) {
  console.log(HELP);
}
