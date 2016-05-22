'use es6';

import {expect} from 'chai';
import BoxScoreDataTranslator from '../src/translators/data/BoxScoreDataTranslator';
import GameBoxScoreLeaders from '../src/data/models/GameBoxScoreLeaders';
import TeamBoxScoreLeaders from '../src/data/models/TeamBoxScoreLeaders';
import StatisticalLeaders from '../src/data/models/StatisticalLeaders';
import Player from '../src/data/models/Player';

import finalBoxScore from './data/boxscore/final.json';
import firstQuarterBoxScore from './data/boxscore/first-quarter.json';
import pregameBoxScore from './data/boxscore/pregame.json';

describe('Box score data translator', function() {
  it('translate pregame box score data', function() {
    expect(BoxScoreDataTranslator.translateBoxScoreData(pregameBoxScore)).to.eql(new GameBoxScoreLeaders());
  });
});
