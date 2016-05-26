import Table from 'cli-table2';

export default class UpcomingGameTableCreator {
  constructor() {
    this.header = ['UPCOMING', 'HOME', 'AWAY', 'WATCH', 'ARENA'];
    this.defaultFormat = { head: this.header };
  }

  create(upcomingGameMetadataList) {
    const table = new Table(this.defaultFormat);
    upcomingGameMetadataList.map(upcomingGameMetadata => (
      table.push([
        upcomingGameMetadata.getLocalizedStartDateTime(),
        upcomingGameMetadata.home.getName(),
        upcomingGameMetadata.visitor.getName(),
        upcomingGameMetadata.getBroadcastsString(),
        upcomingGameMetadata.location.getFormattedLocation(),
      ])
    ));
    return table.toString();
  }
}
