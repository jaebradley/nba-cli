'use es6';

import {expect} from 'chai';
import Formatter from '../src/tables/formatters/Formatter';

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
  })
});
