'use es6';

import {expect} from 'chai';
import jstz from 'jstimezonedetect';
import moment from 'moment-timezone';

import CommandExecutionService from '../src/services/CommandExecutionService';
import Constants from '../src/constants/Constants';
import GamesOption from '../src/data/GamesOption';

describe('Tests Command Execution Service', function() {
  let startOfToday = moment().tz(jstz.determine().name())
                             .startOf('day');
  let tomorrowExpected = moment().tz(jstz.determine().name())
                                 .startOf('day')
                                 .add(1, 'days');
  let yesterdayExpected = moment().tz(jstz.determine().name())
                                  .startOf('day')
                                  .subtract(1, 'days');
  let yesterdayNbaStatsTzExpected = moment().tz(jstz.determine().name())
                                            .startOf('day')
                                            .subtract(1, 'days')
                                            .tz(Constants.DEFAULT_TIMEZONE)
                                            .startOf('day');
  let convertedDate = moment().year(2016)
                              .month(1)
                              .date(1)
                              .tz(jstz.determine().name())
                              .startOf('day')
                              .tz(Constants.DEFAULT_TIMEZONE)
                              .startOf('day');
  it('should identify games option', function() {
    let option = GamesOption.TODAY;
    let optionValue = option.value;
    expect(CommandExecutionService.identifyGamesOption(optionValue)).to.eql(option);
    expect(CommandExecutionService.identifyGamesOption('')).to.eql(undefined);
  });

  it('should identify date from games option', function() {
    expect(CommandExecutionService.identifyDateFromGamesOption(GamesOption.YESTERDAY)).to.eql(yesterdayExpected);
    expect(CommandExecutionService.identifyDateFromGamesOption(GamesOption.TOMORROW)).to.eql(tomorrowExpected);
    expect(CommandExecutionService.identifyDateFromGamesOption(GamesOption.TODAY)).to.eql(startOfToday);
  });

  it('should convert local date to nba stats api timezone', function() {
    expect(CommandExecutionService.convertUserDateToApiTimezone(yesterdayExpected)).to.eql(yesterdayNbaStatsTzExpected);
  });

  it('should identify date from option', function() {
    expect(CommandExecutionService.identifyDateFromOption('yesterday')).to.eql(yesterdayNbaStatsTzExpected);

    // moment fields are not exactly the same so have to test time matching this way
    expect(CommandExecutionService.identifyDateFromOption('2016-02-01').valueOf()).to.equal(convertedDate.valueOf());
    expect(() => CommandExecutionService.identifyDateFromOption('')).to.throw(Error);
  });
});
