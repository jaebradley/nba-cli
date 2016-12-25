'use es6';

import Client from 'nba-stats-client';
import Promise from 'bluebird';
import {List, Map} from 'immutable';

import Game from '../data/Game';
import Games from '../data/Games';
import BoxScoreDataTranslator from './translators/BoxScoreDataTranslator';
import PlaysTranslator from './translators/PlaysTranslator';
import ScoreboardGamesTranslator from './translators/ScoreboardGamesTranslator';

export default class DataAggregator {
  static aggregate(date) {
    return DataAggregator
      .getScoreboards(date)
      .then(scoreboards => DataAggregator.getAllGameSpecificData(date, scoreboards))
      .then(allGameData => DataAggregator.aggregateGames(allGameData));
  }

  static getAllGameSpecificData(date, games) {
    let ids = List();
    for (let game of games) {
      if (!game.isUpcoming()) {
        ids = ids.push(game.id);
      }
    }

    return Promise.all([
      DataAggregator.getBoxScores(date, ids),
      DataAggregator.getAllPlays(date, ids),
      games
    ]);
  };

  static aggregateGames(data) {
    let boxScores = data[0];
    let plays = data[1];
    let games = data[2];

    if (boxScores.size !== plays.size) {
      throw new RangeError('box scores and play by plays must have same size');
    }

    let active = List();
    let upcoming = List();
    for (let metadata of games) {
      if (metadata.isUpcoming()) {
        upcoming = upcoming.push(metadata);
      } else {
        let gameId = metadata.id;
        active = active.push(new Game({
          metadata: metadata,
          boxScoreLeaders: boxScores.get(gameId),
          plays: plays.get(gameId),
        }));
      }
    }

    return new Games({
      active: active.sortBy(game => game.metadata.id),
      upcoming: upcoming.sortBy(metadata => metadata.id)
    });
  }

  static getScoreboards(date) {
    return Client.getGames(date.year(), date.month() + 1, date.date())
                 .then(games => ScoreboardGamesTranslator.translate(games));
  }

  static getBoxScores(date, gameIds) {
    let translations = gameIds.map(gameId => DataAggregator.getBoxScore(date, gameId));
    return Promise.all(translations)
                  .then(results => {
                    let mapping = Map();
                    for (let i = 0; i < results.length; i++) {
                      mapping = mapping.set(gameIds.get(i), results[i]);
                    }
                    return mapping;
                  });
  }

  static getBoxScore(date, gameId) {
    return Client.getBoxScore(date.year(), date.month() + 1, date.date(), gameId)
                 .then(boxScore => BoxScoreDataTranslator.translateBoxScoreData(boxScore))
                 .catch(err => console.error(err));
  }

  static getAllPlays(date, gameIds) {
    let translations = gameIds.map(gameId => DataAggregator.getPlays(date, gameId));
    return Promise.all(translations)
                  .then(results => {
                    let mapping = Map();
                    for (let i = 0; i < results.length; i++) {
                      mapping = mapping.set(gameIds.get(i), results[i]);
                    }
                    return mapping;
                  });
  }

  static getPlays(date, gameId) {
    return Client.getPlayByPlay(date.year(), date.month() + 1, date.date(), gameId)
                 .then(plays => PlaysTranslator.translate(plays))
                 .catch(err => console.error(err));
  }
};
