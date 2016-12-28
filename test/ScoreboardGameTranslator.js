'use es6';

import chai from 'chai';
import chaiImmutable from 'chai-immutable';
import {List} from 'immutable';

import Broadcast from '../src/data/Broadcast';
import BroadcastMedium from '../src/data/BroadcastMedium';
import GameStatus from '../src/data/GameStatus';
import Location from '../src/data/Location';
import Period from '../src/data/Period';
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
  let homeData = {
    'score': homeScore1Value
  };
  let awayData = {
    'score': awayScore1Value
  };

  it('should test total score parsing', function() {
    let expected = new Score({
      home: homeScore1,
      away: awayScore1
    });
    let totalScore = ScoreboardGameTranslator.getTotalScore(homeData, awayData)
    expect(totalScore).to.eql(expected);
  });
});
