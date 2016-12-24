'use es6';

import program from 'commander';

import CommandExecutionService from '../services/CommandExecutionService';

program
  .arguments('[option]')
  .action(option => {
    try {
      console.log(CommandExecutionService.executeGamesCommand(option));
    } catch (Error) {
      console.error('Could not get NBA games');
    }
  })
  .parse(process.argv);
