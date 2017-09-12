import chai from 'chai';
import chaiImmutable from 'chai-immutable';

import { List } from 'immutable';

import Play from '../src/data/Play';
import PlaysTranslator from '../src/services/translators/PlaysTranslator';

chai.use(chaiImmutable);

const expect = chai.expect;

describe('Test Plays Translator', () => {
  const clock = 'jae';
  const description = 'baebae';
  const teamAbbreviation = 'jbb';
  const period = '1';
  const period2 = '2';
  const play = {
    'clock': clock,
    'description': description,
    'team_abr': teamAbbreviation,
    'period': period,
  };

  const translatedPlay = new Play({
    description: description,
    clock: clock,
    period: parseInt(period),
    teamAbbreviation: teamAbbreviation,
  });

  const plays = [play, play, play];

  it('should translate plays', () => {
    const expected = List.of(translatedPlay, translatedPlay, translatedPlay);
    expect(PlaysTranslator.translate(plays)).to.eql(expected);
  });
});
