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
    const headers = ['', StartedGameTableCreator.applyGameSituationFormatting(gameSituation)];
    linescorePeriods.map(period => headers.push(StartedGameTableCreator.applyPeriodFormatting(period)));
    headers.push(this.generateFormattedTotalHeader());
    return headers;
  }

  generateLinescoresRows(homeAbbreviation, visitorAbbreviation, homeLinescores, visitorLinescores, homeTotal, visitorTotal) {
    const homeRow = [emoji.get(Constants.HOME_EMOJI_VALUE), Formatter.formatTeamAbbreviation(homeAbbreviation)];
    const visitorRow = [emoji.get(Constants.VISITOR_EMOJI_VALUE), Formatter.formatTeamAbbreviation(visitorAbbreviation)];

    for (let i = 0; i < homeLinescores.length; i++) {
      let homeScore = homeLinescores[i].score;
      let visitorScore = visitorLinescores[i].score;
      homeRow.push(Formatter.formatScore(homeScore, visitorScore));
      visitorRow.push(Formatter.formatScore(visitorScore, homeScore));
    }

    homeRow.push(Formatter.formatTotalScore(homeTotal, visitorTotal));
    visitorRow.push(Formatter.formatTotalScore(visitorTotal, homeTotal));
    return [homeRow, visitorRow];
  }

  generateMetadataRow(label, value, numberOfColumns) {
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

  generateMetadataRows(startTime, broadcasts, numberOfColumns) {
    const rows = [];
    rows.push(this.generateMetadataRow(emoji.get(Constants.START_TIME_EMOJI_VALUE), startTime, numberOfColumns));
    rows.push(this.generateMetadataRow(emoji.get(Constants.BROADCASTS_EMOJI_VALUE), broadcasts, numberOfColumns));
    return rows;
  }

  generateRows(gameData) {
    const homeLinescores = gameData.homeLinescores;
    const visitorLinescores = gameData.visitorLinescores;
    const homeAbbreviation = gameData.homeAbbreviation;
    const visitorAbbreviation = gameData.visitorAbbreviation;
    const homeScore = gameData.homeScore;
    const visitorScore = gameData.visitorScore;
    const startTime = gameData.formattedLocalizedStartDate;
    const broadcasts = gameData.broadcasts.toString();
    const numberOfColumns = this.getTableColumnLength(homeLinescores.length);
    const linescoresRows = this.generateLinescoresRows(homeAbbreviation, visitorAbbreviation, homeLinescores, visitorLinescores, homeScore, visitorScore);
    const metadataRows = this.generateMetadataRows(startTime, broadcasts, numberOfColumns);
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
    const periodValues = homeLinescores.map(linescore => linescore.period);
    const table = new Table({ head: this.generateHeaders(periodValues, gameStatus) });
    this.generateRows(gameData).map(row => table.push(row));
    return table.toString();
  }
}