'use es6';

import {List} from 'immutable';

import GameBoxScoreLeaders from '../../data/models/GameBoxScoreLeaders';
import TeamBoxScoreLeaders from '../../data/models/TeamBoxScoreLeaders';
import StatisticalLeaders from '../../data/models/StatisticalLeaders';
import Player from '../../data/models/Player';


export default class BoxScoreDataTranslator {
  static translateStatLeaders(leaderData) {
    const leaders = leaderData.leader.map(leader => new Player(leader.FirstName, leader.LastName));
    return new StatisticalLeaders({value: parseInt(leaderData.StatValue), leaders: List.of(leaders)});
  }

  static translateBoxScoreData(data) {
    const visitorLeaders = data.sports_content.game.visitor.Leaders;
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

    const visitorBoxScoreLeaders = new TeamBoxScoreLeaders({
      points: visitorPointsLeaders,
      assists: visitorAssistsLeaders,
      rebounds: visitorReboundsLeaders,
    });

    const homeBoxScoreLeaders = new TeamBoxScoreLeaders({
      points: homePointsLeaders,
      assists: homeAssistsLeaders,
      rebounds: homeReboundsLeaders,
    });
    return new GameBoxScoreLeaders({home: homeBoxScoreLeaders, visitor: visitorBoxScoreLeaders});
  }
}
