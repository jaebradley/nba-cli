import StartOfDayIdentifier from './StartOfDayIdentifier';
import DataAggregator from './DataAggregator';
import TableCreator from '../services/tables/TableCreator';

export default class CommandExecutionService {
  static executeGamesCommand(dateValue) {
    return DataAggregator.aggregate(StartOfDayIdentifier.identify(dateValue))
                         .then((data) => TableCreator.create(data))
                         .then((tables) => CommandExecutionService.printTables(tables));
  }

  static printTables(tables) {
    if (tables.started.size > 0) {
      tables.started.forEach((table) => console.log(table));
    } else {
      console.log('No started games');
    }

    if (tables.upcoming) {
      console.log(tables.upcoming);
    }
  }
}
