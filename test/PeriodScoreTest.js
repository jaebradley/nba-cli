'use es6';

import {expect} from 'chai';

import PeriodScore from '../src/data/PeriodScore';
import Score from '../src/data/Score';

describe('Period Score Test', function() {
  let overtimePeriod = new PeriodScore({
    period: 5,
  });
  let nonOvertimePeriod = new PeriodScore({
    period: 2
  });
  it('should test period score formatting', function() {
    expect(overtimePeriod.formatPeriod()).to.equal('OT1');
    expect(nonOvertimePeriod.formatPeriod()).to.equal('Q2');
  });
});
