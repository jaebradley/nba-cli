'use es6';

import GamesTables from '../../data/models/GamesTables';

import PlayByPlayTableCreator from './PlayByPlayTableCreator';
import ActiveGameTableCreator from './ActiveGameTableCreator';
import UpcomingGamesTableCreator from './UpcomingGamesTableCreator';

export default class TableCreator {
  static create(data) {
    return new GamesTable({
      active: TableCreator.createActiveGamesTables(data.active),
      upcoming: TableCreator.createUpcomingGamesTable(data.upcoming)
    });
  }

  static createUpcomingGamesTable(games) {
    return UpcomingGamesTableCreator.create(games);
  }

  static createActiveGamesTables(games) {
    let table = new Table();
    table.push([
      ActiveGameTableCreator.create(games),
      PlayByPlayTableCreator.create(games.playByPlay)
    ]);
    table.push([
      BoxScoreTableCreator.create(games.boxScoreLeaders.home),
      BoxScoreTableCreator.create(games.boxScoreLeaders.visitor)
    ]);
    return table.toString();
  }
}
