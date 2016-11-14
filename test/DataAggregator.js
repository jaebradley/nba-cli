'use es6';

import chai from 'chai';

import DataAggregator from '../src/data/services/DataAggregator';

describe('Data Aggregator', function() {
  it('tests scoreboard fetching', function() {
    return DataAggregator.getTranslatedGames(2016, 1, 2)
                         .then(games => console.log(games))
                         .done('finished translation test');
  });
});
