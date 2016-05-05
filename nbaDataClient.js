'use es6';

import moment from "moment";

const baseUrl = "http://data.nba.com";
const dateFormat = "YYYYMMDD";

function generateDailyGamesUrl(formattedDate) {
  return baseUrl + "/data/5s/json/cms/noseason/scoreboard/" + formattedDate + "/games.json";
}

function generateCurrentFormattedDate() {
  return moment().format(dateFormat);
}

function generateCurrentDayGames() {
  return generateDailyGamesUrl(generateCurrentFormattedDate());
}

