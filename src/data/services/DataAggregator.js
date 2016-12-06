'use es6';

import Client from 'nba-stats-client';

import ScoreboardGamesTranslator from '../translators/ScoreboardGamesTranslator';

export default class DataAggregator {
  static getTranslatedGames(year, month, day) {
    if (typeof year !== 'number') {
      throw new TypeError('year must be a number');
    }

    if (typeof month !== 'number') {
      throw new TypeError('month must be a number');
    }

    if (typeof day !== 'number') {
      throw new TypeError('day must be a number');
    }

    return Client.getGames(year, month, day)
                 .then(games => ScoreboardGamesTranslator.translate(games));
  }
};
