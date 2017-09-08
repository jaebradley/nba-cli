import chai from 'chai';
import { List } from 'immutable';

import PlaysTableCreator from '../src/services/tables/PlaysTableCreator';
import Play from '../src/data/Play';

const expect = chai.expect;

describe('Play By Play Table Creator', () => {
  const play = new Play({
    description: '1',
    clock: '2',
    period: '3',
    teamAbbreviation: '4'
  });
  const plays = List.of(play, play, play);

  it('test table creation', () => {
    const expected = '\u001b[90m┌──────\u001b[39m\u001b[90m┬─────────────┐\u001b[39m\n\u001b[90m│\u001b[39m\u001b[31m  ⏳   \u001b[39m\u001b[90m│\u001b[39m\u001b[31m Description \u001b[39m\u001b[90m│\u001b[39m\n\u001b[90m├──────\u001b[39m\u001b[90m┼─────────────┤\u001b[39m\n\u001b[90m│\u001b[39m 2 Q3 \u001b[90m│\u001b[39m 1           \u001b[90m│\u001b[39m\n\u001b[90m├──────\u001b[39m\u001b[90m┼─────────────┤\u001b[39m\n\u001b[90m│\u001b[39m 2 Q3 \u001b[90m│\u001b[39m 1           \u001b[90m│\u001b[39m\n\u001b[90m├──────\u001b[39m\u001b[90m┼─────────────┤\u001b[39m\n\u001b[90m│\u001b[39m 2 Q3 \u001b[90m│\u001b[39m 1           \u001b[90m│\u001b[39m\n\u001b[90m└──────\u001b[39m\u001b[90m┴─────────────┘\u001b[39m';
    const table = PlaysTableCreator.create(plays);
    expect(expected).to.equal(table);
    console.log(`Plays Table:\n ${table}`);
  });
});
