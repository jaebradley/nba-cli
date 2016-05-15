const Table = require('cli-table2');
const Colors = require('colors');
const emoji = require('node-emoji');
const nbaImages = require('nba-images');

const Constants = require('../constants/Constants.js');
const Formatter = require('./formatters/Formatter.js');

function generateLeaders(data) {
  const leaders = [];
  data.leaders.forEach(function(leader) {
    leaders.push(Formatter.formatShortPlayerName(leader.FirstName, leader.LastName));
  });
  return leaders.toString();
}

function generateRows(data) {
  const rows = [];
  var pointsLeaders = "";
  if (typeof data.points.leaders !== 'undefined') {
    pointsLeaders = generateLeaders(data.points);
  }
  var assistsLeaders = "";
  if (typeof data.assists.leaders !== 'undefined') {
    assistsLeaders = generateLeaders(data.assists);
  }
  var reboundsLeaders = "";
  if (typeof data.rebounds.leaders !== 'undefined') {
    reboundsLeaders = generateLeaders(data.rebounds);
  }
  rows.push(['Points', data.points.value, pointsLeaders]);
  rows.push(['Assists', data.assists.value, assistsLeaders]);
  rows.push(['Rebounds', data.rebounds.value, reboundsLeaders]);
  return rows;
}

module.exports = {
  createBoxScoreTable: function(data) {
    const homeTable = new Table({ head: [ { content: 'Home Leaders', colSpan: 3} ]});
    const homeRows = generateRows(data.home);
    homeRows.forEach(function(row) {
      homeTable.push(row);
    });
    const visitorTable = new Table({ head: [ { content: 'Away Leaders', colSpan: 3} ]});
    const visitorRows = generateRows(data.visitor);
    visitorRows.forEach(function(row) {
      visitorTable.push(row);
    });
    return {homeTable: homeTable.toString(), visitorTable: visitorTable.toString()};
  }
};