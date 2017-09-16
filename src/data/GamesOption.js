import { Enum } from 'enumify';
import jstz from 'jstimezonedetect';
import moment from 'moment-timezone';

export default class GamesOption extends Enum {
  getStartOfDay() {
    const startOfDay = moment().tz(jstz.determine().name()).startOf('day');

    switch (this) {
      case GamesOption.YESTERDAY:
        return startOfDay.subtract(1, 'days');

      case GamesOption.TOMORROW:
        return startOfDay.add(1, 'days');

      case GamesOption.TODAY:
        return startOfDay;

      default:
        throw new Error(`Unknown option: ${this}`);
    }
  }
};

GamesOption.initEnum(['TODAY', 'YESTERDAY', 'TOMORROW']);
