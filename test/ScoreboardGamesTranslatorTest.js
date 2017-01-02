'use es6';

import {expect} from 'chai';

import ScoreboardGamesTranslator from '../src/services/translators/ScoreboardGamesTranslator.js';

describe('Tests Scoreboard Games Translator', function() {
  it ('should test missing fields', function() {
    let missingFields = {};
    expect(() => ScoreboardGamesTranslator.translate(missingFields)).to.throw(ReferenceError);

    missingFields['sports_content'] = {};
    expect(() => ScoreboardGamesTranslator.translate(missingFields)).to.throw(ReferenceError);

    missingFields['sports_content']['games'] = {};
    expect(() => ScoreboardGamesTranslator.translate(missingFields)).to.throw(ReferenceError);

  });
});
