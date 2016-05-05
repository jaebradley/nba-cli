const moment = require("moment-timezone");
const jstz = require("jstimezonedetect");

const DEFAULT_TIMEZONE = "America/New_York";
const DATE_START_TIME_FORMAT = "YYYYMMDDHHmm";
const TRANSLATED_DATE_FORMAT = "LLL";
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
  data.period.forEach(function(period) {
    linescores.push(
      {
        period: period.period_name,
        score: period.score
      }
    );
  });
  return linescores;
}

function getUnixMillisecondsStartTime(dateStartTime) {
  return getDefaultDateStartTime(dateStartTime).tz("UTC").valueOf();
}

function getUtcDateStartTime(dateStartTime) {
  return getDefaultDateStartTime(dateStartTime).tz("UTC").format(TRANSLATED_DATE_FORMAT);
}

function getDefaultDateStartTime(dateStartTime) {
  return moment(dateStartTime, DATE_START_TIME_FORMAT).tz(DEFAULT_TIMEZONE);
}

function getLocalizedDateStartTime(dateStartTime) {
  return getDefaultDateStartTime(dateStartTime).clone().tz(USER_TIMEZONE).format(TRANSLATED_DATE_FORMAT);
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

      const visitorLinescores = [];
      if ("linescores" in game.visitor) {
        visitorLinescores = getTeamLinescores(game.visitor.linescores);
      }

      const homeLinescores = [];
      if ("linescores" in game.home) {
        homeLinescores = getTeamLinescores(game.home.linescores);
      }

      const dateStartTime = game.date.concat(game.time);
      const localDateStartTime = game.home_start_date.concat(game.home_start_time);

      games[game.id] = {
        url: game.game_url,
        unixMillisecondsStartTime: getUnixMillisecondsStartTime(dateStartTime),
        formattedUtcDateStartTime: getUtcDateStartTime(dateStartTime),
        arena: game.arena,
        city: game.city,
        state: game.state,
        formattedLocalizedStartDate: getLocalizedDateStartTime(localDateStartTime),
        isPreviewAvailable: isPreviewAvailable,
        isRecapAvailable: isRecapAvailable,
        periodValue: game.period_time.period_value,
        periodStatus: game.period_time.period_status,
        gameClock: game.period_time.game_clock,
        broadcasts: getBroadcasts(game.broadcasters),
        visitorAbbreviation: game.visitor.abbreviation,
        visitorName: game.visitor.city + " " + game.visitor.nickname,
        visitorScore: game.visitor.score,
        visitorLinescores: visitorLinescores,
        homeAbbreviation: game.home.abbreviation,
        homeName: game.home.city + " " + game.home.nickname,
        homeScore: game.home.score,
        homeLinescores: homeLinescores
      };
    });

    return games;
  }
};
