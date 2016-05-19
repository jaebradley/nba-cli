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

  generateHeaders(periodScores, gameSituation) {
    const headers = ['', StartedGameTableCreator.applyGameSituationFormatting(gameSituation)];
    periodScores.map(period => headers.push(StartedGameTableCreator.applyPeriodFormatting(period)));
    headers.push(this.generateFormattedTotalHeader());
    return headers;
  }

  generateLinescoresRows(homeAbbreviation, visitorAbbreviation, periodScores, totalScore) {
    const homeRow = [emoji.get(Constants.HOME_EMOJI_VALUE), Formatter.formatTeamAbbreviation(homeAbbreviation)];
    const visitorRow = [emoji.get(Constants.VISITOR_EMOJI_VALUE), Formatter.formatTeamAbbreviation(visitorAbbreviation)];
    periodScores.map(periodScore => {
      homeRow.push(periodScore.getFormattedHomeScore());
      visitorRow.push(periodScore.getFormattedVisitorScore());
    });
    homeRow.push(totalScore.getFormattedHomeScore());
    visitorRow.push(totalScore.getFormattedVisitorScore());
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
    const periodScores = gameData.periodScores;
    const totalScore = gameData.totalScore;
    const homeAbbreviation = gameData.homeAbbreviation;
    const visitorAbbreviation = gameData.visitorAbbreviation;
    const startTime = gameData.localizedStartDate;
    const broadcasts = gameData.getBroadcasts();
    const numberOfColumns = this.getTableColumnLength(periodScores.length);
    const linescoresRows = this.generateLinescoresRows(homeAbbreviation, visitorAbbreviation, periodScores, totalScore);
    const metadataRows = this.generateMetadataRows(startTime, broadcasts, numberOfColumns);
    const rows = [];
    rows.push.apply(rows, linescoresRows);
    rows.push.apply(rows, metadataRows);
    return rows;
  }

  create(gameData) {
    const periodScores = gameData.periodScores;
    const gameStatus = gameData.status;
    const periodValue = gameData.periodValue;
    const gameClock = gameData.gameClock;
    const periodValues = periodScores.getPeriodValues();
    const table = new Table({ head: this.generateHeaders(periodValues, gameStatus) });
    this.generateRows(gameData).map(row => table.push(row));
    return table.toString();
  }
}