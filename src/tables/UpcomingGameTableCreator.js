const Table = require('cli-table2');

const UPCOMING_GAME_TABLE_HEADER = ['UPCOMING', 'HOME', 'AWAY', 'WATCH', 'ARENA'];

function getLocation(arena, city, state) {
  return arena.concat(', ', city, ', ', state);
}

module.exports = {
  createUpcomingGamesTable: function(data) {
    const table = new Table({head: UPCOMING_GAME_TABLE_HEADER});
    data.forEach(function(upcomingGame) {
      table.push([upcomingGame.formattedLocalizedStartDate,
                  upcomingGame.homeName,
                  upcomingGame.visitorName,
                  upcomingGame.broadcasts.toString(),
                  getLocation(upcomingGame.arena, upcomingGame.city, upcomingGame.state)]);
    });
    return table.toString();
  }
};