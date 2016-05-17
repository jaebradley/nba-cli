'use es6';

import moment from 'moment-timezone';
import jstz from 'jstimezonedetect';
import emoji from 'node-emoji';

import CommandLineOutputClient from '../output/CommandLineOutputClient.js';
import Constants from '../../constants/Constants.js';


export default class GamesCommand {
  constructor() {
    this.userTimezone = jstz.determine().name();
    this.commandLineOutputClient = new CommandLineOutputClient();
  }

  generateDateRange(timeRangeOption) {
    let startOfToday = moment().tz(this.userTimezone).startOf("day");
    let endOfToday = moment().tz(this.userTimezone).endOf("day");
    if (typeof timeRangeOption === 'undefined') {
      return {startDate: startOfToday, endDate: endOfToday};
    }

    switch (timeRangeOption.toUpperCase()) {

      case Constants.GAMES_OPTIONS.TODAY:
        return {startDate: startOfToday, endDate: endOfToday};

      case Constants.GAMES_OPTIONS.YESTERDAY:
        return {
          startDate: moment().subtract(1, "days").tz(this.userTimezone).startOf("day"),
          endDate: moment().subtract(1, "days").tz(this.userTimezone).endOf("day"), 
        };

      case Constants.GAMES_OPTIONS.TOMORROW:
        return {
          startDate: moment().add(1, "days").tz(this.userTimezone).startOf("day"),
          endDate: moment().add(1, "days").tz(this.userTimezone).endOf("day"), 
        };

      default:
        let customDateTime = new Date(timeRangeOption);
        if (moment(customDateTime).isValid()) {
          return {
            startDate: moment(customDateTime).tz(this.userTimezone).startOf("day"),
            endDate: moment(customDateTime).tz(this.userTimezone).endOf("day"), 
          };
        }
    }
  }

  run(timeRangeOption) {
    let dateRange = this.generateDateRange(timeRangeOption);
    this.commandLineOutputClient.outputGamesForDateRange(dateRange.startDate, dateRange.endDate);
  }
};
