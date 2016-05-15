const Table = require('cli-table2');
const moment = require('moment-timezone');

import NbaDataClient from '../../data/NbaDataClient';
const StartedGameTableCreator = require('../../tables/StartedGameTableCreator.js');
import UpcomingGameTableCreator from '../../tables/UpcomingGameTableCreator';
import PlayByPlayTableCreator from '../../tables/PlayByPlayTableCreator';
import BoxScoreTableCreator from '../../tables/BoxScoreTableCreator';

const nbaDataClient = new NbaDataClient();
const playByPlayTableCreator = new PlayByPlayTableCreator();
const upcomingGameTableCreator = new UpcomingGameTableCreator();
const boxScoreTableCreator = new BoxScoreTableCreator();

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
    firstRow.push(playByPlayTableCreator.create(gameData.playByPlay))
  }

  if (hasBoxScore(gameData)) {
    let homeBoxScoreTable = boxScoreTableCreator.create(gameData.boxScore.home);
    let visitorBoxScoreTable = boxScoreTableCreator.create(gameData.boxScore.visitor);
    secondRow.push(homeBoxScoreTable);
    secondRow.push(visitorBoxScoreTable);
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
    console.log(upcomingGameTableCreator.create(upcomingGameData));
  }
}

module.exports = {
  outputGamesForDateRange: function(startDate, endDate) {
    nbaDataClient.fetchDataForDateRange(startDate, endDate, outputGames);
  }
};