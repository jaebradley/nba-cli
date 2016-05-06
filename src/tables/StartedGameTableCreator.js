const Table = require('cli-table2');
const Colors = require('colors');

function createStartedGameTableHeaders(linescores) {
  const headers = [''];
  linescores.forEach(function(linescore) {
    headers.push(linescore.period);
  });
  headers.push('Total');
  return headers;
}

function getStartedGameTableColumns(linescores) {
  return linescores.length + 2;
}

function formatTotal(total, opponentTotal) {
  const formattedTotal = Colors.bold;
  if (total > opponentTotal) {
    return formattedTotal.green(total);
  } else if (total < opponentTotal) {
    return formattedTotal.red(total);
  }

  return formattedTotal.blue(total);
}

function generateTeamLinescoresTableRow(linescores, total, opponentTotal) {
  const row = [];
  linescores.forEach(function(linescore) {
    row.push(linescore.score);
  });
  row.push(formatTotal(total, opponentTotal));
  return row;
}

function generateStartedGameMetadataMap(homeTeamName, visitingTeamName, startTime, broadcasts) {
  return {
    'HOME': homeTeamName,
    'AWAY': visitingTeamName,
    'START': startTime,
    'WATCH': broadcasts
  };
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

function formatGamePeriod(periodValue) {
  if (parseInt(periodValue) > 4) {
    return 'OT'.concat(periodValue - 4);
  }

  return 'Q'.concat(periodValue);
}

function identifyGameSituation(status, periodValue, gameClock) {
  if (status == "LIVE") {
    const formattedGamePeriod = formatGamePeriod(periodValue);
    return gameClock + "LEFT IN " + formattedGamePeriod;
  }

  return status;
}

module.exports = {
  createStartedGameTable: function(data) {
    const homeLinescores = data.homeLinescores;
    const visitorLinescores = data.visitorLinescores;
    const homeLinescoresRow = {};
    const visitorLinescoresRow = {};
    const visitorAbbreviation = data.visitorAbbreviation;
    const table = new Table({
      head: createStartedGameTableHeaders(homeLinescores)
    });
    homeLinescoresRow[data.homeAbbreviation] = generateTeamLinescoresTableRow(homeLinescores, data.homeScore, data.visitorScore);
    visitorLinescoresRow[data.visitorAbbreviation] = generateTeamLinescoresTableRow(visitorLinescores, data.visitorScore, data.homeScore);
    const numberOfColumns = getStartedGameTableColumns(homeLinescores);
    const gameSituationRow = [{ content: identifyGameSituation(data.status, data.periodValue, data.gameClock), colSpan: numberOfColumns }];
    const metadataMap = generateStartedGameMetadataMap(data.homeName, data.visitorName, data.formattedLocalizedStartDate, data.broadcasts.toString());
    const metadataRows = generateStartedGameMetadataRows(metadataMap, numberOfColumns);
    table.push(homeLinescoresRow,
               visitorLinescoresRow,
               gameSituationRow);
    metadataRows.forEach(function(row) {
      table.push(row);
    });
    return table.toString();
  }
};