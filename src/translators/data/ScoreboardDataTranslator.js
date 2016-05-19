import moment from 'moment-timezone';
import jstz from 'jstimezonedetect';

import Scoreboard from '../../data/models/Scoreboard';
import TotalScore from '../../data/models/TotalScore';
import PeriodScore from '../../data/models/PeriodScore';

import HtmlEscaper from '../../utils/HtmlEscaper';
import Constants from '../../constants/Constants';


export default class ScoreboardDataTranslator {
  constructor() {
    this.userTimezone = jstz.determine().name();
  }

  getLocalizedDateStartTime(dateStartTime) {
    return ScoreboardDataTranslator
          .getDefaultDateStartTime(dateStartTime)
          .clone().tz(this.userTimezone)
          .format(Constants.TRANSLATED_DATE_FORMAT);
  }

  translateGameData(gameData) {
    const startDate = gameData.date;
    const dateStartTime = startDate.concat(gameData.time);

    const previewAvailable = gameData.previewAvailable;
    const recapAvailable = gameData.recapAvailable;

    const periodStatus = HtmlEscaper.escapeHtml(gameData.period_time.period_status);
    const periodValue = HtmlEscaper.escapeHtml(gameData.period_time.period_value);
    const gameStatus = gameData.period_time.game_status;
    const gameClock = HtmlEscaper.escapeHtml(gameData.period_time.game_clock);
    const gameUrl = gameData.gameUrl;
    const arena = HtmlEscaper.escapeHtml(gameData.arena);
    const city = HtmlEscaper.escapeHtml(gameData.city);
    const state = HtmlEscaper.escapeHtml(gameData.state);

    const visitorAbbreviation = HtmlEscaper.escapeHtml(gameData.visitor.abbreviation);
    const visitorCity = HtmlEscaper.escapeHtml(gameData.visitor.city);
    const visitorNickname = HtmlEscaper.escapeHtml(gameData.visitor.nickname);
    const visitorScore = parseInt(gameData.visitor.score);

    const homeAbbreviation = HtmlEscaper.escapeHtml(gameData.home.abbreviation);
    const homeCity = HtmlEscaper.escapeHtml(gameData.home.city);
    const homeNickname = HtmlEscaper.escapeHtml(gameData.home.nickname);
    const homeScore = parseInt(gameData.home.score);

    return new Scoreboard({
      status: ScoreboardDataTranslator.getGameStatus(periodStatus, gameStatus),
      url: gameUrl,
      nbaStatsFormattedStartDate: startDate,
      unixMillisecondsStartTime: ScoreboardDataTranslator.getUnixMillisecondsStartTime(dateStartTime),
      localizedStartDate: this.getLocalizedDateStartTime(dateStartTime),
      isUpcoming: ScoreboardDataTranslator.isUpcoming(dateStartTime),
      arena: arena,
      city: city,
      state: state,
      isPreviewAvailable: ScoreboardDataTranslator.isPreviewAvailable(previewAvailable),
      isRecapAvailable: ScoreboardDataTranslator.isRecapAvailable(recapAvailable),
      periodValue: periodValue,
      periodStatus: periodStatus,
      gameClock: gameClock,
      broadcasts: ScoreboardDataTranslator.getBroadcasts(gameData.broadcasters),
      visitorAbbreviation: visitorAbbreviation,
      visitorName:  ScoreboardDataTranslator.generateTeamName(visitorCity, visitorNickname),
      homeAbbreviation: homeAbbreviation,
      homeName: ScoreboardDataTranslator.generateTeamName(homeCity, homeNickname),
      totalScore: new TotalScore({homeScore: homeScore, visitorScore: visitorScore}),
      periodScores: ScoreboardDataTranslator.getTeamLinescores(gameData.home, gameData.visitor)
    });
  }

  translateScoreboardData(scoreboardData) {
    const translatedData = {};
    scoreboardData.sports_content.games.game.map(gameData => (translatedData[gameData.id] = this.translateGameData(gameData)));
    return translatedData;
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
      linescores.push(
        new PeriodScore({
          periodValue: homeLinescores.period.period_name,
          homeScore: parseInt(homeLinescores.period.score),
          visitorScore: parseInt(visitorLinescores.period.score),
        })
      );
    } else {
      for (let index = 0; index < homeLinescores.period.length; index++) {
        linescores.push(
          new PeriodScore({
            periodValue: homeLinescores.period[index].period_name,
            homeScore: parseInt(homeLinescores.period[index].score),
            visitorScore: parseInt(visitorLinescores.period[index].score),
          })
        );
      }
    }
    return linescores;
  }

  static getDefaultDateStartTime(dateStartTime) {
    return moment(dateStartTime, Constants.TRANSLATED_NBA_DATE_TIME_FORMAT).tz(Constants.DEFAULT_TIMEZONE);
  }

  static getUnixMillisecondsStartTime(dateStartTime) {
    return ScoreboardDataTranslator.getDefaultDateStartTime(dateStartTime).clone().tz("UTC").valueOf();
  }

  static isUpcoming(dateStartTime) {
    return ScoreboardDataTranslator.getUnixMillisecondsStartTime(dateStartTime) > moment().valueOf();
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

  static generateTeamName(city, nickname) {
    return `${city} ${nickname}`;
  }
}
