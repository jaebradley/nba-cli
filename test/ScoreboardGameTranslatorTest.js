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
    let translatedPeriodScore = ScoreboardGameTranslator.getPeriodScore(homePeriodScore, awayPeriodScore);
    expect(translatedPeriodScore).to.eql(expectedPeriodScore);
  });

  it('should test throwing exceptions when parsing period scores', function() {
    let illegallyFormattedPeriodScore = {};
    expect(() => ScoreboardGameTranslator.getPeriodScore(illegallyFormattedPeriodScore, awayPeriodScore)).to.throw(ReferenceError);
    expect(() => ScoreboardGameTranslator.getPeriodScore(homePeriodScore, illegallyFormattedPeriodScore)).to.throw(ReferenceError);

    illegallyFormattedPeriodScore['period_value'] = 'foo';
    expect(() => ScoreboardGameTranslator.getPeriodScore(illegallyFormattedPeriodScore, awayPeriodScore)).to.throw(ReferenceError);
    expect(() => ScoreboardGameTranslator.getPeriodScore(homePeriodScore, illegallyFormattedPeriodScore)).to.throw(ReferenceError);

    illegallyFormattedPeriodScore['score'] = 'bar';
    expect(() => ScoreboardGameTranslator.getPeriodScore(illegallyFormattedPeriodScore, awayPeriodScore)).to.throw(ReferenceError);
    expect(() => ScoreboardGameTranslator.getPeriodScore(homePeriodScore, illegallyFormattedPeriodScore)).to.throw(ReferenceError);
  });

  it('should test period scores parsing', function() {
    let translatedPeriodScores = ScoreboardGameTranslator.getPeriodScores(homePeriodScores, awayPeriodScores);
    expect(translatedPeriodScores).to.eql(expectedPeriodScores);
  });

  it('should test missing fields when parsing period scores', function() {
    let illegallyFormattedPeriodScore = {};
    expect(ScoreboardGameTranslator.getPeriodScores(illegallyFormattedPeriodScore, awayPeriodScores)).to.eql(List());
    expect(ScoreboardGameTranslator.getPeriodScores(homePeriodScores, illegallyFormattedPeriodScore)).to.eql(List());

    illegallyFormattedPeriodScore['linescores'] = {};
    expect(ScoreboardGameTranslator.getPeriodScores(illegallyFormattedPeriodScore, awayPeriodScores)).to.eql(List());
    expect(ScoreboardGameTranslator.getPeriodScores(homePeriodScores, illegallyFormattedPeriodScore)).to.eql(List());
  });

  it('should test get team', function() {
    expect(ScoreboardGameTranslator.getTeam(team)).to.eql(expectedTeam);
  });

  it('should test throwing exceptions when parsing team', function() {
    let illegallyFormattedTeam = {};
    expect(() => ScoreboardGameTranslator.getTeam(illegallyFormattedTeam)).to.throw(ReferenceError);

    illegallyFormattedTeam['city'] = 'foo';
    expect(() => ScoreboardGameTranslator.getTeam(illegallyFormattedTeam)).to.throw(ReferenceError);

    illegallyFormattedTeam['nickname'] = 'bar';
    expect(() => ScoreboardGameTranslator.getTeam(illegallyFormattedTeam)).to.throw(ReferenceError);
  });

  it('should test getting broadcast', function() {
    expect(ScoreboardGameTranslator.getBroadcast(broadcast, broadcastMedium)).to.eql(expectedBroadcast);
  });

  it('should test throwing exceptions when parsing broadcast', function() {
    let illegallyFormattedBroadcast = {};
    expect(() => ScoreboardGameTranslator.getBroadcast(illegallyFormattedBroadcast, broadcastMedium)).to.throw(ReferenceError);

    illegallyFormattedBroadcast['scope'] = 'foo';
    expect(() => ScoreboardGameTranslator.getBroadcast(illegallyFormattedBroadcast, broadcastMedium)).to.throw(ReferenceError);

    illegallyFormattedBroadcast['display_name'] = 'bar';
    expect(() => ScoreboardGameTranslator.getBroadcast(illegallyFormattedBroadcast, 'baz')).to.throw(TypeError);
  });
});
