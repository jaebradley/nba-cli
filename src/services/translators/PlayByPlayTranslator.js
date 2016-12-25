import {List} from 'immutable';

import Play from '../../data/Play';

export default class PlayByPlayTranslator {
  static translate(data) {
    let plays = data.sports_content.game.play;
    let index = Math.min(5, plays.length);
    let recentPlays = plays.slice(-index);
    return List(recentPlays.map(play => PlayByPlayTranslator.Play(play)));
  }

  static buildPlay(play) {
    return new Play({
      description: play.description,
      clock: play.clock,
      period: parseInt(play.period),
      teamAbbreviation: play.team_abr
    });
  }
}
