'use es6';

import {expect} from 'chai';
import moment from 'moment-timezone';
import GameMetadata from '../src/data/models/GameMetadata';
import Constants from '../src/constants/Constants';

describe('game metadata model', function() {
  it('creates game metadata model', function() {
    const defaultMetadata = new GameMetadata();
    const customMetadata = new GameMetadata({
      unixMillisecondsStartTime: 1451606400000, // 2016-01-01 00:00:00
      broadcasts: ['TNT', 'NBATV'],
    });
    const isUpcomingMetadata = new GameMetadata({
      unixMillisecondsStartTime: moment().valueOf() * 1000,
      status: Constants.PREGAME,
    })

    expect(defaultMetadata.id).to.equal(0);
    expect(defaultMetadata.status).to.equal('');
    expect(defaultMetadata.url).to.equal('');
    expect(defaultMetadata.unixMillisecondsStartTime).to.equal(0);
    expect(defaultMetadata.isPreviewAvailable).to.equal(true);
    expect(defaultMetadata.isRecapAvailable).to.equal(true);
    expect(defaultMetadata.periodValue).to.equal('');
    expect(defaultMetadata.periodStatus).to.equal('');
    expect(defaultMetadata.gameClock).to.equal('');
    expect(defaultMetadata.broadcasts.length).to.equal(0);
    expect(defaultMetadata.getBroadcastsString()).to.equal('');
    expect(defaultMetadata.getNbaStatsFormattedStartDate()).to.equal('19691231');
    expect(defaultMetadata.getLocalizedStartDateTime()).to.equal('January 1, 1970 12:00 AM'); // Travis CI in UTC
    expect(defaultMetadata.isUpcoming()).to.equal(false);

    expect(customMetadata.unixMillisecondsStartTime).to.equal(1451606400000);
    expect(customMetadata.getNbaStatsFormattedStartDate()).to.equal('20151231');
    expect(customMetadata.getLocalizedStartDateTime()).to.equal('January 1, 2016 12:00 AM');
    expect(customMetadata.isUpcoming()).to.equal(false);
    expect(customMetadata.getBroadcastsString()).to.equal('TNT,NBATV');

    expect(isUpcomingMetadata.isUpcoming()).to.equal(true);

    expect(isUpcomingMetadata.hasStarted).to.equal(true);
  });
});
