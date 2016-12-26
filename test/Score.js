'use es6';

import colors from 'colors';
import chai from 'chai';
import chaiImmutable from 'chai-immutable';

import FormattedScore from '../src/data/FormattedScore';
import Score from '../src/data/Score';
import Outcome from '../src/data/Outcome';

chai.use(chaiImmutable);

let expect = chai.expect;

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

  it('should test outcome', function() {
    expect(losingScore.getOutcome()).to.eql(Outcome.AWAY_WIN);
    expect(winningScore.getOutcome()).to.eql(Outcome.HOME_WIN);
    expect(tiedScore.getOutcome()).to.eql(Outcome.TIE);
  });

  it('should test formatting', function() {
    let formattedTie = new FormattedScore({
      home: `${loserScore}`.blue,
      away: `${loserScore}`.blue
    });
    expect(tiedScore.format()).to.eql(formattedTie);

    let formattedAwayWin = new FormattedScore({
      home: `${loserScore}`.red,
      away: `${winnerScore}`.green
    });
    expect(losingScore.format()).to.eql(formattedAwayWin);

    let formattedHomeWin = new FormattedScore({
      home: `${winnerScore}`.green,
      away: `${loserScore}`.red
    });
    expect(winningScore.format()).to.eql(formattedHomeWin);
  });
});
