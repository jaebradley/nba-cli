'use es6';

import {expect} from 'chai';
import Score from '../src/data/Score';
import Outcome from '../src/data/Outcome';

describe('Score object', function() {
  let loserScore = 1;
  let winnerScore = 2;
  let losingScore = new Score({
    home: loserScore,
    away: winnerScore
  });
  let winningScore = new Score({
    home: winnerScore,
    away: loserScore
  });
  let tiedScore = new Score({
    home: loserScore,
    away: loserScore
  });

  // test formatting
});
