import moment from 'moment-timezone';
import jstz from 'jstimezonedetect';

import TranslatedScoreboard from '../../data/models/TranslatedScoreboard';
import GameMetadata from '../../data/models/GameMetadata';
import Score from '../../data/models/Score';
import PeriodScore from '../../data/models/PeriodScore';
import Team from '../../data/models/Team';
import Location from '../../data/models/Location';
import GameScores from '../../data/models/GameScores';

import HtmlEscaper from '../../utils/HtmlEscaper';
import Constants from '../../constants/Constants';

export default class ScoreboardDataTranslator {

  translate(scoreboardData) {
    const translatedData = {};
    scoreboardData.sports_content.games.game.map(gameData => (translatedData[gameData.id] = ScoreboardDataTranslator.translateGameData(gameData)));
    return translatedData;
  }

  static translateGameData(gameData) {
    const dateStartTime = `${gameData.date}${gameData.time}`;

    const previewAvailable = gameData.previewAvailable;
    const recapAvailable = gameData.recapAvailable;

    const periodStatus = HtmlEscaper.escapeHtml(gameData.period_time.period_status);
    const periodValue = HtmlEscaper.escapeHtml(gameData.period_time.period_value);
    const gameStatus = gameData.period_time.game_status;
    const gameClock = HtmlEscaper.escapeHtml(gameData.period_time.game_clock);
    const gameUrl = gameData.game_url;

    const location = new Location({
      arena: HtmlEscaper.escapeHtml(gameData.arena),
      city: HtmlEscaper.escapeHtml(gameData.city),
      state: HtmlEscaper.escapeHtml(gameData.state),
    })

    const visitorTeam = new Team({
      city: HtmlEscaper.escapeHtml(gameData.visitor.city),
      nickname: HtmlEscaper.escapeHtml(gameData.visitor.nickname),
      abbreviation: HtmlEscaper.escapeHtml(gameData.visitor.abbreviation),
    });

    const homeTeam = new Team({
      city: HtmlEscaper.escapeHtml(gameData.home.city),
      nickname: HtmlEscaper.escapeHtml(gameData.home.nickname),
      abbreviation: HtmlEscaper.escapeHtml(gameData.home.abbreviation),
    });

    const metadata = new GameMetadata({
      id: gameData.id,
      status: ScoreboardDataTranslator.getGameStatus(periodStatus, gameStatus),
      url: gameUrl,
      unixMillisecondsStartTime: ScoreboardDataTranslator.getUnixMillisecondsStartTime(dateStartTime),
      location: location,
      isPreviewAvailable: ScoreboardDataTranslator.isPreviewAvailable(previewAvailable),
      isRecapAvailable: ScoreboardDataTranslator.isRecapAvailable(recapAvailable),
      periodValue: periodValue,
      periodStatus: periodStatus,
      gameClock: gameClock,
      broadcasts: ScoreboardDataTranslator.getBroadcasts(gameData.broadcasters),
      visitor: visitorTeam,
      home: homeTeam,
    });

    const scores = new GameScores({
      periodScores: ScoreboardDataTranslator.getTeamLinescores(gameData.home, gameData.visitor),
      totalScore: new Score({homeScore: parseInt(gameData.home.score), visitorScore: parseInt(gameData.visitor.score)}),
    });

    return new TranslatedScoreboard({
      scores: scores,
      metadata: metadata,
    });
  }

  static getBroadcasts(scoreboardData) {
    return scoreboardData.tv.broadcaster.map(broadcast => broadcast.display_name);
  }

  static hasOnlyOneLinescorePeriod(periodData) {
    return 'period_name' in periodData && 'score' in periodData;
  }

  static getTeamLinescores(homeTeamData, visitorTeamData) {
    const linescores = [];
    if (!('linescores' in homeTeamData) || !('linescores' in visitorTeamData)) {
      return linescores;
    }

    const homeLinescores = homeTeamData.linescores;
    const visitorLinescores = visitorTeamData.linescores;
    if (ScoreboardDataTranslator.hasOnlyOneLinescorePeriod(homeLinescores.period)) {
      let score = new Score({ homeScore: parseInt(homeLinescores.period.score),
                              visitorScore: parseInt(visitorLinescores.period.score) });
      linescores.push(
        new PeriodScore({
          periodValue: homeLinescores.period.period_name,
          score: score,
        })
      );
    } else {
      for (let index = 0; index < homeLinescores.period.length; index++) {
        let score = new Score({ homeScore: parseInt(homeLinescores.period[index].score),
                                visitorScore: parseInt(visitorLinescores.period[index].score) });
        linescores.push(
          new PeriodScore({
            periodValue: homeLinescores.period[index].period_name,
            score: score,
          })
        );
      }
    }
    return linescores;
  }

  static getUnixMillisecondsStartTime(dateStartTime) {
    return moment(dateStartTime, Constants.TRANSLATED_NBA_DATE_TIME_FORMAT).tz(Constants.DEFAULT_TIMEZONE).clone().tz("UTC").valueOf();
  }

  static getGameStatus(periodStatus, gameStatus) {
    if (periodStatus != "Halftime") {
      return Constants.TRANSLATED_GAME_STATUS_MAP[gameStatus];
    }

    return periodStatus;
  }

  static isPreviewAvailable(isAvailable) {
    return isAvailable == 1;
  }

  static isRecapAvailable(isAvailable) {
    return isAvailable == 1;
  }
}
