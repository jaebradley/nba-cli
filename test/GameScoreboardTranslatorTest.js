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
import GameScoreboardTranslator from '../src/services/translators/GameScoreboardTranslator';

chai.use(chaiImmutable);

let expect = chai.expect;

describe('translate game scoreboards', function() {
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
  let homePeriodScore = {
    'period_value': period1Value,
    'score': homeScore1
  };
  let awayPeriodScore = {
    'period_value': period1Value,
    'score': awayScore1
  };
  let expectedPeriodScore = new PeriodScore({
    period: period1,
    score: score1
  });

  let homePeriodScores = {
    'linescores': {
      'period': [
        homePeriodScore,
        homePeriodScore
      ]
    }
  };
  let awayPeriodScores = {
    'linescores': {
      'period': [
        awayPeriodScore,
        awayPeriodScore
      ]
    }
  }
  let expectedPeriodScores = List.of(
    expectedPeriodScore,
    expectedPeriodScore
  );

  let teamCity = 'Boston';
  let teamNickname = 'Celtics';
  let teamAbbreviation = 'BOS';

  let team = {
    'city': teamCity,
    'nickname': teamNickname,
    'abbreviation': teamAbbreviation
  };
  let expectedTeam = new Team({
    city: teamCity,
    nickname: teamNickname,
    abbreviation: teamAbbreviation
  });

  let broadcastScope = 'scope';
  let broadcastDisplayName = 'displayName';
  let broadcastMedium = BroadcastMedium.TV;
  let broadcast = {
    'scope': broadcastScope,
    'display_name': broadcastDisplayName
  };
  let expectedBroadcast = new Broadcast({
    scope: broadcastScope,
    name: broadcastDisplayName,
    medium: broadcastMedium
  });

  it('should test period scores parsing', function() {
    let translatedPeriodScores = GameScoreboardTranslator.getPeriodScores(homePeriodScores, awayPeriodScores);
    expect(translatedPeriodScores).to.eql(expectedPeriodScores);
  });
});
