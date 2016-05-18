import {Record} from 'immutable';

const defaults = {
  description: "",
  clock: "",
  period: ""
};

export default class PlayByPlay extends Record(defaults) {
};
