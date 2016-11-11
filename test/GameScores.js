'use es6';

import {expect} from 'chai';
import GameScores from '../src/data/models/GameScores';
import PeriodScore from '../src/data/models/PeriodScore';
import Score from '../src/data/models/Score';

describe('Game scores model', function() {
  it('creates game scores model', function() {
    const defaultGameScores = new GameScores();

    expect(defaultGameScores.periodScores).to.eql([]);
    expect(defaultGameScores.totalScore.homeScore).to.equal(0);
    expect(defaultGameScores.totalScore.visitorScore).to.equal(0);
  });

  it('get period values', function() {
    const periodScores = [
      new PeriodScore(1, new Score(2, 3)),
      new PeriodScore(4, new Score(5, 6)),
      new PeriodScore(7, new Score(8, 9)),
    ];
    const customPeriodScores = new GameScores({
      periodScores: periodScores,
    });

    expect(customPeriodScores.getPeriodValues()).to.eql([1, 4, 7]);
  });
});
