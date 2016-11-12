'use es6';

import {expect} from 'chai';
import Formatter from '../src/tables/formatters/Formatter';
import Score from '../src/data/models/Score';

describe('Table display formatting', function() {
  it('formats game period', function() {
    const firstQuarter = Formatter.formatLiveGamePeriod('1');
    const fourthQuarter = Formatter.formatLiveGamePeriod('4');
    const firstOvertime = Formatter.formatLiveGamePeriod('5');

    expect(firstQuarter).to.equal('Q1');
    expect(fourthQuarter).to.equal('Q4');
    expect(firstOvertime).to.equal('OT1');
  });

  it('formats player name', function() {
    expect(Formatter.formatShortPlayerName('jae', 'bradley')).to.equal('j. bradley');
  });

  it('formats team abbreviation', function() {
    expect(Formatter.formatTeamAbbreviation('BOS')).to.eql('BOS 🍀');
  });

  it('formats score', function() {
    let loserScore = 1;
    let winnerScore = 2;
    let losingScore = new Score(loserScore, winnerScore);
    let winningScore = new Score(winnerScore, loserScore);
    let tiedScore = new Score(loserScore, loserScore);

    expect(Formatter.formatScore(losingScore)).to.equal(loserScore.toString().red);
  });

  it('tests exceptional score formatting cases', function() {
    expect(() => Formatter.formatScore(1)).to.throw(TypeError);
  });
});
