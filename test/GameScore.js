'use es6';

import {expect} from 'chai';
import GameScore from '../src/data/models/GameScore';
import Outcome from '../src/data/models/Outcome';

describe('GameScore object', function() {
  let loserScore = 1;
  let winnerScore = 2;
  let awayWinGameScore = new GameScore(loserScore, winnerScore);
  let homeWinGameScore = new GameScore(winnerScore, loserScore);
  let tiedGameScore = new GameScore(loserScore, loserScore);

  it('creates a game score object', function() {
    expect(awayWinGameScore.homeTeam).to.equal(loserScore);
    expect(awayWinGameScore.awayTeam).to.equal(winnerScore);
    expect(awayWinGameScore.getOutcome()).eql(Outcome.AWAY_WIN);

    expect(homeWinGameScore.homeTeam).to.equal(winnerScore);
    expect(homeWinGameScore.awayTeam).to.equal(loserScore);
    expect(homeWinGameScore.getOutcome()).eql(Outcome.HOME_WIN);

    expect(tiedGameScore.homeTeam).to.equal(loserScore);
    expect(tiedGameScore.awayTeam).to.equal(loserScore);
    expect(tiedGameScore.getOutcome()).eql(Outcome.TIE);
  });

  it('tests type checking', function() {
    expect(() => new GameScore('jae', 1)).to.throw(TypeError);
    expect(() => new GameScore(2, 'bradley')).to.throw(TypeError);
    expect(() => new GameScore(-1, 1)).to.throw(RangeError);
    expect(() => new GameScore(1, -1)).to.throw(RangeError);
  });
});
