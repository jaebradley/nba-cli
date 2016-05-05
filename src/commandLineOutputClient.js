const Table = require('cli-table');
const NbaDataClient = require('./nbaDataClient.js');
const moment = require('moment-timezone');

const defaultTableFormatting = {
  chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
         , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
         , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
         , 'right': '║' , 'right-mid': '╢' , 'middle': '│' }
};

function outputGames(data) {
  for (const key in data) {
    const gameData = data[key];
    if (isGameUpcoming(gameData)) {
      outputUpcomingGameTable(data[key]);
    }
  }
}

function outputUpcomingGameTable(data) {
  var table = new Table(defaultTableFormatting);
  const location = data.arena.concat(',', data.city, ',', data.state);
  table.push(
    ['HOME', 'AWAY', 'START TIME', 'WATCH IT ON', 'ARENA'],
    [data.homeName, data.visitorName, data.formattedLocalizedStartDate, data.broadcasts.toString(), location]
  );
  console.log(table.toString());
}

function isGameUpcoming(data) {
  return data.unixMillisecondsStartTime > moment().valueOf();
}

module.exports = {
  outputTodayGames: function() {
    NbaDataClient.fetchTodayGames(outputGames);
  }
};