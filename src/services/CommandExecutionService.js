'use es6';

import jstz from 'jstimezonedetect';
import moment from 'moment-timezone';

import DataAggregator from '../data/services/DataAggregator';
import GamesOption from '../data/models/GamesOption';
import TableCreator from '../tables/TableCreator';

export default class CommandExecutionService {
  static identifyDateFromOption(option) {
    let date = deserializeDateFromOption(option);
    let data = DataAggregator.aggregate(date.year(), date.month(), date.day());
    return TableCreator.create(data);
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
    let startOfToday = moment().tz(this.userTimezone).startOf("day");

    switch (option) {
      case GamesOption.YESTERDAY:
        return moment().subtract(1, "days")
                       .tz(this.userTimezone)
                       .startOf("day");

      case GamesOption.TOMORROW:
        return moment().add(1, "days")
                       .tz(this.userTimezone)
                       .startOf("day");

      default:
        return startOfToday;
    }
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
