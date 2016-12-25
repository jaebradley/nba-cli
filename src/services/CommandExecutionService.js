'use es6';

import jstz from 'jstimezonedetect';
import moment from 'moment-timezone';

import DataAggregator from '../services/DataAggregator';
import GamesOption from '../data/GamesOption';
import TableCreator from '../services/tables/TableCreator';

export default class CommandExecutionService {
  static executeGamesCommand(option) {
    let date = CommandExecutionService.identifyDateFromOption(option);
    return DataAggregator.aggregate(date.year(), date.month() + 1, date.day())
                         .then(data => TableCreator.create(data));
  }

  static identifyDateFromOption(option) {
    let gamesOption = CommandExecutionService.identifyGamesOption(option);
    if (gamesOption instanceof GamesOption) {
      let userDate = CommandExecutionService.identifyDateFromGamesOption(gamesOption);
      return CommandExecutionService.convertUserDateToApiTimezone(userDate);
    } else if (moment(option).isValid()) {
      return CommandExecutionService.convertUserDateToApiTimezone(moment(option));
    }

    throw new Error('Unable to identify date from input option');
  }

  static convertUserDateToApiTimezone(datetime) {
    // NBA Stats API takes EST Days
    return moment(datetime).tz('America/New_York')
                           .startOf('day');
  }

  static identifyDateFromGamesOption(option) {
    let userTimezone = jstz.determine().name();
    let startOfToday = moment().tz(userTimezone).startOf("day");
    switch (option) {
      case GamesOption.YESTERDAY:
        return moment().subtract(1, "days")
                       .tz(userTimezone)
                       .startOf("day");

      case GamesOption.TOMORROW:
        return moment().add(1, "days")
                       .tz(userTimezone)
                       .startOf("day");

      default:
        return startOfToday;
    }
  }

  static identifyGamesOption(option) {
    for (let i = 0; i < GamesOption.enumValues.length; i++) {
      let gamesOption = GamesOption.enumValues[i];
      if (gamesOption.value == option.toUpperCase()) {
        return gamesOption;
      }
    }
  }
}
