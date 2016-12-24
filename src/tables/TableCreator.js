'use es6';

import Table from 'cli-table2';

import GamesTables from '../data/models/GamesTables';
import PlayByPlayTableCreator from './PlayByPlayTableCreator';
import ActiveGameTableCreator from './ActiveGameTableCreator';
import UpcomingGamesTableCreator from './UpcomingGamesTableCreator';
import BoxScoreTableCreator from './BoxScoreTableCreator';

export default class TableCreator {
  static create(data) {
    return new GamesTables({
      active: TableCreator.createActiveGamesTables(data.get('active')),
      upcoming: TableCreator.createUpcomingGamesTable(data.get('upcoming'))
    });
  }

  static createUpcomingGamesTable(games) {
    return UpcomingGamesTableCreator.create(games);
  }

  static createActiveGamesTables(games) {
    let table = new Table();
    games.forEach(game => {
      table.push([
        ActiveGameTableCreator.create(game.metadata),
        PlayByPlayTableCreator.create(game.playByPlay)
      ]);
      table.push([
        BoxScoreTableCreator.create(game.boxScoreLeaders.home),
        BoxScoreTableCreator.create(game.boxScoreLeaders.visitor)
      ]);
    });

    return table.toString();
  }
}
