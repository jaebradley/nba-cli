export default class PeriodFormatter {
  static format(period) {
    return period > 4
      ? `OT${period - 4}`
      : `Q${period}`;
  }
}
