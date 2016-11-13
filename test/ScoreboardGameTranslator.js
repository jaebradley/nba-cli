'use es6';

import {expect, assert} from 'chai';
import {List} from 'immutable';

import Broadcast from '../src/data/models/Broadcast';
import BroadcastMedium from '../src/data/models/BroadcastMedium';
import GameStatus from '../src/data/models/GameStatus';
import Location from '../src/data/models/Location';
import Period from '../src/data/models/Period';
import ScoreboardGameTranslator from '../src/data/translators/ScoreboardGameTranslator';

import finalGame from './data/scoreboard/final-game';

describe('translate scoreboard game', function() {
  let periodTime = finalGame.period_time;
  let broadcasters = finalGame.broadcasters;
  it('tests getting game status', function() {
    expect(ScoreboardGameTranslator.getGameStatus(periodTime)).to.equal(GameStatus.FINAL);
  });

  it('tests getting start timestamp', function() {
    expect(ScoreboardGameTranslator.getStartTimestamp(finalGame)).to.equal(1462735800000);
  });

  it('tests getting location', function() {
    let expectedLocation = new Location({
      arena: 'Philips Arena',
      city: 'Atlanta',
      state: 'GA',
    });
    expect(ScoreboardGameTranslator.getLocation(finalGame)).to.eql(expectedLocation);
  });

  it('tests getting period', function() {
    let expectedPeriod = new Period(4, 'Final', '');
    expect(ScoreboardGameTranslator.getPeriod(periodTime)).to.eql(expectedPeriod);
  });

  it('tests getting broadcasts', function() {
    let expectedBroadcasts = new List.of(
      new BroadCast('local', 'WTAM 1100 / 87.7 FM (ESP)', BroadcastMedium.RADIO),
      new BroadCast('local', '92.9 FM \"The Game\"', BroadcastMedium.RADIO),
      new BroadCast('natl', 'ABC', BroadcastMedium.TV),
      new BroadCast('can', 'TSN', BroadcastMedium.TV),
    );
    expect(ScoreboardGameTranslator.getBroadcasts(broadcasters)).to.eql(expectedBroadcasts);
  });
});
