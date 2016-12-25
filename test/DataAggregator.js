'use es6';

import chai from 'chai';

import {List} from 'immutable';
import moment from 'moment-timezone';

import DataAggregator from '../src/services/DataAggregator';

describe('Test Data Aggregator', function() {
  let date = moment().year(2016).month(0).date(2);
  let anotherDate = moment().year(2016).month(4).date(8);
  it('tests scoreboard fetching', function() {
    return DataAggregator.getScoreboards(date)
                         .then(games => console.log(games));
  });

  it('tests box score fetching', function() {
    return DataAggregator.getBoxScore(anotherDate, List.of("0041500234"))
                         .then(boxScore => console.log(boxScore));
  });

  it('tests play by play fetching', function() {
    return DataAggregator.getPlayByPlay(anotherDate, List.of("0041500234"))
                         .then(playByPlay => console.log(playByPlay));
  });

  it('tests data aggregation', function() {
    return DataAggregator.aggregate(date)
                         .then(data => console.log(data));
  });
});
