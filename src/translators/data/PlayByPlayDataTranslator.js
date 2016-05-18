import PlayByPlay from '../../data/models/PlayByPlay';


export default class PlayByPlayDataTranslator {
  constructor() {
    this.maximumPlaysNumber = 4;
  }

  translatePlayByPlayData(data) {
    const playByPlayData = data.sports_content.game.play;
    const index = Math.min(this.maximumPlaysNumber, playByPlayData.length);
    const lastFivePlaysOrLess = playByPlayData.slice(-index);
    return lastFivePlaysOrLess.map(play =>
      new PlayByPlay(play.description, play.clock, play.period)
      );
  }
}
