module.exports = {
  translatePlayByPlayData: function(data) {
    const plays = [];
    data.sports_content.game.play.forEach(function(play) {
      plays.push({
        description: play.description,
        clock: play.clock,
        period: play.period
      });
    });
    return plays;
  }
};