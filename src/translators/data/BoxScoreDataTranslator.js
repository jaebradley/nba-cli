import GameBoxScoreLeaders from '../../data/models/GameBoxScoreLeaders';
import TeamBoxScoreLeaders from '../../data/models/TeamBoxScoreLeaders';
import StatisticalLeaders from '../../data/models/StatisticalLeaders';
import Player from '../../data/models/Player';


export default class BoxScoreDataTranslator {
  static translateStatLeaders(leaderData) {
    const leaders = leaderData.leader.map(leader => new Player({firstName: leader.FirstName, lastName: leader.LastName}));
    return new StatisticalLeaders({value: leaderData.StatValue, leaders: leaders});
  }

  static translateBoxScoreData(data) {
    const visitorLeaders = data.sports_content.game.visitor.Leaders;
    const homeLeaders = data.sports_content.game.home.Leaders;

    const visitorBoxScoreLeaders = new TeamBoxScoreLeaders({
      points: BoxScoreDataTranslator.translateStatLeaders(visitorLeaders.Points),
      assists: BoxScoreDataTranslator.translateStatLeaders(visitorLeaders.Assists),
      rebounds: BoxScoreDataTranslator.translateStatLeaders(visitorLeaders.Rebounds),
    });

    const homeBoxScoreLeaders = new TeamBoxScoreLeaders({
      points: BoxScoreDataTranslator.translateStatLeaders(homeLeaders.Points),
      assists: BoxScoreDataTranslator.translateStatLeaders(homeLeaders.Assists),
      rebounds: BoxScoreDataTranslator.translateStatLeaders(homeLeaders.Rebounds),
    });
    
    return new GameBoxScoreLeaders({home: homeBoxScoreLeaders, visitor: visitorBoxScoreLeaders});
  }
}
