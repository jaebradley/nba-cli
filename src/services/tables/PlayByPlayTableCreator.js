'use es6';

import emoji from 'node-emoji';
import Table from 'cli-table2';
import {List, Map} from 'immutable';

export default class PlayByPlayTableCreator {
  static create(data)  {
    let table = new Table({
      head: [emoji.get('hourglass_flowing_sand'), 'Description']
    });
    data.forEach(play => table.push([`${play.clock} ${play.formatPeriod()}`, play.description]));
    return table.toString();
  }
}
