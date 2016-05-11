const Table = require('cli-table2');

const Constants = require('../constants/Constants.js');
const TeamAbbreviations = require('../constants/TeamAbbreviations.js');
const Formatter = require('./formatters/Formatter.js');

function lastPlays(data) {
  const rows = [];
  const lastFive = data.slice(-Math.min(data.length, 4));
  lastFive.forEach(function(play) {
    rows.push([
      play.clock.concat(" ", Formatter.formatGamePeriod(play.period)),
      play.description
    ]);
  });
  return rows;
}


module.exports = {
  createPlayByPlayTable: function(data) {
    const table = new Table({ head: ['Clock', 'Description'] });
    const rows = lastPlays(data);
    rows.forEach(function(row) {
      table.push(row);
    });
    return table.toString();
  }
};