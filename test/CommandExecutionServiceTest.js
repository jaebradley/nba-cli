'use es6';

import {expect} from 'chai';
import jstz from 'jstimezonedetect';
import moment from 'moment-timezone';

import CommandExecutionService from '../src/services/CommandExecutionService';
import GamesOption from '../src/data/GamesOption';

describe('Tests Command Execution Service', function() {
  it('should identify games option', function() {
    let option = GamesOption.TODAY;
    let optionValue = option.value;
    expect(CommandExecutionService.identifyGamesOption(optionValue)).to.eql(option);
    expect(CommandExecutionService.identifyGamesOption('')).to.eql(undefined);
  });

  it('should identify date from games option', function() {
    let startOfToday = moment().tz(jstz.determine().name())
                               .startOf('day');
    let yesterday = GamesOption.YESTERDAY;
    expect(CommandExecutionService.identifyDateFromGamesOption(yesterday)).to.eql(startOfToday.subtract(1, 'days'));
  });
});
