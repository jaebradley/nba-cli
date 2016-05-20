'use es6';

import {expect} from 'chai';
import PeriodScore from '../src/data/models/PeriodScore';

describe('Period score model object', function() {
  it('creates a period score object', function() {
    const defaultPeriodScore = new PeriodScore();

    expect(defaultPeriodScore.periodValue).to.equal(1);
    expect(defaultPeriodScore.homeScore).to.equal(0);
    expect(defaultPeriodScore.visitorScore).to.equal(0);
    expect(defaultPeriodScore.getWinningTeam()).to.equal('TIE');
    expect(defaultPeriodScore.getFormattedHomeScore()).to.equal('0'.blue);
    expect(defaultPeriodScore.getFormattedVisitorScore()).to.equal('0'.blue);
    expect(defaultPeriodScore.getFormattedPeriodName()).to.equal('Q1');
  });

  it('creates a custom period score with tied values', function() {
    const customPeriodScoreTie = new PeriodScore({
        periodValue: 2,
        homeScore: 10,
        visitorScore: 10
    });

    expect(customPeriodScoreTie.periodValue).to.equal(2);
    expect(customPeriodScoreTie.homeScore).to.equal(10);
    expect(customPeriodScoreTie.visitorScore).to.equal(10);
    expect(customPeriodScoreTie.getWinningTeam()).to.equal('TIE');
    expect(customPeriodScoreTie.getFormattedHomeScore()).to.equal('10'.blue);
    expect(customPeriodScoreTie.getFormattedVisitorScore()).to.equal('10'.blue);
    expect(customPeriodScoreTie.getFormattedPeriodName()).to.equal('Q2');
  });

  it('creates a custom period score with a greater home score', function() {
    const customPeriodScoreHomeWin = new PeriodScore({
        periodValue: 4,
        homeScore: 11,
        visitorScore: 5
    });

    expect(customPeriodScoreHomeWin.periodValue).to.equal(4);
    expect(customPeriodScoreHomeWin.homeScore).to.equal(11);
    expect(customPeriodScoreHomeWin.visitorScore).to.equal(5);
    expect(customPeriodScoreHomeWin.getWinningTeam()).to.equal('HOME');
    expect(customPeriodScoreHomeWin.getFormattedVisitorScore()).to.equal('5'.red);
    expect(customPeriodScoreHomeWin.getFormattedHomeScore()).to.equal('11'.green);
    expect(customPeriodScoreHomeWin.getFormattedPeriodName()).to.equal('Q4');
  });

  it('creates a custom period with a greater away score', function() {
    const customPeriodScoreVisitorWin = new PeriodScore({
        periodValue: 5,
        homeScore: 5,
        visitorScore: 11
    });

    expect(customPeriodScoreVisitorWin.periodValue).to.equal(5);
    expect(customPeriodScoreVisitorWin.homeScore).to.equal(5);
    expect(customPeriodScoreVisitorWin.visitorScore).to.equal(11);
    expect(customPeriodScoreVisitorWin.getWinningTeam()).to.equal('VISITOR');
    expect(customPeriodScoreVisitorWin.getFormattedVisitorScore()).to.equal('11'.green);
    expect(customPeriodScoreVisitorWin.getFormattedHomeScore()).to.equal('5'.red);
    expect(customPeriodScoreVisitorWin.getFormattedPeriodName()).to.equal('OT1');
  });

  it('tests score formatting static method', function() {
    expect(PeriodScore.getFormattedScore(0, 0)).to.equal('0'.blue);
    expect(PeriodScore.getFormattedScore(0, 1)).to.equal('0'.red);
    expect(PeriodScore.getFormattedScore(0, -1)).to.equal('0'.green);
  });
});
