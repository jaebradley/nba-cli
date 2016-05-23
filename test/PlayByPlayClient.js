'use es6';

import {expect, assert} from 'chai';

import pbp from './data/pbp/final';

import PlayByPlayClient from '../src/data/clients/PlayByPlayClient';

describe('Play by play client', function() {
  const playByPlayClient = new PlayByPlayClient();

  it('fetches play by play from 20160508 for game id 0041500234', function() {
    playByPlayClient.fetch('20160508', '0041500234', function(data) {
      expect(data).to.equal(pbp);
    });
  });

  it('test the constructor', function() {
    expect(playByPlayClient.basePlayByPlayUrl).to.equal('http://data.nba.com/data/5s/json/cms/noseason/game');
  });

  it('test the url creation', function() {
    expect(playByPlayClient.generatePlayByPlayUrl('20160508', '0041500234')).to.equal('http://data.nba.com/data/5s/json/cms/noseason/game/20160508/0041500234/pbp_all.json');
  });
});