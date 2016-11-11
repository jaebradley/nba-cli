'use es6';

import {expect} from 'chai';
import PeriodScore from '../src/data/models/PeriodScore';
import Score from '../src/data/models/Score';

describe('Period score model object', function() {
  let period = 1;
  let invalidPeriod = -1;

  let loserValue = 5;
  let winnerValue = 10;
  let tiedScore = new Score(winnerValue, winnerValue);
  const periodScore = new PeriodScore(period, tiedScore);

  it('creates period score with tied values', function() {
    expect(periodScore.period).to.equal(period);
    expect(periodScore.score).to.equal(tiedScore);
  });

  it('test exceptional cases', function() {
    expect(() => new PeriodScore('jae', tiedScore)).to.throw(TypeError);
    expect(() => new PeriodScore(period, 'bradley')).to.throw(TypeError);
    expect(() => new PeriodScore(invalidPeriod, tiedScore)).to.throw(RangeError);
  });
});
