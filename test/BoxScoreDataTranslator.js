'use es6';

import chai from 'chai';
import chaiImmutable from 'chai-immutable';
import {List} from 'immutable';

import BoxScoreDataTranslator from '../src/services/translators/BoxScoreDataTranslator';
import GameBoxScoreLeaders from '../src/data/GameBoxScoreLeaders';
import TeamBoxScoreLeaders from '../src/data/TeamBoxScoreLeaders';
import StatisticalLeaders from '../src/data/StatisticalLeaders';
import Player from '../src/data/Player';

import finalBoxScore from './data/boxscore/final.json';
import firstQuarterBoxScore from './data/boxscore/first-quarter.json';
import pregameBoxScore from './data/boxscore/pregame.json';

describe('Box score data translator', function() {
  let kevinDurant = new Player({
    firstName: 'Kevin',
    lastName: 'Durant'
  });
  let sergeIbaka = new Player({
    firstName: 'Serge',
    lastName: 'Ibaka'
  });
  let andreRoberson = new Player({
    firstName: 'Andre',
    lastName: 'Roberson'
  });
  let stevenAdams = new Player({
    firstName: 'Steven',
    lastName: 'Adams'
  });
  let russellWestbrook = new Player({
    firstName: 'Russell',
    lastName: 'Westbrook'
  });

  let klayThompson = new Player({
    firstName: 'Klay',
    lastName: 'Thompson'
  });
  let andrewBogut = new Player({
    firstName: 'Andrew',
    lastName: 'Bogut'
  });
  let stephCurry = new Player({
    firstName: 'Stephen',
    lastName: 'Curry'
  });
  let draymondGreen = new Player({
    firstName: 'Draymond',
    lastName: 'Green'
  });

  it('translate pregame box score data', function() {
    chai.assert.isOk(BoxScoreDataTranslator.translateBoxScoreData(pregameBoxScore).equals(new GameBoxScoreLeaders()), 'pregame box score and empty game box score leaders are equal');
  });

  it('translate first quarter box score data', function() {
    let visitorPointsLeaders = new StatisticalLeaders({
      value: 2,
      leaders: List.of(kevinDurant, sergeIbaka, andreRoberson, stevenAdams)
    });
    let visitorAssistsLeaders = new StatisticalLeaders({
      value: 2,
      leaders: List.of(russellWestbrook)
    });
    let visitorReboundsLeaders = new StatisticalLeaders({
      value: 2,
      leaders: List.of(stevenAdams)
    })
    let visitorBoxScoreLeaders = new TeamBoxScoreLeaders({
      points: visitorPointsLeaders,
      assists: visitorAssistsLeaders,
      rebounds: visitorReboundsLeaders,
    });

    let homePointsLeaders = new StatisticalLeaders({
      value: 4,
      leaders: List.of(klayThompson)
    });
    let homeAssistsLeaders = new StatisticalLeaders({
      value: 1,
      leaders: List.of(andrewBogut, stephCurry, draymondGreen)
    });
    let homeReboundsLeaders = new StatisticalLeaders({
      value: 1,
      leaders: List.of(draymondGreen)
    })
    let homeBoxScoreLeaders = new TeamBoxScoreLeaders({
      points: homePointsLeaders,
      assists: homeAssistsLeaders,
      rebounds: homeReboundsLeaders,
    });

    let expected = new GameBoxScoreLeaders({home: homeBoxScoreLeaders, visitor: visitorBoxScoreLeaders});
    chai.expect(BoxScoreDataTranslator.translateBoxScoreData(firstQuarterBoxScore)).to.eql(expected);
  });

  it('translate first quarter stat leader', function() {
    let visitorPointsLeaders = firstQuarterBoxScore.sports_content.game.visitor.Leaders.Points;
    let visitorAssistsLeaders = firstQuarterBoxScore.sports_content.game.visitor.Leaders.Assists;

    let expectedPoints = new StatisticalLeaders({
      value: 2,
      leaders: List.of(kevinDurant, sergeIbaka, andreRoberson, stevenAdams)
    });

    let expectedAssists = new StatisticalLeaders({
      value: 2,
      leaders: List.of(russellWestbrook)
    });

    chai.expect(BoxScoreDataTranslator.translateStatLeaders(visitorPointsLeaders)).to.eql(expectedPoints);
    chai.expect(BoxScoreDataTranslator.translateStatLeaders(visitorAssistsLeaders)).to.eql(expectedAssists);
  });
});
