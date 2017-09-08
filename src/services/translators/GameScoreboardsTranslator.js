import jstz from 'jstimezonedetect';
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

export default class GameMetadataTranslator {
  static translate(data) {
    const periodTime = data.period_time;
    const broadcasters = data.broadcasters;
    const homeData = data.home;
    const awayData = data.visitor;

    return new GameScoreboard({
      id: data.id,
      status: GameStatus.identifyFromValue(periodTime.game_status),
      startTimestamp: ScoreboardGameTranslator.getStartTimestamp(data),
      location: new Location({
        arena: data.arena,
        city: data.city,
        state: data.state,
      }),
      period: new Period({
        value: parseInt(periodTime.period_value),
        status: periodTime.period_status,
        clock: periodTime.game_clock
      });,
      broadcasts: ScoreboardGameTranslator.getBroadcasts(broadcasters),
      matchup: new Matchup({
        homeTeam: new Team({
          city: homeTeam.city,
          nickname: homeTeam.nickname,
          abbreviation: homeTeam.abbreviation,
        }),
        awayTeam: new Team({
          city: awayTeam.city,
          nickname: awayTeam.nickname,
          abbreviation: awayTeam.abbreviation,
        }),
      }),
      scoring: new GameScoring({
        periods: ScoreboardGameTranslator.getPeriodScores(homeData, awayData),
        total: new Score({
          home: parseInt(homeData.score),
          away: parseInt(awayData.score)
        }),
      }),
    });
  }

  static getStartTimestamp(gameData) {
    return moment.tz(`${gameData.date}${gameData.time}`,
                     Constants.TRANSLATED_NBA_DATE_TIME_FORMAT,
                     Constants.DEFAULT_TIMEZONE)
                 .clone()
                 .tz('UTC');
  }

  static getBroadcasts(broadcasters) {
    const radioBroadcasters = List(broadcasters.radio.broadcaster
      .map(broadcast => new Broadcast({
        scope: broadcast.scope,
        name: broadcast.display_name,
        medium: BroadcastMedium.RADIO
      }))
    );

    const tvBroadcasters = List(broadcasters.tv.broadcaster
      .map(broadcast => new Broadcast({
        scope: broadcast.scope,
        name: broadcast.display_name,
        medium: BroadcastMedium.TV
      }))
    );

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
    for (let index = 0; index < homePeriodScores.length; index++) {
      let homePeriodScore = homePeriodScores[index];
      let awayPeriodScore = awayPeriodScores[index];
      periodScores = periodScores.push(new PeriodScore({
        period: parseInt(homePeriodScore.period_value),
        score: new Score({
          home: parseInt(homePeriodScore.score),
          away: parseInt(awayPeriodScore.score)
        })
      }));
    }

    return periodScores;
  }
}
