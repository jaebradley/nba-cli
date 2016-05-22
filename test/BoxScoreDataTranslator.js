'use es6';

import {expect, assert} from 'chai';
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
    assert.isOk(BoxScoreDataTranslator.translateBoxScoreData(pregameBoxScore).equals(new GameBoxScoreLeaders()), 'pregame box score and empty game box score leaders are equal');
  });

  it('translate first quarter box score data', function() {
    const visitorPointsLeaders = new StatisticalLeaders({
      value: 2,
      leaders: [
        new Player({firstName: 'Kevin', lastName: 'Durant'}),
        new Player({firstName: 'Serge', lastName: 'Ibaka'}),
        new Player({firstName: 'Andre', lastName: 'Roberson'}),
        new Player({firstName: 'Steven', lastName: 'Adams'}),
      ]
    });
    const visitorAssistsLeaders = new StatisticalLeaders({
      value: 2,
      leaders: [new Player({firstName: 'Russell', lastName: 'Westbrook'})]
    });
    const visitorReboundsLeaders = new StatisticalLeaders({
      value: 2,
      leaders: [new Player({firstName: 'Steven', lastName: 'Adams'})]
    })
    const visitorBoxScoreLeaders = new TeamBoxScoreLeaders({
      points: visitorPointsLeaders,
      assists: visitorAssistsLeaders,
      rebounds: visitorReboundsLeaders,
    });

    const homePointsLeaders = new StatisticalLeaders({
      value: 4,
      leaders: [new Player({firstName: 'Klay', lastName: 'Thompson'})]
    });
    const homeAssistsLeaders = new StatisticalLeaders({
      value: 1,
      leaders: [
        new Player({firstName: 'Andrew', lastName: 'Bogut'}),
        new Player({firstName: 'Stephen', lastName: 'Curry'}),
        new Player({firstName: 'Draymond', lastName: 'Green'}),
      ]
    });
    const homeReboundsLeaders = new StatisticalLeaders({
      value: 1,
      leaders: [new Player({firstName: 'Draymond', lastName: 'Green'})]
    })
    const homeBoxScoreLeaders = new TeamBoxScoreLeaders({
      points: homePointsLeaders,
      assists: homeAssistsLeaders,
      rebounds: homeReboundsLeaders,
    });

    const expected = new GameBoxScoreLeaders({home: homeBoxScoreLeaders, visitor: visitorBoxScoreLeaders});
    expect(BoxScoreDataTranslator.translateBoxScoreData(firstQuarterBoxScore)).to.eql(expected);
  });

it('translate first quarter stat leader', function() {
  
});
});
