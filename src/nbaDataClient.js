const moment = require("moment-timezone");
const request = require("request");

const NbaDataTranslator = require("./nbaDataTranslator.js");


const baseUrl = "http://data.nba.com";
const dateFormat = "YYYYMMDD";
const DEFAULT_TIMEZONE = "America/New_York";

function generateDailyGamesUrl(formattedDate) {
  return baseUrl + "/data/5s/json/cms/noseason/scoreboard/" + formattedDate + "/games.json";
}

function generateCustomFormattedDate(date) {
  return date.clone().tz(DEFAULT_TIMEZONE).format(dateFormat);
}

function fetch(gameUrl, unixMillisecondsStartDate, unixMillisecondsEndDate, callback) {
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

function fetchForDateRange(startDate, endDate, callback) {
  for (var currentDate = startDate; currentDate.isBefore(endDate); currentDate.add(1, 'days')) {
    const gameUrl = generateDailyGamesUrl(generateCustomFormattedDate(currentDate));
    fetch(gameUrl, startDate.valueOf(), endDate.valueOf(), callback);
  }
}

module.exports = {

  fetchDateRangeGames: function(startDate, endDate, callback) {
    const estStartDate = startDate.clone().tz(DEFAULT_TIMEZONE);
    const estEndDate = endDate.clone().tz(DEFAULT_TIMEZONE);
    fetchForDateRange(estStartDate, estEndDate, callback);
  }
};
