'use es6';

import {expect} from 'chai';
import {List} from 'immutable';

import PlaysTableCreator from '../src/services/tables/PlaysTableCreator';
import Play from '../src/data/Play';

describe('Play By Play Table Creator', function() {
  let play = new Play({
    description: '1',
    clock: '2',
    period: '3',
    teamAbbreviation: '4'
  });
  let plays = List.of(play, play, play);
  it('test table creation', function() {
    let expected = '\u001b[90m┌──────\u001b[39m\u001b[90m┬─────────────┐\u001b[39m\n\u001b[90m│\u001b[39m\u001b[31m  ⏳   \u001b[39m\u001b[90m│\u001b[39m\u001b[31m Description \u001b[39m\u001b[90m│\u001b[39m\n\u001b[90m├──────\u001b[39m\u001b[90m┼─────────────┤\u001b[39m\n\u001b[90m│\u001b[39m 2 Q3 \u001b[90m│\u001b[39m 1           \u001b[90m│\u001b[39m\n\u001b[90m├──────\u001b[39m\u001b[90m┼─────────────┤\u001b[39m\n\u001b[90m│\u001b[39m 2 Q3 \u001b[90m│\u001b[39m 1           \u001b[90m│\u001b[39m\n\u001b[90m├──────\u001b[39m\u001b[90m┼─────────────┤\u001b[39m\n\u001b[90m│\u001b[39m 2 Q3 \u001b[90m│\u001b[39m 1           \u001b[90m│\u001b[39m\n\u001b[90m└──────\u001b[39m\u001b[90m┴─────────────┘\u001b[39m';
    let table = PlaysTableCreator.create(plays);
    expect(table).to.equal(expected);
    console.log(table);
  });
});
