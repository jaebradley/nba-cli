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
        new Player('Kevin', 'Durant'),
        new Player('Serge', 'Ibaka'),
        new Player('Andre', 'Roberson'),
        new Player('Steven', 'Adams'),
      ]
    });
    const visitorAssistsLeaders = new StatisticalLeaders({
      value: 2,
      leaders: [new Player('Russell', 'Westbrook')]
    });
    const visitorReboundsLeaders = new StatisticalLeaders({
      value: 2,
      leaders: [new Player('Steven', 'Adams')]
    })
    const visitorBoxScoreLeaders = new TeamBoxScoreLeaders({
      points: visitorPointsLeaders,
      assists: visitorAssistsLeaders,
      rebounds: visitorReboundsLeaders,
    });

    const homePointsLeaders = new StatisticalLeaders({
      value: 4,
      leaders: [new Player('Klay', 'Thompson')]
    });
    const homeAssistsLeaders = new StatisticalLeaders({
      value: 1,
      leaders: [
        new Player('Andrew', 'Bogut'),
        new Player('Stephen', 'Curry'),
        new Player('Draymond', 'Green'),
      ]
    });
    const homeReboundsLeaders = new StatisticalLeaders({
      value: 1,
      leaders: [new Player('Draymond', 'Green')]
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
    const visitorPointsLeaders = firstQuarterBoxScore.sports_content.game.visitor.Leaders.Points;
    const visitorAssistsLeaders = firstQuarterBoxScore.sports_content.game.visitor.Leaders.Assists;

    const expectedPoints = new StatisticalLeaders({
      value: 2,
      leaders: [
        new Player('Kevin', 'Durant'),
        new Player('Serge', 'Ibaka'),
        new Player('Andre', 'Roberson'),
        new Player('Steven', 'Adams'),
      ]
    });

    const expectedAssists = new StatisticalLeaders({
      value: 2,
      leaders: [new Player('Russell', 'Westbrook')]
    });

    expect(BoxScoreDataTranslator.translateStatLeaders(visitorPointsLeaders)).to.eql(expectedPoints);
    expect(BoxScoreDataTranslator.translateStatLeaders(visitorAssistsLeaders)).to.eql(expectedAssists);
  });
});
