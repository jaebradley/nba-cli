'use es6';

import {expect} from 'chai';
import {List} from 'immutable';

import TeamBoxScoreLeaders from '../src/data/models/TeamBoxScoreLeaders';
import StatisticalLeaders from '../src/data/models/StatisticalLeaders';
import Player from '../src/data/models/Player';
import TeamBoxScoreLeadersTableCreator from '../src/tables/TeamBoxScoreLeadersTableCreator';

describe('Team Box Score Leaders Table Creator', function() {
  let player = new Player('jae', 'baebae');
  let statLeader = new StatisticalLeaders({
    value: 1,
    leaders: List.of(player, player, player)
  });
  let boxScoreLeaders = new TeamBoxScoreLeaders({
    points: statLeader,
    assists: statLeader,
    rebounds: statLeader
  });
  it('test table creation', function() {
    let boxScoreTable = TeamBoxScoreLeadersTableCreator.create(boxScoreLeaders);
    expect(boxScoreTable).to.equal('1');
    console.log(boxScoreTable);
  });
});
