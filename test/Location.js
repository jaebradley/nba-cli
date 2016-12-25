'use es6';

import {expect} from 'chai';
import Location from '../src/data/models/Location';

describe('Location model', function() {

  it('get formatted name', function() {
    const customLocation = new Location({
      arena: 'arena',
      city: 'city',
      state: 'state',
    });

    expect(customLocation.getFormattedLocation()).to.equal('arena, city, state');
  });
});
