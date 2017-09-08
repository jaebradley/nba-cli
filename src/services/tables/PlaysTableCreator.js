import Table from 'cli-table2';

import { PLAY_TIME_EMOJI } from '../../constants/Constants';
import PeriodFormatter from '../PeriodFormatter';

export default class PlaysTableCreator {
  static create(data)  {
    const table = new Table({
      head: [
        {
          content: PLAY_TIME_EMOJI,
          hAlign: 'center'
        },
        {
          content: 'Description',
          hAlign: 'center'
        },
      ],
    });
    data.forEach((play) => table.push(PlaysTableCreator.buildRow(play)));
    return table.toString();
  }

  static buildRow(play) {
    return [
      `${play.clock} ${PeriodFormatter.format(play)}`,
      play.description,
    ];
  }
}
