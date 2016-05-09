const moment = require("moment-timezone");
const request = require("request");

const NbaDataTranslator = require("../translators/NbaDataTranslator.js");

const BASE_NBA_DATA_URL = "http://data.nba.com";
const BASE_NBA_DATA_SCOREBOARD_URL = BASE_NBA_DATA_URL.concat("/data/5s/json/cms/noseason/scoreboard/");

const DEFAULT_DATE_FORMAT = "YYYYMMDD";

function generateDailyGamesUrl(formattedDate) {
  return BASE_NBA_DATA_SCOREBOARD_URL.concat(formattedDate, "/games.json");
}

function generateCustomFormattedDate(date) {
  return date.clone().tz(NbaDataTranslator.DEFAULT_TIMEZONE).format(DEFAULT_DATE_FORMAT);
}

function fetchDateTimeFilteredScoreboardData(gameUrl, unixMillisecondsStartDate, unixMillisecondsEndDate, callback) {
  request(gameUrl, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      const translatedGameData = NbaDataTranslator.translateGameData(JSON.parse(body));
      const filteredGameData = {};
      Object.keys(translatedGameData).forEach(function(key) {
        const gameUnixMilliseconds = translatedGameData[key].unixMillisecondsStartTime;
        if (unixMillisecondsStartDate <= gameUnixMilliseconds && unixMillisecondsEndDate >= gameUnixMilliseconds) {
          filteredGameData[key] = translatedGameData[key];
        }
      });
      callback(filteredGameData);
    };
  });
}

function fetchScoreboardDataForDateRange(startDate, endDate, callback) {
  for (var currentDate = startDate; currentDate.isBefore(endDate); currentDate.add(1, 'days')) {
    const gameUrl = generateDailyGamesUrl(generateCustomFormattedDate(currentDate));
    const startDateUnixTimestampMilliseconds = startDate.valueOf();
    const endDateUnixTimestampMilliseconds = endDate.valueOf();
    fetchDateTimeFilteredScoreboardData(gameUrl, startDateUnixTimestampMilliseconds, endDateUnixTimestampMilliseconds, callback);
  }
}

module.exports = {

  fetchDateRangeGames: function(startDate, endDate, callback) {
    const estStartDate = startDate.clone().tz(NbaDataTranslator.DEFAULT_TIMEZONE);
    const estEndDate = endDate.clone().tz(NbaDataTranslator.DEFAULT_TIMEZONE);
    fetchScoreboardDataForDateRange(estStartDate, estEndDate, callback);
  }
};
