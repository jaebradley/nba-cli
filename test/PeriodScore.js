'use es6';

import {expect} from 'chai';
import PeriodScore from '../src/data/models/PeriodScore';
import Score from '../src/data/models/Score';

describe('Period score model object', function() {
  it('creates a period score object', function() {
    const defaultPeriodScore = new PeriodScore();

    expect(defaultPeriodScore.periodValue).to.equal(1);
    expect(defaultPeriodScore.score.homeScore).to.equal(0);
    expect(defaultPeriodScore.score.visitorScore).to.equal(0);
    expect(defaultPeriodScore.getFormattedHomeScore()).to.equal('0'.blue);
    expect(defaultPeriodScore.getFormattedVisitorScore()).to.equal('0'.blue);
    expect(defaultPeriodScore.getFormattedPeriodValue()).to.equal('Q1');
  });

  it('creates a custom period score with tied values', function() {
    const customPeriodScoreTie = new PeriodScore({
        periodValue: 2,
        score: new Score({ homeScore: 10, visitorScore: 10 }),
    });

    expect(customPeriodScoreTie.periodValue).to.equal(2);
    expect(customPeriodScoreTie.score.homeScore).to.equal(10);
    expect(customPeriodScoreTie.score.visitorScore).to.equal(10);
    expect(customPeriodScoreTie.getFormattedHomeScore()).to.equal('10'.blue);
    expect(customPeriodScoreTie.getFormattedVisitorScore()).to.equal('10'.blue);
    expect(customPeriodScoreTie.getFormattedPeriodValue()).to.equal('Q2');
  });

  it('creates a custom period score with a greater home score', function() {
    const customPeriodScoreHomeWin = new PeriodScore({
        periodValue: 4,
        score: new Score({ homeScore: 11, visitorScore: 5 }),
    });

    expect(customPeriodScoreHomeWin.periodValue).to.equal(4);
    expect(customPeriodScoreHomeWin.score.homeScore).to.equal(11);
    expect(customPeriodScoreHomeWin.score.visitorScore).to.equal(5);
    expect(customPeriodScoreHomeWin.getFormattedVisitorScore()).to.equal('5'.red);
    expect(customPeriodScoreHomeWin.getFormattedHomeScore()).to.equal('11'.green);
    expect(customPeriodScoreHomeWin.getFormattedPeriodValue()).to.equal('Q4');
  });

  it('creates a custom period with a greater away score', function() {
    const customPeriodScoreVisitorWin = new PeriodScore({
        periodValue: 5,
        score: new Score({ homeScore: 5, visitorScore: 11 }),
    });

    expect(customPeriodScoreVisitorWin.periodValue).to.equal(5);
    expect(customPeriodScoreVisitorWin.score.homeScore).to.equal(5);
    expect(customPeriodScoreVisitorWin.score.visitorScore).to.equal(11);
    expect(customPeriodScoreVisitorWin.getFormattedVisitorScore()).to.equal('11'.green);
    expect(customPeriodScoreVisitorWin.getFormattedHomeScore()).to.equal('5'.red);
    expect(customPeriodScoreVisitorWin.getFormattedPeriodValue()).to.equal('OT1');
  });

  it('tests period value formatting static method', function() {
    expect(PeriodScore.formatPeriodValue(0)).to.equal('Q0');
    expect(PeriodScore.formatPeriodValue(4)).to.equal('Q4');
    expect(PeriodScore.formatPeriodValue(5)).to.equal('OT1');
  });
});
