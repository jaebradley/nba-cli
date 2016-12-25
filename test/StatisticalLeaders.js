'use es6';

import {expect} from 'chai';
import StatisticalLeaders from '../src/data/StatisticalLeaders';
import Player from '../src/data/Player';

describe('Statistical Leaders object', function() {
  it('creates a statistical leaders object', function() {
    let me = new Player({
      firstName: 'jae',
      lastName: 'bradley'
    });
    let players = [me, me, me];
    let expectedAbbreviatedNames = [me.getAbbreviatedName(), me.getAbbreviatedName(), me.getAbbreviatedName()].toString();
    let meStatisticalLeaders = new StatisticalLeaders({value: 5, leaders: players});

    // test formatting method
  });
});
