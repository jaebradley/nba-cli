'use es6';

import {expect} from 'chai';
import PlayByPlayDataTranslator from '../src/translators/data/PlayByPlayDataTranslator';
import PlayByPlay from '../src/data/models/PlayByPlay';

import firstQuarterPbp from './data/pbp/first-quarter.json';
import firstQuarterPbpSomePlays from './data/pbp/first-quarter-some-plays.json';

describe('Play by play data translator', function() {
  it('translate first quarter data', function() {
    const pbpTranslator = new PlayByPlayDataTranslator();
    const expectedPbpTranslation = [
      new PlayByPlay({ description: "[GSW 6-6] Curry Free Throw 1 of 2 (1 PTS)", clock: "09:16", period: "1", teamAbbreviation: "GSW"}),
      new PlayByPlay({ description: "[GSW 7-6] Curry Free Throw 2 of 2 (2 PTS)", clock: "09:16", period: "1", teamAbbreviation: "GSW"}),
      new PlayByPlay({ description: "[OKC 8-7] Adams Hook Shot: Made (2 PTS) Assist: Westbrook (2 AST)", clock: "08:59", period: "1", teamAbbreviation: "OKC"}),
      new PlayByPlay({ description: "[GSW 9-8] Barnes Pullup Jump shot: Made (2 PTS) Assist: Green (1 AST)", clock: "08:51", period: "1", teamAbbreviation: "GSW"}),
    ];

    expect(pbpTranslator.maximumPlaysNumber).to.equal(4);
    expect(pbpTranslator.translatePlayByPlayData(firstQuarterPbp)).to.eql(expectedPbpTranslation);
  });

  it('translate when less than limit', function() {
    const pbpTranslator = new PlayByPlayDataTranslator();
    const expectedPbpTranslation = [
      new PlayByPlay({ description: "Start Period", clock: "", period: "1", teamAbbreviation: ""}),
      new PlayByPlay({ description: "Jump Ball Bogut vs Adams (Roberson gains possession)", clock: "", period: "1", teamAbbreviation: "GSW"}),
    ];

    expect(pbpTranslator.translatePlayByPlayData(firstQuarterPbpSomePlays)).to.eql(expectedPbpTranslation);
  });
});
