'use es6';

import {expect, assert} from 'chai';
import ScoreboardDataTranslator from '../src/translators/data/ScoreboardDataTranslator';

import firstQuarterScoreboard from './data/scoreboard/first-quarter.json';

describe('Translate scoreboard data', function() {

  const firstQuarterFirstGameData = firstQuarterScoreboard.sports_content.games.game[0];

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
    const broadcasters = firstQuarterFirstGameData.broadcasters;
    expect(ScoreboardDataTranslator.getBroadcasts(broadcasters)).to.eql(['TNT', 'Sportsnet One']);
  });

  it('Identifiers if first period', function() {
    const firstQuarterPeriod = firstQuarterFirstGameData.visitor.linescores.period;
    assert.isOk(ScoreboardDataTranslator.hasOnlyOneLinescorePeriod(firstQuarterPeriod));
  });
});
