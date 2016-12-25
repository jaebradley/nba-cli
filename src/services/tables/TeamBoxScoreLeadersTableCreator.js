'use es6';

import colors from 'colors';
import emoji from 'node-emoji';
import Table from 'cli-table2';
import {List, Map} from 'immutable';

import Constants from '../../constants/Constants';

export default class TeamBoxScoreLeadersTableCreator {
  static create(data, isHome) {
    let table = TeamBoxScoreLeadersTableCreator.buildInitialTable(isHome);
    TeamBoxScoreLeadersTableCreator.buildRows(data)
                                   .forEach(row => table.push(row.toJS()));
    return table.toString();
  }

  static buildInitialTable(isHome) {
    let value = isHome ? 'Home' : 'Away'

    return new Table({
      head: [
        {
          content: `${value} Leaders`,
          colSpan: 3,
          hAlign: 'center'
        }
      ]
    });
  }

  static buildRows(data) {
    let rows = List();
    rows = rows.push(List.of('Points',
                             data.points.value,
                             data.points.getLeadersAbbreviatedNames()));
    rows = rows.push(List.of('Assists',
                             data.assists.value,
                             data.assists.getLeadersAbbreviatedNames()));
    rows = rows.push(List.of('Rebounds',
                             data.rebounds.value,
                             data.rebounds.getLeadersAbbreviatedNames()));
    return rows;
  }
}
