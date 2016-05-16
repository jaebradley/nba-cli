import Table from 'cli-table2';
import Colors from 'colors';
import emoji from 'node-emoji';
import NbaImages from 'nba-images';

import Constants from '../constants/Constants';
import Formatter from './formatters/Formatter';

export default class StartedGameTableCreator {
  constructor() {
    this.nonLinescoresColumnsLength = 3;
    this.totalHeaderValue = 'Total';
    this.metadataLabelColSpan = 1;
  }

  static applyGameSituationFormatting(gameSituation) {
    return gameSituation.bold.magenta;
  }

  static applyPeriodFormatting(period) {
    return period.bold.cyan;
  }

  static applyTotalFormatting(total) {
    return total.bold.underline.cyan;
  }

  generateFormattedTotalHeader() {
    return StartedGameTableCreator.applyTotalFormatting(this.totalHeaderValue);
  }

  getTableColumnLength(linescoresLength) {
    return linescoresLength + this.nonLinescoresColumnsLength;
  }

  generateHeaders(linescorePeriods, gameSituation) {
    const headers = ['', StartedGameTableCreator.applyGameSituationFormatting(gameSituation))];
    linescorePeriods.map(period => headers.push(StartedGameTableCreator.applyPeriodFormatting(period)));
    headers.push(this.generateFormattedTotalHeader());
    return headers;
  }

  generateLinescoresRows() {
    const homeRow = [emoji.get(Constants.HOME_EMOJI_VALUE), Formatter.formatTeamAbbreviation(homeAbbreviation)];
    const visitorRow = [emoji.get(Constants.VISITOR_EMOJI_VALUE), Formatter.formatTeamAbbreviation(visitorAbbreviation)];

    for (var i = 0; i < homeLinescores.length; i++) {
      var homeScore = homeLinescores[i].score;
      var visitorScore = visitorLinescores[i].score;
      homeRow.push(Formatter.formatScore(homeScore, visitorScore));
      visitorRow.push(Formatter.formatScore(visitorScore, homeScore));
    }

    homeRow.push(Formatter.formatTotalScore(homeTotal, visitorTotal));
    visitorRow.push(Formatter.formatTotalScore(visitorTotal, homeTotal));
    return [homeRow, visitorRow];
  }

  generateStartedGameMetadataRow(label, value, numberOfColumns) {
    return [
      {
        content: label,
        colSpan: this.metadataLabelColSpan,
      },
      {
        content: value,
        colSpan: numberOfColumns - 1,
      }
    ];
  }

  generateStartedGameMetadataRows(startTime, broadcasts, numberOfColumns) {
    const rows = [];
    rows.push(this.generateMetadataRow(emoji.get(Constants.START_TIME_EMOJI_VALUE), startTime, numberOfColumns));
    rows.push(this.generateMetadataRow(emoji.get(Constants.BROADCASTS_EMOJI_VALUE), broadcasts, numberOfColumns));
    return rows;
  }

  generateRows(gameData) {
    const homeLinescores = data.homeLinescores;
    const visitorLinescores = data.visitorLinescores;
    const homeAbbreviation = data.homeAbbreviation;
    const visitorAbbreviation = data.visitorAbbreviation;
    const homeScore = data.homeScore;
    const visitorScore = data.visitorScore;
    const startTime = data.formattedLocalizedStartDate;
    const broadcasts = data.broadcasts.toString();
    const numberOfColumns = this.getTableColumnLength(homeLinescores.length);
    const linescoresRows = this,.generateLinescoresRows(homeAbbreviation, visitorAbbreviation, homeLinescores, visitorLinescores, homeScore, visitorScore);
    const metadataRows = generateStartedGameMetadataRows(startTime, broadcasts, numberOfColumns);
    const rows = [];
    rows.push.apply(rows, linescoresRows);
    rows.push.apply(rows, metadataRows);
    return rows;
  }

  create(gameData) {
    const homeLinescores = gameData.homeLinescores;
    const gameStatus = gameData.status;
    const periodValue = gameData.periodValue;
    const gameClock = gameData.gameClock;
    const periodValues = homeLinescores.map(linescore => linescore.periodValue);
    const table = new Table({ head: this.generateHeaders(periodValues, gameStatus, periodValue, gameClock) });
    this.generateRows(gameData).map(row => table.push(row));
    return table.toString();
  }
}