const moment = require('moment-timezone');
const rp = require('request-promise');
const Q = require('q');

const PlayByPlayClient = require('./clients/PlayByPlayClient.js');
import BoxScoreClient from './clients/BoxScoreClient';
import ScoreboardDataTranslator from '../translators/data/ScoreboardDataTranslator';
const ScoreboardFilter = require("../filters/data/ScoreboardFilter.js");
const Constants = require('../constants/Constants.js');

const scoreboardTranslator = new ScoreboardDataTranslator();
const boxScoreClient = new BoxScoreClient();

function generatScoreboardUrl(formattedDate) {
  return Constants.BASE_NBA_DATA_SCOREBOARD_URL.concat(formattedDate, "/games.json");
}

function generateCustomFormattedDate(date) {
  return date.clone()
             .tz(Constants.DEFAULT_TIMEZONE)
             .format(Constants.DEFAULT_DATE_FORMAT);
}

function shouldFetchData(unixMillisecondsStartTime, gameStatus) {
  return moment().valueOf() >= unixMillisecondsStartTime && gameStatus != Constants.PREGAME;
}

function fetchPlayByPlayData(filteredGameData) {
  var promises = [];
  Object.keys(filteredGameData).forEach(function(gameId) {
    var gameData = filteredGameData[gameId];
    if (shouldFetchData(gameData.unixMillisecondsStartTime, gameData.status)) {
      const deferred = Q.defer();
      const formattedGameDate = gameData.nbaFormatStartDate;
      PlayByPlayClient.fetchPlayByPlayData(formattedGameDate, gameId, function(data) {
        filteredGameData[gameId]['playByPlay'] = data;
        deferred.resolve(data);
      });
      promises.push(deferred.promise);
    }
  });
  return Q.all(promises);
}

function fetchBoxScoreData(filteredGameData) {
  var promises = [];
  Object.keys(filteredGameData).forEach(function(gameId) {
    var gameData = filteredGameData[gameId];
    if (shouldFetchData(gameData.unixMillisecondsStartTime, gameData.status)) {
      const deferred = Q.defer();
      const formattedGameDate = gameData.nbaFormatStartDate;
      boxScoreClient.fetchBoxScoreData(formattedGameDate, gameId, function(data) {
        filteredGameData[gameId]['boxScore'] = data;
        deferred.resolve(data);
      });
      promises.push(deferred.promise);
    }
  });
  return Q.all(promises);
}

function fetchScoreboardData(scoreboardUrl, unixMillisecondsStartTime, unixMillisecondsEndTime, callback) {
  var filteredGameData = {};
  rp( { uri: scoreboardUrl, json: true } )
    .then(function (scoreboardData) {
      const translatedData = scoreboardTranslator.translateScoreboardData(scoreboardData);
      filteredGameData = ScoreboardFilter.filterScoreboardData(translatedData, unixMillisecondsStartTime, unixMillisecondsEndTime); })
    .then(function () {
      return fetchPlayByPlayData(filteredGameData); })
    .then(function () {
      return fetchBoxScoreData(filteredGameData); })
    .then(function (data) {
      callback(filteredGameData);
    })
    .catch(function (err) {
      console.log(err);
    });
}

function fetchScoreboardDataForDateRange(startDate, endDate, callback) {
  const startDateUnixTimestampMilliseconds = startDate.valueOf();
  const endDateUnixTimestampMilliseconds = endDate.valueOf();
  for (var currentDate = startDate; currentDate.isBefore(endDate); currentDate.add(1, 'days')) {
    const scoreboardUrl = generatScoreboardUrl(generateCustomFormattedDate(currentDate));
    fetchScoreboardData(scoreboardUrl, startDateUnixTimestampMilliseconds, endDateUnixTimestampMilliseconds, callback);
  }
}

module.exports = {

  fetchDateRangeGames: function(startDate, endDate, callback) {
    const estStartDate = startDate.clone()
                                  .tz(Constants.DEFAULT_TIMEZONE);
    const estEndDate = endDate.clone()
                              .tz(Constants.DEFAULT_TIMEZONE);
    fetchScoreboardDataForDateRange(estStartDate, estEndDate, callback);
  }
};
