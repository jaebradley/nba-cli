import moment from 'moment-timezone';
import rp from 'request-promise';
import Q from 'q';

import BoxScoreClient from './clients/BoxScoreClient';
import PlayByPlayClient from './clients/PlayByPlayClient';
import ScoreboardClient from './clients/ScoreboardClient';

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
    for (let currentDate = startDate; currentDate.isBefore(endDate); currentDate.add(1, 'days')) {
      this.fetchDataForDate(currentDate, startDateUnixTimestampMilliseconds, endDateUnixTimestampMilliseconds, callback);
    }
  }

  fetchDataForDate(date, startDateUnixTimestampMilliseconds,  endDateUnixTimestampMilliseconds, callback) {
    let filteredGameData = {};
    const formattedDate = NbaDataClient.generateCustomFormattedDate(date);
    this.scoreboardClient
        .fetch(formattedDate, function(scoreboardData) {
          filteredGameData = ScoreboardFilter.filter(scoreboardData, startDateUnixTimestampMilliseconds,  endDateUnixTimestampMilliseconds);
          return filteredGameData;
        })
        .then(scoreboardData => this.fetchPlayByPlayData(filteredGameData))
        .then(playByPlayData => this.fetchBoxScoreData(filteredGameData))
        .then(boxScoreData => callback(filteredGameData));
  }

  fetchPlayByPlayData(filteredGameData) {
    let promises = [];
    for (let gameId in filteredGameData) {
      let gameData = filteredGameData[gameId];
      if (NbaDataClient.shouldFetchData(gameData.unixMillisecondsStartTime, gameData.status)) {
        const deferred = Q.defer();
        const formattedGameDate = gameData.nbaStatsFormattedStartDate;
        this.playByPlayClient.fetch(formattedGameDate, gameId, function(data) {
          filteredGameData[gameId]['playByPlay'] = data;
          deferred.resolve(data);
        });
        promises.push(deferred.promise);
      }
    };
    return Q.all(promises);
  }

  fetchBoxScoreData(filteredGameData) {
    let promises = [];
    for (let gameId in filteredGameData) {
      let gameData = filteredGameData[gameId];
      if (NbaDataClient.shouldFetchData(gameData.unixMillisecondsStartTime, gameData.status)) {
        const deferred = Q.defer();
        const formattedGameDate = gameData.nbaStatsFormattedStartDate;
        this.boxScoreClient.fetch(formattedGameDate, gameId, function(data) {
          filteredGameData[gameId]['boxScore'] = data;
          deferred.resolve(data);
        });
        promises.push(deferred.promise);
      }
    };
    return Q.all(promises);
  }

  static generateCustomFormattedDate(date) {
    return date.clone().tz(Constants.DEFAULT_TIMEZONE)
               .format(Constants.DEFAULT_DATE_FORMAT);
  }

  static shouldFetchData(unixMillisecondsStartTime, gameStatus) {
    return moment().valueOf() >= unixMillisecondsStartTime && gameStatus != Constants.PREGAME;
  }
}
