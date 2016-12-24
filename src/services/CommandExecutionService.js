'use es6';

import DataAggregator form '../data/services/DataAggregator';
import GamesOption from '../data/models/GamesOption';
import TableCreator from '../tables/TableCreator';

export default class CommandExecutionService {
  static executeGamesCommand(option) {
    let date = deserializeDateFromOption(option);
    let data = DataAggregator.aggregate(date);
    return TableCreator.create(data);
  }

  static deserializeDateFromOption(option) {
    let gamesOption = CommandExecutionService.identifyGamesOption(option);
    if (gamesOption instanceof GamesOption) {
      return gamesOption.getDate();
    }

    // validate date format and return a Date object
    // else return undefined
  }

  static identifyGamesOption(option) {
    GamesOption.values.forEach(gamesOption => {
      if (gamesOption.value == option) {
        return gamesOption;
      }
    });

    return undefined;
  }
}
