'use es6';

import {expect} from 'chai';
import StatisticalLeaders from '../src/data/models/StatisticalLeaders';
import Player from '../src/data/models/Player';

describe('Statistical Leaders object', function() {
  it('creates a statistical leaders object', function() {
    const me = new Player('jae', 'bradley');
    const players = [me, me, me];
    const expectedAbbreviatedNames = [me.getAbbreviatedName(), me.getAbbreviatedName(), me.getAbbreviatedName()].toString();
    const meStatisticalLeaders = new StatisticalLeaders({value: 5, leaders: players});

    expect(meStatisticalLeaders.value).to.equal(5);
    expect(meStatisticalLeaders.leaders).to.equal(players);
    expect(meStatisticalLeaders.getLeadersAbbreviatedNames()).to.equal(expectedAbbreviatedNames);
  });
});
