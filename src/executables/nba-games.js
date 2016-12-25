'use es6';

import program from 'commander';

import CommandExecutionService from '../services/CommandExecutionService';

program
  .arguments('[option]')
  .action(option => {
    if (typeof option !== 'string') {
      throw new TypeError('Expected option to be a string');
    }
    try {
      return CommandExecutionService.executeGamesCommand(option.trim())
                                    .then(gamesTables => {
                                      gamesTables.active.forEach(table => console.log(table));
                                      console.log(gamesTables.upcoming);
                                    });
    } catch (Error) {
      console.error('Could not get NBA games');
    }
  })
  .parse(process.argv);
