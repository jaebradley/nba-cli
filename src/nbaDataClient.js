const moment = require("moment");
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

module.exports = {
  fetchTodayGames: function(callback) {
    const gameUrl = generateDailyGamesUrl(generateCurrentFormattedDate());
    request(gameUrl, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        const translatedGameData = NbaDataTranslator.translateGameData(JSON.parse(body));
        callback(translatedGameData);
      };
    });
  }
};
