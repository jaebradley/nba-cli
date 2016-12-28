'use es6';

import {expect} from 'chai';

import PeriodFormatter from '../src/services/PeriodFormatter';

describe('Test Period Formatter', function() {
  it('should test period formatting', function() {
    expect(PeriodFormatter.format(1)).to.equal('Q1');
    expect(PeriodFormatter.format(5)).to.equal('OT1');
  });
});
