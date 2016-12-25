'use es6';

import {expect} from 'chai';
import {List} from 'immutable';

import PlayByPlayTableCreator from '../src/services/tables/PlayByPlayTableCreator';
import PlayByPlay from '../src/data/PlayByPlay';

describe('Play By Play Table Creator', function() {
  let pbp1 = new PlayByPlay({
    description: '1',
    clock: '2',
    period: '3',
    teamAbbreviation: '4'
  });
  let plays = List.of(pbp1, pbp1, pbp1);
  it('test table creation', function() {
    let expected = '\u001b[90m┌───────\u001b[39m\u001b[90m┬─────────────┐\u001b[39m\n\u001b[90m│\u001b[39m\u001b[31m Clock \u001b[39m\u001b[90m│\u001b[39m\u001b[31m Description \u001b[39m\u001b[90m│\u001b[39m\n\u001b[90m├───────\u001b[39m\u001b[90m┼─────────────┤\u001b[39m\n\u001b[90m│\u001b[39m 2 Q3  \u001b[90m│\u001b[39m 1           \u001b[90m│\u001b[39m\n\u001b[90m├───────\u001b[39m\u001b[90m┼─────────────┤\u001b[39m\n\u001b[90m│\u001b[39m 2 Q3  \u001b[90m│\u001b[39m 1           \u001b[90m│\u001b[39m\n\u001b[90m├───────\u001b[39m\u001b[90m┼─────────────┤\u001b[39m\n\u001b[90m│\u001b[39m 2 Q3  \u001b[90m│\u001b[39m 1           \u001b[90m│\u001b[39m\n\u001b[90m└───────\u001b[39m\u001b[90m┴─────────────┘\u001b[39m';
    let table = PlayByPlayTableCreator.create(plays);
    expect(table).to.equal(expected);
    console.log(table);
  });
});
