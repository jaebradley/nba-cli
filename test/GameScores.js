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
      new PeriodScore({periodValue: 1, score: new Score({homeScore: 2, visitorScore: 3})}),
      new PeriodScore({periodValue: 4, score: new Score({homeScore: 5, visitorScore: 6})}),
      new PeriodScore({periodValue: 7, score: new Score({homeScore: 8, visitorScore: 9})}),
    ];
    const customPeriodScores = new GameScores({
      periodScores: periodScores,
    });

    expect(customPeriodScores.getPeriodValues()).to.eql([1, 4, 7]);
  });
});
