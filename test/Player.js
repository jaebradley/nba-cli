import {expect} from 'chai';
import Player from '../src/data/models/Player';

describe('Player object', function() {
  it('creates a player object', function() {
    const emptyPlayer = new Player();

    expect(emptyPlayer.firstName).to.equal('');
    expect(emptyPlayer.lastName).to.equal('');
    expect(emptyPlayer.getAbbreviatedFirstName()).to.equal('');
    expect(emptyPlayer.getAbbreviatedName()).to.equal('.');

    const me = new Player({firstName: 'jae', lastName: 'bradley'});

    expect(me.firstName).to.equal('jae');
    expect(me.lastName).to.equal('bradley');
    expect(me.getAbbreviatedFirstName()).to.equal('j');
    expect(me.getAbbreviatedName()).to.equal('j.bradley');
  });
});
