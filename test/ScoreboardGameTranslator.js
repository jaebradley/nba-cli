'use es6';

import chai from 'chai';
import chaiImmutable from 'chai-immutable';
import Immutable from 'immutable';

import Broadcast from '../src/data/models/Broadcast';
import BroadcastMedium from '../src/data/models/BroadcastMedium';
import GameStatus from '../src/data/models/GameStatus';
import Location from '../src/data/models/Location';
import Period from '../src/data/models/Period';
import Matchup from '../src/data/models/Matchup';
import Team from '../src/data/models/Team';
import ScoreboardGameTranslator from '../src/data/translators/ScoreboardGameTranslator';

import finalGame from './data/scoreboard/final-game';

describe('translate scoreboard game', function() {
  let periodTime = finalGame.period_time;
  let broadcasters = finalGame.broadcasters;
  let homeData = finalGame.home;
  let awayData = finalGame.visitor;

  let expectedHomeTeam = new Team({
    city: 'Atlanta',
    nickname: 'Hawks',
    abbreviation: 'ATL',
  });

  it('tests getting game status', function() {
    chai.expect(ScoreboardGameTranslator.getGameStatus(periodTime)).to.equal(GameStatus.FINAL);
  });

  it('tests getting start timestamp', function() {
    chai.expect(ScoreboardGameTranslator.getStartTimestamp(finalGame)).to.equal(1462721400000);
  });

  it('tests getting location', function() {
    let expectedLocation = new Location({
      arena: 'Philips Arena',
      city: 'Atlanta',
      state: 'GA',
    });
    chai.expect(ScoreboardGameTranslator.getLocation(finalGame)).to.eql(expectedLocation);
  });

  it('tests getting period', function() {
    let expectedPeriod = new Period(4, 'Final', '');
    chai.expect(ScoreboardGameTranslator.getPeriod(periodTime)).to.eql(expectedPeriod);
  });

  it('tests getting broadcasts', function() {
    // let expectedBroadcasts = Immutable.List.of(
    //   new Broadcast('local', 'WTAM 1100 / 87.7 FM (ESP)', BroadcastMedium.RADIO),
    //   new Broadcast('local', '92.9 FM \"The Game\"', BroadcastMedium.RADIO),
    //   new Broadcast('natl', 'ABC', BroadcastMedium.TV),
    //   new Broadcast('can', 'TSN', BroadcastMedium.TV),
    // );
    // let translatedBroadcasts = ScoreboardGameTranslator.getBroadcasts(broadcasters);
    // chai.expect(translatedBroadcasts).to.equal(expectedBroadcasts);
  });

  it('tests getting team', function() {
    chai.expect(ScoreboardGameTranslator.getTeam(homeData)).to.eql(expectedHomeTeam);
  });

  it('tests getting matchup', function() {
    let expectedAwayTeam = new Team({
      city: 'Cleveland',
      nickname: 'Cavaliers',
      abbreviation: 'CLE',
    });
    let expectedMatchup = new Matchup(expectedHomeTeam, expectedAwayTeam);
    chai.expect(ScoreboardGameTranslator.getMatchup(homeData, awayData)).to.eql(expectedMatchup);
  });
});
