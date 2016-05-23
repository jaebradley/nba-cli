'use es6';

import {expect} from 'chai';
import ScoreboardDataTranslator from '../src/translators/data/ScoreboardDataTranslator';

import firstQuarterScoreboard from './data/scoreboard/first-quarter.json';

describe('Translate scoreboard data', function() {

  it('Indicates if recap is available', function() {
    expect(ScoreboardDataTranslator.isRecapAvailable(1)).to.equal(true);
    expect(ScoreboardDataTranslator.isRecapAvailable(0)).to.equal(false);
    expect(ScoreboardDataTranslator.isRecapAvailable(-1)).to.equal(false);
    expect(ScoreboardDataTranslator.isRecapAvailable(2)).to.equal(false);
  });

  it('Indicates if preview is available', function() {
    expect(ScoreboardDataTranslator.isPreviewAvailable(1)).to.equal(true);
    expect(ScoreboardDataTranslator.isPreviewAvailable(0)).to.equal(false);
    expect(ScoreboardDataTranslator.isPreviewAvailable(-1)).to.equal(false);
    expect(ScoreboardDataTranslator.isPreviewAvailable(2)).to.equal(false);
  });

  it('Calculates unix millisecond start time', function() {
    expect(ScoreboardDataTranslator.getUnixMillisecondsStartTime('201512311900'), 1451606400000); // 2016-01-01 00:00:00
  });

  it('Identifies game status', function() {
    expect(ScoreboardDataTranslator.getGameStatus('Halftime', 1)).to.equal('Halftime');
    expect(ScoreboardDataTranslator.getGameStatus('Jae', 1)).to.equal('PREGAME');
    expect(ScoreboardDataTranslator.getGameStatus('Jae', 2)).to.equal('LIVE');
    expect(ScoreboardDataTranslator.getGameStatus('Jae', 3)).to.equal('FINAL');
  });

  it('Identifies tv broadcasts', function() {
    const broadcasters = firstQuarterScoreboard.sports_content.games.game[0].broadcasters;
    expect(ScoreboardDataTranslator.getBroadcasts(broadcasters)).to.eql(['TNT', 'Sportsnet One']);
  })
});
