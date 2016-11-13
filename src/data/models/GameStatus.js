'use es6';

import import {Enum} from 'enumify';

export default class GameStatus extends Enum {};
Outcome.initEnum(
  PREGAME: {
    nbaStatsPeriodValue: 1,
  },
  LIVE: {
    nbaStatsPeriodValue: 2,
  },
  HALFTIME: {
    nbaStatsPeriodValue: 'Halftime'
  },
  FINAl: {
    nbaStatsPeriodValue: 3,
  },
);
