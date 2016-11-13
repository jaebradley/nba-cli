'use es6';

import {Enum} from 'enumify';

export default class GameStatus extends Enum {
  static from(nbaStatsGameStatus) {
    for (let status of GameStatus.enumValues) {
      if (status.nbaStatsGameStatus == nbaStatsGameStatus) {
        return GameStatus.enumValueOf(status);
      }
    }

    throw new ReferenceError('unknown nba stats game status');
  }
};

GameStatus.initEnum({
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
});
