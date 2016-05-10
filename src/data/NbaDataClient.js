const moment = require('moment-timezone');
const rp = require('request-promise');
const Q = require('q');

const PlayByPlayClient = require('./clients/PlayByPlayClient.js');
const NbaDataTranslator = require('../translators/NbaDataTranslator.js');
const ScoreboardFilter = require("../filters/data/ScoreboardFilter.js");
const Constants = require('../constants/Constants.js');

function generatScoreboardUrl(formattedDate) {
  return Constants.BASE_NBA_DATA_SCOREBOARD_URL.concat(formattedDate, "/games.json");
}

function generateCustomFormattedDate(date) {
  return date.clone()
             .tz(Constants.DEFAULT_TIMEZONE)
             .format(Constants.DEFAULT_DATE_FORMAT);
}

function fetchPlayByPlayData(filteredGameData) {
  var the_promises = [];
  Object.keys(filteredGameData).forEach(function(gameId) {
    var gameData = filteredGameData[gameId];
    if (moment().valueOf() >= gameData.unixMillisecondsStartTime) {
      const deferred = Q.defer();
      const formattedGameDate = gameData.nbaFormatStartDate;
      PlayByPlayClient.fetchPlayByPlayData(formattedGameDate, gameId, function(data) {
        filteredGameData[gameId]['playByPlay'] = data;
        deferred.resolve(data);
      });
      the_promises.push(deferred.promise);
    }
  });
  return Q.all(the_promises);
}

function fetchScoreboardData(scoreboardUrl, unixMillisecondsStartTime, unixMillisecondsEndTime, callback) {
  var filteredGameData = {};
  rp( { uri: scoreboardUrl, json: true } )
    .then(function (scoreboardData) {
      const translatedData = NbaDataTranslator.translateGameData(scoreboardData);
      filteredGameData = ScoreboardFilter.filterScoreboardData(translatedData, unixMillisecondsStartTime, unixMillisecondsEndTime); })
    .then(function () {
      return fetchPlayByPlayData(filteredGameData); })
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
