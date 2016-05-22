import PlayByPlay from '../../data/models/PlayByPlay';


export default class PlayByPlayDataTranslator {
  constructor() {
    this.maximumPlaysNumber = 4;
  }

  translatePlayByPlayData(data) {
    const playByPlayData = data.sports_content.game.play;
    const index = Math.min(this.maximumPlaysNumber, playByPlayData.length);
    const recentPlays = playByPlayData.slice(-index);
    return recentPlays.map(play =>
      new PlayByPlay({ description: play.description, clock: play.clock, period: play.period, teamAbbreviation: play.team_abr, })
    );
  }
}
