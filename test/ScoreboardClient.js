'use es6';

import {expect} from 'chai';

import scoreboard from './data/scoreboard/final';

import ScoreboardClient from '../src/data/clients/ScoreboardClient';
import ScoreboardDataTranslator from '../src/translators/data/ScoreboardDataTranslator';

describe('Scoreboard client', function() {
  const scoreboardClient = new ScoreboardClient();
  const translator = new ScoreboardDataTranslator();

  it('fetches scoreboard client for 20160508', function() {
    scoreboardClient.fetch('20160508', function(data) {
      expect(data).to.equal(translator.translate(scoreboard));
    });
  });

  it('test the constructor', function() {
    expect(scoreboardClient.baseScoreboardUrl).to.equal('http://data.nba.com/data/5s/json/cms/noseason/scoreboard');
  });

  it('test the url creation', function() {
    expect(scoreboardClient.generateScoreboardUrl('20160508')).to.equal('http://data.nba.com/data/5s/json/cms/noseason/scoreboard/20160508/games.json');
  });
});