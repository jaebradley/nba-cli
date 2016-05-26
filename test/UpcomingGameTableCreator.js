'use es6';

import {expect, assert} from 'chai';

import UpcomingGameTableCreator from '../src/tables/UpcomingGameTableCreator';
import GameMetadata from '../src/data/models/GameMetadata';
import Team from '../src/data/models/Team';
import Location from '../src/data/models/Location';

describe('test UpcomingGameTableCreator', function() {

  const tableCreator = new UpcomingGameTableCreator();
  const upcomingGameMetadata = new GameMetadata({
    unixMillisecondsStartTime: 1451606400000, // 2016-01-01 00:00:00AM UTC
    home: new Team({city: 'jae', nickname: 'bae', abbrevation: 'bae'}),
    visitor: new Team({city: 'jae', nickname: 'bro', abbrevation: 'jadley'}),
    broadcasts: ['jae', 'bradley'],
    location: new Location({arena: 'jae', city: 'bae', state: 'bae'}),
  });
  const singleGameMetadata = [upcomingGameMetadata];
  const doubleGameMetadata = [upcomingGameMetadata, upcomingGameMetadata];

  it('tests constructor', function() {
    expect(tableCreator.header).to.eql(['UPCOMING', 'HOME', 'AWAY', 'WATCH', 'ARENA']);
    expect(tableCreator.defaultFormat).to.eql({ head: ['UPCOMING', 'HOME', 'AWAY', 'WATCH', 'ARENA'] });
  });

  it('tests single row table creation', function() {
    expect(tableCreator.create(singleGameMetadata)).to.equal("'\u001b[90m┌──────────────────────────\u001b[39m\u001b[90m┬─────────\u001b[39m\u001b[90m┬─────────\u001b[39m\u001b[90m┬─────────────\u001b[39m\u001b[90m┬───────────────┐\u001b[39m\n\u001b[90m│\u001b[39m\u001b[31m UPCOMING                 \u001b[39m\u001b[90m│\u001b[39m\u001b[31m HOME    \u001b[39m\u001b[90m│\u001b[39m\u001b[31m AWAY    \u001b[39m\u001b[90m│\u001b[39m\u001b[31m WATCH       \u001b[39m\u001b[90m│\u001b[39m\u001b[31m ARENA         \u001b[39m\u001b[90m│\u001b[39m\n\u001b[90m├──────────────────────────\u001b[39m\u001b[90m┼─────────\u001b[39m\u001b[90m┼─────────\u001b[39m\u001b[90m┼─────────────\u001b[39m\u001b[90m┼───────────────┤\u001b[39m\n\u001b[90m│\u001b[39m January 1, 2016 12:00 AM \u001b[90m│\u001b[39m jae bae \u001b[90m│\u001b[39m jae bro \u001b[90m│\u001b[39m jae,bradley \u001b[90m│\u001b[39m jae, bae, bae \u001b[90m│\u001b[39m\n\u001b[90m└──────────────────────────\u001b[39m\u001b[90m┴─────────\u001b[39m\u001b[90m┴─────────\u001b[39m\u001b[90m┴─────────────\u001b[39m\u001b[90m┴───────────────┘\u001b[39m");
  });

  it('tests double row table creation', function() {
    expect(tableCreator.create(doubleGameMetadata)).to.equal("\u001b[90m┌──────────────────────────\u001b[39m\u001b[90m┬─────────\u001b[39m\u001b[90m┬─────────\u001b[39m\u001b[90m┬─────────────\u001b[39m\u001b[90m┬───────────────┐\u001b[39m\n\u001b[90m│\u001b[39m\u001b[31m UPCOMING                 \u001b[39m\u001b[90m│\u001b[39m\u001b[31m HOME    \u001b[39m\u001b[90m│\u001b[39m\u001b[31m AWAY    \u001b[39m\u001b[90m│\u001b[39m\u001b[31m WATCH       \u001b[39m\u001b[90m│\u001b[39m\u001b[31m ARENA         \u001b[39m\u001b[90m│\u001b[39m\n\u001b[90m├──────────────────────────\u001b[39m\u001b[90m┼─────────\u001b[39m\u001b[90m┼─────────\u001b[39m\u001b[90m┼─────────────\u001b[39m\u001b[90m┼───────────────┤\u001b[39m\n\u001b[90m│\u001b[39m January 1, 2016 12:00 AM \u001b[90m│\u001b[39m jae bae \u001b[90m│\u001b[39m jae bro \u001b[90m│\u001b[39m jae,bradley \u001b[90m│\u001b[39m jae, bae, bae \u001b[90m│\u001b[39m\n\u001b[90m├──────────────────────────\u001b[39m\u001b[90m┼─────────\u001b[39m\u001b[90m┼─────────\u001b[39m\u001b[90m┼─────────────\u001b[39m\u001b[90m┼───────────────┤\u001b[39m\n\u001b[90m│\u001b[39m January 1, 2016 12:00 AM \u001b[90m│\u001b[39m jae bae \u001b[90m│\u001b[39m jae bro \u001b[90m│\u001b[39m jae,bradley \u001b[90m│\u001b[39m jae, bae, bae \u001b[90m│\u001b[39m\n\u001b[90m└──────────────────────────\u001b[39m\u001b[90m┴─────────\u001b[39m\u001b[90m┴─────────\u001b[39m\u001b[90m┴─────────────\u001b[39m\u001b[90m┴───────────────┘\u001b[39m");
  });
});