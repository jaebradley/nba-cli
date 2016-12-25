'use es6';

import Table from 'cli-table2';
import {List} from 'immutable';

import GamesTables from '../../data/GamesTables';
import PlayByPlayTableCreator from './PlayByPlayTableCreator';
import ActiveGameTableCreator from './ActiveGameTableCreator';
import UpcomingGamesTableCreator from './UpcomingGamesTableCreator';
import TeamBoxScoreLeadersTableCreator from './TeamBoxScoreLeadersTableCreator';

export default class TableCreator {
  static create(data) {
    return new GamesTables({
      active: TableCreator.createActiveGamesTables(data.get('active')),
      upcoming: UpcomingGamesTableCreator.create(data.get('upcoming'))
    });
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
          content: TeamBoxScoreLeadersTableCreator.create(game.boxScoreLeaders.home, true),
          colSpan: 1,
          hAlign: 'center'
        },
        {
          content: TeamBoxScoreLeadersTableCreator.create(game.boxScoreLeaders.visitor, false),
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
