/* eslint no-console: 0 */

import StartOfDayIdentifier from './StartOfDayIdentifier';
import DataAggregator from './DataAggregator';
import TableCreator from '../services/tables/TableCreator';

export default class CommandExecutionService {
  static executeGamesCommand(dateValue) {
    return DataAggregator
      .aggregate(StartOfDayIdentifier.identify(dateValue))
      .then(data => TableCreator.create(data))
      .then(tables => CommandExecutionService.printTables(tables));
  }

  static printTables(tables) {
    if (tables.started.empty) {
      console.log('No started games');
    } else {
      tables.started.forEach(table => console.log(table));
    }

    if (tables.upcoming) {
      console.log(tables.upcoming);
    }
  }
}
