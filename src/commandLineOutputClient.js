const Table = require('cli-table');
const NbaDataClient = require('./nbaDataClient.js');
const moment = require('moment-timezone');

const defaultTableFormatting = {
  chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
         , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
         , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
         , 'right': '║' , 'right-mid': '╢' , 'middle': '│' }
};

function outputGames(data) {
  for (const key in data) {
    const gameData = data[key];
    if (!isGameUpcoming(gameData)) {
      outputStartedGameTable(data[key]);
    }
  }
}

function outputUpcomingGameTable(data) {
  const table = new Table(defaultTableFormatting);
  const location = data.arena.concat(',', data.city, ',', data.state);
  table.push(
    ['HOME', 'AWAY', 'START TIME', 'WATCH IT ON', 'ARENA'],
    [data.homeName, data.visitorName, data.formattedLocalizedStartDate, data.broadcasts.toString(), location]
  );
  console.log(table.toString());
}

function isGameUpcoming(data) {
  return data.unixMillisecondsStartTime > moment().valueOf();
}

function outputStartedGameTable(data) {
  outputLinescoresTable(data);
  outputUpcomingGameTable(data);
}

function outputLinescoresTable(data) {
  const table = new Table(defaultTableFormatting);
  const headers = generateLinescoresTableHeaders(data.homeLinescores);
  const homeRow = generateTeamLinescoresTableRow(data.homeAbbreviation, data.homeLinescores, data.homeScore);
  const visitorRow = generateTeamLinescoresTableRow(data.visitorAbbreviation, data.visitorLinescores, data.visitorScore);
  homeRow.unshift(generateFormattedPeriodValue(data.periodValue));
  visitorRow.unshift(generateGameStatus(data.status, data.periodValue, data.gameClock));
  table.push(
    headers,
    homeRow,
    visitorRow
  );
  console.log(table.toString());
}

function generateLinescoresTableHeaders(linescores) {
  const headers = ['', ''];
  linescores.forEach(function(linescore) {
    headers.push(linescore.period);
  });
  headers.push('Total');
  return headers;
}

function generateTeamLinescoresTableRow(teamAbbreviation, linescores, total) {
  const row = [teamAbbreviation];
  linescores.forEach(function(linescore) {
    row.push(linescore.score);
  });
  row.push(total);
  return row;
}

function generateFormattedPeriodValue(periodValue) {
  if (periodValue == "" || parseInt(periodValue) <= 1) {
    return 'Q1';
  }

  else if (parseInt(periodValue) > 4) {
    return 'OT'.concat(periodValue - 4);
  }

  return 'Q'.concat(periodValue);
}

function generateGameStatus(status, periodValue, gameClock) {
  if (status == "LIVE") {
    return generateFormattedGameClock(periodValue, gameClock);
  }

  return status;
}

function generateFormattedGameClock(periodValue, gameClock) {
  if ((typeof periodValue == "string" || parseInt(periodValue) <= 1) && gameClock == '') {
    return '12:00';
  } 

  else if (parseInt(periodValue) > 4 && gameClock == '') {
    return '05:00';
  }

  return gameClock;
}

module.exports = {
  outputTodayGames: function() {
    NbaDataClient.fetchTodayGames(outputGames);
  },

  outputYesterdayGames: function() {
    NbaDataClient.fetchYesterdayGames(outputGames);
  }
};