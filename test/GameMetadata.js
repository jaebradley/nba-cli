'use es6';

import {expect} from 'chai';
import GameMetadata from '../src/data/models/GameMetadata';

describe('game metadata model', function() {
  it('creates game metadata model', function() {
    const defaultMetadata = new GameMetadata();
    const customTimeMetadata = new GameMetadata({
      unixMillisecondsStartTime: 1451606400000 // 2016-01-01 00:00:00
    });

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
    expect(defaultMetadata.getLocalizedStartDateTime()).to.equal('December 31, 1969 7:00 PM');

    expect(customTimeMetadata.getNbaStatsFormattedStartDate()).to.equal('20151231');
    expect(customTimeMetadata.getLocalizedStartDateTime()).to.equal('December 31, 2015 7:00 PM');
  });
});
