'use es6'

import colors from 'colors';
import emoji from 'node-emoji';
import {List, Map} from 'immutable';
import Table from 'cli-table2';

import Constants from '../../constants/Constants';
import Formatter from './formatters/Formatter';
import Score from '../../data/Score';

export default class ActiveGameTableCreator {
  static create(data) {
    let table = new Table({
      head: ActiveGameTableCreator.generateHeaders(data).toJS()
    });

    ActiveGameTableCreator.generateRows(data)
                          .forEach(row => table.push(row.toJS()));

    return table.toString();
  }

  static generateHeaders(data) {
    let headers = List.of('', data.status.name.bold.magenta);
    let periodHeaders = List(data.scoring.getPeriodValues()
                                         .map(period => period.bold.cyan));
    return headers.concat(periodHeaders)
                  .concat('Total'.bold.underline.cyan);
  }

  static generateRows(data) {
    let linescoresRows = ActiveGameTableCreator.generateLinescoresRows(data);
    let metadataRows = ActiveGameTableCreator.generateMetadataRows(data);
    return List(linescoresRows).concat(metadataRows);
  }

  static generateMetadataRows(data) {
    let rowNumbers = data.scoring.periods.size + 3;
    let rows = List();
    rows = rows.push(ActiveGameTableCreator.generateMetadataRow(emoji.get(Constants.START_TIME_EMOJI_VALUE),
                                                                data.getLocalizedStartDateTime(),
                                                                rowNumbers));
    return rows.push(ActiveGameTableCreator.generateMetadataRow(emoji.get(Constants.BROADCASTS_EMOJI_VALUE),
                                                                data.getTvBroadcastsString(),
                                                                rowNumbers));
  }

  static generateMetadataRow(label, value, numberOfColumns) {
    return List.of(
      Map({
        content: label,
        colSpan: 1,
      }),
      Map({
        content: value,
        colSpan: numberOfColumns - 1,
      })
    );
  }

  static generateLinescoresRows(data) {
    let homeRow = List.of(emoji.get(Constants.HOME_EMOJI_VALUE),
                          data.matchup.homeTeam.getFormattedTeamAbbreviation());
    let visitorRow = List.of(emoji.get(Constants.VISITOR_EMOJI_VALUE),
                             data.matchup.awayTeam.getFormattedTeamAbbreviation());

    data.scoring.periods.forEach(periodScore => {
      let formattedScore = periodScore.score.format();
      homeRow = homeRow.push(formattedScore.home);
      visitorRow = visitorRow.push(formattedScore.away);
    });

    let formattedTotalScore = data.scoring.total.format();
    homeRow = homeRow.push(formattedTotalScore.home.bold.underline.cyan);
    visitorRow = visitorRow.push(formattedTotalScore.away.bold.underline.cyan);

    return List.of(homeRow, visitorRow);
  }
}
