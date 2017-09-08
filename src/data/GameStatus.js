import { Enum } from 'enumify';

export default class GameStatus extends Enum {
  static identifyFromValue(value) {
    for (let status of GameStatus.enumValues) {
      if (status.nbaStatsGameStatus == value) {
        return status;
      }
    }

    throw new ReferenceError(`Unknown Game Status: ${value}`);
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
  FINAL: {
    nbaStatsGameStatus: 3,
  },
});
