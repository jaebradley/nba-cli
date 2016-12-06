'use es6';

import Client from 'nba-stats-client';
import Promise from 'bluebird';
import {List} from 'immutable';

import ScoreboardGamesTranslator from '../translators/ScoreboardGamesTranslator';
import BoxScoreDataTranslator from '../../translators/data/BoxScoreDataTranslator';
import PlayByPlayTranslator from '../translators/PlayByPlayTranslator';

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

  static getTranslatedBoxScores(year, month, day, gameIds) {
    let translations = gameIds.map(gameId => DataAggregator.getTranslatedBoxScore(year, month, day, gameId));
    return Promise.all(translations)
                  .then(results => results)
                  .catch(reason => console.log(reason));
  }

  static getTranslatedBoxScore(year, month, day, gameId) {
    return Client.getBoxScore(year, month, day, gameId)
                 .then(boxScore => BoxScoreDataTranslator.translateBoxScoreData(boxScore));
  }

  static getTranslatedPlayByPlays(year, month, day, gameIds) {
    let translations = gameIds.map(gameId => DataAggregator.getTranslatedPlayByPlay(year, month, day, gameId));
    return Promise.all(translations)
                  .then(results => results)
                  .catch(reason => console.log(reason));
  }

  static getTranslatedPlayByPlay(year, month, day, gameId) {
    return Client.getPlayByPlay(year, month, day, gameId)
                 .then(playByPlay => PlayByPlayTranslator.translate(playByPlay));
  }
};
