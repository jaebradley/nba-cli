'use es6';

import Table from 'cli-table2';
import {List} from 'immutable';

import GamesTables from '../data/models/GamesTables';
import PlayByPlayTableCreator from './PlayByPlayTableCreator';
import ActiveGameTableCreator from './ActiveGameTableCreator';
import UpcomingGamesTableCreator from './UpcomingGamesTableCreator';
import TeamBoxScoreLeadersTableCreator from './TeamBoxScoreLeadersTableCreator';

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
    let tables = List();
    games.forEach(game => {
      let table = new Table();
      table.push([
        {
          content: ActiveGameTableCreator.create(game.metadata),
          colSpan: 2,
          hAlign: 'center'
        }
      ]);
      table.push([
        {
          content: TeamBoxScoreLeadersTableCreator.create(game.boxScoreLeaders.home),
          colSpan: 1,
          hAlign: 'center'
        },
        {
          content: TeamBoxScoreLeadersTableCreator.create(game.boxScoreLeaders.visitor),
          colSpan: 1,
          hAlign: 'center'
        }
      ]);
      table.push([
        {
          content: PlayByPlayTableCreator.create(game.playByPlay),
          colSpan: 2,
          hAlign: 'center'
        }
      ]);
      tables = tables.push(table.toString());
    });

    return tables;
  }
}
