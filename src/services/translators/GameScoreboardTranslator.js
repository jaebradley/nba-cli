import { List } from 'immutable';
import moment from 'moment-timezone';

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

export default class GameScoreboardTranslator {
  static translate(data) {
    const { broadcasters } = data;
    const periodTime = data.period_time;
    const homeData = data.home;
    const awayData = data.visitor;

    return new GameScoreboard({
      id: data.id,
      status: GameScoreboardTranslator.getGameStatus(periodTime.game_status),
      startTimestamp: GameScoreboardTranslator.getStartTimestamp(data),
      location: new Location({
        arena: data.arena,
        city: data.city,
        state: data.state,
      }),
      period: new Period({
        value: parseInt(periodTime.period_value, 10),
        status: periodTime.period_status,
        clock: periodTime.game_clock,
      }),
      broadcasts: GameScoreboardTranslator.getBroadcasts(broadcasters),
      matchup: new Matchup({
        homeTeam: new Team({
          city: homeData.city,
          nickname: homeData.nickname,
          abbreviation: homeData.abbreviation,
        }),
        awayTeam: new Team({
          city: awayData.city,
          nickname: awayData.nickname,
          abbreviation: awayData.abbreviation,
        }),
      }),
      scoring: new GameScoring({
        periods: GameScoreboardTranslator.getPeriodScores(homeData, awayData),
        total: new Score({
          home: parseInt(homeData.score, 10),
          away: parseInt(awayData.score, 10),
        }),
      }),
    });
  }

  static getGameStatus(value) {
    switch (value) {
      case 1:
        return GameStatus.PREGAME;
      case 2:
        return GameStatus.LIVE;
      case 'Halftime':
        return GameStatus.HALFTIME;
      case '3':
        return GameStatus.FINAL;
      default:
        throw new ReferenceError(`Unknown Game Status: ${value}`);
    }
  }

  static getStartTimestamp(gameData) {
    return moment.tz(
      `${gameData.date}${gameData.time}`,
      Constants.TRANSLATED_NBA_DATE_TIME_FORMAT,
      Constants.DEFAULT_TIMEZONE,
    ).clone().tz('UTC');
  }

  static getBroadcasts(broadcasters) {
    const radioBroadcasters = List(broadcasters.radio.broadcaster.map(broadcast =>
      new Broadcast({
        scope: broadcast.scope,
        name: broadcast.display_name,
        medium: BroadcastMedium.RADIO,
      })));

    const tvBroadcasters = List(broadcasters.tv.broadcaster.map(broadcast =>
      new Broadcast({
        scope: broadcast.scope,
        name: broadcast.display_name,
        medium: BroadcastMedium.TV,
      })));

    return tvBroadcasters.concat(radioBroadcasters);
  }

  static getPeriodScores(homeData, awayData) {
    // if period scores are not found, return an empty list
    if (!('linescores' in homeData) || !('linescores' in awayData)
        || !('period' in homeData.linescores) || !('period' in awayData.linescores)) {
      return List();
    }

    const homePeriodScores = homeData.linescores.period;
    const awayPeriodScores = awayData.linescores.period;

    let periodScores = List();
    for (let index = 0; index < homePeriodScores.length; index += 1) {
      const homePeriodScore = homePeriodScores[index];
      const awayPeriodScore = awayPeriodScores[index];
      periodScores = periodScores.push(new PeriodScore({
        period: parseInt(homePeriodScore.period_value, 10),
        score: new Score({
          home: parseInt(homePeriodScore.score, 10),
          away: parseInt(awayPeriodScore.score, 10),
        }),
      }));
    }

    return periodScores;
  }
}
