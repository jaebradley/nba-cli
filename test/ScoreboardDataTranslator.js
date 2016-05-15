import 'babel-polyfill';

import {expect} from 'chai';
import ScoreboardDataTranslator from '../src/translators/data/ScoreboardDataTranslator';

describe('Translate scoreboard data', function() {
  it('Generates team name', function() {
    expect(ScoreboardDataTranslator.generateTeamName('JaE', 'bRaDleY')).to.equal('JaE bRaDleY');
  });

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

  
});
