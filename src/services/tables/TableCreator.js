'use es6';

import Table from 'cli-table2';
import {List, Map} from 'immutable';

import ActiveGameTableCreator from './ActiveGameTableCreator';
import GamesTables from '../../data/GamesTables';
import PlayByPlayTableCreator from './PlayByPlayTableCreator';
import TeamBoxScoreLeadersTableCreator from './TeamBoxScoreLeadersTableCreator';
import UpcomingGamesTableCreator from './UpcomingGamesTableCreator';

export default class TableCreator {
  static create(data) {
    let upcomingTable = data.upcoming.isEmpty()
        ? undefined
        : UpcomingGamesTableCreator.create(data.upcoming)
    return new GamesTables({
      active: List(data.active.map(game => TableCreator.createGameTable(game))),
      upcoming: upcomingTable
    });
  }

  static createGameTable(game) {
    let table = new Table();
    table.push(TableCreator.createActiveGameTable(game.metadata).toJS());
    table.push(TableCreator.createBoxScoreLeadersTables(game.boxScoreLeaders).toJS());
    table.push(TableCreator.createPlayByPlayTable(game.playByPlay).toJS());
    return table.toString();
  }

  static createActiveGameTable(data) {
    return List.of(
      Map({
        content: ActiveGameTableCreator.create(data),
        colSpan: 2,
        hAlign: 'center'
      })
    );
  }

  static createBoxScoreLeadersTables(boxScoreLeaders) {
    return List.of(
      Map({
        content: TeamBoxScoreLeadersTableCreator.create(boxScoreLeaders.home, true),
        colSpan: 1,
        hAlign: 'center'
      }),
      Map({
        content: TeamBoxScoreLeadersTableCreator.create(boxScoreLeaders.visitor, false),
        colSpan: 1,
        hAlign: 'center'
      }),
    );
  }

  static createPlayByPlayTable(playByPlay) {
    return List.of(
      Map({
        content: PlayByPlayTableCreator.create(playByPlay),
        colSpan: 2,
        hAlign: 'center'
      })
    )
  }
}
