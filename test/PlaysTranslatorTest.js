'use es6';

import chai from 'chai';
import chaiImmutable from 'chai-immutable';

import {List} from 'immutable';
import Play from '../src/data/Play';
import PlaysTranslator from '../src/services/translators/PlaysTranslator';

chai.use(chaiImmutable);

let expect = chai.expect;

describe('Test Plays Translator', function() {
  let clock = 'jae';
  let description = 'baebae';
  let teamAbbreviation = 'jbb';
  let period = '1';
  let period2 = '2';
  let play = {
    'clock': clock,
    'description': description,
    'team_abr': teamAbbreviation,
    'period': period
  };

  let translatedPlay = new Play({
    description: description,
    clock: clock,
    period: parseInt(period),
    teamAbbreviation: teamAbbreviation
  });

  let play2 = {
    'clock': clock,
    'description': description,
    'team_abr': teamAbbreviation,
    'period': period2
  }

  let translatedPlay2 = new Play({
    description: description,
    clock: clock,
    period: parseInt(period2),
    teamAbbreviation: teamAbbreviation
  });

  let data = {
    'sports_content': {
      'game': {
        'play': [
          play,
          play,
          play
        ]
      }
    }
  }

  let data2 = {
    'sports_content': {
      'game': {
        'play': [
          play,
          play,
          play,
          play,
          play,
          play2
        ]
      }
    }
  }
  it('should build play', function() {
    expect(PlaysTranslator.buildPlay(play)).to.eql(translatedPlay);
  });

  it('should translate play', function() {
    let expected = List.of(translatedPlay, translatedPlay, translatedPlay);
    expect(PlaysTranslator.translate(data)).to.eql(expected);

    let expected2 = List.of(translatedPlay, translatedPlay, translatedPlay, translatedPlay, translatedPlay2);
    expect(PlaysTranslator.translate(data2)).to.eql(expected2);
  });
});
