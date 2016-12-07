import Table from 'cli-table2';
import {List, Map} from 'immutable';

export default class UpcomingGamesTableCreator {

  static create(data) {
    let table = new Table(UpcomingGamesTableCreator.getTableConfiguration()
                                                   .toJS());
    data.forEach(metadata =>
                 table.push(UpcomingGamesTableCreator.formatMetadata(metadata)
                                                     .toJS()));
    return table.toString();
  }

  static formatMetadata(metadata) {
    return List.of(
      metadata.getLocalizedStartDateTime(),
      metadata.home.getName(),
      metadata.visitor.getName(),
      metadata.getBroadcastsString(),
      metadata.location.getFormattedLocation(),
    );
  }

  static getTableConfiguration() {
    return Map({
      head: UpcomingGamesTableCreator.getHeader()
    });
  }

  static getHeader() {
    return List.of('UPCOMING', 'HOME', 'AWAY', 'WATCH', 'ARENA');
  }
}
