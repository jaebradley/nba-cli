export default class PlayByPlayDataTranslator {
  constructor() {}

  static translatePlayByPlayData(data) {
    return data.sports_content.game.play.map(play => 
      (
        {
          description: play.description,
          clock: play.clock,
          period: play.period 
        }
      )
    );
  }
}
