'use es6'

import {List, Map} from 'immutable';
import Table from 'cli-table2';
import Colors from 'colors';

export default class ActiveGameTableCreator {
  static create(data) {
    console.log(data);
    let gameStatus = data.status;
    let periodValues = data.scoring.getPeriodValues();
    let table = new Table(ActiveGameTableCreator.getTableConfiguration(periodValues, gameStatus));
    ActiveGameTableCreator.generateRows(data).map(row => table.push(row.toJS()));
    return table.toString();
  }

  static getTableConfiguration(periodValues, gameStatus) {
    return {
      head: ActiveGameTableCreator.generateHeaders(periodValues, gameStatus)
    };
  }

  static generateRows(data) {
    let periodScores = data.scoring.periodScores;
    let totalScore = data.scores.totalScore;
    let homeAbbreviation = data.matchup.homeTeam.abbreviation;
    let visitorAbbreviation = data.matchup.awayTeam.abbreviation;
    let startTime = data.getLocalizedStartDateTime();
    let broadcasts = data.getBroadcastsString();
    let numberOfColumns = ActiveGameTableCreator.getTableColumnLength(periodScores.length);
    let linescoresRows = ActiveGameTableCreator.generateLinescoresRows(homeAbbreviation, visitorAbbreviation, periodScores, totalScore);
    let metadataRows = ActiveGameTableCreator.generateMetadataRows(startTime, broadcasts, numberOfColumns);
    let rows = List();
    rows = rows.push.apply(rows, linescoresRows);
    rows = rows.push.apply(rows, metadataRows);
    return rows;
  }

  static generateMetadataRows(startTime, broadcasts, numberOfColumns) {
    let rows = List();
    rows = rows.push(ActiveGameTableCreator.generateMetadataRow(emoji.get(Constants.START_TIME_EMOJI_VALUE), startTime, numberOfColumns));
    rows = rows.push(ActiveGameTableCreator.generateMetadataRow(emoji.get(Constants.BROADCASTS_EMOJI_VALUE), broadcasts, numberOfColumns));
    return rows;
  }

  static generateMetadataRow(label, value, numberOfColumns) {
    return List.of(
      Map({
        content: label,
        colSpan: this.metadataLabelColSpan,
      }),
      Map({
        content: value,
        colSpan: numberOfColumns - 1,
      })
    );
  }

  static generateLinescoresRows(homeAbbreviation, visitorAbbreviation, periodScores, totalScore) {
    let homeRow = List.of(emoji.get(Constants.HOME_EMOJI_VALUE), Formatter.formatTeamAbbreviation(homeAbbreviation));
    let visitorRow = List.of(emoji.get(Constants.VISITOR_EMOJI_VALUE), Formatter.formatTeamAbbreviation(visitorAbbreviation));
    periodScores.map(periodScore => {
      homeRow = homeRow.push(Formatter.formatScore(periodScore.score));
      visitorRow = visitorRow.push(Formatter.formatScore(new Score(periodScore.score.away, periodScore.score.home)));
    });
    homeRow = homeRow.push(StartedGameTableCreator.applyTotalFormatting(Formatter.formatScore(totalScore)));
    visitorRow = visitorRow.push(StartedGameTableCreator.applyTotalFormatting(Formatter.formatScore(new Score(totalScore.away, totalScore.home))));
    return List.of(homeRow, visitorRow);
  }

  static generateHeaders(periodScores, gameSituation) {
    let headers = List.of('', StartedGameTableCreator.applyGameSituationFormatting(gameSituation));
    let periodHeaders = List(periodScores.map(period => StartedGameTableCreator.applyPeriodFormatting(period)));
    headers = headers.merge(periodHeaders);
    headers = headers.merge(ActiveGameTableCreator.generateFormattedTotalHeader());
    return headers;
  }

  static generateFormattedTotalHeader() {
    return StartedGameTableCreator.applyTotalFormatting(StartedGameTableCreator.getTotalHeaderValue());
  }

  static getTableColumnLength(linescoresLength) {
    return linescoresLength + StartedGameTableCreator.getNonLineScoresColumnsLength();
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

  static getNonLineScoresColumnsLength() {
    return 3;
  }

  static getTotalHeaderValue() {
    return 'Total';
  }

  static getMetadataLabelColumnLength() {
    return 1;
  }
}
