'use es6';

import {expect} from 'chai';
import Score from '../src/data/models/Score';
import Outcome from '../src/data/models/Outcome';

describe('Score object', function() {
  let loserScore = 1;
  let winnerScore = 2;
  let losingScore = new Score(loserScore, winnerScore);
  let winningScore = new Score(winnerScore, loserScore);
  let tiedScore = new Score(loserScore, loserScore);

  it('creates a score object', function() {
    expect(losingScore.home).to.equal(loserScore);
    expect(losingScore.away).to.equal(winnerScore);
    expect(losingScore.getOutcome()).eql(Outcome.AWAY_WIN);

    expect(winningScore.home).to.equal(winnerScore);
    expect(winningScore.away).to.equal(loserScore);
    expect(winningScore.getOutcome()).eql(Outcome.HOME_WIN);

    expect(tiedScore.home).to.equal(loserScore);
    expect(tiedScore.away).to.equal(loserScore);
    expect(tiedScore.getOutcome()).eql(Outcome.TIE);
  });

  it('tests type checking', function() {
    expect(() => new Score('jae', 1)).to.throw(TypeError);
    expect(() => new Score(2, 'bradley')).to.throw(TypeError);
    expect(() => new Score(-1, 1)).to.throw(RangeError);
    expect(() => new Score(1, -1)).to.throw(RangeError);
  });
});
