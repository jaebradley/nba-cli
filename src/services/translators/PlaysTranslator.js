import { List } from 'immutable';

import Play from '../../data/Play';

export default class PlaysTranslator {
  static translate(data) {
    // At most, use the last 5 plays
    const recentPlays = data.sports_content.game.play.slice(-Math.min(5, data.length));
    return List(recentPlays.map(play => new Play({
      description: play.description,
      clock: play.clock,
      period: parseInt(play.period),
      teamAbbreviation: play.team_abr,
    })));
  }
}
