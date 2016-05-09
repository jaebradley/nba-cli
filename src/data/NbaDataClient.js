const moment = require("moment-timezone");
const rp = require('request-promise');

const NbaDataTranslator = require("../translators/NbaDataTranslator.js");
const ScoreboardFilter = require("../filters/data/ScoreboardFilter.js");
const Constants = require("../constants/Constants.js");

function generatScoreboardUrl(formattedDate) {
  return Constants.BASE_NBA_DATA_SCOREBOARD_URL.concat(formattedDate, "/games.json");
}

function generateCustomFormattedDate(date) {
  return date.clone()
             .tz(Constants.DEFAULT_TIMEZONE)
             .format(Constants.DEFAULT_DATE_FORMAT);
}

function fetchScoreboardData(scoreboardUrl, unixMillisecondsStartTime, unixMillisecondsEndTime, callback) {
  rp( {uri: scoreboardUrl, json: true} )
    .then(function (scoreboardData) {
      return NbaDataTranslator.translateGameData(scoreboardData); })
    .then(function (translatedData) {
      return ScoreboardFilter.filterScoreboardData(translatedData, unixMillisecondsStartTime, unixMillisecondsEndTime) })
    .then(function (filteredGameData) {
      callback(filteredGameData); })
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
