import program from 'commander';

import CommandExecutionService from '../services/CommandExecutionService';

program
  .arguments('[option]')
  .action((option) => CommandExecutionService.executeGamesCommand(option.trim()));
  .parse(process.argv);
