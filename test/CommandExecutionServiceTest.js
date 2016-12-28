'use es6';

import {expect} from 'chai';
import jstz from 'jstimezonedetect';
import moment from 'moment-timezone';

import CommandExecutionService from '../src/services/CommandExecutionService';
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
});
