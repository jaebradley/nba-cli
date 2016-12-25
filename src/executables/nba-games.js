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
                                    .then(tables => {
                                      tables.active.forEach(table => console.log(table));
                                      if (tables.upcoming.size == 0) {
                                        console.log(tables.upcoming);
                                      }
                                    });
    } catch (Error) {
      console.error('Could not get NBA games');
    }
  })
  .parse(process.argv);
