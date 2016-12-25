'use es6';

import {expect} from 'chai';
import {List} from 'immutable';

import TeamBoxScoreLeaders from '../src/data/TeamBoxScoreLeaders';
import StatisticalLeaders from '../src/data/StatisticalLeaders';
import Player from '../src/data/Player';
import TeamBoxScoreLeadersTableCreator from '../src/services/tables/TeamBoxScoreLeadersTableCreator';

describe('Team Box Score Leaders Table Creator', function() {
  let player = new Player({ firstName:'jae', lastName: 'baebae' });
  let statLeaders = new StatisticalLeaders({
    value: 1,
    leaders: List.of(player, player, player)
  });
  let boxScoreLeaders = new TeamBoxScoreLeaders({
    points: statLeaders,
    assists: statLeaders,
    rebounds: statLeaders
  });
  it('test table creation', function() {
    let expected = '\u001b[90m┌───────────────────────────────────────────┐\u001b[39m\n\u001b[90m│\u001b[39m\u001b[31m               Away Leaders                \u001b[39m\u001b[90m│\u001b[39m\n\u001b[90m├──────────\u001b[39m\u001b[90m┬───\u001b[39m\u001b[90m┬────────────────────────────┤\u001b[39m\n\u001b[90m│\u001b[39m Points   \u001b[90m│\u001b[39m 1 \u001b[90m│\u001b[39m j.baebae,j.baebae,j.baebae \u001b[90m│\u001b[39m\n\u001b[90m├──────────\u001b[39m\u001b[90m┼───\u001b[39m\u001b[90m┼────────────────────────────┤\u001b[39m\n\u001b[90m│\u001b[39m Assists  \u001b[90m│\u001b[39m 1 \u001b[90m│\u001b[39m j.baebae,j.baebae,j.baebae \u001b[90m│\u001b[39m\n\u001b[90m├──────────\u001b[39m\u001b[90m┼───\u001b[39m\u001b[90m┼────────────────────────────┤\u001b[39m\n\u001b[90m│\u001b[39m Rebounds \u001b[90m│\u001b[39m 1 \u001b[90m│\u001b[39m j.baebae,j.baebae,j.baebae \u001b[90m│\u001b[39m\n\u001b[90m└──────────\u001b[39m\u001b[90m┴───\u001b[39m\u001b[90m┴────────────────────────────┘\u001b[39m';
    let boxScoreTable = TeamBoxScoreLeadersTableCreator.create(boxScoreLeaders);
    expect(boxScoreTable).to.equal(expected);
    console.log(boxScoreTable);
  });
});
