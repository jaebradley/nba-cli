const moment = require("moment-timezone");
const request = require("request");

const NbaDataTranslator = require("./nbaDataTranslator.js");


const baseUrl = "http://data.nba.com";
const dateFormat = "YYYYMMDD";

function generateDailyGamesUrl(formattedDate) {
  return baseUrl + "/data/5s/json/cms/noseason/scoreboard/" + formattedDate + "/games.json";
}

function generateCurrentFormattedDate() {
  return moment().format(dateFormat);
}

function generateYesterdayFormattedDate() {
  return moment().subtract(1, 'days').format(dateFormat);
}

function generateTomorrowFormattedDate() {
  return moment().add(1, 'days').format(dateFormat); 
}

function fetch(gameUrl, callback) {
  request(gameUrl, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      const translatedGameData = NbaDataTranslator.translateGameData(JSON.parse(body));
      callback(translatedGameData);
    };
  });
}

module.exports = {
  fetchTodayGames: function(callback) {
    const gameUrl = generateDailyGamesUrl(generateCurrentFormattedDate());
    fetch(gameUrl, callback);
  },

  fetchYesterdayGames: function(callback) {
    const gameUrl = generateDailyGamesUrl(generateYesterdayFormattedDate());
    fetch(gameUrl, callback);
  },

  fetchTomorrowGames: function(callback) {
    const gameUrl = generateDailyGamesUrl(generateTomorrowFormattedDate());
    fetch(gameUrl, callback);
  }
};
