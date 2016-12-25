'use es6';

import {List} from 'immutable';

import GameBoxScoreLeaders from '../../data/GameBoxScoreLeaders';
import TeamBoxScoreLeaders from '../../data/TeamBoxScoreLeaders';
import StatisticalLeaders from '../../data/StatisticalLeaders';
import Player from '../../data/Player';

export default class BoxScoreDataTranslator {
  static translateStatLeaders(data) {
    let leaders = List(data.leader.map(leader => new Player({
      firstName: leader.FirstName,
      lastName: leader.LastName
    })));
    return new StatisticalLeaders({value: parseInt(data.StatValue), leaders: leaders});
  }

  static translateBoxScoreData(data) {
    let visitorLeaders = data.sports_content.game.visitor.Leaders;
    const homeLeaders = data.sports_content.game.home.Leaders;

    let visitorPointsLeaders = new StatisticalLeaders();
    if (visitorLeaders.hasOwnProperty('Points')) {
      visitorPointsLeaders = BoxScoreDataTranslator.translateStatLeaders(visitorLeaders.Points);
    }

    let visitorAssistsLeaders = new StatisticalLeaders();
    if (visitorLeaders.hasOwnProperty('Assists')) {
      visitorAssistsLeaders = BoxScoreDataTranslator.translateStatLeaders(visitorLeaders.Assists);
    }

    let visitorReboundsLeaders = new StatisticalLeaders();
    if (visitorLeaders.hasOwnProperty('Rebounds')) {
      visitorReboundsLeaders = BoxScoreDataTranslator.translateStatLeaders(visitorLeaders.Rebounds);
    }

    let homePointsLeaders = new StatisticalLeaders();
    if (homeLeaders.hasOwnProperty('Points')) {
      homePointsLeaders = BoxScoreDataTranslator.translateStatLeaders(homeLeaders.Points);
    }

    let homeAssistsLeaders = new StatisticalLeaders();
    if (homeLeaders.hasOwnProperty('Assists')) {
      homeAssistsLeaders = BoxScoreDataTranslator.translateStatLeaders(homeLeaders.Assists);
    }

    let homeReboundsLeaders = new StatisticalLeaders();
    if (homeLeaders.hasOwnProperty('Rebounds')) {
      homeReboundsLeaders = BoxScoreDataTranslator.translateStatLeaders(homeLeaders.Rebounds);
    }

    let visitorBoxScoreLeaders = new TeamBoxScoreLeaders({
      points: visitorPointsLeaders,
      assists: visitorAssistsLeaders,
      rebounds: visitorReboundsLeaders,
    });

    let homeBoxScoreLeaders = new TeamBoxScoreLeaders({
      points: homePointsLeaders,
      assists: homeAssistsLeaders,
      rebounds: homeReboundsLeaders,
    });
    return new GameBoxScoreLeaders({home: homeBoxScoreLeaders, visitor: visitorBoxScoreLeaders});
  }
}
