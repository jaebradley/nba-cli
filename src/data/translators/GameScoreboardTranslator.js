'use es6';

import {List} from 'immutable';
import moment from 'moment-timezone';
import jstz from 'jstimezonedetect';

import HtmlEscaper from '../../utils/HtmlEscaper';
import GameStatus from '../models/GameStatus';
import Constants from '../../constants/Constants';
import Location from '../models/Location';
import Period from '../models/Period';
import Broadcast from '../models/Broadcast';
import BroadcastMedium from '../models/BroadcastMedium';

export default class GameScoreboardTranslator {
  static translate(data) {
    if (!('sports_content' in data)) {
      throw new ReferenceError('sports_content field missing');
    }

    if (!('game' in data.sports_content)) {
      throw new ReferenceError('game field missing');
    }

    if (!('period_time' in data.sports_content.game)) {
      throw new ReferenceError('period_time field missing');
    }

    if (!('broadcasters' in data.sports_content.game)) {
      throw new ReferenceError('broadcasters field missing');
    }

    if (!('home' in data.sports_content.game)) {
      throw new ReferenceError('home field missing');
    }

    if (!('visitor' in data.sports_content.game)) {
      throw new ReferenceError('visitor field missing');
    }

    let gameData = data.sports_content.game;
    let periodTime = gameData.period_time;
    let broadcasters = gameData.broadcasters;
    let homeData = gameData.home;
    let awayData = gameData.visitor;

    return new GameScoreboard(gameData.id,
                              GameScoreboardTranslator.getGameStatus(periodTime),
                              GameScoreboardTranslator.getStartTimestamp(gameData),
                              GameScoreboardTranslator.getLocation(gameData),
                              GameScoreboardTranslator.getPeriod(periodTime),
                              GameScoreboardTranslator.getBroadcasts(broadcasters),
                              GameScoreboardTranslator.getMatchup(homeData, awayData),
                              GameScoreboardTranslator.getScoring(homeData, awayData));
  }

  static getGameStatus(periodTime) {
    if (!('game_status') in periodTime) {
      throw new ReferenceError('game_status field not in data');
    }

    return GameStatus.from(periodTime.game_status);
  }

  static getStartTimestamp(gameData) {
    if (!('date' in gameData)) {
      throw new ReferenceError('date field missing');
    }

    if (!('time' in gameData)) {
      throw new ReferenceError('time field missing');
    }

    let rawStartTime = `${gameData.date}${gameData.time}`;

    return moment(dateStartTime, Constants.TRANSLATED_NBA_DATE_TIME_FORMAT)
            .tz(Constants.DEFAULT_TIMEZONE)
            .clone()
            .tz("UTC")
            .valueOf();
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

    return new Period(parseInt(periodTime.period_value),
                      periodTime.period_status,
                      periodTime.game_clock);
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

    let broadcasts = [];
    let radioBroadcasters = broadcasters.radio.broadcaster;
    let tvBroadcasters = broadcasters.tv.broadcaster;

    radioBroadcasters.map(broadcast => broadcasts.push(GameScoreboardTranslator.getBroadcast(broadcast, BroadcastMedium.RADIO)));

    tvBroadcasters.map(broadcast => broadcasts.push(GameScoreboardTranslator.getBroadcast(broadcast, BroadcastMedium.TV)));

    return List.of(broadcasts);
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

    return new Broadcast(broadcast.scope, broadcast.display_name, medium);
  }

  static getMatchup(homeData, awayData) {
    return new Matchup(GameScoreboardTranslator.getTeam(homeData),
                       GameScoreboardTranslator.getTeam(awayData));
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
    return new GameScoring(GameScoreboardTranslator.getPeriodScores(homeData, awayData),
                           GameScoreboardTranslator.getTotalScore(homeData, awayData));
  }

  static getPeriodScores(homeData, awayData) {
    if (!('linescores' in homeData)) {
      throw new ReferenceError('home linescores field missing');
    }

    if (!('linescores' in awayData)) {
      throw new ReferenceError('away linescores field missing');
    }

    if (!('period') in homeData.linescores) {
      throw new ReferenceError('home period field missing');
    }

    if (!('period' in awayData.linescores)) {
      throw new ReferenceError('away period field missing');
    }

    let homePeriodScores = homeData.linescores.period;
    let awayPeriodScores = awayData.linescores.period;

    if (homePeriodScores.length != awayPeriodScores.length) {
      throw new Error('home period scores length is not equal to the away period scores length');
    }

    let periodScores = [];

    for (let index = 0; index < homePeriodScores.length; index++) {
      let homePeriodScore = homePeriodScores[length];
      let awayPeriodScore = awayPeriodScores[length];
      periodScores.push(GameScoreboardTranslator.getPeriodScore(homePeriodScore, awayPeriodScore));
    }

    return List.of(periodScores);
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

    return new PeriodScore(homePeriodScore.period_value,
                           new Score(homePeriodScore.score, awayPeriodScore.score));
  }

  static getTotalScore(homeData, awayData) {
    if (!('score' in homeData)) {
      throw new ReferenceError('home score field missing');
    }

    if (!('score' in awayData)) {
      throw new ReferenceError('visitor score field missing');
    }

    return new Score(parseInt(homeData.score),
                     parseInt(awayData.score));
  }

  static getPeriodScores(homeData, awayData) {

  }
}
