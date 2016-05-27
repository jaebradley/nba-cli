'use es6';

import {expect, assert} from 'chai';
import immutable from 'immutable';
import ScoreboardDataTranslator from '../src/translators/data/ScoreboardDataTranslator';
import Constants from '../src/constants/Constants';

import TranslatedScoreboard from '../src/data/models/TranslatedScoreboard';
import GameMetadata from '../src/data/models/GameMetadata';
import Score from '../src/data/models/Score';
import PeriodScore from '../src/data/models/PeriodScore';
import Team from '../src/data/models/Team';
import Location from '../src/data/models/Location';
import GameScores from '../src/data/models/GameScores';

import firstQuarterScoreboard from './data/scoreboard/first-quarter.json';
import pregame from './data/scoreboard/pregame.json';

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

  it('Identifies if first period', function() {
    const firstQuarterPeriod = firstQuarterFirstGameData.visitor.linescores.period;
    assert.isOk(ScoreboardDataTranslator.hasOnlyOneLinescorePeriod(firstQuarterPeriod));
  });

  it('Generate pregame translated data', function() {
    const metadata = new GameMetadata({
      id: '0041500315',
      status: Constants.PREGAME,
      url: "20160526/OKCGSW",
      unixMillisecondsStartTime: 1464310800000,
      location: new Location({ arena: "ORACLE Arena", city: "Oakland", state: "CA" }),
      isPreviewAvailable: true,
      isRecapAvailable: false,
      periodValue: '0',
      periodStatus: '9:00 pm ET',
      gameClock: '',
      broadcasts: ['TNT','TSN'],
      visitor: new Team({ city: "Oklahoma City", nickname: "Thunder", abbreviation: "OKC" }),
      home: new Team({ city: "Golden State", nickname: "Warriors", abbreviation: "GSW" }),
    });
    const expectedOutput = new TranslatedScoreboard({ scores: new GameScores(), metadata: metadata });
    const firstGame = pregame.sports_content.games.game[0];
  });
});
