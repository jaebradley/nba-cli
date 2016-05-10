const Table = require('cli-table2');
const Colors = require('colors');
const emoji = require('node-emoji');
const nbaImages = require('nba-images');

const Constants = require('../constants/Constants.js');
const TeamAbbreviations = require('../constants/TeamAbbreviations.js');

function formatGamePeriod(periodValue) {
  if (parseInt(periodValue) > 4) {
    return 'OT'.concat(periodValue - 4);
  }

  return 'Q'.concat(periodValue);
}

function lastPlays(data) {
  const index = Math.min(data.length, 4);
  const lastFive = data.slice(-index);
  const rows = [];
  lastFive.forEach(function(play) {
    rows.push([
      play.clock.concat(" ", formatGamePeriod(play.period)),
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