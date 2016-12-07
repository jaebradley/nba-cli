import Table from 'cli-table2';
import {List} from 'immutable';

import Formatter from './formatters/Formatter';

export default class PlayByPlayTableCreator {

  static create(data)  {
    let table = new Table(PlayByPlayTableCreator.getTableConfiguration());
    data.forEach(play => table.push(PlayByPlayTableCreator.generateRow(play)));
    return table.toString();
  }

  static generateFormattedPlayClock(clock, period) {
    let formattedPeriod = Formatter.formatLiveGamePeriod(period);
    return `${clock} ${formattedPeriod}`;
  }

  static generateRow(play) {
    let playClock = PlayByPlayTableCreator.generateFormattedPlayClock(play.clock, play.period);
    return List.of(playClock, play.description);
  }

  static getTableConfiguration() {
    return {
      head: PlayByPlayTableCreator.getHeader().toJS()
    };
  }

  static getHeader() {
    return List.of('Clock', 'Description');
  }
}
