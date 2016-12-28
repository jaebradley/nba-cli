'use es6';

import {expect} from 'chai';

import CommandExecutionService from '../src/services/CommandExecutionService';
import GamesOption from '../src/data/GamesOption';

describe('Tests Command Execution Service', function() {
  it('should identify games option', function() {
    let option = GamesOption.TODAY;
    let optionValue = option.value;
    expect(CommandExecutionService.identifyGamesOption(optionValue)).to.eql(option);
    expect(CommandExecutionService.identifyGamesOption('')).to.eql(undefined);
  });
});
