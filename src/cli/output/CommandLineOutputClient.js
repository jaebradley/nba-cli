import Table from 'cli-table2';
import moment from 'moment-timezone';

import NbaDataClient from '../../data/NbaDataClient';
import StartedGameTableCreator from '../../tables/StartedGameTableCreator';
import UpcomingGameTableCreator from '../../tables/UpcomingGameTableCreator';
import PlayByPlayTableCreator from '../../tables/PlayByPlayTableCreator';
import BoxScoreTableCreator from '../../tables/BoxScoreTableCreator';

export default class CommandLineOutputClient {
  constructor() {
    this.nbaDataClient = new NbaDataClient();
    this.startedGameTableCreator = new StartedGameTableCreator();
    this.playByPlayTableCreator = new PlayByPlayTableCreator();
    this.upcomingGameTableCreator = new UpcomingGameTableCreator();
    this.boxScoreTableCreator = new BoxScoreTableCreator();
  }

  generateFirstRow(data) {
    const row = [this.startedGameTableCreator.create(data)];
    row.push(this.playByPlayTableCreator.create(data.playByPlay));
    return row;
  }

  generateSecondRow(data) {
    const row = [];
    row.push(this.boxScoreTableCreator.create(data.boxScoreLeaders.home));
    row.push(this.boxScoreTableCreator.create(data.boxScoreLeaders.visitor));
    return row;
  }

  outputStartedGameTable(data) {
    let table = new Table();
    table.push(this.generateFirstRow(data));
    table.push(this.generateSecondRow(data));
    console.log(table.toString());
  }

  outputUpcomingGames(upcomingGames) {
    upcomingGames.map(game => console.log(this.upcomingGameTableCreator.create(game)));
  }

  outputGames(data) {
    const upcomingGames = [];
    for (let gameId in data) {
      let gameData = data[gameId];
      if (gameData.isUpcoming()) {
        upcomingGames.push(gameData.metadata);
      } else {
        this.outputStartedGameTable(gameData);
      }
    }
    this.outputUpcomingGames(upcomingGames);
  }

  outputGamesForDateRange(startDate, endDate) {
    this.nbaDataClient.fetchDataForDateRange(startDate, endDate, this.outputGames.bind(this));
  }
}