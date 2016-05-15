import Table from 'cli-table2';

import Formatter from './formatters/Formatter';

export default class PlayByPlayTableCreator {

  constructor() {
    this.header = ['Clock', 'Description'];
  }

  create(playByPlayData)  {
    const table = new Table({ head: this.header });
    playByPlayData.map(play => table.push(PlayByPlayTableCreator.generateRow(play)));
    return table.toString();
  }

  static generateFormattedPlayClock(playClock, playPeriod) {
    const formattedGamePeriod = Formatter.formatLiveGamePeriod(playPeriod);
    return `${playClock} ${formattedGamePeriod}`;
  }

  static generateRow(play) {
    return [PlayByPlayTableCreator.generateFormattedPlayClock(play.clock, play.period), play.description];
  }
}
