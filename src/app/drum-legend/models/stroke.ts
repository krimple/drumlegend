export enum MatchState { YES, NO, PENDING }

export class Stroke {
  match: MatchState;
  static createStrokes(pattern: string) {
    const strokes = [];

    for(const char of pattern) {
      strokes.push(new Stroke(pattern[char]));
    }
    return strokes;
  }

  constructor(public hand: string) {
    this.match = MatchState.NO;
  }
}