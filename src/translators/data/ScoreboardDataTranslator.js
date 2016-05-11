const moment = require("moment-timezone");
const jstz = require("jstimezonedetect");

const HtmlEscaper = require("../../utils/HtmlEscaper.js");
const Constants = require("../../constants/Constants.js");

const USER_TIMEZONE = jstz.determine().name();

function getBroadcasts(data) {
  const broadcasts = [];
  data.tv.broadcaster.forEach(function(broadcast) {
    broadcasts.push(broadcast.display_name);
  });
  return broadcasts;
}

function getTeamLinescores(data) {
  const linescores = [];
  if ('period_name' in data.period && 'score' in data.period) {
    linescores.push(
      {
        period: data.period.period_name,
        score: parseInt(data.period.score)
      }
    );
  } else {
    data.period.forEach(function(period) {
      linescores.push(
        {
          period: period.period_name,
          score: parseInt(period.score)
        }
      );
    });
  }
  return linescores;
}

function getUnixMillisecondsStartTime(dateStartTime) {
  return getDefaultDateStartTime(dateStartTime).clone()
                                               .tz("UTC")
                                               .valueOf();
}

function getUtcDateStartTime(dateStartTime) {
  return getDefaultDateStartTime(dateStartTime).clone()
                                               .tz("UTC")
                                               .format(Constants.TRANSLATED_DATE_FORMAT);
}

function getDefaultDateStartTime(dateStartTime) {
  return moment(dateStartTime, Constants.TRANSLATED_NBA_DATE_TIME_FORMAT).tz(Constants.DEFAULT_TIMEZONE);
}

function getLocalizedDateStartTime(dateStartTime) {
  return getDefaultDateStartTime(dateStartTime).clone()
                                               .tz(USER_TIMEZONE)
                                               .format(Constants.TRANSLATED_DATE_FORMAT);
}

function getGameStatus(periodStatus, gameStatus) {
  if (periodStatus != "Halftime") {
    return Constants.TRANSLATED_GAME_STATUS_MAP[gameStatus];
  }

  return periodStatus;
}

module.exports = {
  
  translateGameData: function(data) {
    const games = {};
    data.sports_content.games.game.forEach(function(game) {
      const isPreviewAvailable = false;
      if (game.previewAvailable == 1) {
        isPreviewAvailable = true;
      }

      const isRecapAvailable = false;
      if (game.recapAvailable == 1) {
        isRecapAvailable = true;
      }

      var visitorLinescores = [];
      if ("linescores" in game.visitor) {
        visitorLinescores = getTeamLinescores(game.visitor.linescores);
      }

      var homeLinescores = [];
      if ("linescores" in game.home) {
        homeLinescores = getTeamLinescores(game.home.linescores);
      }

      const dateStartTime = game.date.concat(game.time);

      games[game.id] = {
        status: getGameStatus(game.period_time.period_status, game.period_time.game_status),
        url: game.game_url,
        nbaFormatStartDate: game.date,
        unixMillisecondsStartTime: getUnixMillisecondsStartTime(dateStartTime),
        formattedUtcDateStartTime: getUtcDateStartTime(dateStartTime),
        arena: HtmlEscaper.escapeHtml(game.arena),
        city: HtmlEscaper.escapeHtml(game.city),
        state: HtmlEscaper.escapeHtml(game.state),
        formattedLocalizedStartDate: getLocalizedDateStartTime(dateStartTime),
        isPreviewAvailable: isPreviewAvailable,
        isRecapAvailable: isRecapAvailable,
        periodValue: HtmlEscaper.escapeHtml(game.period_time.period_value),
        periodStatus: HtmlEscaper.escapeHtml(game.period_time.period_status),
        gameClock: HtmlEscaper.escapeHtml(game.period_time.game_clock),
        broadcasts: getBroadcasts(game.broadcasters),
        visitorAbbreviation: HtmlEscaper.escapeHtml(game.visitor.abbreviation),
        visitorName: HtmlEscaper.escapeHtml(game.visitor.city) + " " + HtmlEscaper.escapeHtml(game.visitor.nickname),
        visitorScore: parseInt(game.visitor.score),
        visitorLinescores: visitorLinescores,
        homeAbbreviation: HtmlEscaper.escapeHtml(game.home.abbreviation),
        homeName: HtmlEscaper.escapeHtml(game.home.city) + " " + HtmlEscaper.escapeHtml(game.home.nickname),
        homeScore: parseInt(game.home.score),
        homeLinescores: homeLinescores
      };
    });

    return games;
  }
};
