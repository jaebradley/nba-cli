const expect    = require('chai').expect;
const Formatter = require('../src/tables/formatters/Formatter.js');

describe('Table display formatting', function() {
  describe('Game period formatting', function() {
    it('formats game period', function() {
      const firstQuarter = Formatter.formatGamePeriod('1');
      const fourthQuarter = Formatter.formatGamePeriod('4');
      const firstOvertime = Formatter.formatGamePeriod('5');

      expect(firstQuarter).to.equal('Q1');
      expect(fourthQuarter).to.equal('Q4');
      expect(firstOvertime).to.equal('OT1');
    });
  });
});
