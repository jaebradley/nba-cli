'use es6';

import jstz from 'jstimezonedetect';
import moment from 'moment-timezone';

import Constants from '../constants/Constants';
import DataAggregator from '../services/DataAggregator';
import GamesOption from '../data/GamesOption';
import TableCreator from '../services/tables/TableCreator';

export default class CommandExecutionService {
  static executeGamesCommand(option) {
    let date = CommandExecutionService.identifyDateFromOption(option);
    return DataAggregator.aggregate(date)
                         .then(data => TableCreator.create(data));
  }

  static identifyDateFromOption(option) {
    let gamesOption = CommandExecutionService.identifyGamesOption(option);
    if (gamesOption instanceof GamesOption) {
      let userDate = CommandExecutionService.identifyDateFromGamesOption(gamesOption);
      return CommandExecutionService.convertUserDateToApiTimezone(userDate);
    } else if (moment(option).isValid()) {
      let userDate = moment(option).tz(jstz.determine().name()).startOf('day');
      return CommandExecutionService.convertUserDateToApiTimezone(userDate);
    }

    throw new Error('Unable to identify date from input option');
  }

  static convertUserDateToApiTimezone(datetime) {
    // NBA Stats API takes EST Days
    return moment(datetime).tz(Constants.DEFAULT_TIMEZONE)
                           .startOf('day');
  }

  static identifyDateFromGamesOption(option) {
    let userTimezone = jstz.determine().name();
    let startOfToday = moment().tz(userTimezone)
                               .startOf('day');
    switch (option) {
      case GamesOption.YESTERDAY:
        return startOfToday.subtract(1, 'days');

      case GamesOption.TOMORROW:
        return startOfToday.add(1, 'days');

      // if not YESTERDAY or TOMORROW, then must be TODAY
      default:
        return startOfToday;
    }
  }

  static identifyGamesOption(option) {
    for (let gamesOption of GamesOption.enumValues) {
      if (option.toUpperCase() == gamesOption.value) {
        return gamesOption;
      }
    }
  }
}
