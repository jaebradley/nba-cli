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

    const visitorPointsLeaders = 'Points' in visitorLeaders
      ? BoxScoreDataTranslator.translateStatLeaders(visitorLeaders.Points)
      : new StatisticalLeaders();

    const visitorAssistsLeaders = 'Assists' in visitorLeaders
      ? BoxScoreDataTranslator.translateStatLeaders(visitorLeaders.Assists)
      : new StatisticalLeaders();

    const visitorReboundsLeaders = 'Rebounds' in visitorLeaders
      ? BoxScoreDataTranslator.translateStatLeaders(visitorLeaders.Rebounds)
      : new StatisticalLeaders();

    const homePointsLeaders = 'Points' in homeLeaders
      ? BoxScoreDataTranslator.translateStatLeaders(homeLeaders.Points)
      : new StatisticalLeaders();

    const homeAssistsLeaders = 'Assists' in homeLeaders
      ? BoxScoreDataTranslator.translateStatLeaders(homeLeaders.Assists)
      : new StatisticalLeaders();

    const homeReboundsLeaders = 'Rebounds' in homeLeaders
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
