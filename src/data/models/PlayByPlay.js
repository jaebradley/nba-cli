import {Record} from 'immutable';

const defaults = {
  description: "",
  clock: "",
  period: "",
  teamAbbreviation: "",
};

export default class PlayByPlay extends Record(defaults) {
};
