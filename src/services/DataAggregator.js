import Client from 'nba-stats-client';
import { List, Map } from 'immutable';
import moment from 'moment-timezone';

import Constants from '../constants/Constants';
import Game from '../data/Game';
import Games from '../data/Games';

import BoxScoreDataTranslator from './translators/BoxScoreDataTranslator';
import PlaysTranslator from './translators/PlaysTranslator';
import GameScoreboardTranslator from './translators/GameScoreboardTranslator';

export default class DataAggregator {
  static aggregate(date) {
    const startOfDay = DataAggregator.getConvertedStartOfDay(date);

    return DataAggregator.getScoreboards(startOfDay)
      .then((scoreboards) => {
        const startedGames = [];
        const upcomingGames = [];

        scoreboards.forEach((scoreboard) => {
          if (scoreboard.isUpcoming()) {
            upcomingGames.push(scoreboard);
          } else {
            startedGames.push(scoreboard);
          }
        });

        return { upcomingGames, startedGames };
      }).then((games) => {
        return DataAggregator.getAllStartedGamesData(startOfDay, games.startedGames)
          .then((startedGames) => {
            return new Games({
              upcoming: List(games.upcomingGames).sortBy((game) => game.id),
              started: startedGames.sortBy((game) => game.id),
            });
          });
      });
  }

  static getAllStartedGamesData(date, allStartedGamesMetadata) {
    const startedGameIds = allStartedGamesMetadata.map((metadata) => metadata.id);

    return Promise.all([
      DataAggregator.getBoxScoresByGameId(date, startedGameIds),
      DataAggregator.getPlaysByGameId(date, startedGameIds),
    ]).then(([ boxScoresByGameId, playsByGameId ]) => {
      return List(allStartedGamesMetadata.map((metadata) =>
        new Game({
          metadata: metadata,
          boxScoreLeaders: boxScoresByGameId.get(metadata.id),
          plays: playsByGameId.get(metadata.id),
        })));
    });
  }

  static getScoreboards(date) {
    return Client.getGames(date.year(), date.month() + 1, date.date())
      .then((data) => List(data.sports_content.games.game.map((game) => GameScoreboardTranslator.translate(game))));
  }

  static getBoxScoresByGameId(date, gameIds) {
    const allBoxScores = gameIds.map((gameId) => {
      return DataAggregator.getBoxScore(date, gameId)
                           .then((boxScore) => ({ gameId, boxScore }));
    });

    return Promise.all(allBoxScores)
                  .then((results) => {
                    const boxScoresByGameId = {};
                    results.forEach((result) => { boxScoresByGameId[result.gameId] = result.boxScore });
                    return Map(boxScoresByGameId);
                  });
  }

  static getBoxScore(date, gameId) {
    return Client.getBoxScore(date.year(), date.month() + 1, date.date(), gameId)
                 .then(boxScore => BoxScoreDataTranslator.translateBoxScoreData(boxScore));
  }

  static getPlaysByGameId(date, gameIds) {
    const allGamePlays = gameIds.map((gameId) => {
      return DataAggregator.getPlays(date, gameId)
                           .then((plays) => ({ gameId, plays }));
    });

    return Promise.all(allGamePlays)
                  .then((results) => {
                    const playsByGameId = {};
                    results.forEach((result) => { playsByGameId[result.gameId] = result.plays });
                    return Map(playsByGameId);
                  });
  }

  static getPlays(date, gameId) {
    return Client.getPlayByPlay(date.year(), date.month() + 1, date.date(), gameId)
                 .then((data) => PlaysTranslator.translate(data.sports_content.game.play));
  }

  static getConvertedStartOfDay(date) {
    // NBA Stats API takes EST Days
    return moment(date).tz(Constants.DEFAULT_TIMEZONE).startOf('day');
  }
};
