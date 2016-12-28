'use es6';

import chai from 'chai';
import chaiImmutable from 'chai-immutable';
import {List} from 'immutable';

import Broadcast from '../src/data/Broadcast';
import BroadcastMedium from '../src/data/BroadcastMedium';
import GameStatus from '../src/data/GameStatus';
import Location from '../src/data/Location';
import Period from '../src/data/Period';
import PeriodScore from '../src/data/PeriodScore';
import Matchup from '../src/data/Matchup';
import Team from '../src/data/Team';
import Score from '../src/data/Score';
import ScoreboardGameTranslator from '../src/services/translators/ScoreboardGameTranslator';

chai.use(chaiImmutable);

let expect = chai.expect;

describe('translate scoreboard game', function() {
  let homeScore1Value = '1';
  let awayScore1Value = '2';
  let homeScore1 = 1;
  let awayScore1 = 2;

  let period1Value = '3';
  let anotherPeriod1Value = '4';
  let period1 = 3;
  let anotherPeriod1 = 4;
  let score1 = new Score({
    home: homeScore1,
    away: awayScore1
  });

  it('should test total score parsing', function() {
    let homeData = {
      'score': homeScore1Value
    };
    let awayData = {
      'score': awayScore1Value
    };

    let totalScore = ScoreboardGameTranslator.getTotalScore(homeData, awayData)
    expect(totalScore).to.eql(score1);
  });

  it('should test period score parsing', function() {
    let homePeriodScore = {
      'period_value': period1Value,
      'score': homeScore1
    };
    let awayPeriodScore = {
      'period_value': period1Value,
      'score': awayScore1
    };
    let periodScore1 = new PeriodScore({
      period: period1,
      score: score1
    });
    let periodScore = ScoreboardGameTranslator.getPeriodScore(homePeriodScore, awayPeriodScore);
    expect(periodScore).to.eql(periodScore1);
  });
});
