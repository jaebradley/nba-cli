import Table from 'cli-table2';

export default class UpcomingGameTableCreator {
  constructor() {
    this.header = ['UPCOMING', 'HOME', 'AWAY', 'WATCH', 'ARENA'];
    this.defaultFormat = { head: this.header };
  }

  create(upcomingGame) {
    const table = new Table(this.defaultFormat);
    table.push([
      upcomingGame.localizedStartDate,
      upcomingGame.homeName,
      upcomingGame.visitorName,
      upcomingGame.broadcasts.toString(),
      upcomingGame.getFormattedLocation(),
    ]);
    return table.toString();
  }
}
