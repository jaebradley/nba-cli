const Table = require('cli-table2');
const moment = require('moment-timezone');

const NbaDataClient = require('../../data/NbaDataClient.js');
const StartedGameTableCreator = require('../../tables/StartedGameTableCreator.js');
const UpcomingGameTableCreator = require('../../tables/UpcomingGameTableCreator.js');
const PlayByPlayTableCreator = require('../../tables/PlayByPlayTableCreator.js');

function outputGames(data) {
  const upcomingGameData = [];
  Object.keys(data).forEach(function(key) {
    const gameData = data[key];
    if (isGameUpcoming(gameData)) {
      upcomingGameData.push(gameData);
    } else {
      var table = new Table();
      var startedGameTable = StartedGameTableCreator.createStartedGameTable(gameData);
      if (typeof gameData.playByPlay !== 'undefined' && gameData.playByPlay.length > 0) {
        var playByPlayTable = PlayByPlayTableCreator.createPlayByPlayTable(data[key].playByPlay);
        table.push([startedGameTable, playByPlayTable]);
      }
      console.log(table.toString());
    }
  });

  if (upcomingGameData.length > 0) {
    console.log(UpcomingGameTableCreator.createUpcomingGamesTable(upcomingGameData));
  }
}

function isGameUpcoming(data) {
  return data.unixMillisecondsStartTime > moment().valueOf();
}


module.exports = {
  outputCustomDateRangeGames: function(startDate, endDate) {
    NbaDataClient.fetchDateRangeGames(startDate, endDate, outputGames);
  }
};