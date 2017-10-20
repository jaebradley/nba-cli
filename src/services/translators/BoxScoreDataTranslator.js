/* eslint no-prototype-builtins: 0 */

import { List } from 'immutable';

import GameBoxScoreLeaders from '../../data/GameBoxScoreLeaders';
import TeamBoxScoreLeaders from '../../data/TeamBoxScoreLeaders';
import StatisticalLeaders from '../../data/StatisticalLeaders';
import Player from '../../data/Player';

export default class BoxScoreDataTranslator {
  static translateStatLeaders(data) {
    const leaders = List(data.leader.map(leader =>
      new Player({
        firstName: leader.FirstName,
        lastName: leader.LastName,
      })));

    return new StatisticalLeaders({ value: parseInt(data.StatValue, 10), leaders });
  }

  static translateBoxScoreData(data) {
    const visitorLeaders = data.sports_content.game.visitor.Leaders;
    const homeLeaders = data.sports_content.game.home.Leaders;

    const visitorPointsLeaders = visitorLeaders.hasOwnProperty('Points')
      ? BoxScoreDataTranslator.translateStatLeaders(visitorLeaders.Points)
      : new StatisticalLeaders();

    const visitorAssistsLeaders = visitorLeaders.hasOwnProperty('Assists')
      ? BoxScoreDataTranslator.translateStatLeaders(visitorLeaders.Assists)
      : new StatisticalLeaders();

    const visitorReboundsLeaders = visitorLeaders.hasOwnProperty('Rebounds')
      ? BoxScoreDataTranslator.translateStatLeaders(visitorLeaders.Rebounds)
      : new StatisticalLeaders();

    const homePointsLeaders = homeLeaders.hasOwnProperty('Points')
      ? BoxScoreDataTranslator.translateStatLeaders(homeLeaders.Points)
      : new StatisticalLeaders();

    const homeAssistsLeaders = homeLeaders.hasOwnProperty('Assists')
      ? BoxScoreDataTranslator.translateStatLeaders(homeLeaders.Assists)
      : new StatisticalLeaders();

    const homeReboundsLeaders = homeLeaders.hasOwnProperty('Rebounds')
      ? BoxScoreDataTranslator.translateStatLeaders(homeLeaders.Rebounds)
      : new StatisticalLeaders();

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

    return new GameBoxScoreLeaders({
      home: homeBoxScoreLeaders,
      visitor: visitorBoxScoreLeaders,
    });
  }
}
