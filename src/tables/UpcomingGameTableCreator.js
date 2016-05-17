import Table from 'cli-table2';

export default class UpcomingGameTableCreator {
  constructor() {
    this.header = ['UPCOMING', 'HOME', 'AWAY', 'WATCH', 'ARENA'];
    this.defaultFormat = { head: this.header };
  }

  create(upcomingGame) {
    const table = new Table(this.defaultFormat);
    table.push([
      upcomingGame.formattedLocalizedStartDate,
      upcomingGame.homeName,
      upcomingGame.visitorName,
      upcomingGame.broadcasts.toString(),
      UpcomingGameTableCreator.formatLocation(upcomingGame.arena, upcomingGame.city, upcomingGame.state)
    ]);
    return table.toString();
  }

  static formatLocation(arena, city, state) {
    return `${arena}, ${city}, ${state}`;
  }
}
