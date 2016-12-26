'use es6';

import chai from 'chai';
import chaiImmutable from 'chai-immutable';
import emoji from 'node-emoji';
import jstz from 'jstimezonedetect';
import {List, Map, Record} from 'immutable';
import moment from 'moment-timezone';

import Broadcast from '../src/data/Broadcast';
import GameScoreboard from '../src/data/GameScoreboard';
import Location from '../src/data/Location';
import Matchup from '../src/data/Matchup';
import Team from '../src/data/Team';
import UpcomingGamesTableCreator from '../src/services/tables/UpcomingGamesTableCreator';

chai.use(chaiImmutable);

let expect = chai.expect;

describe('Test Upcoming Games Table Creation', function() {
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

  it('should test headers', function() {
    let hAlignValue = 'center';
    let headers = List.of(
      Map({
        content: `${emoji.get('alarm_clock')}  ${jstz.determine().name()}`,
        hAlign: hAlignValue
      }),
      Map({
        content: emoji.get('house'),
        hAlign: hAlignValue
      }),
      Map({
        content: emoji.get('bus'),
        hAlign: hAlignValue
      }),
      Map({
        content: emoji.get('tv'),
        hAlign: hAlignValue
      }),
      Map({
        content: emoji.get('round_pushpin'),
        hAlign: hAlignValue
      })
    );
    expect(UpcomingGamesTableCreator.getHeaders()).to.eql(headers);
  });

  it('should test row format', function() {
    let expected = List.of(
      scoreboard.getLocalizedStartDateTime(),
      scoreboard.matchup.homeTeam.getName(),
      scoreboard.matchup.awayTeam.getName(),
      scoreboard.getTvBroadcastsString(),
      scoreboard.location.getFormattedLocation()
    );
    expect(UpcomingGamesTableCreator.format(scoreboard)).to.eql(expected);
  });

  it('should test table creation', function() {
    let data = List.of(scoreboard, scoreboard);
    let expected = '\u001b[90m┌───────────────────────────\u001b[39m\u001b[90m┬────────────────\u001b[39m\u001b[90m┬────────────────────\u001b[39m\u001b[90m┬─────────────────────\u001b[39m\u001b[90m┬───────────────────────┐\u001b[39m\n\u001b[90m│\u001b[39m\u001b[31m          ⏰  UTC           \u001b[39m\u001b[90m│\u001b[39m\u001b[31m               \u001b[39m\u001b[90m│\u001b[39m\u001b[31m                   \u001b[39m\u001b[90m│\u001b[39m\u001b[31m                    \u001b[39m\u001b[90m│\u001b[39m\u001b[31m                      \u001b[39m\u001b[90m│\u001b[39m\n\u001b[90m├───────────────────────────\u001b[39m\u001b[90m┼────────────────\u001b[39m\u001b[90m┼────────────────────\u001b[39m\u001b[90m┼─────────────────────\u001b[39m\u001b[90m┼───────────────────────┤\u001b[39m\n\u001b[90m│\u001b[39m January 30, 2017 12:00 AM \u001b[90m│\u001b[39m Boston Celtics \u001b[90m│\u001b[39m Los Angeles Lakers \u001b[90m│\u001b[39m jaebaebae,jaebaebae \u001b[90m│\u001b[39m TD Garden, Boston, MA \u001b[90m│\u001b[39m\n\u001b[90m├───────────────────────────\u001b[39m\u001b[90m┼────────────────\u001b[39m\u001b[90m┼────────────────────\u001b[39m\u001b[90m┼─────────────────────\u001b[39m\u001b[90m┼───────────────────────┤\u001b[39m\n\u001b[90m│\u001b[39m January 30, 2017 12:00 AM \u001b[90m│\u001b[39m Boston Celtics \u001b[90m│\u001b[39m Los Angeles Lakers \u001b[90m│\u001b[39m jaebaebae,jaebaebae \u001b[90m│\u001b[39m TD Garden, Boston, MA \u001b[90m│\u001b[39m\n\u001b[90m└───────────────────────────\u001b[39m\u001b[90m┴────────────────\u001b[39m\u001b[90m┴────────────────────\u001b[39m\u001b[90m┴─────────────────────\u001b[39m\u001b[90m┴───────────────────────┘\u001b[39m';
    console.log(expected);
    console.log(UpcomingGamesTableCreator.create(data));
    expect(UpcomingGamesTableCreator.create(data)).to.eql(expected);
  });
});
