import chai from 'chai';
import chaiImmutable from 'chai-immutable';
import { List } from 'immutable';

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

const expect = chai.expect;

describe('translate game scoreboard', function() {
  const homeScore1Value = '1';
  const awayScore1Value = '2';
  const homeScore1 = 1;
  const awayScore1 = 2;

  const period1Value = '3';
  const anotherPeriod1Value = '4';
  const period1 = 3;
  const anotherPeriod1 = 4;
  const score1 = new Score({
    home: homeScore1,
    away: awayScore1
  });
  const homePeriodScore = {
    'period_value': period1Value,
    'score': homeScore1
  };
  const awayPeriodScore = {
    'period_value': period1Value,
    'score': awayScore1
  };
  const expectedPeriodScore = new PeriodScore({
    period: period1,
    score: score1
  });

  const homePeriodScores = {
    'linescores': {
      'period': [
        homePeriodScore,
        homePeriodScore
      ]
    }
  };
  const awayPeriodScores = {
    'linescores': {
      'period': [
        awayPeriodScore,
        awayPeriodScore
      ]
    }
  }
  const expectedPeriodScores = List.of(
    expectedPeriodScore,
    expectedPeriodScore
  );

  const teamCity = 'Boston';
  const teamNickname = 'Celtics';
  const teamAbbreviation = 'BOS';

  const team = {
    'city': teamCity,
    'nickname': teamNickname,
    'abbreviation': teamAbbreviation
  };
  const expectedTeam = new Team({
    city: teamCity,
    nickname: teamNickname,
    abbreviation: teamAbbreviation
  });

  const broadcastScope = 'scope';
  const broadcastDisplayName = 'displayName';
  const broadcastMedium = BroadcastMedium.TV;
  const broadcast = {
    'scope': broadcastScope,
    'display_name': broadcastDisplayName
  };
  const expectedBroadcast = new Broadcast({
    scope: broadcastScope,
    name: broadcastDisplayName,
    medium: broadcastMedium
  });

  it('should test period scores parsing', function() {
    const translatedPeriodScores = GameScoreboardTranslator.getPeriodScores(homePeriodScores, awayPeriodScores);
    expect(expectedPeriodScores).to.eql(translatedPeriodScores);
  });

  it('should test getting broadcasts', () => {
    const scope = 'scope';
    const displayName = 'displayName';
    const broadcast = {
      'scope': scope,
      'display_name': displayName
    };
    const broadcasters = {
      radio: {
        broadcaster: [
          broadcast,
        ],
      },
    tv: {
      broadcaster: [
        broadcast,
      ],
    },
  };
  const expected = List.of(
    new Broadcast({
      scope: scope,
      name: displayName,
      medium: BroadcastMedium.TV,
    }),
    new Broadcast({
      scope: scope,
      name: displayName,
      medium: BroadcastMedium.RADIO,
    }),
  );
  expect(expected).to.eql(GameScoreboardTranslator.getBroadcasts(broadcasters));
  });
});
