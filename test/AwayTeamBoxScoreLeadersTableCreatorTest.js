import chai from 'chai';
import { List } from 'immutable';

import TeamBoxScoreLeaders from '../src/data/TeamBoxScoreLeaders';
import StatisticalLeaders from '../src/data/StatisticalLeaders';
import Player from '../src/data/Player';
import AwayTeamBoxScoreLeadersTableCreator from '../src/services/tables/AwayTeamBoxScoreLeadersTableCreator';

const expect = chai.expect;

describe('Away Team Box Score Leaders Table Creator', function() {
  const player = new Player({ firstName:'jae', lastName: 'baebae' });
  const statLeaders = new StatisticalLeaders({
    value: 1,
    leaders: List.of(player, player, player)
  });
  const boxScoreLeaders = new TeamBoxScoreLeaders({
    points: statLeaders,
    assists: statLeaders,
    rebounds: statLeaders
  });
  it('Table creation integration test', () => {
    const expected = '\u001b[90m┌───────────────────────────────────────────┐\u001b[39m\n\u001b[90m│\u001b[39m\u001b[31m               Away Leaders                \u001b[39m\u001b[90m│\u001b[39m\n\u001b[90m├──────────\u001b[39m\u001b[90m┬───\u001b[39m\u001b[90m┬────────────────────────────┤\u001b[39m\n\u001b[90m│\u001b[39m Points   \u001b[90m│\u001b[39m 1 \u001b[90m│\u001b[39m j.baebae,j.baebae,j.baebae \u001b[90m│\u001b[39m\n\u001b[90m├──────────\u001b[39m\u001b[90m┼───\u001b[39m\u001b[90m┼────────────────────────────┤\u001b[39m\n\u001b[90m│\u001b[39m Assists  \u001b[90m│\u001b[39m 1 \u001b[90m│\u001b[39m j.baebae,j.baebae,j.baebae \u001b[90m│\u001b[39m\n\u001b[90m├──────────\u001b[39m\u001b[90m┼───\u001b[39m\u001b[90m┼────────────────────────────┤\u001b[39m\n\u001b[90m│\u001b[39m Rebounds \u001b[90m│\u001b[39m 1 \u001b[90m│\u001b[39m j.baebae,j.baebae,j.baebae \u001b[90m│\u001b[39m\n\u001b[90m└──────────\u001b[39m\u001b[90m┴───\u001b[39m\u001b[90m┴────────────────────────────┘\u001b[39m';
    const boxScoreTable = AwayTeamBoxScoreLeadersTableCreator.create(boxScoreLeaders);
    expect(boxScoreTable).to.equal(expected);
    console.log(`Box Score Leaders Table ${boxScoreTable}`);
  });
});
