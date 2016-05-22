'use es6';

import {expect} from 'chai';
import Location from '../src/data/models/Location';

describe('Location model', function() {
  it('creates location model', function() {
    const defaultLocation = new Location();
    const customLocation = new Location({
      arena: 'arena',
      city: 'city',
      state: 'state',
    });

    expect(defaultLocation.arena).to.equal('');
    expect(defaultLocation.city).to.equal('');
    expect(defaultLocation.state).to.equal('');

    expect(customLocation.arena).to.equal('arena');
    expect(customLocation.city).to.equal('city');
    expect(customLocation.state).to.equal('state');
  });

  it('get formatted name', function() {
    const customLocation = new Location({
      arena: 'arena',
      city: 'city',
      state: 'state',
    });

    expect(customLocation.getFormattedLocation()).to.equal('arena city state');
  });
});
