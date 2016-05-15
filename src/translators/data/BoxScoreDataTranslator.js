export default class BoxScoreDataTranslator {
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
    boxScore.visitor.points = {
      value: visitorLeaders.Points.StatValue,
      leaders: visitorLeaders.Points.leader
    };
    boxScore.visitor.assists = {
      value: visitorLeaders.Assists.StatValue,
      leaders: visitorLeaders.Assists.leader
    };
    boxScore.visitor.rebounds = {
      value: visitorLeaders.Rebounds.StatValue,
      leaders: visitorLeaders.Rebounds.leader
    };
    boxScore.home.points = {
      value: homeLeaders.Points.StatValue,
      leaders: homeLeaders.Points.leader
    };
    boxScore.home.assists = {
      value: homeLeaders.Assists.StatValue,
      leaders: homeLeaders.Assists.leader
    };
    boxScore.home.rebounds = {
      value: homeLeaders.Rebounds.StatValue,
      leaders: homeLeaders.Rebounds.leader
    };
    return boxScore;
  }
}
