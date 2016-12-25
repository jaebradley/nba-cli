'use es6';

import {List} from 'immutable';
import moment from 'moment-timezone';
import jstz from 'jstimezonedetect';

import HtmlEscaper from '../../utils/HtmlEscaper';
import GameStatus from '../../data/GameStatus';
import GameScoring from '../../data/GameScoring';
import GameScoreboard from '../../data/GameScoreboard';
import Constants from '../../constants/Constants';
import Location from '../../data/Location';
import Period from '../../data/Period';
import PeriodScore from '../../data/PeriodScore';
import Score from '../../data/Score';
import Matchup from '../../data/Matchup';
import Team from '../../data/Team';
import Broadcast from '../../data/Broadcast';
import BroadcastMedium from '../../data/BroadcastMedium';

export default class ScoreboardGameTranslator {
  static translate(data) {

    if (!('period_time' in data)) {
      throw new ReferenceError('period_time field missing');
    }

    if (!('broadcasters' in data)) {
      throw new ReferenceError('broadcasters field missing');
    }

    if (!('home' in data)) {
      throw new ReferenceError('home field missing');
    }

    if (!('visitor' in data)) {
      throw new ReferenceError('visitor field missing');
    }

    let periodTime = data.period_time;
    let broadcasters = data.broadcasters;
    let homeData = data.home;
    let awayData = data.visitor;

    return new GameScoreboard({
      id: data.id,
      status: ScoreboardGameTranslator.getGameStatus(periodTime),
      startTimestamp: ScoreboardGameTranslator.getStartTimestamp(data),
      location: ScoreboardGameTranslator.getLocation(data),
      period: ScoreboardGameTranslator.getPeriod(periodTime),
      broadcasts: ScoreboardGameTranslator.getBroadcasts(broadcasters),
      matchup: ScoreboardGameTranslator.getMatchup(homeData, awayData),
      scoring: ScoreboardGameTranslator.getScoring(homeData, awayData)
    });
  }

  static getGameStatus(periodTime) {
    if (!('game_status') in periodTime) {
      throw new ReferenceError('game_status field not in data');
    }

    for (let status of GameStatus.enumValues) {
      if (status.nbaStatsGameStatus == periodTime.game_status) {
        return status;
      }
    }

    throw new ReferenceError('unknown nba stats game status');
  }

  static getStartTimestamp(gameData) {
    if (!('date' in gameData)) {
      throw new ReferenceError('date field missing');
    }

    if (!('time' in gameData)) {
      throw new ReferenceError('time field missing');
    }

    let rawStartTime = `${gameData.date}${gameData.time}`;

    return moment(rawStartTime, Constants.TRANSLATED_NBA_DATE_TIME_FORMAT)
            .tz(Constants.DEFAULT_TIMEZONE)
            .clone()
            .tz("UTC");
  }

  static getLocation(gameData) {
    if (!('arena' in gameData)) {
      throw new ReferenceError('arena field missing');
    }

    if (!('city' in gameData)) {
      throw new ReferenceError('city field missing');
    }

    if (!('state' in gameData)) {
      throw new ReferenceError('state field missing');
    }

    return new Location({
      arena: gameData.arena,
      city: gameData.city,
      state: gameData.state,
    });
  }

  static getPeriod(periodTime) {
    if (!('period_status' in periodTime)) {
      throw new ReferenceError('period_status field missing');
    }

    if (!('period_value' in periodTime)) {
      throw new ReferenceError('period_value field missing');
    }

    if (!('game_clock' in periodTime)) {
      throw new ReferenceError('game_clock field missing');
    }

    return new Period({
      value: parseInt(periodTime.period_value),
      status: periodTime.period_status,
      clock: periodTime.game_clock
    });
  }

