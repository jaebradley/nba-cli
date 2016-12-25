'use es6';

import {Enum} from 'enumify';

export default class GamesOption extends Enum {};

GamesOption.initEnum({
  TODAY: {
    value: 'TODAY'
  },
  YESTERDAY: {
    value: 'YESTERDAY'
  },
  TOMORROW: {
    value: 'TOMORROW'
  }
});
