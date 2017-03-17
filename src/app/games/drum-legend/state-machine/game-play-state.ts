import {Rudiment} from './rudiment';
export class GamePlayState {
  rudiment: Rudiment;
  receivedPattern: string;
  correctMatches: number;
  levelScore: number;
  totalScore: number;
  rudimentId: number;
  rudimentPosition: number;
  paused: boolean;
  message: string;
  challengeTimeInSeconds: number;
  scoreLog: GamePlayLevelScoring[] = [];
}

export class GamePlayLevelScoring {
  constructor(public rudiment: Rudiment, public matches: number, public totalScore: number) {}
}
