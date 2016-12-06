'use es6';

import chai from 'chai';

import {List} from 'immutable';

import DataAggregator from '../src/data/services/DataAggregator';

describe('Data Aggregator', function() {
  it('tests scoreboard fetching', function() {
    return DataAggregator.getTranslatedGames(2016, 1, 2)
                         .then(games => console.log(games));
  });

  it('tests scoreboard fetching', function() {
    let results = DataAggregator.getTranslatedBoxScores(2016, 5, 8, List.of("0041500234"));
    console.log(results);
  });
});
