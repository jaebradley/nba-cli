import Table from 'cli-table2';
import Colors from 'colors';
import emoji from 'node-emoji';

import Constants from '../constants/Constants';
import Formatter from './formatters/Formatter';

export default class BoxScoreTableCreator {
  static generateRows(boxScoreData) {
    const rows = [];
    rows.push(['Points', boxScoreData.points.value, boxScoreData.points.getLeadersAbbreviatedNames()]);
    rows.push(['Assists', boxScoreData.assists.value, boxScoreData.assists.getLeadersAbbreviatedNames()]);
    rows.push(['Rebounds', boxScoreData.rebounds.value, boxScoreData.rebounds.getLeadersAbbreviatedNames()]);
    return rows;
  }

  static create(boxScoreData) {
    const table = new Table({ head: [ { content: 'Leaders', colSpan: 3} ] });
    BoxScoreTableCreator.generateRows(boxScoreData).map(row => table.push(row));
    return table.toString();
  }
}
