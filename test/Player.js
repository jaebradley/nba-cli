'use es6';

import {expect} from 'chai';
import Player from '../src/data/models/Player';

describe('Player object', function() {
  it('creates a player object', function() {

    const me = new Player('jae', 'bradley');

    expect(me.firstName).to.equal('jae');
    expect(me.lastName).to.equal('bradley');
    expect(me.getAbbreviatedFirstName()).to.equal('j');
    expect(me.getAbbreviatedName()).to.equal('j.bradley');
  });
});
