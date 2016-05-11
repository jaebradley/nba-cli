const Table = require('cli-table2');
const Colors = require('colors');
const emoji = require('node-emoji');
const nbaImages = require('nba-images');

const Constants = require('../constants/Constants.js');
const Formatter = require('./formatters/Formatter.js');

function getStartedGameTableColumns(linescores) {
  return linescores.length + 3;
}

function createStartedGameTableHeaders(linescores, status, periodValue, gameClock) {
  const gameSituation = Formatter.formatGameSituation(status, periodValue, gameClock);
  const headers = ['', gameSituation.bold.magenta];
  linescores.forEach(function(linescore) {
    headers.push(linescore.period.bold.cyan);
  });
  headers.push('Total'.bold.underline.cyan);
  return headers;
}

function generateLinescoresTableRows(homeAbbreviation, visitorAbbreviation, homeLinescores, visitorLinescores, homeTotal, visitorTotal) {
  const homeRow = [emoji.get(Constants.HOME_EMOJI_VALUE), Formatter.formatTeamAbbreviation(homeAbbreviation)];
  const visitorRow = [emoji.get(Constants.VISITOR_EMOJI_VALUE), Formatter.formatTeamAbbreviation(visitorAbbreviation)];

  for (var i = 0; i < homeLinescores.length; i++) {
    var homeScore = homeLinescores[i].score;
    var visitorScore = visitorLinescores[i].score;
    homeRow.push(Formatter.formatScore(homeScore, visitorScore));
    visitorRow.push(Formatter.formatScore(visitorScore, homeScore));
  }

  homeRow.push(Formatter.formatTotalScore(homeTotal, visitorTotal));
  visitorRow.push(Formatter.formatTotalScore(visitorTotal, homeTotal));
  return [homeRow, visitorRow];
}

function generateStartedGameMetadataMap(startTime, broadcasts) {
  const map = {};
  map[emoji.get(Constants.START_TIME_EMOJI_VALUE)] = startTime;
  map[emoji.get(Constants.BROADCASTS_EMOJI_VALUE)] = broadcasts;
  return map;
}

function generateStartedGameMetadataRow(label, value, numberOfColumns) {
  return [
    {
      content: label,
      colSpan: 1
    },
    {
      content: value,
      colSpan: numberOfColumns - 1
    }
  ];
}

function generateStartedGameMetadataRows(metadataMap, numberOfColumns) {
  const rows = [];
  Object.keys(metadataMap).forEach(function(key) {
    rows.push(
        generateStartedGameMetadataRow(key, metadataMap[key], numberOfColumns)
    );
  });
  return rows;
}

function generateStartedGameTableRows(data) {
  const rows = [];
  const homeLinescores = data.homeLinescores;
  const visitorLinescores = data.visitorLinescores;
  const homeAbbreviation = data.homeAbbreviation;
  const visitorAbbreviation = data.visitorAbbreviation;
  const homeScore = data.homeScore;
  const visitorScore = data.visitorScore;
  const startTime = data.formattedLocalizedStartDate;
  const broadcasts = data.broadcasts.toString();
  const linescoresRows = generateLinescoresTableRows(homeAbbreviation, visitorAbbreviation, homeLinescores, visitorLinescores, homeScore, visitorScore);
  const numberOfColumns = getStartedGameTableColumns(homeLinescores);
  const metadataMap = generateStartedGameMetadataMap(startTime, broadcasts);
  const metadataRows = generateStartedGameMetadataRows(metadataMap, numberOfColumns);
  rows.push.apply(rows, linescoresRows);
  rows.push.apply(rows, metadataRows);
  return rows;
}

module.exports = {
  createStartedGameTable: function(data) {
    const homeLinescores = data.homeLinescores;
    const gameStatus = data.status;
    const periodValue = data.periodValue;
    const gameClock = data.gameClock;
    const table = new Table({ head: createStartedGameTableHeaders(homeLinescores, gameStatus, periodValue, gameClock) });
    const rows = generateStartedGameTableRows(data);
    rows.forEach(function(row) {
      table.push(row);
    });
    return table.toString();
  }
};