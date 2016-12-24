'use es6';

import {Enum} from 'enumify';

export default class GamesOption extends Enum {};
Outcome.initEnum([
  TODAY: {
    value: 'TODAY',
    getDate: new Date()
  },
  YESTERDAY: {
    value: 'YESTERDAY',
    getDate: new Date()
  },
  TOMORROW: {
    value: 'TOMORROW',
    getDate: new Date()
  }
]);
