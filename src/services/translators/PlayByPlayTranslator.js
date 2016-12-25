import {List} from 'immutable';

import PlayByPlay from '../../data/PlayByPlay';

export default class PlayByPlayTranslator {
  static translate(data) {
    let playByPlayData = data.sports_content.game.play;
    let index = Math.min(PlayByPlayTranslator.getMaximumPlaysNumber(), playByPlayData.length);
    let recentPlays = playByPlayData.slice(-index);
    return List(recentPlays.map(play =>
      new PlayByPlay({ description: play.description,
                       clock: play.clock,
                       period: play.period,
                       teamAbbreviation: play.team_abr })
    ));
  }

  static getMaximumPlaysNumber() {
    return 4;
  }
}
