const Table = require('cli-table2');
const Colors = require('colors');
const emoji = require('node-emoji');
const nbaImages = require('nba-images');

const HOME_EMOJI_VALUE = 'house';
const VISITOR_EMOJI_VALUE = 'bus';
const START_TIME_EMOJI_VALUE = 'alarm_clock';
const BROADCASTS_EMOJI_VALUE = 'tv';
const SCORE_100_EMOJI_VALUE = '100';

function getStartedGameTableColumns(linescores) {
  return linescores.length + 3;
}

function formatGamePeriod(periodValue) {
  if (parseInt(periodValue) > 4) {
    return 'OT'.concat(periodValue - 4);
  }

  return 'Q'.concat(periodValue);
}

function identifyGameSituation(status, periodValue, gameClock) {
  if (status == "LIVE") {
    const formattedGamePeriod = formatGamePeriod(periodValue);
    return gameClock.concat(" ", formattedGamePeriod);
  }

  return status;
}

function createStartedGameTableHeaders(linescores, status, periodValue, gameClock) {
  const gameSituation = identifyGameSituation(status, periodValue, gameClock);
  const headers = ['', gameSituation.bold.magenta];
  linescores.forEach(function(linescore) {
    headers.push(linescore.period.bold.cyan);
  });
  headers.push('Total'.bold.underline.cyan);
  return headers;
}

function formatTeamAbbreviation(abbreviation) {
  return abbreviation.concat(" ", nbaImages.getTeamEmoji(abbreviation));
}

function formatScore(score, opponentScore) {
  if (score > opponentScore) {
    return score.toString().green;
  } else if (score < opponentScore) {
    return score.toString().red;
  }

  return score.toString().blue;
}

function formatTotalScore(score, opponentScore) {
  if (score == 100) {
    return emoji.get(SCORE_100_EMOJI_VALUE);
  }
  return formatScore(score, opponentScore).bold;
}

function generateLinescoresTableRows(homeAbbreviation, visitorAbbreviation, homeLinescores, visitorLinescores, homeTotal, visitorTotal) {
  const homeRow = [emoji.get(HOME_EMOJI_VALUE), formatTeamAbbreviation(homeAbbreviation)];
  const visitorRow = [emoji.get(VISITOR_EMOJI_VALUE), formatTeamAbbreviation(visitorAbbreviation)];

  for (var i = 0; i < homeLinescores.length; i++) {
    var homeScore = homeLinescores[i].score;
    var visitorScore = visitorLinescores[i].score;
    homeRow.push(formatScore(homeScore, visitorScore));
    visitorRow.push(formatScore(visitorScore, homeScore));
  }

  homeRow.push(formatTotalScore(homeTotal, visitorTotal));
  visitorRow.push(formatTotalScore(visitorTotal, homeTotal));
  return [homeRow, visitorRow];
}

function generateStartedGameMetadataMap(startTime, broadcasts) {
  const map = {};
  map[emoji.get(START_TIME_EMOJI_VALUE)] = startTime;
  map[emoji.get(BROADCASTS_EMOJI_VALUE)] = broadcasts;
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