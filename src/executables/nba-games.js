'use es6';

import program from 'commander';

import CommandExecutionService from '../services/CommandExecutionService';

program
  .arguments('[option]')
  .action(option => {
    try {
      return CommandExecutionService.executeGamesCommand(option.trim())
                                    .then(tables => {
                                      if (tables.started.size !== 0) {
                                        tables.started.forEach(table => console.log(table));
                                      }

                                      if (typeof tables.upcoming !== 'undefined') {
                                        console.log(tables.upcoming);
                                      }

                                      if ((tables.started.size == 0) && (typeof tables.upcoming == 'undefined')) {
                                        console.log('Could not find games');
                                      }
                                    });
    } catch (Error) {
      console.error('Could not get NBA games');
    }
  })
  .parse(process.argv);
