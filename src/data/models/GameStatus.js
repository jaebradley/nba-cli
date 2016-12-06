'use es6';

import {Enum} from 'enumify';

export default class GameStatus extends Enum {
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
