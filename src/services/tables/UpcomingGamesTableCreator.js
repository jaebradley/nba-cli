import jstz from 'jstimezonedetect';
import Table from 'cli-table2';
import Constants from '../../constants/Constants';

export default class UpcomingGamesTableCreator {
  static create(data) {
    const table = new Table({ head: UpcomingGamesTableCreator.getHeaders() });
    data.forEach((metadata) => table.push(UpcomingGamesTableCreator.format(metadata)));
    return table.toString();
  }

  static format(data) {
    return [
      data.getLocalizedStartDateTime(),
      data.matchup.homeTeam.getName(),
      data.matchup.awayTeam.getName(),
      data.getTvBroadcastsString(),
      data.location.getFormattedLocation(),
    ];
  }

  static getHeaders() {
    const values = [
      `${Constants.START_TIME_EMOJI} ${jstz.determine().name()}`,
      Constants.HOME_EMOJI,
      Constants.VISITOR_EMOJI,
      Constants.BROADCASTS_EMOJI,
      Constants.LOCATION_EMOJI,
    ];

    return values.map((value) => ({ content: value, hAlign: 'center' }));
  }
}
