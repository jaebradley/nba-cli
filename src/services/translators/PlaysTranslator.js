import { List } from 'immutable';

import Play from '../../data/Play';

export default class PlaysTranslator {
  static translate(plays) {
    // At most, use the last 5 plays
    const recentPlays = plays.slice(-Math.min(5, plays.length));
    return List(recentPlays.map(play => new Play({
      description: play.description,
      clock: play.clock,
      period: parseInt(play.period, 10),
      teamAbbreviation: play.team_abr,
    })));
  }
}
