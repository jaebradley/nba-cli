'use es6';

import Client from 'nba-stats-client';
import Promise from 'bluebird';
import {List, Map} from 'immutable';

import Game from '../data/Game';
import Games from '../data/Games';
import BoxScoreDataTranslator from './translators/BoxScoreDataTranslator';
import PlayByPlayTranslator from './translators/PlayByPlayTranslator';
import ScoreboardGamesTranslator from './translators/ScoreboardGamesTranslator';

export default class DataAggregator {
  static aggregate(year, month, day) {
    return DataAggregator
      .getScoreboards(year, month, day)
      .then(scoreboards => DataAggregator.fetchAllGameSpecificData(scoreboards))
      .then(allGameData => DataAggregator.aggregateGames(allGameData))
      .then(games => DataAggregator.buildGames(games));
  }

  static getAllGameSpecificData(games) {
    let ids = List(games.map(game => game.id));
    return Promise.all([
      DataAggregator.getBoxScores(year, month, day, ids),
      DataAggregator.getPlayByPlays(year, month, day, ids),
      games
    ]);
  };

  static aggregateGames(data) {
    let boxScores = data[0];
    let playByPlays = data[1];
    let games = data[2];

    if (boxScores.size !== playByPlays.size) {
      throw new RangeError('box scores and play by plays must have same size');
    }

    if (boxScores.size !== games.size) {
      throw new RangeError('box scores and play by plays must have same size');
    }

    let aggregatedGames = List();
    for (let i = 0; i < games.size; i++) {
      let aggregatedGame = new AggregatedGame({
        metadata: games.get(i),
        boxScoreLeaders: boxScores.get(i),
        playByPlay: playByPlays.get(i),
      });
      aggregatedGames = aggregatedGames.push(aggregatedGame);
    }

    return aggregatedGames.sortBy(game => game.metadata.id);
  }

  static buildGames(games) {
    let upcoming = List();
    let active = List();
    
    games.forEach(game => {
      if (game.metadata.isUpcoming()) {
        upcoming = upcoming.push(game);
      } else {
        active = active.push(game);
      }
    });

    return new Games({
      upcoming: upcoming,
      active: active
    });
  }

  static getScoreboards(year, month, day) {
    return Client.getGames(year, month, day)
                 .then(games => ScoreboardGamesTranslator.translate(games));
  }

  static getBoxScores(year, month, day, gameIds) {
    let translations = gameIds.map(gameId => DataAggregator.getBoxScore(year, month, day, gameId));
    return Promise.all(translations)
                  .then(results => List(results))
                  .catch(reason => console.log(reason));
  }

  static getBoxScore(year, month, day, gameId) {
    return Client.getBoxScore(year, month, day, gameId)
                 .then(boxScore => BoxScoreDataTranslator.translateBoxScoreData(boxScore));
  }

  static getPlayByPlays(year, month, day, gameIds) {
    let translations = gameIds.map(gameId => DataAggregator.getPlayByPlay(year, month, day, gameId));
    return Promise.all(translations)
                  .then(results => List(results))
                  .catch(reason => console.log(reason));
  }

  static getPlayByPlay(year, month, day, gameId) {
    return Client.getPlayByPlay(year, month, day, gameId)
                 .then(playByPlay => PlayByPlayTranslator.translate(playByPlay));
  }
};
