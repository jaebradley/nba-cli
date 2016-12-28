'use es6';

import Table from 'cli-table2';
import {List, Map} from 'immutable';

import StartedGameTableCreator from './StartedGameTableCreator';
import GamesTables from '../../data/GamesTables';
import PlaysTableCreator from './PlaysTableCreator';
import TeamBoxScoreLeadersTableCreator from './TeamBoxScoreLeadersTableCreator';
import UpcomingGamesTableCreator from './UpcomingGamesTableCreator';

export default class TableCreator {
  static create(data) {
    let upcomingTable = data.upcoming.isEmpty()
        ? undefined
        : UpcomingGamesTableCreator.create(data.upcoming)
    return new GamesTables({
      started: List(data.started.map(game => TableCreator.createGameTable(game))),
      upcoming: upcomingTable
    });
  }

  static createGameTable(game) {
    let table = new Table();
    table.push(TableCreator.createStartedeGameTable(game.metadata).toJS());
    table.push(TableCreator.createBoxScoreLeadersTables(game.boxScoreLeaders).toJS());
    table.push(TableCreator.createPlaysTable(game.plays).toJS());
    return table.toString();
  }

  static createStartedeGameTable(data) {
    return List.of(
      Map({
        content: StartedGameTableCreator.create(data),
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

  static createPlaysTable(plays) {
    return List.of(
      Map({
        content: PlaysTableCreator.create(plays),
        colSpan: 2,
        hAlign: 'center'
      })
    )
  }
}
