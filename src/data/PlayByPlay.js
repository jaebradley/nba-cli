import {Record} from 'immutable';

const defaults = {
  description: "",
  clock: "",
  period: 1,
  teamAbbreviation: "",
};

export default class PlayByPlay extends Record(defaults) {
  formatPeriod() {
    let value = this.period - 4;
    if (value > 0) {
      return 'OT'.concat(value);
    }

    return 'Q'.concat(this.period);
  }
};
