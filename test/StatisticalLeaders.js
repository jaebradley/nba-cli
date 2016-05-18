'use es6';

import {expect} from 'chai';
import StatisticalLeaders from '../src/data/models/StatisticalLeaders';
import Player from '../src/data/models/Player';

describe('Statistical Leaders object', function() {
  it('creates a statistical leaders object', function() {
    const emptyStatisticalLeaders = new StatisticalLeaders();

    expect(emptyStatisticalLeaders.value).to.equal(0);
    expect(emptyStatisticalLeaders.leaders.length).to.equal(0);
    expect(emptyStatisticalLeaders.getLeadersAbbreviatedNames()).to.equal('');

    const me = new Player({firstName: 'jae', lastName: 'bradley'});
    const players = [me, me, me];
    const expectedAbbreviatedNames = [me.getAbbreviatedName(), me.getAbbreviatedName(), me.getAbbreviatedName()].toString();
    const meStatisticalLeaders = new StatisticalLeaders({value: 5, leaders: players});

    expect(meStatisticalLeaders.value).to.equal(5);
    expect(meStatisticalLeaders.leaders).to.equal(players);
    expect(meStatisticalLeaders.getLeadersAbbreviatedNames()).to.equal(expectedAbbreviatedNames);
  });
});
