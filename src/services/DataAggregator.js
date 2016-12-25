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
  static aggregate(date) {
    return DataAggregator
      .getScoreboards(date)
      .then(scoreboards => DataAggregator.getAllGameSpecificData(date, scoreboards))
      .then(allGameData => DataAggregator.aggregateGames(allGameData))
      .then(games => DataAggregator.buildGames(games));
  }

  static getAllGameSpecificData(date, games) {
    let ids = List(games.map(game => game.id));
    return Promise.all([
      DataAggregator.getBoxScores(date, ids),
      DataAggregator.getPlayByPlays(date, ids),
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
      let aggregatedGame = new Game({
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

  static getScoreboards(date) {
    return Client.getGames(date.year(), date.month() + 1, date.day())
                 .then(games => ScoreboardGamesTranslator.translate(games));
  }

  static getBoxScores(date, gameIds) {
    let translations = gameIds.map(gameId => DataAggregator.getBoxScore(date, gameId));
    return Promise.all(translations)
                  .then(results => List(results))
                  .catch(reason => console.log(reason));
  }

  static getBoxScore(date, gameId) {
    return Client.getBoxScore(date.year(), date.month() + 1, date.day(), gameId)
                 .then(boxScore => BoxScoreDataTranslator.translateBoxScoreData(boxScore));
  }

  static getPlayByPlays(date, gameIds) {
    let translations = gameIds.map(gameId => DataAggregator.getPlayByPlay(date, gameId));
    return Promise.all(translations)
                  .then(results => List(results))
                  .catch(reason => console.log(reason));
  }

  static getPlayByPlay(date, gameId) {
    return Client.getPlayByPlay(date.year(), date.month() + 1, date.day(), gameId)
                 .then(playByPlay => PlayByPlayTranslator.translate(playByPlay));
  }
};
