const USAGE = '\nUsage: nba [options] [commands] \n\n';
const COMMANDS = 'Commands: \n\n  games [time] get nba games for date \n\n';
const OPTIONS = 'Options: \n\n  -h, --help  output usage information \n\n';
const EXAMPLES = 'Examples: \n\n nba games today => get games that started today \n\n nba games tomorrow => get games starting tomorrow \n\n nba games yesterday => get games that started yesterday \n\n nba games 2016-01-01 => nba games that started on 2016-01-01 \n';
const HELP = `${USAGE}${COMMANDS}${OPTIONS}${EXAMPLES}`;
export {
  HELP as default,
};
