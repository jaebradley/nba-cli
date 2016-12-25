import {List} from 'immutable';

import PlayByPlay from '../../data/PlayByPlay';

export default class PlayByPlayTranslator {
  static translate(data) {
    let playByPlayData = data.sports_content.game.play;
    let index = Math.min(5, playByPlayData.length);
    let recentPlays = playByPlayData.slice(-index);
    return List(recentPlays.map(play => PlayByPlayTranslator.buildPlayByPlay(play)));
  }

  static buildPlayByPlay(play) {
    return new PlayByPlay({
      description: play.description,
      clock: play.clock,
      period: parseInt(play.period),
      teamAbbreviation: play.team_abr
    });
  }
}
