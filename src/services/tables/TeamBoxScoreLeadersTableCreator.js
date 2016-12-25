import Table from 'cli-table2';
import Colors from 'colors';
import emoji from 'node-emoji';
import {List, Map} from 'immutable';

import Constants from '../constants/Constants';
import Formatter from './formatters/Formatter';

export default class TeamBoxScoreLeadersTableCreator {
  static create(data) {
    let table = new Table(TeamBoxScoreLeadersTableCreator.getTableConfiguration().toJS());
    TeamBoxScoreLeadersTableCreator.buildRows(data)
                                   .forEach(row => table.push(row.toJS()));
    return table.toString();
  }

  static buildRows(data) {
    let rows = List();
    rows = rows.push(List.of(TeamBoxScoreLeadersTableCreator.getPointsHeaderValue(),
                             data.points.value,
                             data.points.getLeadersAbbreviatedNames()));
    rows = rows.push(List.of(TeamBoxScoreLeadersTableCreator.getAssistsHeaderValue(),
                             data.assists.value,
                             data.assists.getLeadersAbbreviatedNames()));
    rows = rows.push(List.of(TeamBoxScoreLeadersTableCreator.getReboundsHeaderValue(),
                             data.rebounds.value,
                             data.rebounds.getLeadersAbbreviatedNames()));
    return rows;
  }

  static getTableConfiguration() {
    return Map({
      head: List.of(
        Map({
          content: TeamBoxScoreLeadersTableCreator.getContentValue(),
          colSpan: TeamBoxScoreLeadersTableCreator.getColumnSpan()
        })
      )
    });
  }

  static getContentValue() {
    return 'Leaders';
  }

  static getColumnSpan() {
    return 3;
  }

  static getPointsHeaderValue() {
    return 'Points';
  }

  static getAssistsHeaderValue() {
    return 'Assists';
  }

  static getReboundsHeaderValue() {
    return 'Rebounds';
  }
}