  static getBroadcasts(broadcasters) {
    if (!('radio' in broadcasters)) {
      throw new ReferenceError('radio field missing');
    }

    if (!('tv' in broadcasters)) {
      throw new ReferenceError('tv field missing');
    }

    if (!('broadcaster' in broadcasters.radio)) {
      throw new ReferenceError('radio broadcasters field missing');
    }

    if (!('broadcaster' in broadcasters.tv)) {
      throw new ReferenceError('tv broadcasters field missing');
    }

    let radioBroadcasters = List(broadcasters.radio.broadcaster
                                             .map(broadcast => ScoreboardGameTranslator.getBroadcast(broadcast, BroadcastMedium.RADIO)));
    let tvBroadcasters = List(broadcasters.tv.broadcaster
                                          .map(broadcast => ScoreboardGameTranslator.getBroadcast(broadcast, BroadcastMedium.TV)));

    return tvBroadcasters.concat(radioBroadcasters);
  }

  static getBroadcast(broadcast, medium) {
    if (!('scope' in broadcast)) {
      throw new ReferenceError('broadcast scope field missing');
    }

    if (!('display_name' in broadcast)) {
      throw new ReferenceError('broadcast display name field missing');
    }

    if (!(medium instanceof BroadcastMedium)) {
      throw new TypeError('medium must be a BroadcastMedium');
    }

    return new Broadcast({
      scope: broadcast.scope,
      name: broadcast.display_name,
      medium: medium
    });
  }

  static getMatchup(homeData, awayData) {
    return new Matchup({
      homeTeam: ScoreboardGameTranslator.getTeam(homeData),
      awayTeam: ScoreboardGameTranslator.getTeam(awayData)
    });
  }

  static getTeam(team) {
    if (!('city' in team)) {
      throw new ReferenceError('city field missing');
    }

    if (!('nickname' in team)) {
      throw new ReferenceError('nickname field missing');
    }

    if (!('abbreviation' in team)) {
      throw new ReferenceError('abbreviation field missing');
    }

    return new Team({
      city: team.city,
      nickname: team.nickname,
      abbreviation: team.abbreviation,
    });
  }

  static getScoring(homeData, awayData) {
    return new GameScoring({
      periods: ScoreboardGameTranslator.getPeriodScores(homeData, awayData),
      total: ScoreboardGameTranslator.getTotalScore(homeData, awayData)
    });
  }

  static getPeriodScores(homeData, awayData) {
    // if period scores are not found, return an empty list
    if (!('linescores' in homeData)) {
      return List();
    }

    if (!('linescores' in awayData)) {
      return List();
    }

    if (!('period') in homeData.linescores) {
      return List();
    }

    if (!('period' in awayData.linescores)) {
      return List();
    }

    let homePeriodScores = homeData.linescores.period;
    let awayPeriodScores = awayData.linescores.period;

    if (homePeriodScores.length != awayPeriodScores.length) {
      throw new Error('home period scores length is not equal to the away period scores length');
    }

    let periodScores = List();
    for (let index = 0; index < homePeriodScores.length; index++) {
      let homePeriodScore = homePeriodScores[index];
      let awayPeriodScore = awayPeriodScores[index];
      periodScores = periodScores.push(ScoreboardGameTranslator.getPeriodScore(homePeriodScore, awayPeriodScore));
    }

    return periodScores;
  }

  static getPeriodScore(homePeriodScore, awayPeriodScore) {
    if (!('period_value' in homePeriodScore)){
      throw new ReferenceError('home period value field missing');
    }

    if (!('score' in homePeriodScore)) {
      throw new ReferenceError('home score field missing');
    }

    if (!('period_value' in awayPeriodScore)){
      throw new ReferenceError('away period value field missing');
    }

    if (!('score' in awayPeriodScore)) {
      throw new ReferenceError('away score field missing');
    }

    if (homePeriodScore.period_value != awayPeriodScore.period_value) {
      throw new ReferenceError('different period values');
    }

    return new PeriodScore({
      period: parseInt(homePeriodScore.period_value),
      score: new Score({
        home: parseInt(homePeriodScore.score),
        away: parseInt(awayPeriodScore.score)
      })
    });
  }

  static getTotalScore(homeData, awayData) {
    if (!('score' in homeData)) {
      return new Score();
    }

    if (!('score' in awayData)) {
      return new Score();
    }

    return new Score({
      home: parseInt(homeData.score),
      away: parseInt(awayData.score)
    });
  }
}
