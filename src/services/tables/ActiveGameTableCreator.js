'use es6'

import {List, Map} from 'immutable';
import Table from 'cli-table2';
import colors from 'colors';
import emoji from 'node-emoji';

import Constants from '../../constants/Constants';
import Formatter from './formatters/Formatter';
import Score from '../../data/Score';

export default class ActiveGameTableCreator {
  static create(data) {
    let gameStatus = data.status;
    let periodValues = data.scoring.getPeriodValues();
    let table = new Table(ActiveGameTableCreator.getTableConfiguration(periodValues, gameStatus));
    ActiveGameTableCreator.generateRows(data)
                          .forEach(row => table.push(row.toJS()));
    return table.toString();
  }

  static getTableConfiguration(periodValues, gameStatus) {
    return {
      head: ActiveGameTableCreator.generateHeaders(periodValues, gameStatus)
    };
  }

  static generateRows(data) {
    let periodScores = data.scoring.periods;
    let totalScore = data.scoring.total;
    let homeAbbreviation = data.matchup.homeTeam.abbreviation;
    let visitorAbbreviation = data.matchup.awayTeam.abbreviation;
    let startTime = data.getLocalizedStartDateTime();
    let broadcasts = data.getTvBroadcastsString();
    let numberOfColumns = ActiveGameTableCreator.getTableColumnLength(periodScores.size);
    let linescoresRows = ActiveGameTableCreator.generateLinescoresRows(homeAbbreviation, visitorAbbreviation, periodScores, totalScore);
    let metadataRows = ActiveGameTableCreator.generateMetadataRows(startTime, broadcasts, numberOfColumns);
    let rows = List();
    rows = rows.concat(linescoresRows);
    rows = rows.concat(metadataRows);
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
        colSpan: 1,
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
      visitorRow = visitorRow.push(Formatter.formatScore(new Score({
        away: periodScore.score.away,
        home: periodScore.score.home
      })));
    });
    homeRow = homeRow.push(ActiveGameTableCreator.applyTotalFormatting(Formatter.formatScore(totalScore)));
    visitorRow = visitorRow.push(ActiveGameTableCreator.applyTotalFormatting(Formatter.formatScore(new Score({
      away: totalScore.away,
      home: totalScore.home
    }))));
    return List.of(homeRow, visitorRow);
  }

  static generateHeaders(periodScores, gameSituation) {
    let headers = List.of('', ActiveGameTableCreator.applyGameSituationFormatting(gameSituation));
    let periodHeaders = List(periodScores.map(period => ActiveGameTableCreator.applyPeriodFormatting(period)));
    headers = headers.merge(periodHeaders);
    headers = headers.merge(ActiveGameTableCreator.generateFormattedTotalHeader());
    return headers;
  }

  static generateFormattedTotalHeader() {
    return ActiveGameTableCreator.applyTotalFormatting(ActiveGameTableCreator.getTotalHeaderValue());
  }

  static getTableColumnLength(linescoresLength) {
    return linescoresLength + ActiveGameTableCreator.getNonLineScoresColumnsLength();
  }

  static applyGameSituationFormatting(gameSituation) {
    return gameSituation.name.bold.magenta;
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
