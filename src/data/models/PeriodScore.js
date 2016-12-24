import {Record} from 'immutable';
import Score from './Score';

const defaults = {
  period: 1,
  score: new Score(0, 0),
}

export default class PeriodScore extends Record(defaults){
};
