'use es6';

import chai from 'chai';
import chaiImmutable from 'chai-immutable';
import {List} from 'immutable';

import GameScoring from '../src/data/GameScoring';
import PeriodScore from '../src/data/PeriodScore';
import Score from '../src/data/Score';

chai.use(chaiImmutable);

let expect = chai.expect;

describe('Game Scoring Test', function() {
  let periodScore = new PeriodScore({
    period: 1,
    score: new Score({
      home: 2,
      away: 3
    })
  });
  let periods = List.of(periodScore, periodScore);
  let gameScoring = new GameScoring({
    periods: periods
  });
  it('should get period values', function() {
    let expected = List.of('Q1', 'Q1');
    expect(gameScoring.getPeriodValues()).to.eql(expected);
  })
});
