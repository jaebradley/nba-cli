import {expect} from 'chai';
import TeamBoxScoreLeaders from '../src/data/models/TeamBoxScoreLeaders';
import StatisticalLeaders from '../src/data/models/StatisticalLeaders';

describe('Team Box Score Leaders object', function() {
  it('creates a team box score leaders object', function() {
    const emptyTeamBoxScoreLeaders = new TeamBoxScoreLeaders();

    const pointsStatisticalLeader = new StatisticalLeaders({value: 1});
    const assistStatisticalLeader = new StatisticalLeaders({value: 2});
    const reboundsStatisticalLeader = new StatisticalLeaders({value: 3});
  });
});
