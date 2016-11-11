'use es6';

import {expect} from 'chai';
import GameScore from '../src/data/models/GameScore';
import Outcome from '../src/data/models/Outcome';

describe('GameScore object', function() {
  let loserScore = 1;
  let winnerScore = 2;
  let losingScore = new GameScore(loserScore, winnerScore);
  let winningScore = new GameScore(winnerScore, loserScore);
  let tiedScore = new GameScore(loserScore, loserScore);

  it('creates a game score object', function() {
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
    expect(() => new GameScore('jae', 1)).to.throw(TypeError);
    expect(() => new GameScore(2, 'bradley')).to.throw(TypeError);
    expect(() => new GameScore(-1, 1)).to.throw(RangeError);
    expect(() => new GameScore(1, -1)).to.throw(RangeError);
  });
});
