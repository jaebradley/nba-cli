'use es6';

import chai from 'chai';
import chaiImmutable from 'chai-immutable';
import emoji from 'node-emoji';
import jstz from 'jstimezonedetect';
import {List, Map, Record} from 'immutable';

import GameScoreboard from '../src/data/GameScoreboard';
import Location from '../src/data/Location';
import Team from '../src/data/Team';
import UpcomingGamesTableCreator from '../src/services/tables/UpcomingGamesTableCreator';

chai.use(chaiImmutable);

let expect = chai.expect;

describe('Test Upcoming Games Table Creation', function() {
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

  it('should test headers', function() {
    expect(headers).to.eql(UpcomingGamesTableCreator.getHeaders());
  })
  //
  // let upcomingGameMetadata = new GameScoreboard({
  //   startTimestamp: 1451606400000, // 2016-01-01 00:00:00AM UTC
  //   home: new Team({city: 'jae', nickname: 'bae', abbrevation: 'bae'}),
  //   visitor: new Team({city: 'jae', nickname: 'bro', abbrevation: 'jadley'}),
  //   broadcasts: ['jae', 'bradley'],
  //   location: new Location({arena: 'jae', city: 'bae', state: 'bae'}),
  // });
  // let singleGameMetadata = [upcomingGameMetadata];
  // let doubleGameMetadata = [upcomingGameMetadata, upcomingGameMetadata];
  //
  // it('tests single row table creation', function() {
  //   expect(UpcomingGamesTableCreator.format(singleGameMetadata).toJS()).to.equal("\u001b[90m┌──────────────────────────\u001b[39m\u001b[90m┬─────────\u001b[39m\u001b[90m┬─────────\u001b[39m\u001b[90m┬─────────────\u001b[39m\u001b[90m┬───────────────┐\u001b[39m\n\u001b[90m│\u001b[39m\u001b[31m UPCOMING                 \u001b[39m\u001b[90m│\u001b[39m\u001b[31m HOME    \u001b[39m\u001b[90m│\u001b[39m\u001b[31m AWAY    \u001b[39m\u001b[90m│\u001b[39m\u001b[31m WATCH       \u001b[39m\u001b[90m│\u001b[39m\u001b[31m ARENA         \u001b[39m\u001b[90m│\u001b[39m\n\u001b[90m├──────────────────────────\u001b[39m\u001b[90m┼─────────\u001b[39m\u001b[90m┼─────────\u001b[39m\u001b[90m┼─────────────\u001b[39m\u001b[90m┼───────────────┤\u001b[39m\n\u001b[90m│\u001b[39m January 1, 2016 12:00 AM \u001b[90m│\u001b[39m jae bae \u001b[90m│\u001b[39m jae bro \u001b[90m│\u001b[39m jae,bradley \u001b[90m│\u001b[39m jae, bae, bae \u001b[90m│\u001b[39m\n\u001b[90m└──────────────────────────\u001b[39m\u001b[90m┴─────────\u001b[39m\u001b[90m┴─────────\u001b[39m\u001b[90m┴─────────────\u001b[39m\u001b[90m┴───────────────┘\u001b[39m");
  // });
  //
  // it('tests double row table creation', function() {
  //   expect(UpcomingGamesTableCreator.format(doubleGameMetadata).toJS()).to.equal("\u001b[90m┌──────────────────────────\u001b[39m\u001b[90m┬─────────\u001b[39m\u001b[90m┬─────────\u001b[39m\u001b[90m┬─────────────\u001b[39m\u001b[90m┬───────────────┐\u001b[39m\n\u001b[90m│\u001b[39m\u001b[31m UPCOMING                 \u001b[39m\u001b[90m│\u001b[39m\u001b[31m HOME    \u001b[39m\u001b[90m│\u001b[39m\u001b[31m AWAY    \u001b[39m\u001b[90m│\u001b[39m\u001b[31m WATCH       \u001b[39m\u001b[90m│\u001b[39m\u001b[31m ARENA         \u001b[39m\u001b[90m│\u001b[39m\n\u001b[90m├──────────────────────────\u001b[39m\u001b[90m┼─────────\u001b[39m\u001b[90m┼─────────\u001b[39m\u001b[90m┼─────────────\u001b[39m\u001b[90m┼───────────────┤\u001b[39m\n\u001b[90m│\u001b[39m January 1, 2016 12:00 AM \u001b[90m│\u001b[39m jae bae \u001b[90m│\u001b[39m jae bro \u001b[90m│\u001b[39m jae,bradley \u001b[90m│\u001b[39m jae, bae, bae \u001b[90m│\u001b[39m\n\u001b[90m├──────────────────────────\u001b[39m\u001b[90m┼─────────\u001b[39m\u001b[90m┼─────────\u001b[39m\u001b[90m┼─────────────\u001b[39m\u001b[90m┼───────────────┤\u001b[39m\n\u001b[90m│\u001b[39m January 1, 2016 12:00 AM \u001b[90m│\u001b[39m jae bae \u001b[90m│\u001b[39m jae bro \u001b[90m│\u001b[39m jae,bradley \u001b[90m│\u001b[39m jae, bae, bae \u001b[90m│\u001b[39m\n\u001b[90m└──────────────────────────\u001b[39m\u001b[90m┴─────────\u001b[39m\u001b[90m┴─────────\u001b[39m\u001b[90m┴─────────────\u001b[39m\u001b[90m┴───────────────┘\u001b[39m");
  // });
});
