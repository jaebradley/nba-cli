'use es6';

import chai from 'chai';

import {List} from 'immutable';

import DataAggregator from '../src/data/services/DataAggregator';

describe('Test Data Aggregator', function() {
  it('tests scoreboard fetching', function() {
    return DataAggregator.getTranslatedGames(2016, 1, 2)
                         .then(games => console.log(games));
  });

  it('tests box score fetching', function() {
    return DataAggregator.getTranslatedBoxScores(2016, 5, 8, List.of("0041500234"))
                         .then(boxScore => console.log(boxScore));
  });

  it('tests play by play fetching', function() {
    return DataAggregator.getTranslatedPlayByPlays(2016, 5, 8, List.of("0041500234"))
                         .then(playByPlay => console.log(playByPlay));
  });
});
