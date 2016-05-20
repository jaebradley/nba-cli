'use es6';

import {expect} from 'chai';
import emoji from 'node-emoji';
import Score from '../src/data/models/Score';
import Constants from '../src/constants/Constants';

describe('Score model object', function() {
  it('creates a score object', function() {
    const defaultScore = new Score();

    expect(defaultScore.homeScore).to.equal(0);
    expect(defaultScore.visitorScore).to.equal(0);
    expect(defaultScore.getFormattedHomeScore()).to.equal('0'.blue);
    expect(defaultScore.getFormattedVisitorScore()).to.equal('0'.blue);
  });

  it('tied scores', function() {
    const tiedScore = new Score({ homeScore: 10, visitorScore: 10 });

    expect(tiedScore.homeScore).to.equal(10);
    expect(tiedScore.visitorScore).to.equal(10);
    expect(tiedScore.getFormattedHomeScore()).to.equal('10'.blue);
    expect(tiedScore.getFormattedVisitorScore()).to.equal('10'.blue);
  });

  it('greater home score', function() {
    const homeScore = new Score({ homeScore: 11, visitorScore: 5 });

    expect(homeScore.homeScore).to.equal(11);
    expect(homeScore.visitorScore).to.equal(5);
    expect(homeScore.getFormattedVisitorScore()).to.equal('5'.red);
    expect(homeScore.getFormattedHomeScore()).to.equal('11'.green);
  });

  it('greater away score', function() {
    const awayScore = new Score({ homeScore: 5, visitorScore: 11 });

    expect(awayScore.homeScore).to.equal(5);
    expect(awayScore.visitorScore).to.equal(11);
    expect(awayScore.getFormattedVisitorScore()).to.equal('11'.green);
    expect(awayScore.getFormattedHomeScore()).to.equal('5'.red);
  });

  it('test winner method', function() {
    expect(Score.calculateWinner(10, 10)).to.equal('TIE');
    expect(Score.calculateWinner(10, 9)).to.equal('US');
    expect(Score.calculateWinner(10, 11)).to.equal('OPPONENT');
  });

  it('test format score method', function() {
    expect(Score.formatScore(100, 100)).to.equal(emoji.get(Constants.SCORE_100_EMOJI_VALUE));
    expect(Score.formatScore(99, 99)).to.equal('99'.blue);
    expect(Score.formatScore(99, 98)).to.equal('99'.green);
    expect(Score.formatScore(98, 99)).to.equal('99'.red);
  })
});
