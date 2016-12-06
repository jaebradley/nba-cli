import Table from 'cli-table2';
import {List} from 'immutable';

import Formatter from './formatters/Formatter';

export default class PlayByPlayTableCreator {

  static create(playByPlayData)  {
    let table = new Table({ head: PlayByPlayTableCreator.getHeader() });
    playByPlayData.forEach(play => table.push(PlayByPlayTableCreator.generateRow(play)));
    return table.toString();
  }

  static generateFormattedPlayClock(playClock, playPeriod) {
    let formattedGamePeriod = Formatter.formatLiveGamePeriod(playPeriod);
    return `${playClock} ${formattedGamePeriod}`;
  }

  static generateRow(play) {
    let playClock = PlayByPlayTableCreator.generateFormattedPlayClock(play.clock, play.period);
    return List.of(playClock, play.description);
  }

  static getHeader() {
    return List.of('Clock', 'Description');
  }
}
