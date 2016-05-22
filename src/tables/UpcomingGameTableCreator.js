import Table from 'cli-table2';

export default class UpcomingGameTableCreator {
  constructor() {
    this.header = ['UPCOMING', 'HOME', 'AWAY', 'WATCH', 'ARENA'];
    this.defaultFormat = { head: this.header };
  }

  create(upcomingGame) {
    const table = new Table(this.defaultFormat);
    table.push([
      upcomingGame.getLocalizedStartDateTime(),
      upcomingGame.home.getName(),
      upcomingGame.visitor.getName(),
      upcomingGame.getBroadcastsString(),
      upcomingGame.location.getFormattedLocation(),
    ]);
    return table.toString();
  }
}
