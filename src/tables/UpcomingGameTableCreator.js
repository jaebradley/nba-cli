import Table from 'cli-table2';

export default class UpcomingGameTableCreator {
  constructor() {
    this.header = ['UPCOMING', 'HOME', 'AWAY', 'WATCH', 'ARENA'];
    this.defaultFormat = { head: this.header };
  }

  create(upcomingGamesData) {
    const table = new Table(this.defaultFormat);
    data.map(upcomingGame => (
      table.push([
        upcomingGame.formattedLocalizedStartDate,
        upcomingGame.homeName,
        upcomingGame.visitorName,
        upcomingGame.broadcasts.toString(),
        UpcomingGameTableCreator.getLocation(upcomingGame.arena, upcomingGame.city, upcomingGame.state)
      ])
    ));
    return table.toString();
  }

  static formatLocation(arena, city, state) {
    return `${arena}, ${city}, ${state}`;
  }
}
