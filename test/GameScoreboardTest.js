'use es6';

import chai from 'chai';
import chaiImmutable from 'chai-immutable';
import {List} from 'immutable';
import jstz from 'jstimezonedetect';
import moment from 'moment-timezone';

import Broadcast from '../src/data/Broadcast';
import GameScoreboard from '../src/data/GameScoreboard';
import Location from '../src/data/Location';
import Matchup from '../src/data/Matchup';
import Team from '../src/data/Team';

chai.use(chaiImmutable);

let expect = chai.expect;

describe('GameScoreboard Tests', function() {
  let id = 'jae';
  let timestamp = moment().year(2016)
                          .month(12)
                          .date(30)
                          .tz('UTC')
                          .startOf('day');
  let teamCity1 = 'Boston';
  let teamNickname1 = 'Celtics';
  let teamAbbreviation1 = 'BOS';
  let teamCity2 = 'Los Angeles';
  let teamNickname2 = 'Lakers';
  let teamAbbreviation2 = 'LAL';

  let homeTeam = new Team({
    city: teamCity1,
    nickname: teamNickname1,
    abbreviation: teamAbbreviation1
  });

  let awayTeam = new Team({
    city: teamCity2,
    nickname: teamNickname2,
    abbreviation: teamAbbreviation2
  });

  let matchup = new Matchup({
    homeTeam: homeTeam,
    awayTeam: awayTeam
  });

  let broadcastScope = 'national';
  let broadcastName = 'jaebaebae';

  let broadcast = new Broadcast({
    scope: broadcastScope,
    name: broadcastName
  });

  let arena = 'TD Garden';
  let city = 'Boston';
  let state = 'MA';
  let location = new Location({
    arena: arena,
    city: city,
    state: state
  });

  let scoreboard = new GameScoreboard({
    id: id,
    startTimestamp: timestamp,
    matchup: matchup,
    broadcasts: List.of(broadcast, broadcast),
    location: location
  });

  it('should test formatted start date', function() {
    let expected = '20170129';
    expect(scoreboard.getNbaStatsFormattedStartDate()).to.equal(expected);
  });

  it('should test localized start date', function() {
    let expected = 'January 29, 2017 7:00 PM';
    expect(scoreboard.getLocalizedStartDateTime()).to.equal(expected);
  });

  it('should test tv broadcasts string', function() {
    let expected = `${broadcastName},${broadcastName}`;
    expect(scoreboard.getTvBroadcastsString()).to.eql(expected);
  });
});
