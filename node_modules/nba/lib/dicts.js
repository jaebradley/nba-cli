"use strict";

var blank = require("./util/blank");
var invert = require("lodash.invert");

var mapOfOnes = function mapOfOnes(arr) {
  return arr.reduce(function (obj, k) {
    return (obj[k] = 1, obj);
  }, {});
};
var pipe = function pipe() {
  for (var _len = arguments.length, fns = Array(_len), _key = 0; _key < _len; _key++) {
    fns[_key] = arguments[_key];
  }

  return function (arg) {
    return fns.reduce(function (last, fn) {
      return fn(last);
    }, arg);
  };
};
var nbaToJsMap = blank({
  "Season": "season",
  "SeasonType": "seasonType",
  "LeagueID": "leagueId",
  "PlayerID": "playerId",
  "GraphStartSeason": "graphStartSeason",
  "GraphEndSeason": "graphEndSeason",
  "GraphStat": "graphStat",
  "asynchFlag": "asynchFlag",
  "IsOnlyCurrentSeason": "isOnlyCurrentSeason",
  "AllStarSeason": "allStarSeason",
  "MeasureType": "measureType",
  "PerMode": "perMode",
  "PlusMinus": "plusMinus",
  "PaceAdjust": "paceAdjust",
  "Rank": "rank",
  "Outcome": "outcome",
  "Location": "location",
  "Month": "month",
  "SeasonSegment": "seasonSegment",
  "DateFrom": "dateFrom",
  "DateTo": "dateTo",
  "OpponentTeamID": "opponentTeamId",
  "VsConference": "vsConference",
  "VsDivision": "vsDivision",
  "GameSegment": "gameSegment",
  "Period": "period",
  "LastNGames": "lastNGames",
  "GameScope": "gameScope",
  "PlayerExperience": "playerExperience",
  "PlayerPosition": "playerPosition",
  "StarterBench": "starterBench",
  "TeamID": "teamId",
  "GameID": "gameId",
  "Position": "position",
  "RookieYear": "rookieYear",
  "ContextMeasure": "contextMeasure",
  "gameDate": "gameDate",
  "DayOffset": "dayOffset",
  "StartPeriod": "startPeriod",
  "EndPeriod": "endPeriod",
  "RangeType": "rangeType",
  "StartRange": "startRange",
  "EndRange": "endRange",
  "ContextFilter": "contextFilter",
  "zone-mode": "zoneMode",
  "GroupQuantity": "groupQuantity",
  "pageNo": "pageNo",
  "rowsPerPage": "rowsPerPage",
  "SeasonID": "seasonId"
});

var jsToNbaMap = blank(invert(nbaToJsMap));
var nbaParams = blank(mapOfOnes(Object.keys(nbaToJsMap)));
var jsParams = blank(mapOfOnes(Object.keys(jsToNbaMap)));

module.exports = {
  nbaParams: nbaParams,
  jsParams: jsParams,
  jsToNbaMap: jsToNbaMap,
  nbaToJsMap: nbaToJsMap
};