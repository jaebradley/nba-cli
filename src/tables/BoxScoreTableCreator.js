import Table from 'cli-table2';
import Colors from 'colors';
import emoji from 'node-emoji';
import NbaImages from 'nba-images';

import Constants from '../constants/Constants';
import Formatter from './formatters/Formatter';

export default class BoxScoreTableCreator {
  constructor() {
    this.defaultFormat = { head: [ { content: 'Leaders', colSpan: 3} ] };
    this.pointsHeader = 'Points';
    this.assistsHeader = 'Assists';
    this.reboundsHeader = 'Rebounds';
  }
  
  generateRows(boxScoreData) {
    const rows = [];
    rows.push([this.pointsHeader, boxScoreData.points.value, boxScoreData.points.getLeadersAbbreviatedNames()]);
    rows.push([this.assistsHeader, boxScoreData.assists.value, boxScoreData.assists.getLeadersAbbreviatedNames()]);
    rows.push([this.reboundsHeader, boxScoreData.rebounds.value, boxScoreData.rebounds.getLeadersAbbreviatedNames()]);
    return rows;
  }

  create(boxScoreData) {
    const table = new Table(this.defaultFormat);
    this.generateRows(boxScoreData).map(row => table.push(row));
    return table.toString();
  }
}
