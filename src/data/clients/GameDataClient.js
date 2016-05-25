import moment from 'moment-timezone';
import rp from 'request-promise';
import Q from 'q';

import BoxScoreClient from './clients/BoxScoreClient';
import PlayByPlayClient from './clients/PlayByPlayClient';
import ScoreboardClient from './clients/ScoreboardClient';

import GameData from './models/GameData';

import ScoreboardFilter from '../filters/data/ScoreboardFilter.js';
import Constants from '../constants/Constants';

export default class NbaDataClient {
  constructor() {
    this.scoreboardClient = new ScoreboardClient();
    this.boxScoreClient = new BoxScoreClient();
    this.playByPlayClient = new PlayByPlayClient();
  }

  fetchDataForDateRange(startDate, endDate, callback) {
    const transformedStartDate = startDate.clone().tz(Constants.DEFAULT_TIMEZONE);
    const transformedEndDate = endDate.clone().tz(Constants.DEFAULT_TIMEZONE);
    const startDateUnixTimestampMilliseconds = transformedStartDate.valueOf();
    const endDateUnixTimestampMilliseconds = transformedEndDate.valueOf();
    let promises = [];
    for (let currentDate = startDate; currentDate.isBefore(endDate); currentDate.add(1, 'days')) {
      promises.push(this.fetchDataForDate(currentDate, startDateUnixTimestampMilliseconds, endDateUnixTimestampMilliseconds));
    }
    return Q.all(promises);
  }

  fetchDataForDate(date, startDateUnixTimestampMilliseconds,  endDateUnixTimestampMilliseconds) {
    let filteredScoreboardData = {};
    let playByPlay = {};
    let boxScore = {};
    let gameData = {};
    const formattedDate = NbaDataClient.generateCustomFormattedDate(date);
    return this.scoreboardClient
        .fetch(formattedDate)
        .then(function(scoreboardData) {
          filteredScoreboardData = ScoreboardFilter.filter(scoreboardData, startDateUnixTimestampMilliseconds,  endDateUnixTimestampMilliseconds);
          return filteredScoreboardData;
        })
        .then(scoreboardData => this.fetchPlayByPlayData(filteredScoreboardData, playByPlay))
        .then(playByPlayData => this.fetchBoxScoreData(filteredScoreboardData, boxScore))
        .then(function(boxScoreData) {
          for (let gameId in filteredScoreboardData) {
            gameData[gameId] = new GameData({
              metadata: filteredScoreboardData[gameId].metadata,
              scores: filteredScoreboardData[gameId].scores,
              boxScoreLeaders: boxScore[gameId],
              playByPlay: playByPlay[gameId]
            });
          }
          return gameData;
        })
        .then(data => gameData);
  }

  fetchPlayByPlayData(filteredGameData, playByPlay) {
    let promises = [];
    for (let gameId in filteredGameData) {
      let gameData = filteredGameData[gameId];
      if (gameData.metadata.hasStarted()) {
        const formattedGameDate = gameData.metadata.getNbaStatsFormattedStartDate();
        promises.push(this.playByPlayClient.fetch(formattedGameDate, gameId).then(data => (playByPlay[gameId] = data)));
      }
    };
    return Q.all(promises);
  }

  fetchBoxScoreData(filteredGameData, boxScore) {
    let promises = [];
    for (let gameId in filteredGameData) {
      let gameData = filteredGameData[gameId];
      if (gameData.metadata.hasStarted()) {
        const formattedGameDate = gameData.metadata.getNbaStatsFormattedStartDate();
        promises.push(this.boxScoreClient.fetch(formattedGameDate, gameId).then(data => (boxScore[gameId] = data)));
      }
    };
    return Q.all(promises);
  }

  static generateCustomFormattedDate(date) {
    return date.clone().tz(Constants.DEFAULT_TIMEZONE)
               .format(Constants.DEFAULT_DATE_FORMAT);
  }
}
