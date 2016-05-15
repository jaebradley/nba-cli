export default class BoxScoreDataTranslator {
  static translateStatLeaders(statLeaderData) {
    const statLeaders = {
      value: statLeaderData.StatValue;
      leaders: []
    }
    statLeaderData.leader.map(leader => statLeaders.leaders.push(
      {firstName: leader.FirstName, lastName: leader.LastName}
    ));
    return statLeaders;
  }

  static translateBoxScoreData(data) {
    const boxScore = {
      visitor: {
        points: {},
        assists: {},
        rebounds: {},
      },
      home: {
        points: {},
        assists: {},
        rebounds: {},
      }
    };
    const visitorLeaders = data.sports_content.game.visitor.Leaders;
    const homeLeaders = data.sports_content.game.home.Leaders;
    boxScore.visitor.points = BoxScoreDataTranslator.translateStatLeaders(visitorLeaders.Points);
    boxScore.visitor.assists = BoxScoreDataTranslator.translateStatLeaders(visitorLeaders.Assists);
    boxScore.visitor.rebounds = BoxScoreDataTranslator.translateStatLeaders(visitorLeaders.Rebounds);
    boxScore.home.points = BoxScoreDataTranslator.translateStatLeaders(homeLeaders.Points);
    boxScore.home.assists = BoxScoreDataTranslator.translateStatLeaders(homeLeaders.Assists);
    boxScore.home.rebounds = BoxScoreDataTranslator.translateStatLeaders(homeLeaders.Rebounds);
    return boxScore;
  }
}
