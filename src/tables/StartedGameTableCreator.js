import Table from 'cli-table2';
import Colors from 'colors';
import emoji from 'node-emoji';

import Constants from '../constants/Constants';
import Formatter from './formatters/Formatter';
import Score from '../data/models/Score';

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
      homeRow.push(Formatter.formatScore(periodScore.score));
      visitorRow.push(Formatter.formatScore(new Score(periodScore.score.away, periodScore.score.home)));
    });
    homeRow.push(StartedGameTableCreator.applyTotalFormatting(Formatter.formatScore(totalScore)));
    visitorRow.push(StartedGameTableCreator.applyTotalFormatting(Formatter.formatScore(new Score(totalScore.away, totalScore.home))));
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
    const periodScores = gameData.scores.periodScores;
    const totalScore = gameData.scores.totalScore;
    const homeAbbreviation = gameData.metadata.home.abbreviation;
    const visitorAbbreviation = gameData.metadata.visitor.abbreviation;
    const startTime = gameData.metadata.getLocalizedStartDateTime();
    const broadcasts = gameData.metadata.getBroadcastsString();
    const numberOfColumns = this.getTableColumnLength(periodScores.length);
    const linescoresRows = this.generateLinescoresRows(homeAbbreviation, visitorAbbreviation, periodScores, totalScore);
    const metadataRows = this.generateMetadataRows(startTime, broadcasts, numberOfColumns);
    const rows = [];
    rows.push.apply(rows, linescoresRows);
    rows.push.apply(rows, metadataRows);
    return rows;
  }

  create(gameData) {
    const periodScores = gameData.scores.periodScores;
    const gameStatus = gameData.metadata.status;
    const periodValue = gameData.metadata.periodValue;
    const gameClock = gameData.metadata.gameClock;
    const periodValues = gameData.scores.getPeriodValues();
    const table = new Table({ head: this.generateHeaders(periodValues, gameStatus) });
    this.generateRows(gameData).map(row => table.push(row));
    return table.toString();
  }
}
