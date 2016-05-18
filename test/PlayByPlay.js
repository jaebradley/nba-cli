import {expect} from 'chai';
import PlayByPlay from '../src/data/models/PlayByPlay';

describe('Play by play model object', function() {
  it('creates a play by play object', function() {
    const emptyPbp = new PlayByPlay();
    const otherPbp = new PlayByPlay({ description: 'a', clock: 'b', period: 'c', teamAbbreviation: 'd' });

    expect(emptyPbp.description).to.equal('');
    expect(emptyPbp.clock).to.equal('');
    expect(emptyPbp.period).to.equal('');
    expect(emptyPbp.teamAbbreviation).to.equal('');

    expect(otherPbp.description).to.equal('a');
    expect(otherPbp.clock).to.equal('b');
    expect(otherPbp.period).to.equal('c');
    expect(otherPbp.teamAbbreviation).to.equal('d');
  });
});
