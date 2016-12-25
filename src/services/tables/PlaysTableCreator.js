'use es6';

import emoji from 'node-emoji';
import Table from 'cli-table2';
import {List, Map} from 'immutable';

export default class PlaysTableCreator {
  static create(data)  {
    let table = new Table({
      head: [
        {
          content: emoji.get('hourglass_flowing_sand'),
          hAlign: 'center'
        },
        {
          content: 'Description',
          hAlign: 'center'
        }
      ]
    });
    data.forEach(play => table.push([`${play.clock} ${play.formatPeriod()}`, play.description]));
    return table.toString();
  }
}
