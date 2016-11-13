'use es6';

import import {Enum} from 'enumify';

export default class GameStatus extends Enum {
  static from(nbaStatsGameStatus) {
    if (typeof nbaStatsGameStatus !== 'string') {
      throw new TypeError('game status from NBA Stats is not a string');
    }
  }
};
Outcome.initEnum(
  PREGAME: {
    nbaStatsGameStatus: 1,
  },
  LIVE: {
    nbaStatsGameStatus: 2,
  },
  HALFTIME: {
    nbaStatsGameStatus: 'Halftime'
  },
  FINAl: {
    nbaStatsGameStatus: 3,
  },
);
