'use es6';

import PlayByPlayTableCreator from './PlayByPlayTableCreator';
import ActiveGameTableCreator from './ActiveGameTableCreator';
import UpcomingGamesTableCreator from './UpcomingGamesTableCreator';

export default class TableCreator {
  static create(data) {
    console.log(TableCreator.createActiveGamesTables(data.active));
    console.log(TableCreator.createUpcomingGamesTable(data.upcoming));
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
