import colors from 'colors';
import Table from 'cli-table2';

import Constants from '../../constants/Constants';
import Score from '../../data/Score';

export default class StartedGameTableCreator {
  static create(data) {
    const table = new Table({ head: StartedGameTableCreator.buildHeaders(data) });

    StartedGameTableCreator.generateRows(data)
                          .forEach(row => table.push(row));

    return table.toString();
  }

  static buildHeaders(data) {
    const periodHeaders = data.scoring.getPeriodValues()
                                      .map((period) => period.bold.cyan)
                                      .toJS();
    return ['', data.status.name.bold.magenta]
      .concat(periodHeaders)
      .concat('Total'.bold.underline.cyan);
  }

  static generateRows(data) {
    return StartedGameTableCreator.generateLinescoresRows(data)
      .concat(StartedGameTableCreator.generateMetadataRows(data));
  }

  static generateMetadataRows(data) {
    const rowNumbers = data.scoring.periods.size + 3;
    const rows = [];

    rows.push(StartedGameTableCreator.generateMetadataRow(Constants.START_TIME_EMOJI,
                                                          data.getLocalizedStartDateTime(),
                                                          rowNumbers));
    rows.push(StartedGameTableCreator.generateMetadataRow(Constants.BROADCASTS_EMOJI,
                                                          data.getTvBroadcastsString(),
                                                          rowNumbers));
    return rows;
  }

  static generateMetadataRow(label, value, numberOfColumns) {
    return [
      {
        content: label,
        colSpan: 1,
      },
      {
        content: value,
        colSpan: numberOfColumns - 1,
      },
    ];
  }

  static generateLinescoresRows(data) {
    const homeRow = [
      Constants.HOME_EMOJI,
      data.matchup.homeTeam.getFormattedTeamAbbreviation(),
    ];
    const visitorRow = [
      Constants.VISITOR_EMOJI,
      data.matchup.awayTeam.getFormattedTeamAbbreviation()
    ];

    data.scoring.periods.forEach(periodScore => {
      let formattedScore = periodScore.score.format();
      homeRow.push(formattedScore.home);
      visitorRow.push(formattedScore.away);
    });

    const formattedTotalScore = data.scoring.total.format();
    homeRow.push(formattedTotalScore.home.bold.underline.cyan);
    visitorRow.push(formattedTotalScore.away.bold.underline.cyan);

    return [homeRow, visitorRow];
  }
}
