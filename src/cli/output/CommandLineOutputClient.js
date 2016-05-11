const Table = require('cli-table2');
const moment = require('moment-timezone');

const NbaDataClient = require('../../data/NbaDataClient.js');
const StartedGameTableCreator = require('../../tables/StartedGameTableCreator.js');
const UpcomingGameTableCreator = require('../../tables/UpcomingGameTableCreator.js');
const PlayByPlayTableCreator = require('../../tables/PlayByPlayTableCreator.js');
const BoxScoreTableCreator = require('../../tables/BoxScoreTableCreator.js');


function isGameUpcoming(data) {
  return data.unixMillisecondsStartTime > moment().valueOf();
}

function hasPlayByPlay(gameData) {
  return typeof gameData.playByPlay !== 'undefined' && gameData.playByPlay.length > 0;
}

function hasBoxScore(gameData) {
  return typeof gameData.boxScore !== 'undefined';
}

function outputStartedGameTable(gameData) {
  var table = new Table();
  var firstRow = [];
  var secondRow = [];
  
  firstRow.push(StartedGameTableCreator.createStartedGameTable(gameData));
  
  if (hasPlayByPlay(gameData)) {
    firstRow.push(PlayByPlayTableCreator.createPlayByPlayTable(gameData.playByPlay))
  }

  if (hasBoxScore(gameData)) {
    var boxScoreTables = BoxScoreTableCreator.createBoxScoreTable(gameData.boxScore);
    secondRow.push(boxScoreTables.homeTable);
    secondRow.push(boxScoreTables.visitorTable);
  }

  table.push(firstRow);
  table.push(secondRow);
  console.log(table.toString());
}

function outputGames(data) {
  const upcomingGameData = [];
  Object.keys(data).forEach(function(key) {
    const gameData = data[key];
    if (isGameUpcoming(gameData)) {
      upcomingGameData.push(gameData);
    } else {
      outputStartedGameTable(gameData);
    }
  });

  if (upcomingGameData.length > 0) {
    console.log(UpcomingGameTableCreator.createUpcomingGamesTable(upcomingGameData));
  }
}

module.exports = {
  outputGamesForDateRange: function(startDate, endDate) {
    NbaDataClient.fetchDateRangeGames(startDate, endDate, outputGames);
  }
};