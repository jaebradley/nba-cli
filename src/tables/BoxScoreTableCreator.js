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
    rows.push([this.pointsHeader, boxScoreData.points.value, BoxScoreTableCreator.generateLeaders(boxScoreData.points.leaders).toString()]);
    rows.push([this.assistsHeader, boxScoreData.assists.value, BoxScoreTableCreator.generateLeaders(boxScoreData.assists.leaders).toString()]);
    rows.push([this.reboundsHeader, boxScoreData.rebounds.value, BoxScoreTableCreator.generateLeaders(boxScoreData.rebounds.leaders).toString()]);
    return rows;
  }

  create(boxScoreData) {
    const table = new Table(this.defaultFormat);
    this.generateRows(boxScoreData).map(row => table.push(row));
    return table.toString();
  }

  static generateLeaders(leaderData) {
    return leaderData.map(leader => Formatter.formatShortPlayerName(leader.firstName, leader.lastName));
  }
}
