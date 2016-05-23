'use es6';

import {expect, assert} from 'chai';

import boxscore from './data/boxscore/final';

import BoxScoreClient from '../src/data/clients/BoxScoreClient';

describe('Box score client', function() {
  const boxScoreClient = new BoxScoreClient();

  it('fetches data from 20160508 for game id 0041500234', function() {
    boxScoreClient.fetch('20160508', '0041500234', function(data) {
      expect(data).to.equal(boxscore);
    });
  });

  it('test the base url', function() {
    expect(boxScoreClient.boxScoreBaseUrl).to.equal('http://data.nba.com/data/5s/json/cms/noseason/game');
  });

  it('test the url creation', function() {
    expect(boxScoreClient.generateBoxScoreUrl('20160508', '0041500234')).to.equal('http://data.nba.com/data/5s/json/cms/noseason/game/20160508/0041500234/boxscore.json');
  });
});